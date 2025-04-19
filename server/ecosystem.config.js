module.exports = {
    apps: [
      {
        name: 'strapi-app', // Name of your application in PM2
        script: 'npm', // Use npm to run the start script
        args: 'start', // Runs `npm start` (for production)
        cwd: './', // Current working directory (root of your Strapi project)
        instances: 1, // Number of instances (use 'max' for cluster mode, but Strapi may need single instance)
        exec_mode: 'fork', // Fork mode is typically used for Strapi (cluster mode may cause port conflicts)
        autorestart: true, // Restart app if it crashes
        watch: false, // Set to true in development to restart on file changes
        max_memory_restart: '1G', // Restart if memory usage exceeds 1GB
      },
    ],
  };