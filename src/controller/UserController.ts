import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";

export default class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);

    let users;
    try {
      users = await userRepository.find();
    } catch (e) {
      res.status(404).json({ message: "Something goes wrong!" });
    }

    users.length > 0
      ? res.json(users)
      : res.status(404).json({ message: "Not result" });
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    try {
      const user = await userRepository.findOneOrFail({where:{id:parseInt(id)}});
      res.json(user);
    } catch (e) {
      res.status(404).json({ message: "Not Result" });
    }
  };

  static newUser = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);

    const { email, nombre, clave, rol, celular } = req.body;
    const user = new User();

    user.email = email;
    user.nombre = nombre;
    user.clave = clave;
    user.celular = celular;

    if (!user.rol) {
      user.rol = "cliente";
    } else {
      user.rol = rol;
    }

    const validationOpts = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpts);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      return res.status(404).json({ message: "This email already exist" });
    }

    return res.json({ message: "User Created!" });
  };

  static editUser = async (req: Request, res: Response) => {
    const { email, nombre, rol, celular } = req.body;
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    let user;
    try {
      user = await userRepository.findOneBy({id:parseInt(id)});
      user.email = email;
      user.nombre = nombre;
      user.celular = celular;
      user.rol = rol;
    } catch (e) {
      return res.status(404).json({ message: "User not found" });
    }

    const validationOpts = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpts);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    //Try to save user
    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).json({ message: "This email already exist" });
    }

    res.status(201).json({ message: "User Updated!" });
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);

    let user: User;
    try {
      user = await userRepository.findOneBy({id:parseInt(id)});
    } catch (e) {
      res.status(404).json({ message: "There is a problem with delete..." });
    }
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      userRepository.delete(id);
      res.status(201).json({ message: "User Deleted!" });
    }
  };
}
