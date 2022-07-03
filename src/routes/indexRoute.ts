import {Router} from 'express';
import auth from './auth';
import user from './user';

const routes = Router();

//RUTAS AUTENTICACION-LOGIN
routes.use('/auth',auth);



//RUTAS USUARIO
routes.use('/user',user);



export default routes;