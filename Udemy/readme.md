### How to install in WSL Ubuntu:
sudo apt-get update
sudo apt install nginx


### How to start nginx in WSL Ubuntu:

create these aliases:

alias nginup="sudo service nginx start"
alias ngindown="sudo service nginx stop"

easily start and stop nginx :)

https://www.how2shout.com/how-to/install-nginx-php-mysql-wsl-windows-10.html


### terminal help:

➜  ~ nginx -h
nginx version: nginx/1.18.0 (Ubuntu)
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/share/nginx/)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file



### Creating Symlinks:

starting nginx, it will read from /etc/nginx unless otherwise given a specific path via `-c` flag
I find it easier to 
1. backup the default nginx.conf
2. remove the default nginx.conf
3. create a symlink to /etc/nginx/nginx.conf where the source file is something i can easily edit without needing sudo, or vim

Symlink for me
```
sudo ln -s /mnt/e/code/suedo/StartingNginx/Udemy/lb_nginx.conf /etc/nginx/nginx.conf 
```
needed to give full paths like this, else was not working


### Default logs

If no access_log or error_log is mentioned in the nginx.conf, the below logs in /var/log/nginx is used

```shell
➜  nginx l /var/log/nginx                                                                                       @15:24:58 
total 84K
drwxr-xr-x 2 root     adm    4.0K Jul 30 13:38 .
drwxrwxr-x 8 root     syslog 4.0K Jul 30 13:38 ..
-rw-r----- 1 www-data adm     53K Jul 31 15:23 access.log
-rw-r----- 1 www-data adm     16K Jul 31 15:23 error.log
```

**Note**: a 404 is a properly valid response, and will not be present in the error logs. (unless nginx had some problems and failed while serving it)