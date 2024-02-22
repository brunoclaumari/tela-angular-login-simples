//import { environment } from  './src/environments/environment.ts';

const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/',//'http://localhost:8080/' // url do spring
    //target: environment.API_URL,
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = PROXY_CONFIG;
