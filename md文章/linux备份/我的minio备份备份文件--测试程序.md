备份在192.168.53.250的minio上
/mnt/data/minio

###### 1\. 安装 MinIO Client (==mc==)

如果你还没有安装 ==mc==，可以通过以下命令安装：

#### Linux/macOS:

```
curl -O [https://dl.min.io/client/mc/release/linux-amd64/mc](https://dl.min.io/client/mc/release/linux-amd64/mc)
chmod +x mc
sudo mv mc /usr/local/bin/
```

#### Windows:

从 MinIO下载页面 获取 ==mc==，然后解压并将 ==mc.exe== 添加到系统 ==PATH==。

***

### 2\. 配置源和目标 MinIO 实例

#### 添加源 MinIO

```
mc alias set minio1 [http://192.168.200.1:9000](http://192.168.200.1:9000) dcc xx@123456
```

#### 添加目标 MinIO

```
mc alias set minio2 http://127.0.0.1:9000 admin 12345678
```

***

### 3\. 执行备份

#### 全量备份

将源 MinIO 的 ==bucket-name== 备份到目标 MinIO：

```
mc mirror --exclude="datalog/**" minio1/tms minio2/tms
```

#### 增量备份（没用\--后台任务，一直启动）

使用 ==--watch== 选项监听源 MinIO 的实时变化：

```
mc mirror --watch --exclude="datalog/**" minio1/tms minio2/tms
```

#### 过滤备份（按文件类型、路径等）\--没用

例如，只备份 ==.jpg== 文件：

```
mc mirror --exclude "*" --include "*.jpg" sourceMinio/bucket-name targetMinio/bucket-name
```

***

### 4\. 验证备份

```
 mc ls minio2/tms
```

这样你就可以确保数据已经正确备份到目标 MinIO 实例。

***

### 注意事项

- 你可以设置 ==mc mirror== 为定时任务，通过 ==cron== 或 ==task scheduler== 定期运行。
- 使用 ==--overwrite== 选项可以强制覆盖目标上的文件。

你可以根据实际需求调整这些命令。

