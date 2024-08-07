---
outline: 'deep'
---
# Nginx & Apache

![Nginx VS Apache](/images/nvsa.webp)


**Apache** and **Nginx** are two of the **most popular open-source web servers** used to deliver web pages to a user's browser. Apache is a versatile and widely used web server, while Nginx is a high-performance **reverse proxy** server that generally provides **better performance** and scalability than Apache, especially under high traffic loads.


## Comparison

| **Feature** | **Apache** | **Nginx** |
|:-------------:|:------------:|:-----------:|
| **Architecture** | Process-based and threaded | Event-driven (asynchronous) |
| **Connection Handling** | One thread per connection | One thread handles multiple connections |
| **Configuration** | Complex configuration files | Simple configuration files |
| **Performance** | Slower for static content | Faster for static content |
| **Memory Usage** | Higher memory usage | Lower memory usage |
| **Modules** | Large number of modules | Fewer modules |
| **Compatibility** | Works well with most applications | May require additional configuration |
| **Security** | More vulnerabilities | Fewer vulnerabilities |

### When should I use Apache instead of Nginx?

Both Apache and Nginx are popular web servers, but each has its own strengths and weaknesses. Choosing the right one depends on your specific needs and priorities. Here's a breakdown to help you decide:

**Use Apache if:**

* **You need to handle complex dynamic content:** Apache excels at processing scripts like PHP, Perl, and Python directly, without needing additional software. This makes it a good choice for websites with a lot of dynamic functionality.
* **You require fine-grained control:** Apache offers extensive configuration options and module support, allowing you to tailor the server to your specific needs. You can use the .htaccess file to configure individual directories, which can be helpful for shared hosting environments.
* **You have a large community of users:** Apache has been around for a long time and boasts a vast community of users and developers. This means you'll find plenty of resources and support available online.
* **You need more modules:** Apache has been around for a longer time, and as a result, it has a larger number of modules available. If your web server setup requires specific modules that are only available for Apache, that might be a reason to choose Apache.

**Use Nginx if:**

* **Performance is your top priority:** Nginx is generally considered faster and more efficient than Apache when it comes to serving static content, like images and HTML files. This makes it a good choice for high-traffic websites.
* **Serving static content is your major task :** Nginx is particularly efficient at serving static content. If your application involves a significant amount of static files (like images, CSS, or JavaScript), Nginx can be a good fit.
* **You need a simpler configuration:** Nginx has a more minimalistic configuration syntax compared to Apache, which can be easier to learn and manage for beginners.
* **You want a more scalable solution:** Nginx's event-driven architecture allows it to handle a large number of concurrent connections efficiently, making it a good choice for websites that experience traffic spikes.
* **Young want reverse proxy:** Nginx excels at serving as a reverse proxy server. If you need to distribute incoming traffic across multiple servers, handle SSL termination, or perform other proxy-related tasks, Nginx is a strong option.

Here are some additional factors to consider:

* **Operating system:** Both Apache and Nginx are available on most platforms, but there might be subtle differences in compatibility and performance depending on your specific OS.
* **Cost:** Both servers are open-source and free to use, but the cost of hosting and managing them can vary depending on your needs and technical expertise.
* **Your existing infrastructure:** If you already have experience with one server, it might be easier to stick with it for consistency and ease of management.

Ultimately, the best way to choose between Apache and Nginx is to evaluate your specific needs and priorities. You can also consider a hybrid approach, using Nginx for static content serving and Apache for dynamic content processing.

## Nginx

### Basic operations

- Start nginx: run the binary file. For windows it's `nginx.exe` under nginx root directory.

- Control nginx:

``` bash
# -s stands for signal
nginx -s stop # fast shutdown
nginx -s quit # graceful shutdown:
nginx -s reload # reloading configuration file
nginx -s reopen # reopening the log files
```

"Graceful shutdown" means to stop nginx processes with waiting for the worker processes to finish serving current requests.

### Configuration

- **Structure:**

``` nginx
# Main context - Global settings
# user directive, which is a simple directive
user www-data;  # Runs worker processes as this user
worker_processes auto; # Number of worker processes

# events directive, which is a block directive, also called a context
events {
  # worker_connections directive, which is a simple directive, 
  # contained in a block directive
  worker_connections 768; # Max connections per worker process
}

http {

  # MIME types 
  include mime.types;

  # Logging
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  # Server blocks
  server {

    # Listens on port 80 for requests to example.com
    listen 80; 
    server_name example.com;

    # Document root directory
    root /var/www/example.com;

    # Default index file
    index index.html;

    location / {
      # Handles requests to document root
      try_files $uri $uri/ =404; 
    }

    location /images/ {
      # Handles requests for images
      try_files $uri $uri/ =404;
    }

  }

  # Another server block
  server {
    listen 80;
    server_name example.org;

    root /var/www/example.org;
    index index.htm;

    # ...
  }

}
```

### Modules

- Nginx is designed as a container of modules. There are two types of modules:
  - **Core modules.** These are modules that are shipped with the nginx distribution. For example, `http` and `events` module.
  - **Third party modules.** These are modules developed by the community and not built-in modules. For example, `ngx_pagespped`.

### Virtual Hosts

With virtual hosts, you can serve multiple sites on a single server. Aka, server blocks.

Demo multiple server blocks configuration:

``` nginx
# Nginx will determine which server block to use based on the 
# server_name directive and the requested domain in the HTTP request.

# Server 1:
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        # Configuration for example.com
    }
}

# Server 2:
server {
    listen 80;
    server_name another-domain.com;

    location / {
        # Configuration for another-domain.com
    }
}

# Default server:

server {
    listen 80 default_server;
    # The underscore (_) in server_name _; acts as a wildcard, 
    # matching requests without a specific domain name.
    server_name _;

    location / {
        # Configuration for the default server
    }
}
```

- SSL Virtual host example:

``` nginx
server {
    listen 443 ssl;
    server_name secure.example.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private-key.key;

    location / {
        # Configuration for the secure virtual host
    }
}
```

### Pitfalls

- 1. **Do not use single backslash for windows path**

  The root directive `root D:\dev\nginx_root;` won't work on windows as `\n` is interpreted as a special character (which is change line) instead of normal characters. Use slash or double backslash `\\` instead: `root D:/dev/nginx_root;` or `root D:\\dev\\nginx_root;`.