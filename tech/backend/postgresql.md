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
```

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