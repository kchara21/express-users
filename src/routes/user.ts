import {Router} from 'express';
import { checkJwt } from '../middlewares/jwt';
import UserController from '../controller/UserController';

const router = Router();

//Get all users
router.get('/',[checkJwt],UserController.getAll);

//Get one user
router.get('/:id',[checkJwt],UserController.getById);

//Create user 
router.post('/',UserController.newUser);

//Edit user
router.put('/:id',[checkJwt],UserController.editUser);

//Delete user 
router.delete('/:id',[checkJwt],UserController.deleteUser);

export default router;