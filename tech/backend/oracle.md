---
outline: 'deep'
---

# Oracle

## Oracle的一些常见字符集问题

- 获取当前数据库的字符集：`SELECT * FROM NLS_DATABASE_PARAMETERS WHERE PARAMETER = 'NLS_CHARACTERSET';`

- `NLS_LANG`和`NLS_CHARACTERSET`的区别：
  - `NLS_LANG`：当前应用程序（如PL/SQL Developer）的解码格式
  - `NLS_CHARACTERSET`：数据库存储数据的编码格式
  - 两者应保持一致

- 案例：
  - 现状：
    - 数据库A使用`AMERICAN_AMERICA.US7ASCII`编码；
    - 数据库B使用`AMERICAN_AMERICA.AL32UTF8`编码；
    - 从数据库B使用DBLINK查询数据库A的汉字数据产生乱码；
  - 解决办法：
    - 数据库A创建视图，汉字字段使用`UTL_RAW.CAST_TO_RAW`将其转成Hex字符串；
    - 数据库B也创建视图，对Hex字符串再使用`UTL_RAW.CAST_TO_VARCHAR2`转成汉字；
    - 可以正常显示汉字了。

## Oracle SID vs Service Name

A SID is a unique name that uniquely identifies the database instance where as a service name is the Database TNS Alias that is given when users remotely connect to the database. The Service name is recorded in the tnsnames.

## Oracle TNS and tnsnames.ora

Oracle TNS, which stands for Transparent Network Substrate, is a key technology used for connecting to Oracle databases. It essentially acts as a middleman between the client application (like SQL*Plus) and the database server. 

Here's a breakdown of how TNS works:

1. **tnsnames.ora file:** This file, located on the client machine, stores connection information for various Oracle databases in a format understandable by TNS. It acts like an address book, containing aliases (TNS names) that map to the actual connection details like hostname, port, and database name (SID).

2. **TNS Listener:** This is a background service running on the database server. When a client application initiates a connection using a TNS name, the TNS listener on the server receives the request and translates the TNS name into the actual connection details using the tnsnames.ora file.

3. **Connection Establishment:** Once the TNS listener identifies the target database, it establishes a connection between the client application and the appropriate database instance.

In simpler terms, TNS simplifies the connection process by providing a user-friendly alias and handling the underlying communication protocols. You just specify the TNS name, and TNS takes care of finding and connecting to the right Oracle database.

## `tnsnames.ora` vs `listener.ora` vs `sqlnet.ora`

- `tnsnames.ora`:
  - defines aliases for database connection strings used by clients.
  - stored on the client, not necessary if connection string is well defined.

- `listener.ora`:
  - stored on the server to define the TNS services.
  - configures the listener process that listens for incoming connections and forwards them to the database.

- `sqlnet.ora`:
  - controls various network parameters and settings for Oracle Net Services.

A connection string like `jdbc:oracle:thin:@dg.his.tjh.com:1521/orcl`, the `orcl` is the service defined by the server using the `listener.ora` file.

You should always use service name instead of SID to connect to an oracle database.

## Oracle Thin vs Thick mode

TODO


## Oracle Materialized View

### Basics

1. **Creation**: Materialized views are created based on a SELECT query, similar to regular views. You can create a materialized view using the CREATE MATERIALIZED VIEW statement.

2. **Refresh**: The data in a materialized view becomes stale as the underlying base tables change. To keep the materialized view up-to-date, it needs to be refreshed periodically. Oracle supports several refresh methods:
   - Complete Refresh: The materialized view is fully rebuilt from the base tables.
   - Fast Refresh: Oracle uses the changes recorded in materialized view logs to apply incremental changes to the materialized view.
   - Force Refresh: Materialized views based on complex queries may require a force refresh.

3. **Query Rewrite**: One of the key benefits of materialized views is the query rewrite feature. Oracle's query optimizer can transparently rewrite a query to use a materialized view instead of accessing the base tables, if the query rewrite provides a more efficient execution plan.

4. **Build Methods**: Oracle supports two build methods for materialized views:
   - Immediate: The materialized view is populated immediately after creation.
   - Deferred: The materialized view is not populated during creation. It is populated on the first refresh operation.

5. **Types**: Oracle supports several types of materialized views, including:
   - Materialized View Logs: Used to support fast refresh of materialized views.
   - Partition Change Tracking (PCT): Enables fast refresh of materialized views after partition maintenance operations.
   - Cache Clustered Materialized Views: Store the data in a clustered format for faster retrieval.

6. **Usage**: Materialized views are commonly used in data warehousing environments, reporting applications, and scenarios where the same complex queries are executed repeatedly. They can improve query performance by pre-computing and storing the query results.

To summarize, Oracle materialized views are a powerful feature that can significantly improve query performance by pre-computing and storing the results of complex queries. They support various refresh methods, build methods, and types to cater to different use cases and requirements.

