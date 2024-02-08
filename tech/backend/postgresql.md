---
outline: 'deep'
---
# PostgreSQL

![PostgreSQL](/images/postgresql.webp)


## 安装

### CentOS 7

::: warning
请注意，PostgreSQL16之后已经不再在RHEL 7上发布安装包了:

EOL announcement for RHEL 7

PostgreSQL RPM repo stopped adding new packages to the PostgreSQL RPM repo as of Aug 2023, including PostgreSQL 16.

We will maintain older major releases until each major release is EOLed by PostgreSQL project. Please visit here for latest release dates for each major release.

If you have any questions, please either email to pgsql-pkg-yum@lists.postgresql.org, or create a ticket at our redmine.
:::


PostgreSQL根据不同的系统架构和版本，安装方法不同。具体安装方法参考[官网文档](https://www.postgresql.org/)。

以x86_64架构CPU的CentOS 7.9系统，PostgreSQL 15为例，安装命令如下：

``` bash
# 添加仓库:
sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# 安装数据库
sudo yum install -y postgresql15-server

# 初始化数据库，并启用服务
sudo /usr/pgsql-15/bin/postgresql-15-setup initdb
sudo systemctl enable postgresql-15
sudo systemctl start postgresql-15
```

::: tip

安装数据库若提示`no package postgresql 15-server available`之类的错误的时候，很有可能是仓库没有添加成功。

用`sudo yum repolist`查看是否存在包含`pgdg`字样的仓库名存在，若不存在则运行以下命令清理仓库并重新添加仓库：

``` bash
sudo yum remove pgdg-redhat-repo
sudo yum clean all
```
:::

修改配置文件，在`0.0.0.0`上监听：

``` bash
sudo vim /var/lib/pgsql/15/data/postgresql.conf
# Find and listen_address parameter and change it to:
listen_addresses = '*'
```

修改配置文件，允许所有IP的所有权限：

``` bash
sudo vim /var/lib/pgsql/15/data/pg_hba.conf
# 找到 host all all 127.0.0.1/32，修改127.0.0.1/32为0.0.0.0/0
host all all 0.0.0.0/0 [原加密方法不变]
```

设置`postgres`账号的密码（也可以创建其他账号，同理）：

``` bash
su postgres
psql
ALTER USER postgres PASSWORD '[密码]'
```

重启PostgreSQL:

``` bash
sudo systemctl restart postgresql-15.service
```

防火墙要开放端口供外部连接：

``` bash
firewall-cmd --permanent --add-port=5432/tcp
firewall-cmd --reload
````

## 管理工具：pgAdmin

[pgAdmin官网](https://www.pgadmin.org/)

### pgAdmin 4 Docker镜像安装

[pgAdmin 4 Docker镜像地址](https://hub.docker.com/r/dpage/pgadmin4/)

拉取镜像：

``` bash
docker pull dpage/pgadmin4
```

运行镜像：

``` bash
docker run -p 80:80 \
    -e 'PGADMIN_DEFAULT_EMAIL=user@domain.com' \
    -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret' \
    -d dpage/pgadmin4
```

### pgAdmin 4 Docker配置文件

运行`docker exec -it [image_name] sh`进入镜像内部shell，默认路径下有两个文件：

  - `config.py`: General configuration file for pgAdmin 4.
  - `config_distro.py`:  Settings specified by [docker environment variables PGADMIN_CONFIG_*](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html)。

下面是`config.py`中日志文件相关配置：

``` python
##########################################################################
# Log settings
##########################################################################

# Debug mode?
DEBUG = False

# Application log level - one of:
#   CRITICAL 50
#   ERROR    40
#   WARNING  30
#   SQL      25
#   INFO     20
#   DEBUG    10
#   NOTSET    0
CONSOLE_LOG_LEVEL = logging.WARNING
FILE_LOG_LEVEL = logging.WARNING

# Log format.
CONSOLE_LOG_FORMAT = '%(asctime)s: %(levelname)s\t%(name)s:\t%(message)s'
FILE_LOG_FORMAT = '%(asctime)s: %(levelname)s\t%(name)s:\t%(message)s'

# Log file name. This goes in the data directory, except on non-Windows
# platforms in server mode.
if SERVER_MODE and not IS_WIN:
    LOG_FILE = '/var/log/pgadmin/pgadmin4.log'
else:
    LOG_FILE = os.path.join(DATA_DIR, 'pgadmin4.log')

# Log rotation setting
# Log file will be rotated considering values for LOG_ROTATION_SIZE
# & LOG_ROTATION_AGE. Rotated file will be named in format
# - LOG_FILE.Y-m-d_H-M-S
LOG_ROTATION_SIZE = 10  # In MBs
LOG_ROTATION_AGE = 1440  # In minutes
LOG_ROTATION_MAX_LOG_FILES = 90  # Maximum number of backups to retain
```

请注意`config.py`无法直接修改，如果要修改配置，[需要使用环境变量`PGADMIN_CONFIG_*`来替换`config.py`中对应的配置](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html)。环境变量中修改的配置会存储在`config_distro.py`中。

例子：

``` bash
docker run -p 888:80 \
    -e 'PGADMIN_DEFAULT_EMAIL=779888925@qq.com' \
    -e 'PGADMIN_DEFAULT_PASSWORD=86915998' \
    -e 'PGADMIN_SERVER_JSON_FILE=/root/servers.json'
    -e 'PGADMIN_CONFIG_CONSOLE_LOG_LEVEL=30' \
    -e 'PGADMIN_CONFIG_FILE_LOG_LEVEL=30' \
    -d dpage/pgadmin4
```

日志级别如下：

```
#   CRITICAL 50
#   ERROR    40
#   WARNING  30
#   SQL      25
#   INFO     20
#   DEBUG    10
#   NOTSET    0
```

::: danger 日志文件到底在哪？

我到现在仍然无法找到docker版本的日志文件的地址，但是可以找到命令行日志，方法如下：

1. 开启命令行日志：启动docker时添加环境变量`PGADMIN_CONFIG_FILE_LOG_LEVEL=10`

2. 打开docker日志：
``` bash
docker logs [image_name] -f
```
:::

### 运行Docker

``` bash
docker run -p 888:80 \
    -e 'PGADMIN_DEFAULT_EMAIL=779888925@qq.com' \
    -e 'PGADMIN_DEFAULT_PASSWORD=86915998' \
    -e 'PGADMIN_CONFIG_LOGIN_BANNER="Authorised users only!"' \
    -e 'PGADMIN_CONFIG_CONSOLE_LOG_LEVEL=10' \
    -e 'PGADMIN_CONFIG_FILE_LOG_LEVEL=10' \
	-v /root/servers.json:/pgadmin4/servers.json \
    dpage/pgadmin4
```

这里将容器的`/pgadmin4/servers.json`映射到本地的`/root/servers.json`中。`servers.json`预定义了服务器连接，不需要手动再录入一遍，下面是一个简单版本的`servers.json`：

``` json
{
    "Servers": {
        "1": {
            "Name": "Minimally Defined Server 1",
            "Group": "Server Group 1",
            "Port": 5432,
            "Username": "postgres",
            "Host": "localhost",
            "SSLMode": "prefer",
            "MaintenanceDB": "postgres"
        },
        "2": {
            "Name": "Minimally Defined Server 2",
            "Group": "Server Group 1",
            "Port": 5432,
            "Username": "postgres",
            "Host": "192.168.1.101",
            "SSLMode": "prefer",
            "MaintenanceDB": "postgres"
        }
    }
}
```

## FAQ

### What is the maintenance database?

The maintenance database in PostgreSQL is a system database used for managing and maintaining the PostgreSQL server itself. 

- It is created automatically when PostgreSQL is installed and cannot be dropped.

- The default name is 'postgres' but can be renamed during initialization with the --maintenance-db option.

- It contains objects like tables, views, functions etc used by the server for internal tasks. Some examples:

    - pg_catalog - System tables and views exposing metadata about objects in all databases.

    - information_schema - Standard SQL information schema views.

    - pg_statistic - Table tracking statistics used by the query planner.

- By default, only the postgres superuser account can connect to the maintenance db. It contains no user objects.

- Critical server tasks like Vacuuming, Analyzing, Logging happen through maintenance_work tables in this database. 

- It is advisable not to modify objects in the maintenance db unless you fully understand the implications. Changes may cause instability.

So in summary, the postgresql maintenance database is a dedicated system database used internally by the PostgreSQL server for management and maintenance tasks. It is created at installation time and should generally not be modified directly.