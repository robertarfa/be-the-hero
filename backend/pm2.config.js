module.exports = {
  apps: [
    {
      name: 'Be The Hero',
      script: './dist/server.js',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
