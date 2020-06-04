const proxy = require('http-proxy-middleware');
module.exports = function(app) {
   app.use(proxy('/api', { 
       target: 'http://47.111.169.139:8765' ,
       secure: false,  // 是否是https
       changeOrigin: true,
       pathRewrite: {
        "^/api": "/api"
       },
       // cookieDomainRewrite: "http://localhost:3000"
    }));

   app.use(proxy('/qq', { 
      target: 'https://c.y.qq.com' ,
      secure: true,  // 是否是https
      changeOrigin: true,
      pathRewrite: {
       "^/qq": ""
      },
      // cookieDomainRewrite: "http://localhost:3000"
   }));

   app.use(proxy('/uqq', { 
      target: 'https://u.y.qq.com/' ,
      secure: true,  // 是否是https
      changeOrigin: true,
      pathRewrite: {
       "^/uqq": ""
      },
      // cookieDomainRewrite: "http://localhost:3000"
   }));


   app.use(proxy('/wis', { 
      target: 'https://wis.qq.com' ,
      secure: true,  // 是否是https
      changeOrigin: true,
      pathRewrite: {
       "^/wis": ""
      },
   }));

   

};