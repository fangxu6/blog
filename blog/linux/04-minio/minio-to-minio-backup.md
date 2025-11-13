minio备份到另外一个minio上

###### ChatGPT 说：

ChatGPT

要将一个 MinIO 实例的数据备份到另一个 MinIO 实例，你可以通过使用 ==mc== (MinIO Client) 工具来完成。以下是详细步骤：

### 1\. 安装 MinIO Client (==mc==)

如果你还没有安装 ==mc==，可以通过以下命令安装：

#### Linux/macOS:

```


bash

复制代码

` `curl -O [https://dl.min.io/client/mc/release/linux-amd64/mc](https://dl.min.io/client/mc/release/linux-amd64/mc) `
chmod +x mc
` sudo mv mc /usr/local/bin/` `



```

#### Windows:

从 MinIO下载页面 获取 ==mc==，然后解压并将 ==mc.exe== 添加到系统 ==PATH==。

***

### 2\. 配置源和目标 MinIO 实例

#### 添加源 MinIO

```


bash

复制代码

` `mc alias set sourceMinio [http://<source-minio-url>](http://%3csource-minio-url%3e) <ACCESS_KEY> <SECRET_KEY>` `



```

#### 添加目标 MinIO

```


bash

复制代码

` `mc alias set targetMinio [http://<target-minio-url>](http://%3ctarget-minio-url%3e) <ACCESS_KEY> <SECRET_KEY>` `



```

***

### 3\. 执行备份

#### 全量备份

将源 MinIO 的 ==bucket-name== 备份到目标 MinIO：

```


bash

复制代码

` `mc mirror sourceMinio/bucket-name targetMinio/bucket-name` `



```

#### 增量备份

使用 ==--watch== 选项监听源 MinIO 的实时变化：

```


bash

复制代码

` `mc mirror --watch sourceMinio/bucket-name targetMinio/bucket-name` `



```

#### 过滤备份（按文件类型、路径等）

例如，只备份 ==.jpg== 文件：

```


bash

复制代码

` `mc mirror --exclude "*" --include "*.jpg" sourceMinio/bucket-name targetMinio/bucket-name` `



```

***

### 4\. 验证备份

```


bash

复制代码

` `mc ls targetMinio/bucket-name` `



```

这样你就可以确保数据已经正确备份到目标 MinIO 实例。

***

### 注意事项

- 你可以设置 ==mc mirror== 为定时任务，通过 ==cron== 或 ==task scheduler== 定期运行。
- 使用 ==--overwrite== 选项可以强制覆盖目标上的文件。

你可以根据实际需求调整这些命令。

