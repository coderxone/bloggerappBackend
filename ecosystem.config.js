module.exports = {
  apps : [{
    name: 'nobody',
    script: './nobody.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    cron_restart: '0 4 * * *',
    watch: ["server","nobody"],
    watch_delay: 5000,
    ignore_watch : ["node_modules","images"],
    max_memory_restart: '700M',
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
      host : '145.249.246.3',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
