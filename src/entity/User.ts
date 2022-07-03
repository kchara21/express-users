import { Equals, IsEmail, IsNotEmpty, Length, Max, MaxLength, Min, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, Equal, JoinColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(6)
  nombre: string;

  @Column()
  @MinLength(6)
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  clave: string;

  @Column()
  @IsNotEmpty()
  rol: string;

  @Column({width:10})
  @IsNotEmpty()
  celular: number;
  
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;
  

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.clave = bcrypt.hashSync(this.clave, salt);
  }

  checkPassword(clave: string): boolean {
    return bcrypt.compareSync(clave, this.clave);
  }

}
