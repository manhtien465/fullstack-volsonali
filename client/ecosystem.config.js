module.exports = {
  apps: [
    {
      name: "megagamefun.org",              // tên app hiển thị trong PM2
      script: "node_modules/next/dist/bin/next", // chạy Next.js CLI
      args: "start -p 2346",           // cổng chạy (3000 mặc định)
      cwd: "./",                       // thư mục hiện tại (project root)
      instances: "1",                // chạy cluster theo số CPU core
      exec_mode: "cluster",            // chạy dạng cluster
      watch: false,                    // tắt watch trong production
      autorestart: true,               // restart nếu crash
      env: {
        NODE_ENV: "production",
        PORT: 2346
      }
    }
  ]
};
