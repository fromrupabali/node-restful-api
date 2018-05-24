import morgan from "morgan";
import bodyparser from 'body-parser';
import compression from 'compression';
mport passport from 'passport';

import helmet from 'helmet';

const isDev = process.env.NODE_ENV ==='devdelopment';
const is prod = process.env.NODE_ENV === 'production';
export default app =>{

	if(isProd){
		app.use(compression());
		app.use(helmet());
	}
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true}));
};