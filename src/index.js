import express from 'express';
import constants from '/config/constants';
import './config/database';
import middlewaresConfig from './config/middlewares';
import apiRoutes from './modules';

console.log(constants);

const app = express();
middlewaresConfig(app);

app.get('/', (req, res) => {
      res.send('hello world');
});

apiRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(constants.PORT, err=>{
	if(err){
		throw err;
	}else{
		console.log(`Server is listening on port :$constants.PORT}`);
	}
})