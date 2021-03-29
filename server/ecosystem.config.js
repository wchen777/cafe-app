module.exports = {
  apps : [{
    name: 'Cafe',
    script: 'index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 0, // launch the maximum processes possible according to the numbers of CPUs (cluster mode)
    autorestart: true,
    watch: false,
    ignore_watch : ["node_modules", "[\/\\]\./"],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'https://github.com/wchen777/cafe-app',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
