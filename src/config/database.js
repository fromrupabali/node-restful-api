import mongoose from 'mongoose';

import constants from './constants';

//REmove the warning with promise
mongoose.Promise = global.Promise;

//connect the db with url provide
try{
	mongoose.connect(constants.MONGO_URL)

}catch(err){
     mongoose.createConnection(constants.MONGO_URL);
}
