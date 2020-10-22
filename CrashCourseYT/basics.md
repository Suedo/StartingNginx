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

---
### Setting up Nginx as a layer 7 proxy

Setting up a few very simple node apps via docker. the `-e` flag is for environment variable, which is internally used by our app

```
docker run --name nodeapp1 -p 2210:9999 -e APPID=2210 -d nodeapp
docker run --name nodeapp2 -p 2220:9999 -e APPID=2220 -d nodeapp
docker run --name nodeapp3 -p 2230:9999 -e APPID=2230 -d nodeapp
docker run --name nodeapp4 -p 2240:9999 -e APPID=2240 -d nodeapp
```

Now, as per the `layer7.nginx.conf` file, what we have done is:

1. Our Browser is setting up a TCP connection with nginx
2. Nginx sets up 4 individual connection with the 4 node apps
3. Each time we request a packet to nginx, it round robins the request to one of the 4 node apps

Note that Browsers connection ends at Nginx, we do not comminicate with the apps directly, thus effectily setting up a Layer 7 (HTTP) proxy