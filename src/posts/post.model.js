import mongoose { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator  from 'mongoose-unique-validator';

const PostSchema = new Schema({
	title:{
		type: String,
		trim: true,
		required:[ true, 'title is required'],
		minlength: [3,'title need to be longer'],
		unique: true,
	},

	text:{
		type: String,
		trim: true,
		required:[ true, 'text is required'],
		minlength: [10,'text need to be longer'],
	},

	slug:{
		type: String,
		trim: true,
		lowercase:true,
	},
	user:{
		type: Schema.Types.ObjectId,
		ref:'User',
	},
	favoriteCount: {
		type: Number,
		default: 0,
	}
},{timestamps: true});

PostSchema.plugin(uniqueValidator,{
	message:'{VALUE} already taken !'
});

PostSchema.pre('validate', function(next){
    this._slugify();

    next();
});

PostSchema.methods = {
	_slugify(){
       this.slug = slug(this.title);
	},
	toJSON(){
		return {
			_id: this._id,
			title: this.title,
			text: this.text,
			createdAt: this.createdAt,
			slug: this.slug,
			user:this.user,
			favouriteCount: this.favouriteCount;

		};
	},
};

PostSchema.statics ={
	createPost(args, user){
		return this.create({
					...args,
		            user,
		});
	},
	list({ skip = 0, limit = 5} = {}) {
         return this.find()
          .sort( {createdAt: -1})
          .skip(skip)
          .limit(limit)
          .polpulate('user');
	}
};

export default mongoose.model('Post', PostSchema);