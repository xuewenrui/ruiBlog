---
title: 部署 Flask 和 React 网站到阿里云 ECS
date: 2025-04-02 10:00:00
tags: [部署, Flask, React, 阿里云]
categories: [教程]
index_img: /img/index/ecs.png
banner_img: /img/deploy/banner.png
---

# 阿里云 ECS 部署 Flask + React 全栈指南

![Deployment Architecture](https://example.com/deploy-arch.png)  
*(示意图：前后端分离架构部署流程)*

## 一、服务器初始化配置
### 1.1 购买与连接服务器
1. 阿里云控制台创建 ECS 实例（推荐 Ubuntu 22.04）
2. 开放安全组端口：`22(SSH)`, `80(HTTP)`, `443(HTTPS)`
3. 使用 SSH 连接服务器：

```bash
ssh root@your_server_ip
```

### 1.2 系统更新与基础工具
```bash
apt update && apt upgrade -y
apt install git vim ufw -y
```

## 二、环境搭建
### 2.1 Python 环境（Flask 后端）
```bash
apt install python3-pip python3-venv -y
python3 --version  # 验证安装
```

### 2.2 Node.js 环境（React 前端）
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install nodejs -y
node -v && npm -v  # 验证版本
```

### 2.3 Nginx 安装
```bash
apt install nginx -y
systemctl start nginx
```

## 三、后端部署（Flask）
### 3.1 项目上传与依赖安装
```bash
git clone https://github.com/yourname/flask-api.git
cd flask-api

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3.2 Gunicorn 配置
创建 `gunicorn_config.py`：
```python
bind = "0.0.0.0:5000"
workers = 3
timeout = 120
```

### 3.3 Supervisor 进程守护
安装配置：
```bash
apt install supervisor -y
vim /etc/supervisor/conf.d/flask-api.conf
```

配置文件内容：
```ini
[program:flask-api]
command=/root/flask-api/.venv/bin/gunicorn -c gunicorn_config.py app:app
directory=/root/flask-api
autostart=true
autorestart=true
stderr_logfile=/var/log/flask-api.err.log
stdout_logfile=/var/log/flask-api.out.log
```

启动服务：
```bash
supervisorctl reread
supervisorctl update
supervisorctl start flask-api
```

## 四、前端部署（React）
### 4.1 构建生产包
本地开发环境执行：
```bash
npm run build
```

### 4.2 上传文件到服务器
```bash
scp -r build/* root@your_server_ip:/var/www/html
```

### 4.3 Nginx 高级配置
`/etc/nginx/sites-available/default` 完整配置：
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /static {
        expires 365d;
        add_header Cache-Control "public";
    }
}
```

重载配置：
```bash
nginx -t && systemctl reload nginx
```

## 五、HTTPS 强化配置
### 5.1 Let's Encrypt 证书
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5.2 自动维护
```bash
echo "0 3 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

## 六、安全加固
...

## 九、故障排查指南
...
