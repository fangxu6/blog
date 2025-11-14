= [minio 数据备份和数据恢复](https://www.cnblogs.com/scfssq/p/17631361.html "发布于 2023-08-15 15:10")

### 可以解决的需求：

### 1、两个都能通过 mc 连接到的minio 互相传递数据----这个更建议使用 mc mirror  可以查看另一篇博客[MinIO实现数据迁移(mc) - 买定灬离手 - 博客园 (cnblogs.com)](https://www.cnblogs.com/scfssq/p/17513392.html)

### 2、针对一个minio在内网，无法与另一个minio通过mc连接，可以使用mc 先连接有数据的那个，把数据拷贝下来，然后把数据传到内网，再通过mc工具把数据传到内网的minio

### 部署一个 mc 容器，做数据备份

启动一个mc容器，并进入容器中

docker run -it --name mc  --entrypoint=/bin/sh minio/mc:RELEASE.2023-06-06T13-48-56Z

分别设置 minio2021 和 minio2023 的alias

[![](https://assets.cnblogs.com/images/copycode.gif)

](javascript:void(0); "复制代码")

\# mc alias set 名称 服务地址 用户名 密码

# 设置minio2021的alias

mc alias set minio2021 http://ip:19000 admin admin123

\# 设置minio2023的alias

mc alias set minio2023 http://ip:9000 minioadmin minioadmin

[![](https://assets.cnblogs.com/images/copycode.gif)

](javascript:void(0); "复制代码")

### 备份 minio2021 的数据

将 minio2021 上的**所有数据**备份到 /mnt/minio/backup目录下

mc cp --recursive minio2021 /mnt/minio/backup

将 minio2021 上名为 **workflow 的桶的数据**备份到 /home/minio/workflow 目录

mc cp --recursive minio2021/workflow /mnt/minio/workflow

**然后可以放到服务器本地**

docker cp mc:/mnt/minio   /mnt/

### 在Minio服务器上根据备份文件恢复数据

将 /mnt/minio/backup/目录下的备份数据恢复到 minio2023，

**注意：备份文件目录路径需以'/'结尾**

mc cp --recursive /mnt/minio/backup/ minio2023

将某个桶（比如：workflow）的备份数据恢复到 minio2023 的指定桶（比如：work）中,需提前创建好work 这个桶

mc cp --recursive /mnt/minio/backup/workflow/  minio2023/work/

**注意：**

恢复数据时，则要求新服务器上必须存在迁移服务器上所有的桶，否则会提示找不到对应桶而无法恢复数据。

![](https://img2023.cnblogs.com/blog/3071886/202308/3071886-20230815150909299-1382402569.png)

去minio 页面创建对应的桶即可
