---
outline: 'deep'
---

# 博客程序Flarum

![Flarum Logo](/images/flarum-logo.png)

## 安装（Linux）

### 1. 安装Apache/Nginx、PHP 7.3+、MySQL 5.6+/8.0.23+

略

### 2. 安装Composer

[:point_right: 官网教程](https://getcomposer.org/download/)

如果服务器可以访问外网，直接运行以下命令：

``` shell
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

如果服务器是内网，先设置外网代理，然后运行：
``` shell
wget https://getcomposer.org/installer
mv installer composer-setup.php
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

然后将`compmoser.phar`移动至`bin`目录下：
``` shell
sudo mv composer.phar /usr/local/bin/composer
```


### 3. 创建Flarum安装文件

在`/var/wwww/`目录下创建`flarum`目录并在该文件夹内初始化flarum程序包：

``` bash
cd /var/www
mkdir flarum
cd flarum
composer create-project flarum/flarum .
chmod -R 777 /var/wwww/flarum # 后面Flarum会写入一些文件，因此要放开权限
```

### 4. 配置PHP

安装php（版本要求7.3以上，过程略）

安装php-fpm(FastCGI Process Manager)，从而使php页面可以正常解析：

``` bash
sudo yum install php-fpm
```

安装php-mbstring扩展：

``` bash
sudo yum install php-mbstring
```




安装php-mysqli扩展：
``` bash
sudo yum install php-mysqli
```
一般而言，php会自带mysqlnd，mysqlnd包含mysqli，已经不需要安装mysqli了。




启用mbstring：

``` bash
# /etc/php.ini
# 增加：
extension=mbstring
```

### 5. 配置Nginx

查看php-fpm的配置，找到listen的地址：

``` conf
# /etc/php-fpm.d/www.conf
# 找到此行，具体的listen地址可能根据版本而不同
listen = 127.0.0.1:9000
```


修改nginx.conf: 
  1. 将nginx的webroot指向Flarum的`public`目录
  2. 默认页面增加`index.php`
  3. 将php页面用php-fpm解析

``` conf
# /etc/nginx/nginx.conf
server {
    listen       80;
    listen       [::]:80;
    server_name  _;

    # 1. 将nginx的webroot指向Flarum的public目录
    root /var/www/flarum/public;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    error_page 404 /404.html;
    location = /404.html {
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    }

    # 2. 默认页面增加index.php：
    location / {
        index index.php index.html;
        try_files $uri $uri/ = 404;
    }

    # 3. 将php页面用php-fpm解析
    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass 127.0.0.1:9000;
    }

```

然后重启nginx:

``` shell
service nginx restart
```

### 6. 配置防火墙

添加80端口至防火墙并重启防火墙：

``` shell
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --reload
```

查看80端口是否已添加至防火墙规则：

``` shell
firewall-cmd --list-ports
```

### 7. 安装MariaDB

MariaDB原本是MySQL的一个分支，后独立出来。性能等各方面略优于MySQL。

安装MariaDB:

``` bash
sudo yum install mariadb-server
```

开放端口：

``` bash
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload
```

允许外部连接，修改`/etc/my.cnf`并添加如下至`[mysqld]`部分：

```
bind-address=0.0.0.0
```

配置用户：

``` bash
# root用户默认没有密码，配置一个先：
sudo mysqladmin -u root password '[新密码]'
# 登录mariadb
mylsql -u root -p
# 创建用户，%表示可以从任意主机连接（若为localhost则表示只能本地连接了）
create user 'flarum'@'%' identified by 'flarum123';
# 创建数据库
create database flarum;
# 授权
grant all privileges on flarum.* to 'flarum'@'%';
# 刷新
flush privileges;
```

启用服务：

``` bash
sudo systemctl start mariadb
sudo systemctl enable mariadb
```


### 8. 配置Flarum

访问nginx配置的地址，开始配置Flarum。