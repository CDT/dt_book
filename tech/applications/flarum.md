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


### 3. 创建Flarum并配置Nginx

创建`flarum`文件夹并在该文件夹内初始化flarum程序包：

``` shell
mkdir flarum
composer create-project flarum/flarum .
```

创建完成后，文件夹内应该有了一个`public`目录，将nginx的webroot指向该文件夹：

```
// /etc/nginx/nginx.conf
server {
  root [flarum的public目录，例如/root/flarum/public]；
}
```

然后重启nginx:

``` shell
service nginx restart
```

确保外部可以访问本机80端口：

``` shell
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --reload
```

查看80端口是否已添加至防火墙规则：

``` shell
firewall-cmd --list-ports
```