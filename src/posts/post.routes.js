import { Router } from "express";
import validate from 'express-validation'

import{ authLocal } from '../../services/auth.services';
import * as userController from './userController';
import postValidation from './post.validations'

const routes = new Router();

routes.post('/', 
	authJwt, 
	validate(postValidation,.createPost),
	 postController.createPost,
	 );
routes.get('/:id', postController.getPostById);
routes.get('/', postController.getPostsList);
route.patch(
	'/:id', 
	authJwt, 
	validate(postValidation.updatePost), 
	postController.updatePost
	);
route.delete('/:id', authJwt, postController.deletePost);


export default routes;