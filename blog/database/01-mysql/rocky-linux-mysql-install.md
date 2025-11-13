2、Rocky Linux 9.4 安装 MySQL 8.4.0 - 自如初

[![](https://ziruchu.com/static/images/logo/logo.png)

自如初](https://ziruchu.com)

Search icon

搜索

- [图书](#tabs-home01)
- [文章](#tabs-profile01)

关闭页面

[登录](https://ziruchu.com/login) [注册](https://ziruchu.com/register)

- [图书](https://ziruchu.com/books)
- [资源](https://ziruchu.com/learning-resources)
- [分类](https://ziruchu.com/category)

= 2、Rocky Linux 9.4 安装 MySQL 8.4.0

作者: 温新

图书: [【Rocky Linux 9 二进制安装 LNMP】](https://ziruchu.com/books?slug=rocky94-lnmp)

阅读: 2385

时间: 2025-09-25 10:27:40

###### 1、更新软件包

```
$ sudo dnf upgrade --refresh -y 
```

###### 2、导入社区版 rpm

```
$ sudo rpm -ivh https://dev.mysql.com/get/mysql84-community-release-el9-1.noarch.rpm 
```

###### 3、安装 MySQL 8.4.0

```
$ sudo dnf install perl
# 安装 MySQL 8.4.0 并禁用仓库中的 Mysql，若不禁用会导致冲突
sudo dnf install --disablerepo=appstream mysql-community-server 
```

###### 4、查看 MySQL 版本

```
$ sudo mysql --version
mysql  Ver 8.4.0 for Linux on x86_64 (MySQL Community Server - GPL) 
```

###### 5、启动 MySQL

设置开机自启

```
$ sudo systemctl enable mysqld --now 
```

查看 MySQL 状态

```
$ sudo systemctl status mysqld 
```

###### 6、登录 MySQL

查看密码

```
$ sudo cat /var/log/mysqld.log | grep password
2024-06-16T17:11:07.603728Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: lVjHFfSON7!- 
```

登录 MySQL

```
$ sudo  mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.4.0 
```

###### 7、修改密码

```
mysql> alter user 'root'@'localhost' identified by "QqH123456**";
Query OK, 0 rows affected (0.01 sec) 
```

MySQL 8.4.0 中，登录后必须修改一次密码才能进行其他操作。开发环境中，为了方便操作，把密码设置得简单一点，切记：如下操作只在开发环境中进行。

```
mysql> set global validate_password.policy=0;
Query OK, 0 rows affected (0.00 sec)
mysql> set global validate_password.length=6;
Query OK, 0 rows affected (0.00 sec)

# 再次用户密码
mysql> alter user 'root'@'localhost' identified by "123456";
Query OK, 0 rows affected (0.00 sec) 
```

###### 8、创建远程登录用户

```
mysql> create user root@'%' identified by '123456';
Query OK, 0 rows affected (0.09 sec)

mysql> grant all privileges on *.* to root@'%';
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

# 可以把不用的用户删除掉
mysql> select user,host from mysql.user;
+------------------+-----------+
| user             | host      |
+------------------+-----------+
| root             | %         |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
5 rows in set (0.00 sec) 
```

###### 9、开发 3306 端口

```
$ sudo systemctl start firewalld

# 开放 3306
$ firewall-cmd --zone=public --add-port=3306/tcp --permanent
# 重载
$ sudo firewall-cmd --reload
# 查看开放端口
$ sudo firewall-cmd --list-ports

$ sudo systemctl stop firewalld.service 
```

请登录后再评论

评论

[自如初](https://flowbite.com/)

小伙伴们：

- [系统运维](https://www.osyunwei.com/)

- 微信号

![](https://ziruchu.com/static/images/wechat.jpg)

- 站点信息

上线时间：2019-01-01

文章总数：791

***

© 2023 [自如初™](https://www.ziruchu.com/) . 版权所有，请勿侵权.

[鄂 ICP 备 18023956 号-2](http://beian.miit.gov.cn) [![](https://ziruchu.com/static/images/beian.png)

渝公网安备 50010602501655 号](http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50010602501655)

