```
 代码质量 - 统一风格：统一代码格式化详解 | Java 全栈知识体系
```

= [#](#代码质量-统一风格-统一代码格式化详解) 代码质量 - 统一风格：统一代码格式化详解

> 项目的代码通常是一个团队共同完成的，要保障代码质量的首要前提就是统一代码的风格，本文将介绍常用的统一风格的措施之**统一代码格式化**。@pdai

- [统一代码格式化](/md/develop/ut/dev-qt-code-style.html#统一代码格式化)
  - [Eclipse code formatter插件](/md/develop/ut/dev-qt-code-style.html#eclipse-code-formatter插件)
  - [其它IDEA统一样式](/md/develop/ut/dev-qt-code-style.html#其它idea统一样式)
  - [统一的注释](/md/develop/ut/dev-qt-code-style.html#统一的注释)


- [#](#统一代码格式化) 统一代码格式化

> 统一风格的第一条，就是要统一代码的格式化，因为不同人提交的代码格式化不一样将导致merge代码造成大几率的冲突；而统一的代码风格无论是对于项目可维护性，还是降低merge冲突都是极为重要的。

通常是两种方式：一种方式是，强制使用同样的IDE工具；另外一个更为常见的是，使用同一种代码格式规范。

### [#](#eclipse-code-formatter插件) Eclipse code formatter插件

最为常用的工具是 **Eclipse code formatter插件**, 用来统一eclipse和IDEA等IDE的代码规范

- **安装Eclipse Code Formatter插件**：

![](https://pdai.tech/images/develop/ut/dev-qt-1.png)

(安装完之后需要重启idea)

- **启用Eclipse Code Formatter**

File->Settings->Other Tools->Eclipse Code Formatter->Use the Eclipse Code Formatter

![](https://pdai.tech/images/develop/ut/dev-qt-2.png)

（相关的formtter.xml配置文件可以到网上下载下或者用eclipse导出下）

### [#](#其它idea统一样式) 其它IDEA统一样式

> 在Eclipse Code Formatter配置后，还是会有其它一些差异的，这时候还需要通过IDEA约定一些设置和一些公共样式的scheme（这里也会同时考虑checkstyle等样式检查工具对代码的要求）

- **配置自动导入包**

![](https://pdai.tech/images/develop/ut/dev-qt-3.png)

- **配置code style**

通常而言，注意下这里几步（当然你可以设置更多，特意截图这几步，主要考虑checkstyle的要求及imports化在不同IDE下的差异），然后保存我一个scheme放到项目根目录下，供所有队员统一使用

![](https://pdai.tech/images/develop/ut/dev-qt-4.png)

### [#](#统一的注释) 统一的注释

- **类文件头的注释**

![](https://pdai.tech/images/develop/ut/dev-qt-5.png)

测试下, 创建一个类TestClass，将自动生成文件头注释

```
/**
 * This class is for xxxx.
 *
 * @author pdai
 * @version 2021/1/20
 */
public class TestClass {
} 
```

当然，如果你发现对已经存在的类进行类注释'/\*\*'时无法自动加入上述注释时，还可以使用Live Template

![](https://pdai.tech/images/develop/ut/dev-qt-6.png)

配置好以后，方法头 输入`A`，然后按TAB键

![](https://pdai.tech/images/develop/ut/dev-qt-7.png)

再按Enter

![](https://pdai.tech/images/develop/ut/dev-qt-8.png)

- **方法的注释**

如果有必要的话，还可以设置下方法的注释（其实我觉得默认就够了）

（参考上述Live Template方式）

[我要纠错](/md/about/me/blog-question.html)

[单元测试 - SpringBoot2+H2+Mockito实战](/md/develop/ut/dev-ut-springboot2.html) [代码质量 - 统一风格：统一命名规范详解](/md/develop/ut/dev-qt-code-style-2.html)

<iframe id="google\_ads\_frame0">

[苏ICP备19053722号](https://beian.miit.gov.cn/) | [pdai](/md/about/me/about-me.html) | copyright © 2017-present

代码质量 - 统一风格：统一代码格式化详解

***

- [统一代码格式化](/md/develop/ut/dev-qt-code-style.html#统一代码格式化)
  - [Eclipse code formatter插件](/md/develop/ut/dev-qt-code-style.html#eclipse-code-formatter插件)
  - [其它IDEA统一样式](/md/develop/ut/dev-qt-code-style.html#其它idea统一样式)
  - [统一的注释](/md/develop/ut/dev-qt-code-style.html#统一的注释)


***

【双11】腾讯云服务器Java全栈读者专享

- 2核2G,4M,40GB, 50元/1年 [查看](https://url.cn/cn5FID7d)
- 2核4G,6M,60GB, 100元/1年 [查看](https://url.cn/cn5FID7d)
- 4核8G,10M,100GB, 300元/1年 [查看](https://url.cn/cn5FID7d)

目录

代码质量 - 统一风格：统一代码格式化详解

***

- [统一代码格式化](/md/develop/ut/dev-qt-code-style.html#统一代码格式化)
  - [Eclipse code formatter插件](/md/develop/ut/dev-qt-code-style.html#eclipse-code-formatter插件)
  - [其它IDEA统一样式](/md/develop/ut/dev-qt-code-style.html#其它idea统一样式)
  - [统一的注释](/md/develop/ut/dev-qt-code-style.html#统一的注释)


手机看

微信扫一扫

![](https://api.qrserver.com/v1/create-qr-code/?data=https://pdai.tech/md/develop/ut/dev-qt-code-style.html)

可以**手机看**或分享至**朋友圈**

全屏看

左栏

交流圈

添加pdai微信进《Java全栈知识体系》学习交流圈「无任何套路」![](https://pdai.tech/pdai.jpg)

PS：添加时请备注**Java全栈**，谢谢！

下资料

扫描公众号，回复“资料”下载10GB+书籍资料「无任何套路」![](https://pdai.tech/pdai_gzh.jpg)

**公众号:** Java全栈知识体系

[

支持我](/md/about/me/about-donate.html)

鼓励/支持/赞赏我

![](https://pdai.tech/pdai-guli.png)

1. 不靠它生存但仍希望得到你的鼓励；

2\. 时刻警醒自己保持技术人的初心，恒心，简单，利他；

（点击右侧❤️可以查看赞赏榜单和用途)


[

面试](/md/interview/x-interview.html)

[

上一篇](/md/develop/ut/dev-ut-springboot2.html)

[

下一篇](/md/develop/ut/dev-qt-code-style-2.html)

站点图

#### [关于我](/md/about/me/about-me.html) [关于站点](/md/about/blog/blog-build-vuepress.html) [最近更新记录](/md/about/me/blog-changelist.html)[问题反馈](/md/about/me/blog-question.html)

|

常用搜索

|

[百度](http://www.baidu.com/ "百度")

[Google](http://www.google.com/ "Google")

[Bing](http://www.bing.com/ "Bing")

[Github](https://github.com "Github")

[搜代码](https://www.programcreek.com/java-api-examples/index.php "搜代码")

|

|

技术社区

|

[CSDN](http://www.csdn.net/ "CSDN")

[博客园](http://www.cnblogs.com/ "博客园")

[OSChina](https://www.oschina.net "OSChina")

[知否](https://segmentfault.com/ "知否")

[掘金](https://juejin.im "掘金")

[Linux公社](https://www.linuxidc.com/ "Linux公社")

[IBM 开发者](https://www.ibm.com/developerworks/cn/ "IBM 开发者")

[StackOverflow](https://stackoverflow.com "StackOverflow")

|

|

Java相关

| [面向对象基础](/md/java/basic/java-basic-oop.html)[语法基础](/md/java/basic/java-basic-lan-basic.html)[集合框架](/md/java/collection/java-collection-all.html)[并发基础](/md/java/thread/java-thread-x-overview.html)[并发关键字](/md/java/thread/java-thread-x-key-synchronized.html)[JUC并发框架](/md/java/thread/java-thread-x-juc-overview.html)[IO框架](/md/java/io/java-io-overview.html)[Java8 特性](/md/java/java8/java8.html)[JVM基础](/md/java/jvm/java-jvm-x-overview.html)[调试排错](/md/java/jvm/java-jvm-param.html)[更多资源](/md/java/others/java-others-awesome-java.html) |

|

算法相关

| [数组与线性表](/md/algorithm/alg-basic-array.html)[树详解](/md/algorithm/alg-basic-tree.html)[图详解](/md/algorithm/alg-basic-graph.html)[内部排序](/md/algorithm/alg-sort-overview.html)[算法思想](/md/algorithm/alg-core-divide-and-conquer.html)[安全算法](/md/algorithm/alg-domain-security-degist.html)[大数据处理](/md/algorithm/alg-domain-bigdata-overview.html)[分布式算法](/md/algorithm/alg-domain-distribute-overview.html)[负载均衡算法](/md/algorithm/alg-domain-load-balance.html)[推荐算法](/md/algorithm/alg-domain-suggest.html)[头脑风暴](/md/algorithm/alg-other-mind.html) |

|

数据库相关

| [数据库原理](/md/db/sql/sql-db-howitworks.html)[SQL语言](/md/db/sql-lan/sql-lan.html)[MySQL相关](/md/db/sql-mysql/sql-mysql-theory.html)[MongoDB](/md/db/nosql-mongo/mongo-performance-improve.html)[ElasticSearch](/md/db/nosql-es/elasticsearch.html) |

|

开发基础相关

| [常用类库](/md/develop/package/dev-package-x-apache-common.html)[单元测试](/md/develop/ut/dev-ut-x-junit.html)[正则表达式](/md/develop/regex/dev-regex-all.html)[网络协议](/md/develop/protocol/dev-protocol-overview.html)[安全相关](/md/develop/security/dev-security-overview.html)[常见重构技巧](/md/develop/refactor/dev-refactor-if-else.html) |

|

架构相关

| [架构基础](/md/arch/arch-x-basic.html)[架构视角](/md/arch/arch-x-view.html)[架构演进](/md/arch/arch-x-evolution.html)[架构模式和要素](/md/arch/arch-x-pattern.html)[高并发之缓存](/md/arch/arch-y-cache.html)[高并发之限流](/md/arch/arch-y-ratelimit.html)[高并发之降级](/md/arch/arch-y-reduce.html)[负载均衡](/md/arch/arch-y-loadbalance.html)[容灾备份](/md/arch/arch-y-backup.html)[架构安全](/md/arch/arch-x-security.html)[秒杀系统设计](/md/arch/arch-example-seckill.html)[架构案例](/md/arch/arch-example-goods-detail.html) |

|

工具和部署

| [工具集合](/md/devops/tool/tool-list-overview.html)[IDE相关](/md/devops/tool/tool-ide.html)[Git](/md/devops/tool/tool-git.html)[Maven](/md/devops/tool/tool-maven.html)[Linux](/md/devops/linux/linux.html)[Docker](/md/devops/docker/docker-00-overview.html) |

|

方法论

| [SOLID](/md/dev-spec/spec/dev-th-solid.html)[CAP](/md/dev-spec/spec/dev-th-cap.html)[BASE](/md/dev-spec/spec/dev-th-base.html)[开源协议](/md/dev-spec/spec/dev-opensource.html)[代码规范](/md/dev-spec/code-style/code-style-alibaba.html)[设计模式](/md/dev-spec/pattern/1_overview.html) |

|

产品和团队

| [产品相关](/md/team/team-z-wechat.html)[团队相关](/md/team/team-z-task-emergency.html)[其它分享](/md/team/team-z-arch-future.html) |