### FAQ

#### cannot create a fast refresh materialized view from a complex query

The materialized view must not contain references to non-repeating expressions like SYSDATE and ROWNUM.

The materialized view must not contain references to RAW or LONG RAW data types.

It cannot contain a SELECT list subquery.

It cannot contain analytic functions (for example, RANK) in the SELECT clause.

It cannot contain a MODEL clause.

It cannot contain a HAVING clause with a subquery.

It cannot contain nested queries that have ANY, ALL, or NOT EXISTS.

It cannot contain a [START WITH …] CONNECT BY clause.

It cannot contain multiple detail tables at different sites.

ON COMMIT materialized views cannot have remote detail tables.

Nested materialized views must have a join or aggregate.

Materialized join views and materialized aggregate views with a GROUP BY clause cannot select from an index-organized table.

#### 物化视图会自动刷新吗？

对于没有设置任何参数的物化视图如`CREATE MATERIALIZED VIEW your_materialized_view_name AS SELECT ...`，这种物化视图是不会自动更新的。可以设置以下刷新规则：

1. Manual Refresh

`EXEC DBMS_MVIEW.REFRESH('your_materialized_view_name');`

2. ON COMMIT/DEMAND:

``` sql
CREATE MATERIALIZED VIEW your_materialized_view_name
REFRESH ON COMMIT / DEMAND
AS SELECT ...
```

3. Scheduled Refresh

``` sql
BEGIN
   DBMS_SCHEDULER.create_job (
      job_name        => 'refresh_your_materialized_view',
      job_type        => 'PLSQL_BLOCK',
      job_action      => 'BEGIN DBMS_MVIEW.REFRESH(''your_materialized_view_name''); END;',
      start_date      => SYSTIMESTAMP,
      repeat_interval => 'FREQ=DAILY; INTERVAL=1', -- Adjust as needed
      enabled         => TRUE
   );
END;
```

## Handing deadlocks or resource busy

### Resource busy lock

``` sql
SELECT v.sid, v.SERIAL#, s.SQL_TEXT, s.SQL_FULLTEXT
  FROM V$LOCKED_OBJECT o, V$SESSION v, V$SQL s
 WHERE o.SESSION_ID = v.sid
   and v.sql_id = s.sql_id
   and o.object_id = (SELECT object_id
                        FROM dba_objects
                       WHERE object_name = '住院医嘱表'
                         AND owner = 'SHENJI2024');
```

2. Kill the session

``` sql
ALTER SYSTEM KILL SESSION 'SID,SERIAL#' IMMEDIATE;
```

### Infinite update

1. Find the session

``` sql
SELECT l.sid,
       s.serial#,
       l.type,
       l.id1,
       l.id2,
       l.lmode,
       l.request,
       s.username,
       s.machine
  FROM v$lock l
  JOIN v$session s
    ON l.sid = s.sid
 WHERE l.type IN ('TM', 'TX')
   AND l.id1 =
       (SELECT object_id FROM user_objects WHERE object_name = '表名');
```

2. Kill the session

``` sql
ALTER SYSTEM KILL SESSION 'SID,SERIAL#' IMMEDIATE;
```

### Session marked for kill error

1. Check the status of the session

``` sql
SELECT sid, serial#, status, username, machine
  FROM v$session
 WHERE sid = [sid];
```

If `status` is `KILLED`, then the session is marked for termination but not yet terminated; if no data then it's already killed.

2. The session should be killed after some time. If it remains terminating forever, TODO

## Oracle Job & Scheduler

### Oracle Job VS Scheduler

- Oracle Job is older and has fewer featurs.

### Show all jobs/schedulers

- Show all jobs:

``` sql
SELECT job, -- JOB ID
       log_user, -- LOGIN USER
       last_date, -- last successfully executed date
       next_date, -- next date to execute
       broken, -- normally N. If Y, no attempt is being made to run this job.
       failures, -- How many times has this job started and failed since its last success?
       what -- Body of the anonymous PL/SQL block that this job executes
  FROM dba_jobs j
 where j.LOG_USER = 'DTCHEN'
```

- Show all scheduler jobs:

``` sql
select owner,
       job_name,
       job_action, -- job sql content like 'begin insert...'
       start_date, -- job start date
       repeat_interval,
       enabled,
       auto_drop, -- Whether this job will be dropped when it has completed
       state, -- current state eg. 'SCHEDULED' 
       run_count,
       failure_count,
       last_start_date,
       last_run_duration,
       next_run_date
  from dba_scheduler_jobs
 where owner = 'DTCHEN'
```

### Troubleshoot scheduler failures

- Find logs

``` sql
SELECT log_date, status, additional_info
  FROM dba_scheduler_job_run_details
 WHERE job_name = 'YOUR_JOB_NAME'
 ORDER BY log_date DESC;
```
