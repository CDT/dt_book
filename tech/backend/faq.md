# Frequently Asked Questions

## 如何加密用户存储的密码？

First off, do not use algorithms like `MD5` or `SHA-1` due to their vulnerabilities to attacks such as rainbow tables and brute force.

There are some modern cryptographic algorithms specifically designed for password hashing, such as:
  - **bcrypt:** A widely recommended choice for password hashing due to its adaptive nature.
  - **Argon2:** Winner of Password Hashing Competition and one of the best choices for password hashing.

In addition to employing a robust algorithm, it is advisable to append a random string(commonly referred to as 'salt') to the password before hashing it.

Read more:

[How to safely store a password](https://codahale.com/how-to-safely-store-a-password/)

### Should I hash the password on the frontend?

1. [Is it ok to send plain text password over https?](https://security.stackexchange.com/questions/110415/is-it-ok-to-send-plain-text-password-over-https)

**It is standard practice to send "plaintext" passwords over HTTPS.** The passwords are ultimately not plaintext, since the client-server communication is encrypted as per TLS.

Encrypting the password before sending it in HTTPS doesn't accomplish much: if the attacker got their hands on the encrypted password they could simply use it as if it were the actual password, the server wouldn't know the difference. **The only advantage it would provide is protecting users that use the same password for multiple sites, but it wouldn't make your site any safer.**

2. [How do you protect the plaintext in transit?](https://security.stackexchange.com/questions/234506/if-hashing-should-occur-server-side-how-do-you-protect-the-plaintext-in-transit)

To summarize: Use TLS/SSL to protect your password. TLS/SSL is the foundation of your website security, if it is breached, then reading your password is the least of your worries.

3. [Client side password hash versus plain text](https://stackoverflow.com/questions/30723211/client-side-password-hash-versus-plain-text)

**Most websites will send the password plain-text over an encrypted connection SSL/HTTPS.**

This is what I would do: For easiness send the password plain-text over an encrypted SSL/HTTPS connection and calculate the slow BCrypt hash server side.


### bcrypt算法

[Wikipedia Bcrypt](https://en.wikipedia.org/wiki/Bcrypt)

[bcrypt.js](https://www.npmjs.com/package/bcrypt)

- `bcrypt` is a password-hashing function which incorporates a salt and is adaptive.
- `bcrypt` is resistant to brute-force search and rainbow table attacks.


[Do I need to store the salt with bcrypt?](https://stackoverflow.com/questions/277044/do-i-need-to-store-the-salt-with-bcrypt)

The salt is incorporated into the hash (encoded in a base64-style format).

For example, in traditional Unix passwords the salt was stored as the first two characters of the password. The remaining characters represented the hash value. The checker function knows this, and pulls the hash apart to get the salt back out.

## 对于RDBMS而言，是INTEGER还是VARCHAR做主键更好？

In general, using an integer data type for a unique ID in a relational database management system (RDBMS) is preferable over using a varchar data type. Here's why:

1. **Efficiency**: Integers are more efficient in terms of storage and indexing compared to varchars. Integer data types typically require less storage space compared to varchar data types, especially when you have a large number of records. This can lead to better performance in terms of disk space usage and query execution time.

2. **Indexing**: Integers can be indexed more efficiently than varchars. Indexing is crucial for speeding up search operations in the database. Since integers have a fixed length, indexing them is faster and more efficient compared to indexing varchars, which have variable lengths.

3. **Data Integrity**: Using integers for unique IDs helps to ensure data integrity because it restricts the type of data that can be stored in the ID field. With integers, you can easily enforce constraints such as primary key constraints, which ensure that each ID is unique and not null.

4. **Sorting and Comparison**: Integers are inherently sortable and comparable, making it easier to perform operations like sorting records or comparing IDs in queries. This can simplify query logic and improve performance in scenarios where sorting or comparison operations are common.

However, there might be specific cases where using a varchar for unique IDs could be justified. For instance, if the unique ID needs to include non-numeric characters or if it's derived from an external system that provides alphanumeric identifiers. In such cases, you may choose to use varchars but be aware of the potential performance and storage implications.

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

## yarn 安装包时报“certificate has expired”

`yarn config set strict-ssl false`

