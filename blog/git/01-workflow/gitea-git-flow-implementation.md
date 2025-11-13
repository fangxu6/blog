Gitea 本身没有直接提供强制创建拉取请求(Pull Request, PR) 的功能，但你可以通过设置 分支保护规则 来强制要求所有合并都必须通过PR。这意味着任何想要将代码合并到受保护的分支（例如 main 或 master 分支）的操作，都必须先创建一个PR，然后由仓库负责人审核并批准才能合并。





如何设置分支保护规则强制PR：

1. **进入仓库设置：**:在Gitea 仓库的主页，找到并点击 “设置” 按钮。

- 
- **选择分支保护：**:在仓库设置菜单中，选择 “分支保护”（Branch Protection）选项。
- 
- **添加保护规则：**:点击 “添加规则” 来创建一个新的保护规则。
- 
- **选择要保护的分支：**:在规则设置中，选择你想要保护的分支，例如 main。
- 
- **启用PR 要求：**:确保 “需要PR 合并”（Require pull request）选项被勾选。
- 
- **保存规则：**:保存你的设置。

完成以上步骤后，所有尝试合并代码到该保护分支的PR，都必须通过审查和批准，才能完成合并，从而实现了强制创建PR 的目的。





其他相关信息：





- **拉取请求(Pull Request) 的作用：
**PR 是一种协作方式，让开发者在提交代码修改后，可以通知代码库负责人进行评审，并由负责人决定是否将这些修改合并到主分支。
- **分支保护的意义：
**分支保护能有效防止未经授权或未经验证的代码直接合并到重要分支，提高代码质量和团队协作的规范性。



来自 <[https://www.google.com/search?q=gitea+%E5%BC%BA%E5%88%B6pr&sca\_esv=98553a785e0448de&gs\_lp=Egxnd3Mtd2l6LXNlcnAiDmdpdGVhIOW8uuWItnBySJ8lUIUGWMwjcAF4AZABAJgB3gGgAaYRqgEFMC45LjO4AQPIAQD4AQGYAgmgApsMwgIKEAAYsAMY1gQYR8ICCBAAGIAEGMsBwgIGEAAYFhgewgIIEAAYFhgKGB7CAgUQABjvBcICCBAAGIAEGKIEwgILEAAYgAQYhgMYigXCAgUQIRigAcICBRAhGJ8FwgIHECEYoAEYCpgDAIgGAZAGCpIHBTEuNS4zoAeKHLIHBTAuNS4zuAeUDMIHBTAuNS40yAcX](https://www.google.com/search?q=gitea+%E5%BC%BA%E5%88%B6pr&sca_esv=98553a785e0448de&gs_lp=Egxnd3Mtd2l6LXNlcnAiDmdpdGVhIOW8uuWItnBySJ8lUIUGWMwjcAF4AZABAJgB3gGgAaYRqgEFMC45LjO4AQPIAQD4AQGYAgmgApsMwgIKEAAYsAMY1gQYR8ICCBAAGIAEGMsBwgIGEAAYFhgewgIIEAAYFhgKGB7CAgUQABjvBcICCBAAGIAEGKIEwgILEAAYgAQYhgMYigXCAgUQIRigAcICBRAhGJ8FwgIHECEYoAEYCpgDAIgGAZAGCpIHBTEuNS4zoAeKHLIHBTAuNS4zuAeUDMIHBTAuNS40yAcX)\>

