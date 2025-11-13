= [MinIO 控制台操作：限制用户访问特定桶](https://www.cnblogs.com/echohye/p/18533117 "发布于 2024-11-07 17:00")

### MinIO 控制台操作：限制用户访问特定桶（如 `test` 桶）

#### 1\. 登录 MinIO 控制台

- 访问 MinIO 控制台，使用管理员账户登录。

#### 2\. 创建策略

1. 在左侧菜单中，点击 **"Access Management"**（访问管理）。
2. 在 "Policies"（策略）页面，点击 **"Create Policy"**（创建策略）按钮。
3. 输入策略名称（如 `test-bucket-policy`）。
4. 在编辑框中输入以下 JSON 策略：

```
`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::test/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::test"
    },
    {
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::*"
    }
  ]
}`
```

或

```
`{
     "Version": "2012-10-17",
     "Statement": [
         {
             "Effect": "Allow",
             "Action": [
                 "s3:GetObject",   // 允许获取桶中对象
                 "s3:ListBucket",  // 允许列出桶中的对象
                 "s3:PutObject"    // 允许上传对象到桶
             ],
             "Resource": [
                 "arn:aws:s3:::test",          // 允许列出桶中的对象（ListBucket权限）
                 "arn:aws:s3:::test/*"        // 允许访问桶中的对象（GetObject 和 PutObject 权限）
             ]
         }
     ]
}`
```

5. 点击 **"Save"**（保存）来创建策略。

[![](https://img2024.cnblogs.com/blog/1987782/202411/1987782-20241107175904898-733688459.png)

](https://img2024.cnblogs.com/blog/1987782/202411/1987782-20241107175904898-733688459.png)


#### 3\. 创建用户并分配策略

1. 在左侧菜单中，点击 **"Users"**（用户）。
2. 如果已有用户，点击该用户进行编辑。如果没有，点击 **"Create User"**（创建用户），输入用户名和密码，并点击 **"Save"**（保存）。
3. 在用户详情页，点击 **"Add Policy"**（添加策略）。
4. 选择已创建的 `test-bucket-policy` 策略，然后点击 **"Add"**（添加）。

#### 4\. 验证用户权限

- 用户将只能访问 `test` 桶，无法访问其他桶。
- 你可以让用户登录控制台并尝试访问其他桶，验证权限是否生效。

#### 总结

通过 MinIO 控制台创建并分配适当的策略，您可以轻松地限制用户或用户组的访问权限，确保他们只能访问特定的桶（如 `test` 桶）。

