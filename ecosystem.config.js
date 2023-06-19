module.exports = {
  apps : [{
    name: 'wx-server',
    script: './src/server.js',
    watch: true,
    "ignore_watch": ["node_modules", 'testDB.db'],// 不用监听的文件
    "watch_options": {
      "usePolling": true //有时候监听会失效，那么加上这个watch配置项
    },
    env: {
      NODE_ENV: 'development'
    },
    env_development: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
    }
  }
};
