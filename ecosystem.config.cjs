module.exports = {
  apps: [
    {
      name: 'no-smoking-app',
      script: 'npm',
      args: 'run preview -- --host 0.0.0.0 --port 4173',
      cwd: '/home/ubuntu/no-smoking',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        PORT: 4173
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: '/home/ubuntu/.pm2/logs/no-smoking-app-error.log',
      out_file: '/home/ubuntu/.pm2/logs/no-smoking-app-out.log',
      log_file: '/home/ubuntu/.pm2/logs/no-smoking-app-combined.log',
      time: true
    }
  ]
};