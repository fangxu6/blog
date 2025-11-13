= 使用tar命令来实现Linux系统的备份与恢复

发表于 2019-08-06 更新于 2020-08-12 分类于 [Linux](/categories/Linux/) 阅读次数：2607 Valine：[1](/2019/08/06/1/#valine-comments "valine")

本文字数： 3k 阅读时长 ≈ 3 分钟

有时我们需要调整 Linux系统 挂载点或者对 Linux系统 进行备份和恢复，我们可以通过 tar 命令来实现。

1. 本文适用于具有一定基础和动手能力的 Linux 用户, 不清楚之处还请自行百度
2. 系统的备份与恢复具有很大风险，在操作之前还请备份重要数据先。

### [](#以-Ubuntu18-04-系统为例 "以 Ubuntu18.04 系统为例")以 Ubuntu18.04 系统为例

> 系统配置

- OS: Ubuntu 18.04
- mem: 16G
- disk1: TOSHIBA 256G 2280 m.2 sata
- disk2: HS-C2000Pro 1024
- Display: NVIDIA GTX 1050 (cuda 已配置)

> 磁盘分区表

```bash
root@l: lsblk
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda                         8:0    0  256G  0 disk
├─sda1                      8:1    0   99M  0 part /boot/efi
├─sda2                      8:2    0  216M  0 part
└─sda3                      8:3    0   40G  0 part /
sdb                         8:0    0 1024G  0 disk
├─sdb1                      8:1    0   99M  0 part
├─sdb2                      8:2    0  128M  0 part 
├─sdb3                      8:2    0  873G  0 part 
└─sdb4                      8:3    0  150G  0 part 
```

### [](#对于整个系统进行备份与恢复 "对于整个系统进行备份与恢复")对于整个系统进行备份与恢复

- 示例：将系统从 `/dev/sda3` 移动到 `/dev/sdb4`

### [](#准备工作 "准备工作")准备工作

1. 删除不必要的日志文件
2. 取消不重要 _盘/分区_ 的挂载

### [](#开始备份 "开始备份")开始备份

- 同理，您也可以将压缩以后的文件任意移动到一个足够大的分区中，然后使用U盘引导，进入 live 桌面
- 当然你也可以通过网络实现实时远程备份，如使用 `netcat(nc)` 和 `ssh`，或者先备份，之后再通过网络发送压缩包。
1. 进入了单人模式，首先将不必要的挂载分区给取消挂载
2. 挂载要存放文件的分区
3. 压缩根目录

```bash
#备份系统
root@l: cd / && apt clean
root@l: mount /dev/sdb4 /media/D
root@l: tar -cvpzf /media/D/backup.tar.gz \
--exclude=/media \
--exclude=/media/D/backup.tar.gz \
--exclude=/proc \
--exclude=/tmp \
--exclude=/mnt \
--exclude=/dev \
--exclude=/sys \
--exclude=/run \
--exclude=/var/cache/apt/archives \
--one-file-system /
```

- c：创建压缩包
- v：输出压缩信息
- p：保持文件原有的权限和属性
- z：压缩文件为 `.gz`
- f：指定文件名
- –exclude=/example/path：不压缩指定路径下面的文件
- -one-file-system：不备份其他文件系统中的文件（只备份和系统根分区一样分区类型的文件）
- 如果您希望其他文件系统（例如 /home分区或安装在 /media备份中的外部介质），您需要单独备份它们，或省略此标志。如果省略此标志，则需要添加几个 –exclude= 参数以避免您不想要的文件系统。
- /proc 和 /sys 是虚拟文件系统，它为正在运行的内核的变量提供接口，因此没有必要尝试备份或还原它们。 /dev 是一个tmpfs，其内容由udev动态创建和删除，因此您也没有必要尝试备份或还原它。同样，/run 是一个 tmpfs，它保存有关系统运行的一些变量.
  - For more: [Here](https://iitii.github.io/2019/07/10/1/)

  > 注意：`--exclude=` 的排除是递归的，把相对越长的目录写在前面。要不然就不会备份或者排除该目录



### [](#分卷压缩 "分卷压缩")分卷压缩

- 注意：因为 FAT32 最大支持文件大小为4G而且系统备份 **一般** 比较大（**一般 30G 起步**），不强制要求，自行抉择

#### [](#压缩后分卷 "压缩后分卷")压缩后分卷

- `split -d -b 3900m /path/to/backup.tar.gz /name/of/backup.tar.gz`
- 简单地拆分由/path/to/backup.tar.gz指定的现有文件。

#### [](#压缩前分卷 "压缩前分卷")压缩前分卷

- `tar -cvpz <put options here> / | split -d -b 3900m - /name/of/backup.tar.gz`
- 直到管道（|）的前半部分与我们之前的例子相同，但是省略了 _**f**_ 选项。去掉 _**f**_ 参数，tar会将存档输出到标准输出，然后通过管道输出到split命令。
- `-d` 此选项表示存档后缀将是数字而不是字母，每个拆分将从01开始顺序，并随每个新的拆分文件而增加。
- `-b` 此选项指定要拆分的大小，在此示例中，已将其设置为 _**3900MB**_ 以适合FAT32分区。
- `-` 连字符是输入文件的占位符（通常是已创建的实际文件），并指示拆分以使用标准输入。
- `/name/of/backup.tar.gz` 是将应用于所有生成的拆分文件的前缀。它应该指向您希望放置存档的文件夹。在这个示例中，第一个拆分归档文件将位于 `/name/of/` 目录中，并命名为 `backup.tar.gz.01`

#### [](#合并分卷文件 "合并分卷文件")合并分卷文件

1. cd 进入文件所在的目录
2. 使用 `cat *tar.gz* |tar -xvpzf - -C /` 提取到根目录（也可以修改为其他目录）

### [](#开始恢复 "开始恢复")开始恢复

1. 对于同一台电脑进行备份直接跟着教程走
2. 不同的电脑实现备份的话，可以先做一个启动盘，然后U盘启动进入live桌面，接下来操作是一样的
3. 对于已有系统想替换掉的话，可以和第二点进行一样的做法，不过记得 _**备份和格式化分区**_
4. 重启，正常进入系统
5. 挂载要安装系统的分区
6. 解压
7. 创建缺少的文件夹
8. 挂载启动分区
9. 安装 `grub`
10. reboot

```bash
root@l: mount /dev/sdb4 /media/D
root@l: cd /media/D/
root@l: sudo tar -xvpzf /path/to/backup.tar.gz -C /media/D/ --numeric-owner
root@l: mkdir proc sys mnt media tmp dev run
root@l: sudo -s
# 挂载启动分区
root@l: mount /dev/sdb1 /media/c
root@l: mount -o bind /sys sys
root@l: mount -o proc rpoc
root@l: cd / ; for f in dev dev/pts proc ; do mount --bind /$f /media/D/$f ; done
root@l: chroot /media/D/
root@l: grub-install --recheck --no-floppy /dev/sdb1
root@l: echo "`blkid | grep sda1 | awk '{printf $2}' | sed 's/"//g'` /opt ext4 defaults 0 0" >> /etc/fstab
root@l: echo "`blkid | grep sda4 | awk '{printf $2}' | sed 's/"//g'` /opt ext4 defaults 0 0" >> /etc/fstab
root@l: vim /etc/fstab
root@l: update-grub
root@l: exit
root@l: reboot
```

1. `x` 解压文件
2. -C解压至指定路径
3. –numeric-owner - 此选项告诉tar恢复归档文件的数字所有者，而不是匹配要还原的环境中的任何用户名。因为这是您要恢复的系统中的用户 `id:s` 不一定与您用于恢复的系统匹配(例如: _live CD_ )

### [](#参见 "参见")参见

1. [Ubuntu Documentation: TAR](https://help.ubuntu.com/community/BackupYourSystem/TAR)
2. [Install Grub from chroot](https://zeldor.biz/2010/12/install-grub-from-chroot/)
3. +实践

要不看点其他的吧?..

- [使用tar命令来实现对Linux系统挂载点的调整](/2019/08/03/1/)
- [Linux终端字体上色与常用命令](/2018/12/16/Linux终端字体上色与常用命令/)
- [SSH Config](/2019/01/30/1/)
- [Ubuntu18.04配置Flat-remiax主题](/2018/09/27/Ubuntu18.04配置flat-remiax主题/)
- [lvm简单使用以及grub2菜单不显示的解决方法](/2019/08/04/1/)

-------------本文结束再接再厉-------------

本文标题:[使用tar命令来实现Linux系统的备份与恢复](/2019/08/06/1/)

文章作者:[IITII](/ "访问 IITII 的个人博客")

发布时间:2019年08月06日 - 09:08

最后更新:2020年08月12日 - 02:08

原始链接:[https://iitii.github.io/2019/08/06/1/](/2019/08/06/1/ "使用tar命令来实现Linux系统的备份与恢复")

许可协议: [署名-非商业性使用-禁止演绎 4.0 国际](https://creativecommons.org/licenses/by-nc-nd/4.0/ "Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)") 转载请保留原文链接及作者。

打赏

![](https://iitii.github.io/images/site/wechatpay2.png)

微信支付

![](https://iitii.github.io/images/site/alipay.png)

支付宝

[Linux](/tags/Linux/) [tar](/tags/tar/) [restore](/tags/restore/) [系统备份](/tags/%E7%B3%BB%E7%BB%9F%E5%A4%87%E4%BB%BD/)

[一种解决Linux无法识别并挂载外接硬盘的办法(uas)](/2019/08/05/1/ "一种解决Linux无法识别并挂载外接硬盘的办法(uas)")

[一个简单的 vnStat 监控界面](/2019/10/11/1/ "一个简单的 vnStat 监控界面")

提交

1 评论



Anonymous Edge 84.0.522.40 Windows 10/11

2020-07-20回复

你好，博主，在开始恢复环节的bash代码中从第6行挂载启动分区开始我没有太明白，这个启动分区是从哪里来的？是自己对原始硬盘分区得来的吗？因为我的硬盘只有一个/dev/sda1的分区，再之后的操作中感觉并没有用到/dev/sdb1呀。再之后的几个mount操作，也不太明白是什么意思。



[IITII](https://iitii.github.io/) Chrome 83.0.4103.116 Windows 10/11

2020-07-23回复

[@Anonymous](#5f14eeacc433d60008b01ddb) , 前面我给出了 我的 硬盘分区表，原本 /dev/sda1 为 EFI 引导分区, /dev/sda3 为主分区，sda、sdb 分区表均采用 GUID，现在是将 EFI 引导分区备份并恢复到 /dev/sdb1，主分区备份并 恢复到 /dev/sdb4

加载更多...

Powered By [Valine](https://valine.js.org)

v1.5.2

- 文章目录
- 站点概览
1. [1. 以 Ubuntu18.04 系统为例](#%E4%BB%A5-Ubuntu18-04-%E7%B3%BB%E7%BB%9F%E4%B8%BA%E4%BE%8B)
2. [2. 对于整个系统进行备份与恢复](#%E5%AF%B9%E4%BA%8E%E6%95%B4%E4%B8%AA%E7%B3%BB%E7%BB%9F%E8%BF%9B%E8%A1%8C%E5%A4%87%E4%BB%BD%E4%B8%8E%E6%81%A2%E5%A4%8D)
3. [3. 准备工作](#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)
4. [4. 开始备份](#%E5%BC%80%E5%A7%8B%E5%A4%87%E4%BB%BD)
5. [5. 分卷压缩](#%E5%88%86%E5%8D%B7%E5%8E%8B%E7%BC%A9)
  1. [5.1. 压缩后分卷](#%E5%8E%8B%E7%BC%A9%E5%90%8E%E5%88%86%E5%8D%B7)
  2. [5.2. 压缩前分卷](#%E5%8E%8B%E7%BC%A9%E5%89%8D%E5%88%86%E5%8D%B7)
  3. [5.3. 合并分卷文件](#%E5%90%88%E5%B9%B6%E5%88%86%E5%8D%B7%E6%96%87%E4%BB%B6)

6. [6. 开始恢复](#%E5%BC%80%E5%A7%8B%E6%81%A2%E5%A4%8D)
7. [7. 参见](#%E5%8F%82%E8%A7%81)

![](https://iitii.github.io/images/site/avatar.jpeg)

IITII

山野之人，粗鄙之语

[83 日志](/archives/)

74 分类

279 标签

[GitHub](https://github.com/iitii "GitHub → https://github.com/iitii") [E-Mail](mailto:ccmejx@gmail.com "E-Mail → mailto:ccmejx@gmail.com") [Telegram](https://t.me/callmehelp "Telegram → https://t.me/callmehelp")

© 2018 – 2024 IITII | 站点总字数： 264k | 站点阅读时长 ≈ 4:01

本站总访问量 132793 次

小破站已经在风雨中度过了 2233 天 21 小时 30 分 31 秒

