```
      Git 工作流程 - 阮一峰的网络日志
```

阮一峰的网络日志 » [首页](http://www.ruanyifeng.com/blog/) » [档案](http://www.ruanyifeng.com/blog/archives.html)

[![](https://wangbase.com/blogimg/asset/202107/bg2021072117.png)

](/feed.html?utm_source= "订阅Feed")

- 上一篇：[有没有安全的工作？  ](http://www.ruanyifeng.com/blog/2015/12/safe-job.html "有没有安全的工作？")
- 下一篇：[网站的肥胖症危机   ](http://www.ruanyifeng.com/blog/2016/01/website-obesity-crisis.html "网站的肥胖症危机")

分类：

- [开发者手册](http://www.ruanyifeng.com/blog/developer/)
- [⇐ ](http://www.ruanyifeng.com/blog/2015/12/safe-job.html "有没有安全的工作？")
- [ ⇒](http://www.ruanyifeng.com/blog/2016/01/website-obesity-crisis.html "网站的肥胖症危机")

= Git 工作流程

作者： [阮一峰](http://www.ruanyifeng.com)

日期： [2015年12月24日](http://www.ruanyifeng.com/blog/2015/12/)

Git 作为一个源码管理系统，不可避免涉及到多人协作。

协作必须有一个规范的工作流程，让大家有效地合作，使得项目井井有条地发展下去。"工作流程"在英语里，叫做"workflow"或者"flow"，原意是水流，比喻项目像水流那样，顺畅、自然地向前流动，不会发生冲击、对撞、甚至漩涡。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122301.png)

本文介绍三种广泛使用的工作流程：

> - Git flow
> - Github flow
> - Gitlab flow

如果你对Git还不是很熟悉，可以先阅读下面的文章。

> - [《Git 使用规范流程》](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html)
> - [《常用 Git 命令清单》](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
> - [《Git 远程操作详解》](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)

- 一、功能驱动

本文的三种工作流程，有一个共同点：都采用["功能驱动式开发"](https://en.wikipedia.org/wiki/Feature-driven_development)（Feature-driven development，简称FDD）。

它指的是，需求是开发的起点，先有需求再有功能分支（feature branch）或者补丁分支（hotfix branch）。完成开发后，该分支就合并到主分支，然后被删除。

- 二、Git flow

最早诞生、并得到广泛采用的一种工作流程，就是[Git flow](http://nvie.com/posts/a-successful-git-branching-model/) 。

### 2.1 特点

它最主要的特点有两个。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122302.png)

首先，项目存在两个长期分支。

> - 主分支`master`
> - 开发分支`develop`

前者用于存放对外发布的版本，任何时候在这个分支拿到的，都是稳定的分布版；后者用于日常开发，存放最新的开发版。

其次，项目存在三种短期分支。

> - 功能分支（feature branch）
> - 补丁分支（hotfix branch）
> - 预发分支（release branch）

一旦完成开发，它们就会被合并进`develop`或`master`，然后被删除。

Git flow 的详细介绍，请阅读我翻译的中文版[《Git 分支管理策略》](http://www.ruanyifeng.com/blog/2012/07/git.html)。

### 2.2 评价

Git flow的优点是清晰可控，缺点是相对复杂，需要同时维护两个长期分支。大多数工具都将`master`当作默认分支，可是开发是在`develop`分支进行的，这导致经常要切换分支，非常烦人。

更大问题在于，这个模式是基于"版本发布"的，目标是一段时间以后产出一个新版本。但是，很多网站项目是"持续发布"，代码一有变动，就部署一次。这时，`master`分支和`develop`分支的差别不大，没必要维护两个长期分支。

- 三、Github flow

[Github flow](http://scottchacon.com/2011/08/31/github-flow.html) 是Git flow的简化版，专门配合"持续发布"。它是 Github.com 使用的工作流程。

### 3.1 流程

它只有一个长期分支，就是`master`，因此用起来非常简单。

官方推荐的[流程](https://guides.github.com/introduction/flow/index.html)如下。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122305.png)

> 第一步：根据需求，从`master`拉出新分支，不区分功能分支或补丁分支。
> 第二步：新分支开发完成后，或者需要讨论的时候，就向`master`发起一个[pull request](https://help.github.com/articles/using-pull-requests/)（简称PR）。
> 第三步：Pull Request既是一个通知，让别人注意到你的请求，又是一种对话机制，大家一起评审和讨论你的代码。对话过程中，你还可以不断提交代码。
> 第四步：你的Pull Request被接受，合并进`master`，重新部署后，原来你拉出来的那个分支就被删除。（先部署再合并也可。）

### 3.2 评价

Github flow 的最大优点就是简单，对于"持续发布"的产品，可以说是最合适的流程。

问题在于它的假设：`master`分支的更新与产品的发布是一致的。也就是说，`master`分支的最新代码，默认就是当前的线上代码。

可是，有些时候并非如此，代码合并进入`master`分支，并不代表它就能立刻发布。比如，苹果商店的APP提交审核以后，等一段时间才能上架。这时，如果还有新的代码提交，`master`分支就会与刚发布的版本不一致。另一个例子是，有些公司有发布窗口，只有指定时间才能发布，这也会导致线上版本落后于`master`分支。

上面这种情况，只有`master`一个主分支就不够用了。通常，你不得不在`master`分支以外，另外新建一个`production`分支跟踪线上版本。

- 四、Gitlab flow

[Gitlab flow](http://doc.gitlab.com/ee/workflow/gitlab_flow.html) 是 Git flow 与 Github flow 的综合。它吸取了两者的优点，既有适应不同开发环境的弹性，又有单一主分支的简单和便利。它是 Gitlab.com 推荐的做法。

### 4.1 上游优先

Gitlab flow 的最大原则叫做"上游优先"（upsteam first），即只存在一个主分支`master`，它是所有其他分支的"上游"。只有上游分支采纳的代码变化，才能应用到其他分支。

[Chromium项目](https://www.chromium.org/chromium-os/chromiumos-design-docs/upstream-first)就是一个例子，它明确规定，上游分支依次为：

> 1. Linus Torvalds的分支
> 2. 子系统（比如netdev）的分支
> 3. 设备厂商（比如三星）的分支

### 4.2 持续发布

Gitlab flow 分成两种情况，适应不同的开发流程。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122306.png)

对于"持续发布"的项目，它建议在`master`分支以外，再建立不同的环境分支。比如，"开发环境"的分支是`master`，"预发环境"的分支是`pre-production`，"生产环境"的分支是`production`。

开发分支是预发分支的"上游"，预发分支又是生产分支的"上游"。代码的变化，必须由"上游"向"下游"发展。比如，生产环境出现了bug，这时就要新建一个功能分支，先把它合并到`master`，确认没有问题，再`cherry-pick`到`pre-production`，这一步也没有问题，才进入`production`。

只有紧急情况，才允许跳过上游，直接合并到下游分支。

### 4.3 版本发布

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122307.png)

对于"版本发布"的项目，建议的做法是每一个稳定版本，都要从`master`分支拉出一个分支，比如`2-3-stable`、`2-4-stable`等等。

以后，只有修补bug，才允许将代码合并到这些分支，并且此时要更新小版本号。

- 五、一些小技巧

### 5.1 Pull Request

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122310.png)

功能分支合并进`master`分支，必须通过Pull Request（Gitlab里面叫做 Merge Request）。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122308.png)

前面说过，Pull Request本质是一种对话机制，你可以在提交的时候，`@`相关[人员](https://github.com/blog/1004-mention-autocompletion)或[团队](https://github.com/blog/1121-introducing-team-mentions)，引起他们的注意。

### 5.2 Protected branch

`master`分支应该受到保护，不是每个人都可以修改这个分支，以及拥有审批 Pull Request 的权力。

[Github](https://help.github.com/articles/about-protected-branches/) 和 [Gitlab](http://doc.gitlab.com/ce/permissions/permissions.html) 都提供"保护分支"（Protected branch）这个功能。

### 5.3 Issue

Issue 用于 Bug追踪和需求管理。建议先新建 Issue，再新建对应的功能分支。功能分支总是为了解决一个或多个 Issue。

功能分支的名称，可以与issue的名字保持一致，并且以issue的编号起首，比如"15-require-a-password-to-change-it"。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122311.png)

开发完成后，在提交说明里面，可以写上"fixes #14"或者"closes #67"。Github规定，只要commit message里面有下面这些[动词](https://help.github.com/articles/closing-issues-via-commit-messages/) + 编号，就会关闭对应的issue。

> - close
> - closes
> - closed
> - fix
> - fixes
> - fixed
> - resolve
> - resolves
> - resolved

这种方式还可以一次关闭多个issue，或者关闭其他代码库的issue，格式是`username/repository#issue_number`。

Pull Request被接受以后，issue关闭，原始分支就应该删除。如果以后该issue重新打开，新分支可以复用原来的名字。

### 5.4 Merge节点

Git有两种合并：一种是"直进式合并"（fast forward），不生成单独的合并节点；另一种是"非直进式合并"（none fast-forword），会生成单独节点。

前者不利于保持commit信息的清晰，也不利于以后的回滚，建议总是采用后者（即使用`--no-ff`参数）。只要发生合并，就要有一个单独的合并节点。

### 5.5 Squash 多个commit

为了便于他人阅读你的提交，也便于`cherry-pick`或撤销代码变化，在发起Pull Request之前，应该把多个commit合并成一个。（前提是，该分支只有你一个人开发，且没有跟`master`合并过。）

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015122309.png)

这可以采用`rebase`命令附带的`squash`操作，具体方法请参考我写的[《Git 使用规范流程》](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html)。

（完）

### 文档信息

- 版权声明：自由转载-非商用-非衍生-保持署名（[创意共享3.0许可证](http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh)）
- 发表日期： 2015年12月24日

- 相关文章

- **2024.12.02: [AI 应用无代码开发教程：工作流模式详解](http://www.ruanyifeng.com/blog/2024/12/no-code-ai-tutorial.html)**

一、引言 一个月前，我写了一篇《AI 开发的捷径：工作流模式》，引起了很多读者的兴趣。

- **2024.10.31: [AI 开发的捷径：工作流模式](http://www.ruanyifeng.com/blog/2024/10/coze.html)**

一、引言 大部分人使用 AI，大概都跟我一样，停留在初级阶段。

- **2024.09.11: [白话多集群：工具和应用助手](http://www.ruanyifeng.com/blog/2024/09/tke-appfabric.html)**

一、引言 上周，我参加了腾讯全球数字生态大会。 今天，就跟大家分享，我的一点收获，就是理解了多集群工具。

- **2024.07.03: [AI 编程助手测评：GitHub Copilot vs 豆包 MarsCode](http://www.ruanyifeng.com/blog/2024/07/copilot-vs-marscode.html)**

一、引言 AI 怎么用于编程？


- 留言（34条）

adam8157 说：

4.1节说的应该是Linux kernel项目吧

2015年12月24日 14:47 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353501) | [引用](#comment-text "引用adam8157的这条留言")

笨狗 说：

> 引用adam8157的发言：
> 4.1节说的应该是Linux kernel项目吧

点开链接看就会发现没有说错, 那个说的是 Chrome OS 不是 Chrome Browser

2015年12月24日 15:31 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353503) | [引用](#comment-text "引用笨狗的这条留言")

杰子 说：

感谢整理

2015年12月24日 15:34 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353505) | [引用](#comment-text "引用杰子的这条留言")

Tinyhui.Wang 说：

以上的流程能够支持多个功能分支、bug分支的同时进行吗？当某个分支完成开发之后，测试工作在哪里进行，版本发布之前的测试还需要吗？

2015年12月24日 15:38 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353506) | [引用](#comment-text "引用Tinyhui.Wang的这条留言")

Paul 说：

受益匪浅, 先提个小bug

\> 第二步：新分支开发完成后，或者需要讨论的时候，就向master发起一个pull reqest（简称PR）。

reqest -> request

一个疑问望阮大赐教:

第四种Gitlab flow模式 生产环境 总在 cherry-pick 开发环境, 在团队开发中会不会有漏 cherry-pick 的情况, 而且 cherry-pick 的 commit-id 会变, 会不会导致两个分支间的差异越来越大

2015年12月24日 18:51 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353529) | [引用](#comment-text "引用Paul的这条留言")

石樱灯笼 说：

Gitlab flow的这个方法好啊，既把git的优势都体现出来了，同时又不会出现github flow过于简单而存在的问题。

2015年12月25日 08:57 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353543) | [引用](#comment-text "引用石樱灯笼的这条留言")

阮一峰 说：

> 引用Paul的发言：
> 第四种Gitlab flow模式 生产环境 总在 cherry-pick 开发环境, 在团队开发中会不会有漏 cherry-pick 的情况, 而且 cherry-pick 的 commit-id 会变, 会不会导致两个分支间的差异越来越大

理论上讲，所有commit都应该 cherry-pick 到生产环境的分支，所以它跟master分支最终不应该有区别。

如果有多个生产环境，最佳的做法是每个生产环境建一个代码仓库。

2015年12月25日 09:21 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353545) | [引用](#comment-text "引用阮一峰的这条留言")

ky 说：

圣诞快乐～阮老师～

2015年12月25日 11:02 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353551) | [引用](#comment-text "引用ky的这条留言")

御宅暴君 说：

看你天天写 tutorial 和 demo, 几年了该还不会停留在这入门层次上吧？

2015年12月25日 11:32 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353555) | [引用](#comment-text "引用御宅暴君的这条留言")

Floyd 说：

阮一峰你好，

久仰大名，直接给你发过邮件，你都没给我回，所以想还是在你经常发博文的地方留言吧。

我来自极客学院Wiki： [http://wiki.jikexueyuan.com](http://wiki.jikexueyuan.com) 我们是一个专门托管、展示IT技术类文档、博客和文章的平台，目前，我们每天都有1W+个对IT技术感兴趣的读者来到我们平台查看Wiki。

非常希望能邀请你将你的优秀博文放到Wiki上托管展示，让更多的对IT感兴趣的人们能看到你的文章。如果你能够同意，我们也会帮助你来整理，协助上线，上线后我们会为你署名，也会为你的网站做宣传，虽然知道有时你的名字已经非常大了：）

期待回复，如果感兴趣，可以发送邮件到wiki@jikexueyuan.com 我们会第一时间回复

2015年12月25日 14:46 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353558) | [引用](#comment-text "引用Floyd的这条留言")

阮一峰 说：

@Floyd：

商业性使用需要付费。

2015年12月25日 15:40 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353559) | [引用](#comment-text "引用阮一峰的这条留言")

Floyd 说：

@阮一峰，

了解，对你的文章很感兴趣，请加QQ：345777566 详聊商业付费

2015年12月26日 22:48 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353577) | [引用](#comment-text "引用Floyd的这条留言")

张木头 说：

@阮大师

你好，关于发布流程，我还是觉得有点麻烦，其实最主要的还是当master作为发布分支使用的时候，总是跟生产代码会有一个时间差在，所以能解决这个问题就是根本，但是如果因为这个问题，需要有很多的分支来协作，感觉也未必是一个简单且好用的方案吧

2015年12月30日 23:03 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353666) | [引用](#comment-text "引用张木头的这条留言")

小徐 说：

Floyd,你这样交流，作为第三者看着都不舒服

2016年1月 4日 23:26 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353754) | [引用](#comment-text "引用小徐的这条留言")

南靖男 说：

> 引用Tinyhui.Wang的发言：
> 以上的流程能够支持多个功能分支、bug分支的同时进行吗？当某个分支完成开发之后，测试工作在哪里进行，版本发布之前的测试还需要吗？

GitLab 8.0 以上版本就内置 CI，强调就是测试优先。发起合并请求时需要先提交功能分支，功能分支被提交之后就会被 CI 测试。

预发布和产品分支除了有自动部署外，也可以重复测试。

多个功能分支，多个补丁分支可以同时存在，这是 git 特性。

GitLab flow 的特点只是定义了特殊的分支，然后其他分支必须是线上合并请求。

强调的是持续集成测试和代码审查。

2016年1月 6日 19:45 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353817) | [引用](#comment-text "引用南靖男的这条留言")

xirong 说：

挺不错的，在对于 git 工作流的探讨中，我在 github 上专门整理了一个 repo，来记录，跟阮老师的理念相同，更多了一些例子和细节：https://github.com/xirong/my-git/blob/master/git-workflow-tutorial.md

2016年1月 7日 21:58 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-353852) | [引用](#comment-text "引用xirong的这条留言")

翰弟 说：

"上游优先"（upsteam first）,应该是 upstream first吧

2017年6月23日 17:52 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-378158) | [引用](#comment-text "引用翰弟的这条留言")

huangxiaoxie 说：

请教一下，你这些图是用什么工具画的嗯？

2017年8月17日 14:02 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-379607) | [引用](#comment-text "引用huangxiaoxie的这条留言")

enomine 说：

> 引用huangxiaoxie的发言：
> 请教一下，你这些图是用什么工具画的嗯？

第一张使用Keynote画的

2017年11月 1日 17:37 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-381883) | [引用](#comment-text "引用enomine的这条留言")

王洁玉 说：

勘误：upsteam => upstream

2017年12月25日 16:42 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-383582) | [引用](#comment-text "引用王洁玉的这条留言")

helingfeng 说：

您好，

工作流程中，有一点疑问向你讨教

1\. Gitflow 本身是否支持多个Feature分支同时预发布？若是多个Feature同时预发布是不是意味着会有Release1,Release2...不同的预发布分支？

2018年4月10日 09:56 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-387798) | [引用](#comment-text "引用helingfeng的这条留言")

way 说：

多个功能分支同时开发（如：A/B/C 3个分支），如果按照当前形式，abc合并到master后， 想法不发现a功能分支有问题，bc没有问题，导致bc无法发布。 出现要在主干剔除a代码，好麻烦。

对于多功能分支，并行开发场景， 有什么好实践

2018年4月19日 17:47 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-388115) | [引用](#comment-text "引用way的这条留言")

stupidism 说：

> 引用阮一峰的发言：
> 理论上讲，所有commit都应该 cherry-pick 到生产环境的分支，所以它跟master分支最终不应该有区别。
> 如果有多个生产环境，最佳的做法是每个生产环境建一个代码仓库。

如果所有 commit 都要 cherry-pick 到生产环境的分支, 那为何不直接用 PR 来合并呢?

甚至可以更加极端一点, 通过 tag 来部署, 不需要 pre-production 和 production 分支

即使需要 hotfix, 也可以从 tag 切出新分支来做这件事情

2018年5月 7日 11:20 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-388629) | [引用](#comment-text "引用stupidism的这条留言")

love7 说：

大神，今天遇到一个问题，想了很久没有想明白，想问一下：

项目在github上，A提交了代码，等待审核，B提交了代码等待审核，当和入A的代码之后再和入B的代码就有冲突了，这个时候可以用什么方式解决呀？

2018年11月 1日 19:42 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-394608) | [引用](#comment-text "引用love7的这条留言")

ViMColD 说：

> 引用love7的发言：
> 大神，今天遇到一个问题，想了很久没有想明白，想问一下：
> 项目在github上，A提交了代码，等待审核，B提交了代码等待审核，当和入A的代码之后再和入B的代码就有冲突了，这个时候可以用什么方式解决呀？

rebase or merge

2018年11月16日 19:40 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-395079) | [引用](#comment-text "引用ViMColD的这条留言")

Paul Han 说：

> 引用way的发言：
> 多个功能分支同时开发（如：A/B/C 3个分支），如果按照当前形式，abc合并到master后， 想法不发现a功能分支有问题，bc没有问题，导致bc无法发布。 出现要在主干剔除a代码，好麻烦。
> 对于多功能分支，并行开发场景， 有什么好实践

1\. 没测完的 feature 或者 hotfix 不允许合并 dev 或者 master 分支

2\. 多功能联调测试，需要将 a,b 分支合并至 dev 切出来的分支，而不是合并进 dev

3\. 合并进 dev 时出现问题

3.1 合并时请使用 rebase 或者 squash，然后及时删除你的分支，有改动从 dev 切。出现问题 revert

3.2 合并时采用了普通的 merge，属于测试失误，只能通过 hotfix 进行改动

2019年6月27日 19:20 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-411925) | [引用](#comment-text "引用Paul Han的这条留言")

Seven 说：

阮老师，请教一个问题：Gitlab请求合并如果有冲突的时候，如果使用在线解决会出现反向合并的问题,在gitlab官方也查到有相关issue：

[https://gitlab.com/gitlab-org/gitlab-ce/issues/24857，https://gitlab.com/gitlab-org/gitlab-ce/issues/21947，请老师给解答下，本人困惑很久了，谢谢。](https://gitlab.com/gitlab-org/gitlab-ce/issues/24857，https://gitlab.com/gitlab-org/gitlab-ce/issues/21947，请老师给解答下，本人困惑很久了，谢谢。)

2019年7月 2日 16:39 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-412020) | [引用](#comment-text "引用Seven的这条留言")

Steven 说：

您好， 感谢分享， 发现一个疑似错别字：

前者用于存放对外发布的版本，任何时候在这个分支拿到的，都是稳定的\[分\]布版；后者用于日常开发，存放最新的开发版。

上面的\[分\]布版是否应该改成(发)布版？

谢谢

2019年9月29日 10:01 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-413772) | [引用](#comment-text "引用Steven的这条留言")

kei 说：

分支的示意图是用什么工具画的啊

2019年11月25日 19:16 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-414756) | [引用](#comment-text "引用kei的这条留言")

xkx 说：

> 引用helingfeng的发言：
> 您好，
> 工作流程中，有一点疑问向你讨教
> 1\. Gitflow 本身是否支持多个Feature分支同时预发布？若是多个Feature同时预发布是不是意味着会有Release1,Release2...不同的预发布分支？

有同样的疑问，多个feature同时进行，具体发布哪个拿不准时，需要对feature的各种可能的组合都单独进行测试，比如

当前有3个特性分支

f-a

f-b

f-c

根据3个特性的特点，可能的发布组合有 a+b+c, a+c 两种

那么发布分支需要有两个

r-a-b-c

r-a-c

然而，gitflow要求release分支必须从develop分支获取

那就意味着abc三个特性都需要先合并到develop

而develop分支只能有一个，岂不是互相污染，r-a-c做不到了啊

换个思路，发布/测试分支另做两个倒是可以

f-a-b-c

f-a-c

但是这样的话，还要release分支干啥呢，用不着专门定义个release分支了

2019年12月 3日 10:00 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-414863) | [引用](#comment-text "引用xkx的这条留言")

this is zack 说：

”生产环境出现了bug，这时就要新建一个功能分支，先把它合并到master“ 请问这个功能分支是从production分支迁出的还是从master迁出的? 我觉要从production分支迁出比较合理.

2020年3月13日 09:33 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-416835) | [引用](#comment-text "引用this is zack的这条留言")

欧冶子 说：

“三、Github flow 可是，有些时候并非如此，代码合并进入master分支，并不代表它就能立刻发布。比如，苹果商店的APP提交审核以后，等一段时间才能上架。这时，如果还有新的代码提交，master分支就会与刚发布的版本不一致”。

老师好，我觉得用github flow管理分支版本是最好用的。你这里出现上面这个原因是因为你上线发布是从master获取代码导致的，其实公司一般是从Dev里面获取代码直接上线的。流程如下：

1 开发过程中，在Dev一边开发一遍测试（可以保障测试在代码开发阶段不会闲着，这个时候是粗粒度的测试，可以做到对需求的开发方向不会跑偏，一些有争论的地方在开发阶段测试和开发就能达成一些共识或者反映给领导）。

2 开发结束，正式测试阶段。细粒度的测试和开发改bug。

3 测试结束，上线。 直接从Dev获取代码上线，因为上线过程中还会有线上测试，可能会有频繁的修改（环境问题，或者测试过程中漏掉的问题等等），一般上线的过程中还在频繁的修改代码的情况是挺多的，所以直接从Dev获取代码上线，上线成功之后才会把代码合并到master（APP需要审批时间，也可以从Dev获取代码发布，发布成功后再合并到master）。

4 合并到master（如果先合并到master再发布的话会多了很多步骤，比如：Dev已经测好了，合并到master之后又要测试，因为合并过程中会有代码冲突的解决和一些代码的调整，还有上线的过程中可能频繁的修改代码，又会造成频繁的合并master和测试）

所以我觉得按照以上流程是最简单的。

2020年5月19日 11:43 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-418389) | [引用](#comment-text "引用欧冶子的这条留言")

yangming 说：

typo: upsteam → upstream

另，谢谢大佬的分享！

2023年11月22日 08:43 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-440386) | [引用](#comment-text "引用yangming的这条留言")

Lucas 说：

squash应该由开发分支开发者在该分支最后一次次提交的时候进行 squash, 还是由 main 分支管理员在批准 PR 的时候进行 squash

2024年11月 6日 18:41 | [#](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html#comment-444721) | [引用](#comment-text "引用Lucas的这条留言")

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

