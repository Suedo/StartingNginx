##### Notes are based on [this Youtube Video](https://www.youtube.com/watch?v=hcw-NjOh8r0)
---
### What is NginX

1. Web Server
   -  Serves web content
2. Proxy
   - Load Balancing
   - Backend Routing
   - Caching

---
### Layer 4 & 7 proxying

- Nginx can operate as a proxy in layer 7 (http) as well as layer 4 (tcp)
- Using `stream` context it becomes a Layer 4 proxy
- Using `http` context, it becomes a later 7 proxy

---
### Mac Installation using brew

brew reinstall nginx

Docroot is: /usr/local/var/www 

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that nginx can run without sudo.

---

### Creating your own nginx.conf

This is a barebones nginx.conf that you need, to get a valid page when you hit http://localhost:8000/

```
http {
  server {
    listen 8000;
  }
}
# this is needed for basic start, else you'll get:
# nginx: [emerg] no "events" section in configuration
events {
  
}
```

---
### How to reload nginx:

1. stop Nginx and restart
   - `nginx -s stop`
   - `nginx`
2. use the reload command instead of stop (does it all in 1 step instead of two)
   -  `nginx -s reload`