```
sudo tar -cvpzf /ubuntu-backup.tar.gz \
  --exclude=/snap \
  --exclude=/home/$USER/{用户目录下需要排除的文件夹}/ \
  --exclude=/backup.tar.gz \
  --one-file-system /

我用上面这个命令备份了 22G 没出现异常。

你已经贴链接了，再仔细看下里面关于 Tar 备份的说明，有两个注意点：
1. 备份文件放在根目录
2. --one-file-system 参数自动排除一些目录，或者手动指定（具体哪些目录可以看文档）
```



```
/home
/etc
/usr/local
/opt
基本上这几个备份了就大差不差了
```





```
分数据和配置
配置一般主要是
/etc 懒得筛选就全部反正也不大
home 下的 .config 同上
home 下的.zshrc （.bashrc ） 
我还会用包管理器出一个已安装列表
```





