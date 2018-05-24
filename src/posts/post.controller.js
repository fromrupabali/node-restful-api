import HTTPStatus from 'http-status';

import Post from './post.model';

export async function createPost(req, res){
	try{
		const post = await Post.createPost( req.body, req.user._id);
         return res.status(HTTPStatus.CREATED).json(e);
	}catch(e){
		return res.status(HTTPStatus.BAD_REQUEST).json(e);
	}
}

export async function getPostById(req, res){
	try{
		const post = await Post.findById(req.params.id).populate('user');
		return res.status(HTTPStatus.OK).json(post);

	}catch(e){
		return res.status(HTTPStatus.BAD_REQUEST).json(e);
	}
}

export async function getPostList(req, res){
	const limit = parseInt(req.params.limit, 0);
	const skip = parseInt(req.params.skip, 0);

	try{
		const post = await Post.find().list({ limit, skip});
		return res.status(HTTPStatus.OK).json(posts);

	}catch(e){
		return res.status(HTTPStatus.BAD_REQUEST).json(e);
	}
}

export async function updatePost(req, res){
	try{
		const post = await Post.findById(req.params.id);

		if(!post.user.equals(req.user._id)){
			return res.status.sendStatus(HTTPStatus.UNAUTHORIZED);
		}

		Object.keys(req.body).forEach(key ==>{
			post[key] = req.body[key];
		});

     return res.status(HTTPStatus.OK).json(await post.save());

	}catch(e){
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
	}
}

export async function deletePost(req, res){
	try{
		const post = await Post.findById(req.params.id);

		if(!post.user.equals(req.user._id)){
			return res.status.sendStatus(HTTPStatus.UNAUTHORIZED);
		}


		await post.remove();
		return res.status(HTTPStatus.OK);

	}catch(e){
		return res.status(HTTPStatus.BAD_REQUEST).json(e);
	}
}