import { Router } from "express";
import validate from 'express-validation';

import{ authLocal } from '../../services/auth.services';
import * as userController from './userController';
import userValidation from './use.validations';

const routes = new Router();

routes.post('./signup',validate(userValidation.signup), userController.signup);
routes.post('./login',userController.login);

export default routes;