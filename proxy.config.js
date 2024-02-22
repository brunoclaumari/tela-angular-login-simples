const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/',//'http://localhost:8080/' // url do spring
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = PROXY_CONFIG;
