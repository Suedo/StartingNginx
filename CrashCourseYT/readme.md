### Notes taken from this [Youtube Video by Hussein Nasser](https://www.youtube.com/watch?v=hcw-NjOh8r0)
---
### **What is NginX**

1. Web Server
   -  Serves web content
2. Proxy
   - Load Balancing
   - Backend Routing
   - Caching

---
### **Layer 4 & 7 proxying**

- Nginx can operate as a proxy in layer 7 (http) as well as layer 4 (tcp)
- Using `stream` context it becomes a Layer 4 proxy
- Using `http` context, it becomes a later 7 proxy

---
### **Mac Installation using brew**

brew reinstall nginx

Docroot is: /usr/local/var/www 

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that nginx can run without sudo.

---
### **Creating your own nginx.conf**

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
### **How to reload nginx:**

1. stop Nginx and restart
   - `nginx -s stop`
   - `nginx`
2. use the reload command instead of stop (does it all in 1 step instead of two)
   -  `nginx -s reload`

---
### **Setting up Nginx as a layer 7 proxy**

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

**Overriding default load balancing** : 
By adding `ip_hash` to the first line of the `upstream` block in the `layer7.nginx.conf` **file**, we can change the load balancing to be ip hash based, instead of default round-robin. As such, connections will be sticky, where a browser from one ip will always be talking one specific app behind the nginx proxy. This is a stateful connection, and can be used where we need to maintain some state in between connections.

A side note, given the prevalence of kubernetes and similar scaling solutions, keeping sticky/state-based connections can be a bad idea, so choose with caution.

### **Splitting load to specific groups/cluster of backends**

Earlier we had an `upstream` with all the backend servers in it, and we would round-robin through them. However, if specific sections of the app, in our case `/app1`, experience higher traffic etc, we might want them to have extra power. Thus, for these specific sections, we can provide a cluster of backends, and traffic would round robin between this subset. Below is a snippet of nginx.conf: 

```
  # all available servers
  upstream allbackend {
    server 127.0.0.1:2210;
    server 127.0.0.1:2220;
    server 127.0.0.1:2230;
    server 127.0.0.1:2240;
  }

  # smaller subset for heavy load on app1
  upstream backend1 {
    server 127.0.0.1:2210;
    server 127.0.0.1:2220;
  }

  server {
.
.
  # route traffic to app1 to a specific cluster
    location /app1 {
      proxy_pass http://backend1;
    }
  }
```

### **Layer 7 Proxy**

When using a layer 4 proxy, Nginx does a NAT (probably) and decides that from now onwards, all requests from one source ip and port, will go to one particular backend. As a result, refreshing does not change the backend we hit, until the browser/nginx decides that a new TCP connection will be used, when we may hit another backend.