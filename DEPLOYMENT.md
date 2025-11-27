# Deployment Guide - jmchilton.net

## Server: Ubuntu 24 on Linode

### 1. Initial Server Setup (as root)

```bash
# Update system
apt update && apt upgrade -y

# Create deploy user (avoid deploying as root)
adduser deploy
usermod -aG sudo deploy

# Setup SSH for deploy user
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

### 2. Install nginx

```bash
apt install nginx -y
systemctl enable nginx
systemctl start nginx
```

### 3. Create Web Directory

```bash
mkdir -p /var/www/jmchilton.net
chown -R deploy:deploy /var/www/jmchilton.net
```

### 4. Configure nginx

```bash
# Create site config
cat > /etc/nginx/sites-available/jmchilton.net << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name jmchilton.net www.jmchilton.net;
    root /var/www/jmchilton.net;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Cache static assets
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ =404;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/jmchilton.net /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload
nginx -t && systemctl reload nginx
```

### 5. Setup SSL with Let's Encrypt

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d jmchilton.net -d www.jmchilton.net
```

Follow prompts - certbot will auto-configure nginx for HTTPS.

### 6. Firewall (optional but recommended)

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

---

## Local Deployment (from your machine)

### First-time setup

Test SSH access:

```bash
ssh deploy@jmchilton.net
```

### Deploy commands

```bash
# Build site
npm run build

# Dry run (see what would transfer)
rsync -avzn dist/ deploy@jmchilton.net:/var/www/jmchilton.net/

# Actual deploy
rsync -avz --delete dist/ deploy@jmchilton.net:/var/www/jmchilton.net/
```

Or use the Makefile:

```bash
make deploy
```

---

## Troubleshooting

### Check nginx status

```bash
ssh deploy@jmchilton.net "sudo systemctl status nginx"
```

### View nginx error logs

```bash
ssh deploy@jmchilton.net "sudo tail -f /var/log/nginx/error.log"
```

### Test nginx config

```bash
ssh deploy@jmchilton.net "sudo nginx -t"
```

### Verify files deployed

```bash
ssh deploy@jmchilton.net "ls -la /var/www/jmchilton.net/"
```

---

## Quick Reference

| Item         | Value                                    |
| ------------ | ---------------------------------------- |
| Server       | Linode Ubuntu 24                         |
| Domain       | jmchilton.net                            |
| Deploy user  | deploy                                   |
| Web root     | /var/www/jmchilton.net                   |
| nginx config | /etc/nginx/sites-available/jmchilton.net |
