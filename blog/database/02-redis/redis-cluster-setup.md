```
#redis_6379.service 自动任务
[Unit]
Description=Redis
After=network.target

[Service]
ExecStart=/home/jse/redis/bin/redis-server /home/jse/redis/redis_6379.conf --supervised systemd
ExecStop=/home/jse/redis/redis-shutdown
WorkingDirectory=/home/jse/redis/bin
User=root
Group=root
RuntimeDirectory=redis
RuntimeDirectoryMode=0755

[Install]
WantedBy=multi-user.target
```

```
cp /home/jse/redis/redis_6379.service  /etc/systemd/system/ 
一般应该用ln，这边不对
```

