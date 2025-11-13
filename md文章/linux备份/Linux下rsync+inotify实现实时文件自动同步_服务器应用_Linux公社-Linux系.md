Linux下rsync+inotify实现实时文件自动同步

| \[日期：2017-12-12\] | 来源：Linux社区  作者：helonlihsmcn | \[字体：[大](javascript:ContentSize(16)) [中](javascript:ContentSize(0)) [小](javascript:ContentSize(12))\] |

注：本文接着上一章的环境下进程配置的  [http://www.linuxidc.com/Linux/2017-12/149183.htm](http://../../Linux/2017-12/149183.htm)

**背景：** 随着时代的发展，手工的同步文件的功能已经不适合为高效的现代化企业的服务了。

**rsync的局限性：**

1、对于大的文件（百万级、千万级的）同步耗时。
2、不能实时的检测，rsync是根据Linux守护进程的方式进行触发同步的，这过程有很大的时间差。导致出现问题的时候可能无法完全的恢复数据。
3、同步笨重，同步一次就是全部同步的了，不会自动只同步更新的那点。

所以rsync+inotify的实现可以更加高效，自动化的实现文件的实时同步，能够大大的提高工作的效率，有效的减少手工操作的失误。

**inotify的简介**

  Inotify 是一个 Linux特性，它监控文件系统操作，比如读取、写入和创建。Inotify 反应灵敏，用法非常简单，并且比 cron 任务的繁忙轮询高效得多。学习如何将 inotify 集成到您的应用程序中，并发现一组可用来进一步自动化系统治理的命令行工具。

是一个非常好的辅助性工具软件，后期本博客还会有更加多与inotify嵌合的功能发布！

**一、需求环境**

  Ceotos 6.5 内核2.6.32-431.el6.x86\_64

虚拟机环境下

inotify服务器：192.168.0.244/24          （即主机B）

备用服务器：192.168.0.144/24            （即主机A）

rsync-3.1.2.tar.gz

inotify-tools-3.14.tar.gz

**二、搭建rsync+inotify环境**

  注：在原来的rsync服务器上面即 inotify服务器：192.168.0.244/24 上面开始搭建

**1、先安装好inotify包**

  wget [http://github.com/downloads/rvoicilas/inotify-tools/inotify-tools-3.14.tar.gz](http://github.com/downloads/rvoicilas/inotify-tools/inotify-tools-3.14.tar.gz)

tar zxf inotify-tools-3.14.tar.gz
cd inotify-tools-3.14

 ./configure --prefix=/usr/local/inotify-3.14

make && make install

**2、创建监控脚本inotify.sh**

!/bin/bash

para

host01=192.168.0.144 #rsync服务器地址 src=/backup #本地监控的目录 dst=backup #rsync服务器的模块名称 user=nowview #rsync服务器的虚拟用户 rsync*passfile=/etc/rsyncd.password #本地调用rsync服务的密码文件 inotify*home=/usr/local/inotify-3.14 #inotify的安装目录

judge if \[ ! -e "$src" \] \\ || \[ ! -e "${rsync*passfile}" \] \\ || \[ ! -e "${inotify*home}/bin/inotifywait" \] \\ || \[ ! -e "/usr/bin/rsync" \]; then

echo "Check File and Folder" exit 9 fi ${inotify*home}/bin/inotifywait -mrq --timefmt '%d/%m/%y %H:%M' --format '%T %w%f' -e close*write,delete,create,attrib $src \\ | while read file do # rsync -avzP --delete --timeout=100 --password-file=${rsync*passfile} $src $user@$host01::$dst >/dev/null 2>&1 cd $src && rsync -aruz -R --delete ./ --timeout=100 $user@$host01::$dst --password-file=${rsync*passfile} >/dev/null 2>&1 done exit 0

  脚本创建完毕，丢给后台运行。（开机启动的话放到rc.local文档即可）

sh inotify.sh &

  查看年一下进程

\[root@主机B-244 /\]# ps -ef |grep inotify root 1793 1 0 17:53 ? 00:00:00 sh inotify.sh root 1806 1793 0 17:53 ? 00:00:00 /usr/local/inotify-3.14/bin/inotifywait -mrq --timefmt %d/%m/%y %H:%M --format %T %w%f -e close\_write,delete,create,attrib /backup root 1807 1793 0 17:53 ? 00:00:00 sh inotify.sh root 2032 1843 0 17:58 pts/0 00:00:00 grep --color inotify

  inotify的配置基本如上，更多的功能参数请参考上面的inotify文档网址。

**三、测试**

  现在，在inotify服务器上面可以看到

\[root@主机B-244 backup\]# pwd /backup \[root@主机B-244 backup\]# ls 1 108 117 126 135 144 153 162 171 180 19 199 27 36 45 54 63 72 81 90 asound.conf krb5.conf pm-utils-hd-apm-restore.conf 10 109 118 127 136 145 154 163 172 181 190 2 28 37 46 55 64 73 82 91 cgconfig.conf ld.so.conf request-key.conf 100 11 119 128 137 146 155 164 173 182 191 20 29 38 47 56 65 74 83 92 cgrules.conf libaudit.conf resolv.conf 101 110 12 129 138 147 156 165 174 183 192 200 3 39 48 57 66 75 84 93 cgsnapshot*blacklist.conf libuser.conf rsyslog.conf 102 111 120 13 139 148 157 166 175 184 193 21 30 4 49 58 67 76 85 94 dracut.conf logrotate.conf sestatus.conf 103 112 121 130 14 149 158 167 176 185 194 22 31 40 5 59 68 77 86 95 gai.conf mke2fs.conf sudo.conf 104 113 122 131 140 15 159 168 177 186 195 23 32 41 50 6 69 78 87 96 grub.conf mtools.conf sudo-ldap.conf 105 114 123 132 141 150 16 169 178 187 196 24 33 42 51 60 7 79 88 97 gssapi*mech.conf nfsmount.conf sysctl.conf 106 115 124 133 142 151 160 17 179 188 197 25 34 43 52 61 70 8 89 98 host.conf nsswitch.conf xinetd.conf 107 116 125 134 143 152 161 170 18 189 198 26 35 44 53 62 71 80 9 99 idmapd.conf ntp.conf yum.conf

  我已经在根目录下创建了一个backup目录，立刻创建了如上内容

由于inotify脚本已经在后台运行了，正在实时的监控着这个目录的变化

下面到备用服务器(即原rsync服务器)上面去看看原来的rsync的模块bauckup的路径/home/backup下的情况

\[root@主机A-144 backup\]# pwd /home/backup \[root@主机A-144 backup\]# ll total 0 \[root@主机A-144 backup\]#

  目前还有同步过来，需要时间

  等待……

  再看

\[root@主机A-144 backup\]# ls 1 108 117 126 135 144 153 162 171 180 19 199 27 36 45 54 63 72 81 90 asound.conf krb5.conf pm-utils-hd-apm-restore.conf 10 109 118 127 136 145 154 163 172 181 190 2 28 37 46 55 64 73 82 91 cgconfig.conf ld.so.conf request-key.conf 100 11 119 128 137 146 155 164 173 182 191 20 29 38 47 56 65 74 83 92 cgrules.conf libaudit.conf resolv.conf 101 110 12 129 138 147 156 165 174 183 192 200 3 39 48 57 66 75 84 93 cgsnapshot*blacklist.conf libuser.conf rsyslog.conf 102 111 120 13 139 148 157 166 175 184 193 21 30 4 49 58 67 76 85 94 dracut.conf logrotate.conf sestatus.conf 103 112 121 130 14 149 158 167 176 185 194 22 31 40 5 59 68 77 86 95 gai.conf mke2fs.conf sudo.conf 104 113 122 131 140 15 159 168 177 186 195 23 32 41 50 6 69 78 87 96 grub.conf mtools.conf sudo-ldap.conf 105 114 123 132 141 150 16 169 178 187 196 24 33 42 51 60 7 79 88 97 gssapi*mech.conf nfsmount.conf sysctl.conf 106 115 124 133 142 151 160 17 179 188 197 25 34 43 52 61 70 8 89 98 host.conf nsswitch.conf xinetd.conf 107 116 125 134 143 152 161 170 18 189 198 26 35 44 53 62 71 80 9 99 idmapd.conf ntp.conf yum.conf \[root@主机A-144 backup\]# pwd /home/backup

  这些内容已经同步过来了。

**四、总结**

   关于这个inotify.sh它的这个监控，触发问题。

目前根据我的测试得出的结论是这样的，它的实时同步是建立在当这个被监控的目录/back  一旦生成有文件或者生成任何的东西的情况下，这个脚本就会立刻触发同步更新。当然会根据文件大小、网络以及其他的因素，它的同步会有所时间的差别。

总的来说是inotify服务器目录变化，那么rsync服务器的目录就跟着变化（同步），反过来就不可以了。不过，即便这样已经是满足了现代企业日常的需求了。

[CentOS](https://www.linuxidc.com/topicnews.aspx?tid=14) 6.5 rsync+inotify实现数据实时同步备份 [http://www.linuxidc.com/Linux/2016-11/137655.htm](http://../../Linux/2016-11/137655.htm)

rsync+inotify实现数据的实时同步 [http://www.linuxidc.com/Linux/2017-01/139778.htm](http://../../Linux/2017-01/139778.htm)

rsync+inotify实现服务器之间文件实时同步详解  [http://www.linuxidc.com/Linux/2016-11/137659.htm](http://../../Linux/2016-11/137659.htm)

Rsync结合Inotify 实时同步配置  [http://www.linuxidc.com/Linux/2017-02/140877.htm](http://../../Linux/2017-02/140877.htm)

RSync实现数据备份  [http://www.linuxidc.com/Linux/2017-06/144913.htm](http://../../Linux/2017-06/144913.htm)

inotify+rsync实现数据实时同步  [http://www.linuxidc.com/Linux/2017-10/147901.htm](http://../../Linux/2017-10/147901.htm)

rsync+inotify实现数据的实时备份  [http://www.linuxidc.com/Linux/2016-11/137630.htm](http://../../Linux/2016-11/137630.htm)

rsync+inotify实现数据自动同步  [http://www.linuxidc.com/Linux/2017-03/141717.htm](http://../../Linux/2017-03/141717.htm)

使用rsync实现数据实时同步备份  [http://www.linuxidc.com/Linux/2017-05/143462.htm](http://../../Linux/2017-05/143462.htm)

**Rsync 的详细介绍**：[请点这里](http://../../Linux/2013-10/90806.htm)
**Rsync 的下载地址**：[请点这里](http://../../down.aspx?id=992)

**本文永久更新链接地址**：[http://www.linuxidc.com/Linux/2017-12/149355.htm](http://../../Linux/2017-12/149355.htm)

[![](image_1.9a544c14.png)](http://www.linuxidc.com)

\[

\]([http://www.linuxidc.com](http://www.linuxidc.com))

\[

\]([http://www.linuxidc.com](http://www.linuxidc.com))

[Linux下Nginx+多Tomcat负载均衡实现详解](http://../../Linux/2017-12/149354.htm)

[Apache Phoenix 安装初体验](http://../../Linux/2017-12/149398.htm)

相关资讯       [rsync文件同步](http://../../search.aspx?where=nkey&keyword=15544)  [inotify文件同步](http://../../search.aspx?where=nkey&keyword=55636)

|

- [Rsync实现文件的同步](http://../../Linux/2019-11/161368.htm)  (今 14:55)
- [Sersync+Rsync实现触发式文件同步](http://../../Linux/2017-09/146876.htm)  (09/15/2017 21:51:32)

|

- [Rsync文件同步工具初步搭建及配置](http://../../Linux/2018-02/150803.htm)  (02/07/2018 11:33:49)
- [Linux下利用rsync实现多服务器文件](http://../../Linux/2012-11/74697.htm)  (11/23/2012 14:37:11)

|


本文评论 　　[查看全部评论](http://../../remark.aspx?id=149355) (0)

|

表情：

![](image_2.006f890d.png)

姓名： 匿名 字数

　　　同意评论声明 　　　请登录

评论声明

- 尊重网上道德，遵守中华人民共和国的各项有关法律法规
- 承担一切因您的行为而直接或间接导致的民事或刑事法律责任
- 本站管理人员有权保留或删除其管辖留言中的任意内容
- 本站有权在网站内转载或引用您的评论
- 参与本评论即表明您已经阅读并接受上述条款

|

|

|


最新资讯

- [Rsync实现文件的同步](http://../../Linux/2019-11/161368.htm)
- [VS Code 插件推荐与C/C++配置](http://../../Linux/2019-11/161367.htm)
- [Struct结构体详解](http://../../Linux/2019-11/161366.htm)
- [如何编译安装Linux内核](http://../../Linux/2019-11/161365.htm)
- [CentOS 7下简单搭建DNS服务器](http://../../Linux/2019-11/161364.htm)
- [Microsoft Defender ATP即将进入Linux！ 这](http://../../Linux/2019-11/161363.htm)
- [5G新漏洞可被用于位置追踪和散布虚假警报](http://../../Linux/2019-11/161362.htm)
- [UBports团队倾力打造：主打隐私安全的Volla](http://../../Linux/2019-11/161361.htm)
- [PinePhone开源Linux智能机已用上KDE Plasma](http://../../Linux/2019-11/161360.htm)
- [KDE Plasma 5.17.3桌面环境发布，40多个bug](http://../../Linux/2019-11/161359.htm)

|


[Linux公社简介](https://www.linuxidc.com/aboutus.htm) - [广告服务](https://www.linuxidc.com/adsense.htm) - [网站地图](https://www.linuxidc.com/sitemap.aspx) - [帮助信息](https://www.linuxidc.com/help.htm) - [联系我们](https://www.linuxidc.com/contactus.htm)
本站（LinuxIDC）所刊载文章不代表同意其说法或描述，仅为提供更多信息，也不构成任何建议。
如有版权问题影响到您的权益，请及时与我们取得联系，将会第一时间进行处理。 [联系邮箱:linuxidc22@163.com](mailto:hongfei0601@126.com)

[Linux公社](https://www.linuxidc.com/) - [安卓游戏下载](https://www.linuxidc.com/game/) - [安卓软件下载](https://www.linuxidc.com/soft/) - [游戏专题合集](https://www.linuxidc.com/zt/) - [手机游戏排行榜](https://www.linuxidc.com/top/)
Copyright © 2006-2021　[Linux公社](https://www.linuxidc.com/)　All rights reserved [闽ICP备2022015145号-1](https://beian.miit.gov.cn/#/Integrated/index)

