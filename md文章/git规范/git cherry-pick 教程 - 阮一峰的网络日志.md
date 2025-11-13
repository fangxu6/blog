```
      git cherry-pick 教程 - 阮一峰的网络日志
```

阮一峰的网络日志 » [首页](https://www.ruanyifeng.com/blog/) » [档案](https://www.ruanyifeng.com/blog/archives.html)

[![](https://wangbase.com/blogimg/asset/202107/bg2021072117.png)

](/feed.html?utm_source= "订阅Feed")

- 上一篇：[科技爱好者周刊：第 1](https://www.ruanyifeng.com/blog/2020/04/weekly-issue-104.html "科技爱好者周刊：第 104 期")
- 下一篇：[苹果往事：乔布斯和 i](https://www.ruanyifeng.com/blog/2020/04/ipod-history.html "苹果往事：乔布斯和 iPod 的诞生")

分类：

- [开发者手册](https://www.ruanyifeng.com/blog/developer/)
- [⇐ ](https://www.ruanyifeng.com/blog/2020/04/weekly-issue-104.html "科技爱好者周刊：第 104 期")
- [ ⇒](https://www.ruanyifeng.com/blog/2020/04/ipod-history.html "苹果往事：乔布斯和 iPod 的诞生")

= git cherry-pick 教程

作者： [阮一峰](https://www.ruanyifeng.com)

日期： [2020年4月27日](https://www.ruanyifeng.com/blog/2020/04/)

对于多分支的代码库，将代码从一个分支转移到另一个分支是常见需求。

这时分两种情况。一种情况是，你需要另一个分支的所有代码变动，那么就采用合并（`git merge`）。另一种情况是，你只需要部分代码变动（某几个提交），这时可以采用 Cherry pick。

![](https://cdn.beekka.com/blogimg/asset/202004/bg2020042723.jpg)

- 一、基本用法

`git cherry-pick`命令的作用，就是将指定的提交（commit）应用于其他分支。

> ```
>  $ git cherry-pick <commitHash> 
> ```


上面命令就会将指定的提交`commitHash`，应用于当前分支。这会在当前分支产生一个新的提交，当然它们的哈希值会不一样。

举例来说，代码仓库有`master`和`feature`两个分支。

> ```
>  a - b - c - d   Master
>          \
>            e - f - g Feature 
> ```


现在将提交`f`应用到`master`分支。

> ```
>  # 切换到 master 分支 $ git checkout master
> 
> # Cherry pick 操作 $ git cherry-pick f 
> ```


上面的操作完成以后，代码库就变成了下面的样子。

> ```
>  a - b - c - d - f   Master
>          \
>            e - f - g Feature 
> ```


从上面可以看到，`master`分支的末尾增加了一个提交`f`。

`git cherry-pick`命令的参数，不一定是提交的哈希值，分支名也是可以的，表示转移该分支的最新提交。

> ```
>  $ git cherry-pick feature 
> ```


上面代码表示将`feature`分支的最近一次提交，转移到当前分支。

- 二、转移多个提交

Cherry pick 支持一次转移多个提交。

> ```
>  $ git cherry-pick <HashA> <HashB> 
> ```


上面的命令将 A 和 B 两个提交应用到当前分支。这会在当前分支生成两个对应的新提交。

如果想要转移一系列的连续提交，可以使用下面的简便语法。

> ```
>  $ git cherry-pick A..B 
> ```


上面的命令可以转移从 A 到 B 的所有提交。它们必须按照正确的顺序放置：提交 A 必须早于提交 B，否则命令将失败，但不会报错。

注意，使用上面的命令，提交 A 将不会包含在 Cherry pick 中。如果要包含提交 A，可以使用下面的语法。

> ```
>  $ git cherry-pick A^..B 
> ```


- 三、配置项

`git cherry-pick`命令的常用配置项如下。

**（1）`-e`，`--edit`**

打开外部编辑器，编辑提交信息。

**（2）`-n`，`--no-commit`**

只更新工作区和暂存区，不产生新的提交。

**（3）`-x`**

在提交信息的末尾追加一行`(cherry picked from commit ...)`，方便以后查到这个提交是如何产生的。

**（4）`-s`，`--signoff`**

在提交信息的末尾追加一行操作者的签名，表示是谁进行了这个操作。

**（5）`-m parent-number`，`--mainline parent-number`**

如果原始提交是一个合并节点，来自于两个分支的合并，那么 Cherry pick 默认将失败，因为它不知道应该采用哪个分支的代码变动。

`-m`配置项告诉 Git，应该采用哪个分支的变动。它的参数`parent-number`是一个从`1`开始的整数，代表原始提交的父分支编号。

> ```
>  $ git cherry-pick -m 1 <commitHash> 
> ```


上面命令表示，Cherry pick 采用提交`commitHash`来自编号1的父分支的变动。

一般来说，1号父分支是接受变动的分支（the branch being merged into），2号父分支是作为变动来源的分支（the branch being merged from）。

- 四、代码冲突

如果操作过程中发生代码冲突，Cherry pick 会停下来，让用户决定如何继续操作。

**（1）`--continue`**

用户解决代码冲突后，第一步将修改的文件重新加入暂存区（`git add .`），第二步使用下面的命令，让 Cherry pick 过程继续执行。

> ```
>  $ git cherry-pick --continue 
> ```


**（2）`--abort`**

发生代码冲突后，放弃合并，回到操作前的样子。

**（3）`--quit`**

发生代码冲突后，退出 Cherry pick，但是不回到操作前的样子。

- 五、转移到另一个代码库

Cherry pick 也支持转移另一个代码库的提交，方法是先将该库加为远程仓库。

> ```
>  $ git remote add target git://gitUrl 
> ```


上面命令添加了一个远程仓库`target`。

然后，将远程代码抓取到本地。

> ```
>  $ git fetch target 
> ```


上面命令将远程代码仓库抓取到本地。

接着，检查一下要从远程仓库转移的提交，获取它的哈希值。

> ```
>  $ git log target/master 
> ```


最后，使用`git cherry-pick`命令转移提交。

> ```
>  $ git cherry-pick <commitHash> 
> ```


（完）

### 文档信息

- 版权声明：自由转载-非商用-非衍生-保持署名（[创意共享3.0许可证](http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh)）
- 发表日期： 2020年4月27日

- 相关文章

- **2025.03.03: [Trae 国内版出来了，真的好用吗？](https://www.ruanyifeng.com/blog/2025/03/trae.html)**

年初一月份，我就看到新闻，字节面向海外发布了一款 AI IDE，叫做 Trae。

- **2025.01.16: [AI 搞定微信小程序](https://www.ruanyifeng.com/blog/2025/01/tencent-cloud-copilot.html)**

一、前言 AI 生成代码，早不是新鲜事了，但是 AI 生成微信小程序，似乎还不多见。

- **2024.12.02: [AI 应用无代码开发教程：工作流模式详解](https://www.ruanyifeng.com/blog/2024/12/no-code-ai-tutorial.html)**

一、引言 一个月前，我写了一篇《AI 开发的捷径：工作流模式》，引起了很多读者的兴趣。

- **2024.10.31: [AI 开发的捷径：工作流模式](https://www.ruanyifeng.com/blog/2024/10/coze.html)**

一、引言 大部分人使用 AI，大概都跟我一样，停留在初级阶段。


- 广告[（购买广告位）](/support.html)

[云手机](https://www.geelark.cn/?utm_source=ruanyifeng.com&utm_medium=banner&utm_campaign=campaign20250305 "云手机")

- 留言（27条）

niexia 说：

使用和 rebase --onto 很相似

2020年4月27日 21:19 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418040) | [引用](#comment-text "引用niexia的这条留言")

jack 说：

> 引用niexia的发言：
> 使用和 rebase --onto 很相似

rebase的本质和cherry-pick是相同的

2020年4月27日 22:09 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418041) | [引用](#comment-text "引用jack的这条留言")

Chuck Lu 说：

从上面可以看到，master分支的末尾增加了一个提交f。

更精确地说是f'，不是f。因为生成了一个新的commit，和f是不同的commit，仅仅是commit和上一个commit的diff相同(在不冲突的前提下)。

2020年4月27日 22:50 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418042) | [引用](#comment-text "引用Chuck Lu的这条留言")

小贤 说：

前些天，提交代码到测试环境，影响到正在进行的测试任务进度（具体就是我的代码业务导致正在测试业务走不通。。），测试同事让我回滚代码提交。实习生的我还没用过回滚，询问同事给我建议的就是“摘樱桃”，鉴于情况紧急直接提交覆盖了。。。

现在看来“摘樱桃”也不是准确用来回滚的哎

2020年4月28日 09:31 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418044) | [引用](#comment-text "引用小贤的这条留言")

Ryan 说：

> 引用小贤的发言：
> 前些天，提交代码到测试环境，影响到正在进行的测试任务进度（具体就是我的代码业务导致正在测试业务走不通。。），测试同事让我回滚代码提交。实习生的我还没用过回滚，询问同事给我建议的就是“摘樱桃”，鉴于情况紧急直接提交覆盖了。。。
> 现在看来“摘樱桃”也不是准确用来回滚的哎

按描述的理解直接cherry-pick貌似没法解决吧。

可以先revert掉你影响测试的commit，然后重新这段业务的时候，可以cherry-pick -n之前影响测试的commit，然后进行修改后再提交。

2020年4月28日 16:12 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418051) | [引用](#comment-text "引用Ryan的这条留言")

wb 说：

什么时候出个英语教程

2020年4月29日 10:14 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418061) | [引用](#comment-text "引用wb的这条留言")

王奥OX 说：

希望在线练习git-cherry-pick也可以访问《开源中国在线 Git 命令学习》

[https://oschina.gitee.io/learn-git-branching/](https://oschina.gitee.io/learn-git-branching/)

2020年4月30日 10:07 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418089) | [引用](#comment-text "引用王奥OX的这条留言")

王艺谋 说：

阮老师总能化繁为简，抓住重点????，最后合并远程的例子还顺便回顾了操作远程分支的命令

2020年5月12日 22:55 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418281) | [引用](#comment-text "引用王艺谋的这条留言")

牛建强 说：

感觉不信任cherry-pick,尤其是两个分支差异比较大时

2020年5月19日 10:46 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418387) | [引用](#comment-text "引用牛建强的这条留言")

yuchanns 说：

一直用git checkout --patch branch file...

2020年5月19日 14:44 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418391) | [引用](#comment-text "引用yuchanns的这条留言")

summer 说：

求解惑 git cherry-pick --ff 是在什么场景下使用，有何用处？

2020年5月27日 17:59 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-418539) | [引用](#comment-text "引用summer的这条留言")

得得得 说：

有一个案例就好了

2020年6月 5日 18:27 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-419044) | [引用](#comment-text "引用得得得的这条留言")

邱朗 说：

坦率的讲，这是阮老师写的“比较不好”的一篇技术文章：cherry-pick有很严重问题，文章里根本没提到，参见微软Raymond Chen 的文章 [https://devblogs.microsoft.com/oldnewthing/20180312-00/?p=98215](https://devblogs.microsoft.com/oldnewthing/20180312-00/?p=98215)

2020年6月 9日 16:14 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-419108) | [引用](#comment-text "引用邱朗的这条留言")

OOIII 说：

一直在用，经常在不同分支修复问题，即时同步就是用的这个cherry-pick

2020年6月14日 11:32 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-419357) | [引用](#comment-text "引用OOIII的这条留言")

xxoo 说：

> 引用邱朗的发言：
> 坦率的讲，这是阮老师写的“比较不好”的一篇技术文章：cherry-pick有很严重问题，文章里根本没提到，参见微软Raymond Chen 的文章 [https://devblogs.microsoft.com/oldnewthing/20180312-00/?p=98215](https://devblogs.microsoft.com/oldnewthing/20180312-00/?p=98215)

多谢提供扩展阅读

2020年7月29日 10:16 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-420737) | [引用](#comment-text "引用xxoo的这条留言")

大雄 说：

阮老师，$ git cherry-pick A..B

应该是A到B的提交转移，并且不包含B的提交吧

2020年8月 9日 17:26 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-421189) | [引用](#comment-text "引用大雄的这条留言")

生旦净末丑 说：

阮老师总结的很清晰，很赞。

cherry-pick应用需要根据实际场景。

git cherry-pick is a useful tool but not always a best practice. Cherry picking can cause duplicate commits and many scenarios where cherry picking would work, traditional merges are preferred instead. With that said git cherry-pick is a handy tool for a few scenarios...

[https://www.atlassian.com/git/tutorials/cherry-pick](https://www.atlassian.com/git/tutorials/cherry-pick)

2020年11月 6日 13:47 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-423688) | [引用](#comment-text "引用生旦净末丑的这条留言")

hwqlet 说：

实习中，刚好碰到这条命令的使用

2020年11月12日 20:24 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-423748) | [引用](#comment-text "引用hwqlet的这条留言")

粪粪 说：

cherry关键词用的太糟糕了

2020年11月13日 09:07 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-423758) | [引用](#comment-text "引用粪粪的这条留言")

乔 说：

我现在是 A仓库，然后提交了一个文件，然后我想同步到其他B，C等几个仓库咋实现，目录结构都一样的

2021年7月27日 21:29 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-428398) | [引用](#comment-text "引用乔的这条留言")

wyl350 说：

其实很明显的看出来， cherry-pick 被 rebase 方法的给封装了。

2021年7月28日 16:18 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-428413) | [引用](#comment-text "引用wyl350的这条留言")

wfq 说：

cherry pick 挑选分支的提交记录到另一个分支

2021年11月25日 11:29 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-430781) | [引用](#comment-text "引用wfq的这条留言")

冷锋 说：

在a分支的同一个文件commit两次，在b分支cherry-pick a分支的后一个commit，为什么会带上前一个commit的内容呢

2021年12月24日 12:46 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-431398) | [引用](#comment-text "引用冷锋的这条留言")

lei 说：

> 引用粪粪的发言：
> cherry关键词用的太糟糕了

ˈcherry-pick 美 v.

$$ VN , V $$

2022年1月13日 15:48 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-431739) | [引用](#comment-text "引用lei的这条留言")

baiker 说：

很棒，不过有没有更新当前时间戳，还有作者信息的选项

2022年8月27日 10:38 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-434972) | [引用](#comment-text "引用baiker的这条留言")

SaromChars 说：

> 引用王奥OX的发言：
> 希望在线练习git-cherry-pick也可以访问《开源中国在线 Git 命令学习》
> [https://oschina.gitee.io/learn-git-branching/](https://oschina.gitee.io/learn-git-branching/)

和开源中国有鸡毛关系？这也能蹭

原仓库是 [https://github.com/pcottle/learnGitBranching](https://github.com/pcottle/learnGitBranching)

2023年6月29日 19:23 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-438600) | [引用](#comment-text "引用SaromChars的这条留言")

wenxuyang 说：

> 引用冷锋的发言：
> 在a分支的同一个文件commit两次，在b分支cherry-pick a分支的后一个commit，为什么会带上前一个commit的内容呢

因为对比的是他们的公共 祖先吧，a 分支 和 一个 公共祖先做diff ，期间应该包含 ccommit 1的内容

2023年8月22日 14:07 | [#](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html#comment-439347) | [引用](#comment-text "引用wenxuyang的这条留言")

- 我要发表看法

您的留言 （HTML标签部分可用）

您的大名：

«-必填

电子邮件：

«-必填，不公开

个人网址：

«-我信任你，不会填写广告链接

记住个人信息？

**正在发表您的评论，请稍候**

«- 点击按钮

![](https://www.wangbase.com/blogimg/asset/202001/bg2020013101.jpg)

[Weibo](http://weibo.com/ruanyf "微博") | [Twitter](https://twitter.com/ruanyf "Twitter") | [GitHub](https://github.com/ruanyf "GitHub")

Email: [yifeng.ruan@gmail.com](mailto:yifeng.ruan@gmail.com "电子邮件")

