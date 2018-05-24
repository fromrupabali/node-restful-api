import mongoose { schema } from "mongoose";
import validator from 'validator';
import{ hashSync , compareSync} from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator  from 'mongoose-unique-validator';

import{ passwordReg } from './user.validations';
import constants from '../../config/constants';

const UserSchema = new Schema({
      email:{
      	type: String,
      	unique: true,
      	required:[true.'email is required'],
      	trim: true,
      	validate:{
      		validator(email){
      			return validator.isEmail(email);
      		},
      		message :'[VALUE] is not a valid email',
      	},
      },

      firstName:{
      	type: String,
      	required:[true.'first Name is required'],
      	trim: true,
      },

      lastName :{
      	type: String,
      	required:[true.'last Name is required'],
      	trim: true,
      },
      lastName :{
      	type: String,
      	required:[true.'User name is required'],
      	trim: true,
      },

      password:{
      	type: String,
      	required:[true.'password is required'],
      	trim: true,
      	minlength:[6,'password need to be longer'],
      	validate: {
      		validator(password){
                     return passwordReg.test(password);
      		},
      		message:'[VALUE] is not a valid password',
      	}
      },
}  {timestamps: true} );

UserSchema.plugin(uniqueValidator,{
      message:'{VALUE} already taken !'
});


UserSchema.pre('save', function(next){
     if(this.isModified('password')){
       this.password = this._hashPassword(this.password);
       return next();
     }
       return next();
});

UserSchema.methods = {
      _hashPassword(password){
            return hashSync(password);
      },
      authenticationUser(password){
            return compareSync(password,)
      },
      createToken(){
            return jwt.sign(
            {
                  _id:this._id
            },constants.JWT_SECRET,

            );

      },

      toAuthJSON(){
            return{
                  _id: this._id, 
                  userName: this.userName,
                  token:`JWT ${this.createToken()}`,
                  email: this.email,
            };

      },

      toJSON(){
            return{
                  _id: this._id, 
                  userName: this.userName,
            };
      },
};


export default mongoose.model('User', UserSchema);