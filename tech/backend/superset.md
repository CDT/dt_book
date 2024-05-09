# Superset

## Docker installation

[Docker page](https://hub.docker.com/r/apache/superset)

1. Start an instance:

``` sh
docker run -d -p 8080:8088 -e "SUPERSET_SECRET_KEY=your_secret_key_here" --name superset apache/superset
```

e.g.

``` sh
docker run -d -p 8080:8088 -e "SUPERSET_SECRET_KEY=86915998" --name superset apache/superset
```

2. Init an instance:

Setup admin account:

``` sh
docker exec -it superset superset fab create-admin --username admin --firstname Superset --lastname Admin --email admin@superset.com --password admin
```

e.g.

``` sh
docker exec -it superset superset fab create-admin --username admin --firstname Superset --lastname Admin --email cdt86915998@gmail.com --password 86915998
```

3. Others

``` sh
docker exec -it superset superset db upgrade
```

``` sh
docker exec -it superset superset load_examples
```

``` sh
docker exec -it superset superset init
```

4. Extending image:

The default superset image contains only the base Superset build, excluding database drivers that you will need to connect to your analytics DB (MySQL, Postgres, BigQuery, Snowflake, Redshift, etc.) This is deliberate as many of these drivers do not have Apache-compatible license, and we do not want to bloat the image with packages you do not need in your environment.

We do recommend that you write a simple docker file based on this image. Here's what it may look like:

``` sh
FROM apache/superset
# Switching to root to install the required packages
USER root
# Example: installing the MySQL driver to connect to the metadata database
# if you prefer Postgres, you may want to use `psycopg2-binary` instead
RUN pip install mysqlclient
# Example: installing a driver to connect to Redshift
# Find which driver you need based on the analytics database
# you want to connect to here:
# https://superset.apache.org/installation.html#database-dependencies
RUN pip install sqlalchemy-redshift
# Switching back to using the `superset` user
USER superset
```