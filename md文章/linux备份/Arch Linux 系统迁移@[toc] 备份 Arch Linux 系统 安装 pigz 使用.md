# 备份 Arch Linux 系统

- 安装 `pigz`

使用 `pigz` 多线程压缩比使用 `tar` 单线程压缩速度明显提升多倍

bash

代码解读

复制代码

`sudo pacman -S pigz`

- 安装 `zstd`

使用 `zstd` 多线程压缩比使用 `tar` 单线程压缩速度明显提升多倍。[Arch Linux 邮件列表： zstd 压缩解压与其他压缩解压工具速度对比](https://link.juejin.cn?target=https%3A%2F%2Flists.archlinux.org%2Fpipermail%2Farch-dev-public%2F2019-March%2F029520.html)

bash

代码解读

复制代码

`sudo pacman -S zstd`

- `pigz` 打包 Arch Linux

`--exclude` 排除的路径/文件，根据自己系统挂载情况选择需要排除的路径或文件。

注：当前是在 `/` 目录下执行

bash

代码解读

复制代码

`sudo tar --use-compress-program=pigz -cvpf arch-backup.tgz --exclude=/proc --exclude=/lost+found --exclude=/arch-backup.tgz --exclude=/mnt --exclude=/sys --exclude=/run/media  --exclude=/media  /`

- `zstd` 打包 Arch Linux

`--exclude` 排除的路径/文件，根据自己系统挂载情况选择需要排除的路径或文件。

注：当前是在 `/` 目录下执行

bash

代码解读

复制代码

`sudo tar -z -c -T0 -18 -v -p -f - arch-backup.zstd --exclude=/proc --exclude=/lost+found --exclude=/arch-backup.zstd --exclude=/mnt --exclude=/sys --exclude=/run/media  --exclude=/media  /`

= 给新盘分区或挂载

- 使用 `fdisk` 等磁盘工具分区

自行参考 `fdisk` 或自己喜欢的磁盘工具使用帮助。不会用看帮助。或者看别人手册。

- 挂载新硬盘分区到 `/mnt/arch`

新建磁盘挂载目录

bash

代码解读

复制代码

`sudo mkdir -pv /mnt/arch

sudo mkdir -pv /mnt/arch/boot/efi

sudo mkdir -pv /mnt/arch/home

....

// 如果有其他分区自行创建对应挂载目录`

挂载磁盘分区到对应挂载点

bash

代码解读

复制代码

`sudo mount /dev/sdb3 /mnt/arch

sudo mount /dev/sdb4 /mnt/arch/home

sudo mount /dev/sdb1 /mnt/arch/boot/efi

...

// 如果有其他分区自行创建对应挂载目录`

= `pigz`恢复 ArchLinux 系统

将当前系统的备份恢复到新挂载点，Linux 一切皆文件的思路对于备份恢复非常方便。

bash

代码解读

复制代码

`sudo tar --use-compress-program=pigz -cvpf arch-backup.tgz -C /mnt/arch`

= `zstd`恢复 ArchLinux 系统

将当前系统的备份恢复到新挂载点，Linux 一切皆文件的思路对于备份恢复非常方便。

bash

代码解读

复制代码

`sudo tar -z -c -T0 -18 -v -p -f - arch-backup.zstd -C /mnt/arch`

- 创建刚才排除的文件夹

bash

代码解读

复制代码

`sudo mkdir -pv /mnt/arch/proc

sudo mkdir -pv /mnt/arch/sys

sudo mkdir -pv /mnt/arch/run

sudo mkdir -pv /mnt/arch/dev`

- 获取 UUID

bash

代码解读

复制代码

`sudo lsblk`

- 修改 `/etc/fstab` 挂载文件

可以使用 `genfatab` 自动生成 `/mnt/arch/etc/fstab` 文件

bash

代码解读

复制代码

`sudo genfstab -U /mnt/arch >> /mnt/arch/etc/fstab

cat /mnt/arch/etc/fstab`

建议使用 `vim` 等文本编辑器修改 `/etc/fstab` 挂载文件

注：`arch-chroot` 是 `Arch` 用的 `chroot` 其他 `Linux` 有专用 `*-chroot` 就用没有的话直接 `chroot` 也可以（可能会提示权限问题或缺少设备信息之类，还可以尝试使用相应 `Linux*.iso` 复制到 `Ventoy` 启动盘（[见 Ventoy 启动盘](https://link.juejin.cn?target=https%3A%2F%2Fwww.ventoy.net%2Fcn%2Findex.html "https://www.ventoy.net/cn/index.html")）

bash

代码解读

复制代码

`sudo arch-chroot /mnt/arch/

vim etc/fstab`

修改 UUID 修改对应的挂载点

- 更新 Grub 引导

还是在 `arch-chroot` 权限下，此处已 `UEFI` 引导为例，`MBR` 或其他方式请参考 Arch WiKi 上的介绍。

bash

代码解读

复制代码

`grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader=ArchLinux --recheck

update-grub`

- 编辑 `/etc/mkinitcpio.conf` 加速 `linux.img` 速度

bash

代码解读

复制代码

`vim /etc/mkinitcpio.conf

// 修改配置文件的最后两行

// 需要安装 zstd 支持

// pacman -Syu zstd

// 还需要开启 zstd 支持

// 否则请使用其他 压缩算法

COMPRESSION="zstd"

COMPRESSION_OPTIONS=(-c -T0 -18 -)`

- 更新 `mkinitcpio`

bash

代码解读

复制代码

`mkinitcpio -p linux/linux-lts/其他内核

mkinitcpio -p linux-lts

==> Building image from preset: /etc/mkinitcpio.d/linux-lts.preset: 'default'

-> -k /boot/vmlinuz-linux-lts -c /etc/mkinitcpio.conf -g /boot/initramfs-linux-lts.img

==> Starting build: 5.4.84-1-lts

-> Running build hook: [base]

-> Running build hook: [udev]

-> Running build hook: [autodetect]

-> Running build hook: [modconf]

-> Running build hook: [block]

-> Running build hook: [filesystems]

-> Running build hook: [keyboard]

-> Running build hook: [fsck]

==> Generating module dependencies

==> Creating zstd-compressed initcpio image: /boot/initramfs-linux-lts.img

==> Image generation successful

==> Building image from preset: /etc/mkinitcpio.d/linux-lts.preset: 'fallback'

-> -k /boot/vmlinuz-linux-lts -c /etc/mkinitcpio.conf -g /boot/initramfs-linux-lts-fallback.img -S autodetect

==> Starting build: 5.4.84-1-lts

-> Running build hook: [base]

-> Running build hook: [udev]

-> Running build hook: [modconf]

-> Running build hook: [block]

-> Running build hook: [filesystems]

-> Running build hook: [keyboard]

-> Running build hook: [fsck]

==> Generating module dependencies

==> Creating zstd-compressed initcpio image: /boot/initramfs-linux-lts-fallback.img

==> Image generation successful`

- 不需要加速 `linux.img` 速度

直接更新 `mkinitcpio`

bash

代码解读

复制代码

`mkinitcpio -p linux/linux-lts/其他内核

mkinitcpio -p linux-lts`

- 退出 `arch-chroot` 提权模式

bash

代码解读

复制代码

`exit`

- 卸载分区

bash

代码解读

复制代码

\`sudo umount /mnt/arch/home

sudo umount /mnt/arch/boot/efi

...

// 如果有其他分区自行卸载对应挂载目录，和挂载相反的是最后卸载 根（/） 分区

sudo umount /mnt/arch`

= 迁移完成

重启宿主机后，在 `BIOS` 界面可以看到新增的 `ArchLinux` 引导。表示迁移完成即可使用。

标签：

[Linux](/tag/Linux)

本文收录于以下专栏



Arch Linux

专栏目录

Arch Linux

4 订阅

·

7 篇文章

订阅

上一篇

Arch Linux 使用 systemd-boot 替代 grub 启动系统

下一篇

解决 Arch Linux 博通蓝牙（固件补丁）无法使用的问题

评论 0



0 / 1000

标点符号、链接等不计算在有效字数内

Ctrl + Enter

发送

登录 / 注册 即可发布评论！

暂无评论数据



3



评论



收藏

加个关注，精彩更新不错过~



关注

[![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/14/1717773399fbfbdb~tplv-t2oaga2asx-jj-mark:150:150:0:0:q75.avis)

饕餮人 ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/922e26916a444513bceddad5bcf437e1~tplv-k3u1fbpfcp-jj:0:0:0:0:q75.avis)](/user/3632442150748590/posts)

[

13

文章

](/user/3632442150748590/posts)[

14k

阅读

](/user/3632442150748590/posts)[

7

粉丝

](/user/3632442150748590/followers)

加个关注，精彩更新不错过~

关注

已关注

[

私信

](/notification/im?participantId=3632442150748590)

目录

收起

- [备份 Arch Linux 系统](#heading-0 "备份 Arch Linux 系统")
  - [安装 pigz](#heading-1 "安装 pigz")
  - [安装 zstd](#heading-2 "安装 zstd")
  - [pigz 打包 Arch Linux](#heading-3 "pigz 打包 Arch Linux")
  - [zstd 打包 Arch Linux](#heading-4 "zstd 打包 Arch Linux")

- [给新盘分区或挂载](#heading-5 "给新盘分区或挂载")
  - [使用 fdisk 等磁盘工具分区](#heading-6 "使用 fdisk 等磁盘工具分区")
  - [挂载新硬盘分区到 /mnt/arch](#heading-7 "挂载新硬盘分区到 /mnt/arch")

- [pigz恢复 ArchLinux 系统](#heading-8 "pigz恢复 ArchLinux 系统")
- [zstd恢复 ArchLinux 系统](#heading-9 "zstd恢复 ArchLinux 系统")
  - [创建刚才排除的文件夹](#heading-10 "创建刚才排除的文件夹")
  - [获取 UUID](#heading-11 "获取 UUID")
  - [修改 /etc/fstab 挂载文件](#heading-12 "修改 /etc/fstab 挂载文件")
  - [更新 Grub 引导](#heading-13 "更新 Grub 引导")
  - [编辑 /etc/mkinitcpio.conf 加速 linux.img 速度](#heading-14 "编辑 /etc/mkinitcpio.conf 加速 linux.img 速度")
  - [更新 mkinitcpio](#heading-15 "更新 mkinitcpio")
  - [不需要加速 linux.img 速度](#heading-16 "不需要加速 linux.img 速度")
  - [退出 arch-chroot 提权模式](#heading-17 "退出 arch-chroot 提权模式")
  - [卸载分区](#heading-18 "卸载分区")

- [迁移完成](#heading-19 "迁移完成")

相关推荐

[

移动云操作系统改造技术实践分享，跨操作系统云主机迁移优化（一）

347阅读

·

0点赞

](/post/7264939254290153511 "移动云操作系统改造技术实践分享，跨操作系统云主机迁移优化（一）")[

Arch 系统安装

455阅读

·

1点赞

](/post/6854573211330445326 "Arch 系统安装")[

安装Arch Linux，手把手组装操作系统

6.9k阅读

·

5点赞

](/post/7284144079717105705 "安装Arch Linux，手把手组装操作系统")[

BIOS方式安装ArchLinux系统

848阅读

·

0点赞

](/post/7367778766984511551 "BIOS方式安装ArchLinux系统")[

Arch Linux 使用 systemd-boot 替代 grub 启动系统

4.6k阅读

·

1点赞

](/post/6990615957609676814 "Arch Linux 使用 systemd-boot 替代 grub 启动系统")

精选内容

[

【字节青训营】Go 语言并发编程：Sync | 豆包MarsCode AI刷题

夭要7夜宵

·

26阅读

·

1点赞

](/post/7434141548449431590 "【字节青训营】Go 语言并发编程：Sync | 豆包MarsCode AI刷题")[

QCon演讲实录|徐广治：边缘云原生操作系统的设计与思考

火山引擎边缘云

·

12阅读

·

0点赞

](/post/7434080596211335195 "QCon演讲实录|徐广治：边缘云原生操作系统的设计与思考")[

博客记录-day30-乐观锁CAS、抽象队列同步器AQS+Linux 物理内存管理

Gladiator575

·

19阅读

·

0点赞

](/post/7434017517227229218 "博客记录-day30-乐观锁CAS、抽象队列同步器AQS+Linux 物理内存管理")[

什么是可维护的代码？

不知火_caleb

·

130阅读

·

1点赞

](/post/7433827139114090531 "什么是可维护的代码？")[

京东物流-智能运输调度系统方案 荣获IF、红点国际设计大奖

京东云开发者

·

86阅读

·

1点赞

](/post/7433803180444778522 "京东物流-智能运输调度系统方案 荣获IF、红点国际设计大奖")

找对属于你的技术圈子

回复「进群」加入官方微信群

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/qr-code.4e391ff.png)

为你推荐

- [Arch Linux 使用 systemd-boot 替代 grub 启动系统](/post/6990615957609676814 "Arch Linux 使用 systemd-boot 替代 grub 启动系统")

[

@\[TOC\](Arch Linux 使用 systemd-boot 替代 grub 启动系统) 安装 systemd-boot 检测系统是否支持 EFI 启动 没有 efivar 请安装 efivar

](/post/6990615957609676814)

- [

饕餮人

](/user/3632442150748590)

- 3年前
- 4.6k
- 1
- 评论

[Linux](/tag/Linux "Linux")

- [BIOS方式安装ArchLinux系统](/post/7367778766984511551 "BIOS方式安装ArchLinux系统")

[

BIOS方式安装ArchLinux系统 之前参照ArchLinux基础安装 使用UEFI的方式安装过一次，但因为当时分配的存储空间太小，导致桌面软件安装不上，所以就准备删了重来一次 这一次就通过BIO

](/post/7367778766984511551)

- [

Methy

](/user/2225866860936408)

- 5月前
- 848
- 点赞
- 评论

[Linux](/tag/Linux "Linux") [操作系统](/tag/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F "操作系统")



- [Linux 挂载硬盘](/post/7347905080518328347 "Linux 挂载硬盘")

[

Linux挂载ext4分区类型硬盘 插入新的硬盘到计算机中，并确保硬盘已经被识别。您可以使用以下命令来检查新硬盘是否被识别： 您应该能够看到新硬盘的设备名称，例如/dev/sdb

](/post/7347905080518328347)

- [

IT后浪1024

](/user/2840793777189735)

- 7月前
- 749
- 3
- 评论

[后端](/tag/%E5%90%8E%E7%AB%AF "后端") [Linux](/tag/Linux "Linux")



- [linux 安装 ES 8.0 和 kibana 8.0 爬米共坑](/post/7117581201040212004 " linux 安装 ES 8.0 和 kibana 8.0 爬米共坑")

[

linux 环境下直接常规启动 kibana 会报错无法获取 es 信息，因为linux 环境下无法进行到在浏览器将 enrollment token 注入到 kibana 的环节，这需要爬坑

](/post/7117581201040212004)

- [

我是王大你是谁

](/user/536217405895149)

- 2年前
- 4.5k
- 5
- 1

[Elasticsearch](/tag/Elasticsearch "Elasticsearch") [Kibana](/tag/Kibana "Kibana") [Logstash](/tag/Logstash "Logstash")

- [linux之我常用的系统重要文件备份命令](/post/7026728218182811684 "linux之我常用的系统重要文件备份命令")

[

tar 备份linux系统 /proc目录:proc文件系统是一个伪文件系统，它只存在内存当中，而不占用外存空间 lost+found目录:lost+found这个目录一般情况下是空的，当系统非法关机

](/post/7026728218182811684)

- [

入门小站

](/user/2119514150671118)

- 3年前
- 287
- 1
- 评论

[Linux](/tag/Linux "Linux") [后端](/tag/%E5%90%8E%E7%AB%AF "后端")

- [Archlinux 2021 简易安装教程](/post/6919997090009448461 "Archlinux 2021 简易安装教程 ")

[

1、先在archlinx 官网下载 最新的archLinux 的官方镜像。 archlinux-2021.01.01-x86_64.iso。（点击左侧系统名即可自行下载） 2、如果要把Archlinux 安装到笔记本电脑或者其他电脑上，需把这个下载好的镜像刻录到U盘里，虚拟机不…

](/post/6919997090009448461)

- [

Rock的学习笔记

](/user/17191905535534)

- 3年前
- 2.9k
- 5
- 3

[Linux](/tag/Linux "Linux")

- [linux | ubuntu虚拟机创建硬盘、磁盘分区、分区挂载、自动挂载、磁盘清理](/post/7405158505299001385 "linux | ubuntu虚拟机创建硬盘、磁盘分区、分区挂载、自动挂载、磁盘清理")

[

创建硬盘 【选择硬盘 下一步】 【推荐 下一步】 【选择第一个 下一步】 【这里假如分配50G 选择单个文件】 【之后就会生成一个.vmdk格式的文件】 【添加成功】

](/post/7405158505299001385)

- [

Qt历险记

](/user/1893787524411100)

- 2月前
- 1.1k
- 1
- 评论

[Linux](/tag/Linux "Linux")



- [HDFS扩容](/post/6931239772128018439 "HDFS扩容")

[

无法将两块磁盘的空间结合使用，一块磁盘空间占满，即使加入一块新磁盘也无法对原来磁盘上的分区扩容。 但是这种方式只是增加新磁盘到hdfs中，原来的老磁盘空间依旧被占满。如果老磁盘的容量比新磁盘小，当之后hdfs不断添加新数据，老磁盘依旧占满比新磁盘快，为了防止hdfs的存储容量无…

](/post/6931239772128018439)

- [

sean

](/user/4292917522598558)

- 3年前
- 1.5k
- 点赞
- 评论

[大数据](/tag/%E5%A4%A7%E6%95%B0%E6%8D%AE "大数据")

- [LXCFS在Docker和Kubernetes下的实践](/post/6924273450307551245 "LXCFS在Docker和Kubernetes下的实践")

[

LXCFS是小型的fuse文件系统，目的是让Linux容器更像一个虚拟机。 Linuxs利用Cgroup实现了对容器的资源限制，但在容器内部依然缺省挂载了宿主机上的procfs的/proc目录，其包含如：meminfo, cpuinfo，stat， uptime等资源信息。一些…

](/post/6924273450307551245)

- [

头文件

](/user/1732486058489694)

- 3年前
- 1.1k
- 2
- 评论

[Kubernetes](/tag/Kubernetes "Kubernetes")

- [Linux 根目录爆满解决(/dev/mapper/centos-root 100%问题)](/post/6939387305119612935 "Linux 根目录爆满解决(/dev/mapper/centos-root 100%问题)")

[

一、使用df -h命令查看，发现/根目录的剩余空间为0。总共系统盘容量才20G。devtmpfs                   7.7G     0 7.tmpfs                      7.7G  168K 7.tmpfs               ...

](/post/6939387305119612935)

- [

地表最强菜鸡

](/user/325111174146376)

- 3年前
- 2.3k
- 1
- 评论

[后端](/tag/%E5%90%8E%E7%AB%AF "后端")

- [树莓派4B搭建seafile](/post/6991326360392663048 "树莓派4B搭建seafile")

[

一、挂载外接硬盘 我这里用的是格式化好的空硬盘，插到usb上。 可以看到外接硬盘 /dev/sda1就是我的外接硬盘。 接下来挂载硬盘，在/mnt下新建一个seafile的目录，然后执行命令进行挂载。

](/post/6991326360392663048)

- [

风中的猴子_

](/user/782508011555207)

- 3年前
- 2.0k
- 1
- 评论

[树莓派](/tag/%E6%A0%91%E8%8E%93%E6%B4%BE "树莓派")

- [新电脑 Windows 系统初始配置](/post/7423235127717822503 "新电脑 Windows 系统初始配置")

[

前言 1 前置配置 1）安装 Chrome 和 Microsoft Edge 浏览器： 同步书签 推荐：修改下载路径到 D:/System/Downloads/\[Chrome|Edge\] 位置 2）安

](/post/7423235127717822503)

- [

送南阳马生序

](/user/855878012254169)

- 29天前
- 132
- 3
- 4

[操作系统](/tag/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F "操作系统")



- [Linux扩展分区和文件系统](/post/6899365222767656973 "Linux扩展分区和文件系统")

[

磁盘分区linux也与windows一样，为了使用全部的磁盘空间，需要先对磁盘分区；如果所有分区的总容量小于磁盘容量，说明磁盘还有未分配空间，这个时候会对磁盘造成浪费。需要增加一个新的分区来将全部空间

](/post/6899365222767656973)

- [

Websoft9

](/user/351475283274013)

- 3年前
- 1.5k
- 7
- 评论

[Linux](/tag/Linux "Linux")

- [Linux 上如何清除 RAM 内存高速缓存，缓存和交换空间](/post/6980499812307173390 "Linux 上如何清除 RAM 内存高速缓存，缓存和交换空间")

[

像任何其他的操作系统一样，GNU / Linux已经有效地实施了内存管理甚至更多。但是，如果有任何进程正在蚕食你的内存，你要清除它，Linux提供了一个方法来刷新或清除RAM缓存。 在Linux中如何

](/post/6980499812307173390)

- [

编程学习网

](/user/747323639479486)

- 3年前
- 600
- 2
- 评论

[Linux](/tag/Linux "Linux") [后端](/tag/%E5%90%8E%E7%AB%AF "后端")



- [麒麟操作系统扩展根目录存储空间](/post/7429242764526747658 "麒麟操作系统扩展根目录存储空间")

[

最近在查看数据库服务器时，发现系统盘居然只有50G左右，之前申请服务器的时要求是1个T的磁盘。一查才发现另外900G的磁盘没有被挂载，只得自行处理了。中间走错了弯路，先是把磁盘直接分区格式化挂载

](/post/7429242764526747658)

- [

捞月亮的猫

](/user/64247656351724)

- 14天前
- 60
- 点赞
- 评论

[后端](/tag/%E5%90%8E%E7%AB%AF "后端") [Linux](/tag/Linux "Linux")


加个关注，精彩更新不错过~



关注

收藏成功！

已添加到「」， 点击更改

- 微信

微信扫码分享

- 新浪微博
- QQ



下载APP


下载APP

  

  微信扫一扫


微信公众号

- [新浪微博](https://weibo.com/xitucircle)

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/yoyo.3df25da.png)

- 登录掘金领取礼包

更多登录后权益等你解锁 登录 / 注册



![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/MaskGroup.13dfc4f.png)

选择你感兴趣的技术方向

后端

前端

Android

iOS

人工智能

开发工具

代码人生

阅读

跳过

上一步

至少选择1个分类

温馨提示

当前操作失败，如有疑问，可点击申诉

前往申诉 我知道了

沉浸阅读

确定屏蔽该用户

屏蔽后，对方将不能关注你、与你产生任何互动，无法查看你的主页

取消 确定

