我的版本

**在恢复之前，先备份新系统当前的 /etc/fstab 文件，以便在需要时可以还原，同时用户要保持一致**

```
|# 先备份/etc/fstab<br>cp /etc/fstab /etc/fstab.backup<br><br># 先备份sshd_config<br>cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak<br><br># 阿里云的话这个也需要恢复<br>cp /etc/sysconfig/network-scripts/ifcfg-eth0 /etc/sysconfig/network-scripts/ifcfg-eth0.bak<br><br># 在原有的linux进行备份 home可不选 home建议单独备份和恢复<br>tar -cvpzf system_backup.tar.gz /etc /var /usr/local /opt<br><br># 在新的linux进行还原<br>cd /<br>cp /path/system_backup.tar.gz .<br>tar -xvpzf system_backup.tar.gz -C /<br><br>选项说明：<br>x: 解压文件。<br>v: 显示详细输出。<br>p: 保留原文件权限。<br>z: 解压 gzip 格式。<br>f: 指定备份文件。<br>-C /: 指定解压到系统根目录 /<br><br># 特殊目录和文件的处理<br>有些系统目录可能会影响系统运行，解压前可以考虑处理一下：<br>/etc/fstab：新系统的磁盘挂载配置可能与备份不一致。在还原后手动检查并调整 /etc/fstab 以确保正确的分区挂载。<br>/boot：如果包含引导文件，需要确保内核版本与新系统兼容，可以根据需要更新 grub。<br>/etc/network/interfaces 或 /etc/sysconfig/network-scripts/：检查并调整网络配置文件以匹配新系统的网络环境。<br><br># 安装jdk17和8<br>yum install zulu17-jdk<br>yum install zulu8-jdk<br># 创建tms<br>useradd tms<br>passwd tms<br>mkdir /home/tms<br><br>chmod 700 /home/tms<br>cp -r /root/.ssh /home/tms/<br>chown tms. /home/tms -R<br><br># home的备份和恢复<br>cd /home/tms<br>tar -cvpzf tms_backup.tar.gz .bash_profile .bashrc .vim .viminfo .zshrc<br>在/home/tms<br>tar -xvpzf tms_backup.tar.gz -C .<br><br>cd /root<br>tar -cvpzf root_backup.tar.gz .bash_profile .bashrc .zshrc<br>在/root<br>tar -xvpzf root_backup.tar.gz -C .<br>||
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-|
```



根据lsblk -f生成新的fstab

```
[root@evendog etc]# lsblk -f
NAME FSTYPE LABEL UUID MOUNTPOINT
nvme0n1
├─nvme0n1p1 vfat F4A4-2D61 /boot/efi
├─nvme0n1p2 xfs a24bd596-91e6-41b6-925f-c4f60796f082 /boot
└─nvme0n1p3 LVM2_member 6ADZCo-rlyf-O7HZ-QfTt-8kPZ-e3eJ-tZEVQs
├─rl-root xfs 275b27df-5411-400e-8ff1-111a852c1566 /
├─rl-swap swap 3718bc46-dfd2-4ad9-ab5f-4c53c8df17cc [SWAP]
└─rl-home xfs 4657a913-a4e4-436a-9727-04bcce2c1654 /home
```





在 /etc/fstab 文件中，每一行代表一个分区的挂载配置，字段如下

```
UUID=partition-uuid mountpoint fstype options dump pass

字段说明

UUID=partition-uuid：
指定分区的唯一标识符（UUID），可通过 lsblk -f 或 blkid 查看。UUID 确保系统重启或设备路径变化时，分区依然会被正确识别。
示例：UUID=xxxx-xxxx

mountpoint：
分区的挂载点，即该分区挂载到的路径。例如 /（根分区）、/home、/boot 等。如果是 swap 分区，则使用 none 作为挂载点。
示例：/，/home，none（用于 swap）

fstype：
文件系统类型，如 ext4、xfs、vfat、swap 等。系统根据文件系统类型确定如何处理该分区。
示例：ext4, swap, vfat

options：
挂载选项，决定分区挂载时的行为。常见值包括：

defaults：使用默认选项（读写权限、自动挂载等）。

noatime：不更新访问时间，适合提升性能。

ro：只读挂载。

rw：读写挂载。

示例：defaults, noatime

dump：
用于系统备份的 dump 工具，通常设置为 0（不备份）或 1（启用备份）。现代系统通常设置为 0。
示例：0

pass：
启动时的文件系统检查顺序。值为：

0：不进行检查（例如 swap 分区）。

1：根分区设置为 1，优先检查。

2：其他分区通常为 2，按顺序检查。

示例：1, 2, 0

UUID=xxxx-xxxx / ext4 defaults 0 1
UUID=yyyy-yyyy /home ext4 defaults 0 2
UUID=zzzz-zzzz none swap sw 0 0
```





测试 /etc/fstab 配置

```
mount -a
```

如果没有任何错误信息，则表示 /etc/fstab 配置正确。



重启并验证

重启系统后，使用 df -h 或 lsblk 检查所有分区是否已按 /etc/fstab 配置正确挂载



