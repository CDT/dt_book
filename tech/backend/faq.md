# Frequently Asked Questions

## 如何加密用户存储的密码？

First off, do not use algorithms like `MD5` or `SHA-1` due to their vulnerabilities to attacks such as rainbow tables and brute force.

There are some modern cryptographic algorithms specifically designed for password hashing, such as:
  - **brypt:** A widely recommended choice for password hashing due to its adaptive nature.
  - **Argon2:** Winner of Password Hashing Competition and one of the best choices for password hashing.

In addition to employing a robust algorithm, it is advisable to append a random string(commonly referred to as 'salt') to the password before hashing it.

## 对于RDBMS而言，是INTEGER还是VARCHAR做主键更好？

In general, using an integer data type for a unique ID in a relational database management system (RDBMS) is preferable over using a varchar data type. Here's why:

1. **Efficiency**: Integers are more efficient in terms of storage and indexing compared to varchars. Integer data types typically require less storage space compared to varchar data types, especially when you have a large number of records. This can lead to better performance in terms of disk space usage and query execution time.

2. **Indexing**: Integers can be indexed more efficiently than varchars. Indexing is crucial for speeding up search operations in the database. Since integers have a fixed length, indexing them is faster and more efficient compared to indexing varchars, which have variable lengths.

3. **Data Integrity**: Using integers for unique IDs helps to ensure data integrity because it restricts the type of data that can be stored in the ID field. With integers, you can easily enforce constraints such as primary key constraints, which ensure that each ID is unique and not null.

4. **Sorting and Comparison**: Integers are inherently sortable and comparable, making it easier to perform operations like sorting records or comparing IDs in queries. This can simplify query logic and improve performance in scenarios where sorting or comparison operations are common.

However, there might be specific cases where using a varchar for unique IDs could be justified. For instance, if the unique ID needs to include non-numeric characters or if it's derived from an external system that provides alphanumeric identifiers. In such cases, you may choose to use varchars but be aware of the potential performance and storage implications.