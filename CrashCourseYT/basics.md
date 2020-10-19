##### Notes are based on [this Youtube Video](https://www.youtube.com/watch?v=hcw-NjOh8r0)

<hr>

### What is NginX

1. Web Server
   -  Serves web content
2. Proxy
   - Load Balancing
   - Backend Routing
   - Caching


### Layer 4 & 7 proxying

- Nginx can operate as a proxy in layer 7 (http) as well as layer 4 (tcp)
- Using `stream` context it becomes a Layer 4 proxy
- Using `http` context, it becomes a later 7 proxy