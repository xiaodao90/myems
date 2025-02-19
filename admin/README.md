# myems-admin

## Introduction
系统管理用户界面，用于MyEMS系统配置
Providing Admin UI  for MyEMS system settings

## Prerequisites
nginx-1.18.0 or later


## Installation

### Option 1: Install myems-admin on Docker

In this section, you will install myems-admin on Docker.

* Build a Docker image
```bash
cd myems/admin
docker build -t myems/myems-admin .
```
* Run a Docker container
```bash
docker run -d -p 8001:8001 --restart always --name myems-admin myems/myems-admin
```

-d		Run container in background and print container ID

-p		Publish a container's port(s) to the host, 8001:8001 (Host:Container) binds port 8001 (right)  of the container to TCP port 8001 (left) of the host machine.

--restart	Restart policy to apply when a container exits

--name		Assign a name to the container

## Option 2: Install on NGINX Server

* Install NGINX Server

refer to http://nginx.org/en/docs/install.html

* Configure NGINX
```bash
sudo nano /etc/nginx/nginx.conf
```
In the 'http' section, add some directives:
```
http{
    client_header_timeout 600;
    client_max_body_size 512M;
    gzip on;
    gzip_min_length 512;
    gzip_proxied any;
    gzip_types *;
    gzip_vary on;
    ...

}
```

Add a new 'server' section with direstives as below:
```
  server {
      listen                 8001;
      server_name     myems-admin;
      location / {
          root    /var/www/html/admin;
          index index.html index.htm;
      }
      -- To avoid CORS issue, use Nginx to proxy myems-api to path /api 
      -- Add another location /api in 'server ', replace demo address http://127.0.0.1:8000/ with actual url
      location /api {
          proxy_pass http://127.0.0.1:8000/;
          proxy_connect_timeout 75;
          proxy_read_timeout 600;
          send_timeout 600;
      }
  }
```

* Install myems-admin :
  If the server can not connect to the internet, please compress the myems/admin folder and upload it to the server and extract it to ~/myems/admin
```bash
sudo cp -r myems/admin  /var/www/html/admin
sudo chmod 0755 -R /var/www/html/admin
```
  Check the config file and change it if necessary:
```bash
sudo nano /var/www/html/admin/app/api.js
```

## NOTE:
The 'upload' folder is for user uploaded files. DO NOT delete/move/overwrite the 'upload' folder when you upgraded myems-admin.
```bash
 /var/www/html/admin/upload
```


## Option 3: Install on Apache2 Server
* Install Apache2 Server

refer to https://httpd.apache.org/docs/2.4/install.html

* Configure Apache2
```bash
  sudo vi /etc/apache2/ports.conf
```
Add a Listen
```
Listen 8001
```
```bash
sudo vi /etc/apache2/sites-available/000-default.conf
```
Add a new 'VirtualHost' as below
```xml
<VirtualHost 127.0.0.1:8001>
        ServerAdmin MyEMS-admin
        DocumentRoot /var/www/admin
        
        <Directory "var/www/admin">
                Options FollowSymLinks
                AllowOverride All
                Require all granted
        </Directory>
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

* Install myems-admin :
  If the server can not connect to the internet, please compress the myems/admin folder and upload it to the server and extract it to ~/myems/admin
```bash
sudo cp -r myems/admin  /var/www/html/admin
sudo chmod 0755 -R /var/www/html/admin
```
  Check the config file and change it if necessary:
```bash
sudo nano /var/www/html/admin/app/api.js
```


## References

1.  https://myems.io
2.  https://dev.mysql.com/doc/connector-python/en/
3.  https://nginx.org/