```
### 基本概念

- master：线上理论上最稳定的代码版本，不允许直接修改提交代码。
- release 分支：上线前预发布环境分支，不允许直接修改提交代码，上线完成验收通过后合并到 master 分支，打 tag 。
- dev 分支：开发环境分支，不允许直接修改提交代码。
- test 分支：测试环境分支，不允许直接修改提交代码。
- feature 分支：基于 master 分支 checkout 的分支，用于开发新的功能需求。允许直接修改提交代码。开发完成后合并到 dev 分支，提测时合并到 test 分支，上线前合并到 release 分支。
- hotfix 分支：基于 master 分 支创建，对线上版本的 bug 进行修复，流程和 feature 开发类似。

### 开发流程说明：

1. 收到需求，基于 `master` 分支 checkout 新的 feature 分支：`feature/00001`
2. 开发阶段：
    1. 开发完成后，将 `feature/00001`分支合并到 `dev` 分支。
    2. 发布开发环境 `dev` 分支。
3. 提测阶段：
    1. 提测时，将 `feature/00001`分支合并到 `test` 分支。
    2. 提测后测试反馈的 bug ，继续基于`feature/00001`分支进行修改，修改完成后再次将分支合并到 `dev` 分支和 `test` 分支。
    3. 发布测试环境 `test` 分支
4. 预发布阶段：
    1. 基于 master checkout 新的 release 分支：`release-xxx`
    2. 确定要上线的功能版本，将对应的 feature 分支：`feature/00001`合并到 `release-xxx` 分支
    3. 提测后测试反馈的 bug ，继续基于`feature/00001`分支进行修改，修改完成后再次将分支合并到 `dev` 、 `test` 和 `release-xxx` 分支。
    4. 发布预发布环境`release-xxx`分支
5. 上线发布阶段：
    1. 上线发布`release-xxx`分支
    2. 验收通过，将 `release-xxx` 分支合并到 `master` 分支，打上版本 tag 。
    3. 删除`release-xxx`、`feature/00001`分支

hotfix 流程和 feature 分支流程类似，不重复说明。



这是我们的分支流程管理，仅供参考
```



组长来操作合并，merge 代码到 develop ，我在公司就是做这个事情的。人工操作起来确实挺繁琐的，但是不会出什么大问题，这个人需要熟悉系统工程，有冲突了也可以解决；也尝试过给开发人员各自操作，但是会出现问题，或者难以管理



来自 <[https://origin.v2ex.com/t/1080703](https://origin.v2ex.com/t/1080703)\>





