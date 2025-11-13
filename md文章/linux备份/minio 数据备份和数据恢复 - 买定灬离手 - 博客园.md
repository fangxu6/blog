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

分类: [minio](https://www.cnblogs.com/scfssq/category/2322151.html)

标签: [minio](https://www.cnblogs.com/scfssq/tag/minio/)

[好文要顶](javascript:void(0);) [关注我](javascript:void(0);) [收藏该文](javascript:void(0);) [微信分享](javascript:void(0);)

[![](https://pic.cnblogs.com/face/3071886/20221228224932.png)

](https://home.cnblogs.com/u/scfssq/)

[买定灬离手](https://home.cnblogs.com/u/scfssq/)

[粉丝 - 1](https://home.cnblogs.com/u/scfssq/followers/) [关注 - 1](https://home.cnblogs.com/u/scfssq/followees/)

[+加关注](javascript:void(0);)

0

0

[升级成为会员](https://cnblogs.vip/)

[«](https://www.cnblogs.com/scfssq/p/17629387.html) 上一篇： [k8s dashboard token过期时间太短的解决方案](https://www.cnblogs.com/scfssq/p/17629387.html "发布于 2023-08-14 18:01")

[»](https://www.cnblogs.com/scfssq/p/17651879.html) 下一篇： [sftp](https://www.cnblogs.com/scfssq/p/17651879.html "发布于 2023-08-23 15:48")

posted @ 2023-08-15 15:10  [买定灬离手](https://www.cnblogs.com/scfssq)  阅读(7104)  评论(0)  [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=17631361)  [收藏](javascript:void(0))  [举报](javascript:void(0))

[刷新页面](#)[返回顶部](#top)

登录后才能查看或发表评论，立即 [登录](javascript:void(0);) 或者 [逛逛](https://www.cnblogs.com/) 博客园首页

[![](image_1.10944f2f.jpg)](https://click.aliyun.com/m/1000399302/)

**编辑推荐：**

· [代码编写之道：十条经验引领高效编程之旅](https://www.cnblogs.com/waynaqua/p/18573980)

· [.NET9 - Swagger平替Scalar详解（四）](https://www.cnblogs.com/hugogoos/p/18571088)

· [.NET Core 线程池(ThreadPool)底层原理浅谈](https://www.cnblogs.com/lmy5215006/p/18566995)

· [.NET云原生应用实践（六）：多租户初步](https://www.cnblogs.com/daxnet/p/18548663)

· [DDD之理解复杂度、尊重复杂度、掌控复杂度](https://www.cnblogs.com/xiaoweiyu/p/18566328)

[![](image_2.c402141f.png)](https://www.cnblogs.com/cmt/p/18457617)

**阅读排行：**

· [2024年各编程语言运行100万个并发任务需要多少内存？](https://www.cnblogs.com/InCerry/p/-/async-runtimes-benchmarks-2024)

· [《HelloGitHub》第 104 期](https://www.cnblogs.com/xueweihan/p/18573326)

· [独立开发者应该如何设计产品网站](https://www.cnblogs.com/sheng_chao/p/18574106)

· [代码编写之道：十条经验引领高效编程之旅](https://www.cnblogs.com/waynaqua/p/18573980)

· [记一次 .NET某hdp智能柜系统 卡死分析](https://www.cnblogs.com/huangxincheng/p/18575759)

### 公告

昵称： [买定灬离手](https://home.cnblogs.com/u/scfssq/)

园龄： [1年11个月](https://home.cnblogs.com/u/scfssq/ "入园时间：2022-12-28")

粉丝： [1](https://home.cnblogs.com/u/scfssq/followers/)

关注： [1](https://home.cnblogs.com/u/scfssq/followees/)

[+加关注](javascript:void(0))

|

| [<](javascript:void(0);) | 2024年11月 | [\>](javascript:void(0);) | |

| 日 | 一 | 二 | 三 | 四 | 五 | 六 |

| 27 | 28 | 29 | 30 | 31 | 1 | 2 |

| 3 | 4 | 5 | 6 | 7 | 8 | 9 |

| 10 | 11 | 12 | 13 | 14 | 15 | 16 |

| 17 | 18 | 19 | 20 | 21 | 22 | 23 |

| 24 | 25 | 26 | 27 | 28 | 29 | 30 |

| 1 | 2 | 3 | 4 | 5 | 6 | 7 |

### 搜索



### [我的标签](https://www.cnblogs.com/scfssq/tag/)

- [docker(13)](https://www.cnblogs.com/scfssq/tag/docker/)
- [Linux(12)](https://www.cnblogs.com/scfssq/tag/Linux/)
- [VMware(6)](https://www.cnblogs.com/scfssq/tag/VMware/)
- [Windows(5)](https://www.cnblogs.com/scfssq/tag/Windows/)
- [nacos(5)](https://www.cnblogs.com/scfssq/tag/nacos/)
- [Jenkins(5)](https://www.cnblogs.com/scfssq/tag/Jenkins/)
- [MySQL(4)](https://www.cnblogs.com/scfssq/tag/MySQL/)
- [minio(4)](https://www.cnblogs.com/scfssq/tag/minio/)
- [Python(3)](https://www.cnblogs.com/scfssq/tag/Python/)
- [Prometheus(3)](https://www.cnblogs.com/scfssq/tag/Prometheus/)
- [更多](https://www.cnblogs.com/scfssq/tag/)

### [随笔分类](https://www.cnblogs.com/scfssq/post-categories)

- [docker(13)](https://www.cnblogs.com/scfssq/category/2303255.html)
- [Jenkins(5)](https://www.cnblogs.com/scfssq/category/2327654.html)
- [Kubernetes(2)](https://www.cnblogs.com/scfssq/category/2335673.html)
- [linux(13)](https://www.cnblogs.com/scfssq/category/2304567.html)
- [minio(4)](https://www.cnblogs.com/scfssq/category/2322151.html)
- [MySQL(4)](https://www.cnblogs.com/scfssq/category/2353361.html)
- [nacos(5)](https://www.cnblogs.com/scfssq/category/2349133.html)
- [Prometheus(3)](https://www.cnblogs.com/scfssq/category/2304945.html)
- [Python(3)](https://www.cnblogs.com/scfssq/category/2317974.html)
- [sonarqube(3)](https://www.cnblogs.com/scfssq/category/2314636.html)
- [VMware(4)](https://www.cnblogs.com/scfssq/category/2304568.html)
- [Windows(4)](https://www.cnblogs.com/scfssq/category/2317674.html)
- [其他(1)](https://www.cnblogs.com/scfssq/category/2349153.html)

### [阅读排行榜](https://www.cnblogs.com/scfssq/most-viewed)

- [1\. minio 数据备份和数据恢复(7104)](https://www.cnblogs.com/scfssq/p/17631361.html)
- [2\. MinIO实现数据迁移(mc)(5604)](https://www.cnblogs.com/scfssq/p/17513392.html)
- [3\. 卸载联软UniAccess安全助手(5334)](https://www.cnblogs.com/scfssq/p/17747104.html)
- [4\. windows 11 修改hosts文件(4433)](https://www.cnblogs.com/scfssq/p/17475471.html)
- [5\. shell脚本使用ssh远程执行命令通过密码的方式登录(4019)](https://www.cnblogs.com/scfssq/p/17408934.html)

### [推荐排行榜](https://www.cnblogs.com/scfssq/most-liked)

- [1\. Jenkins自动部署与回滚(2)](https://www.cnblogs.com/scfssq/p/17460826.html)
- [2\. docker启动gitlab 备份与恢复(1)](https://www.cnblogs.com/scfssq/p/18056742)
- [3\. docker 搭建 svn(1)](https://www.cnblogs.com/scfssq/p/17598631.html)
- [4\. python 3.11.4 安装教程(1)](https://www.cnblogs.com/scfssq/p/17478132.html)
- [5\. shell脚本使用ssh远程执行命令通过密码的方式登录(1)](https://www.cnblogs.com/scfssq/p/17408934.html)

Copyright © 2024 买定灬离手

Powered by .NET 9.0 on Kubernetes

点击右上角即可分享

![](https://img2023.cnblogs.com/blog/35695/202309/35695-20230906145857937-1471873834.gif)

[FFA大会](https://click.aliyun.com/m/1000399295/ "Flink Forward Asia 大会")

