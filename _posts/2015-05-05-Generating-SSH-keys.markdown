---
layout: post
title:  github帮助-生成SSH密钥
date:   2015-05-05
categories: github
tags: SSH github
---
Github提供的生成SSH密钥帮助页面经常抽风，要不访问不了，要不就是证书问题，决定把该页面拿下来备用。

1. [Check for SSH keys（检查SSH密钥）](#check-for-ssh-keys)
2. [Generate a new SSH key（生成新的SSH密钥）](#generate-a-new-ssh-key)
3. [Add your key to the ssh-agent（添加密钥到SSH代理）](#add-your-key-to-the-ssh-agent)
4. [Add your SSH key to your account（添加密钥到帐号）](#add-your-ssh-key-to-your-account)
5. [Test the connection（测试连接）](#test-the-connection)

通过SSH密钥的方式来识别受信任的计算机，不需要输入密码。下面的步骤将引导你生成SSH密钥和添加公钥到你的GitHub帐户。

建议：[定期检查你的SSH密钥列表](https://help.github.com/articles/keeping-your-ssh-keys-and-application-access-tokens-safe/)，并删除任何用不着的SSH密钥。

---

## Check for SSH keys

First, we need to check for existing SSH keys on your computer. Open the command line and enter:
首先，我们需要先检查你电脑上已有的SSH密钥。打开命令行窗口bash（如果安装了Git的Windows版本，可以打开Git Bash）并输入：

    ls -al ~/.ssh
    # 列出.ssh文件夹下的所有文件

检查列出来的目录中是否已有SSH公钥。默认情况下，公钥文件名将是下列中的一个：

id_dsa.pub
id_ecdsa.pub
id_ed25519.pub
id_rsa.pub

---

## Generate a new SSH key

1. 复制下面的内容，并粘贴到打开的命令行窗口中。确保你已经替换为你的GitHub email地址。

    ssh-keygen -t rsa -C "your_email@example.com"
    # 创建一个新的SSH密钥，以提供的email为标识
    # 生成rsa密钥对

2. 强烈建议保持默认的设置，当出现"Enter a file in which to save the key"时，按下回车键即可。

    # Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]

3. 输入一个口令

    # Enter passphrase (empty for no passphrase): [Type a passphrase]
    # Enter same passphrase again: [Type passphrase again]

> Tip：强烈建议设置一个很好的，安全的口令。更多信息，见“[使用SSH密钥的口令](https://help.github.com/articles/working-with-ssh-key-passphrases/)”。

4. 输入口令之后，你会得到一个指纹码或id，这就是你的SSH密钥。它看起来像这样：

    # Your identification has been saved in /Users/you/.ssh/id_rsa.
    # Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
    # The key fingerprint is:
    # 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com

---

## Add your key to the ssh-agent

配置SSH代理程序使用你生成的SSH密钥：

1. 确保SSH代理已开启：

    # 后台运行SSH代理
    eval "$(ssh-agent -s)"
    # Agent pid 59566

2. 添加生成的SSH密钥到代理中：

    ssh-add ~/.ssh/id_rsa

---

## Add your SSH key to your account

配置你的GitHub帐户使用你的SSH密钥：

1. 使用你喜欢的编辑器打开文件：~/.ssh/id_rsa.pub。
2. 全选并复制到剪贴板。不要添加任何新行或空白。

> 警告： 复制时不能有额外的新行或空白。

将复制的密钥添加到GitHub：

1. 在GitHub个人首页右上角点击“齿轮”图标进入设置
2. 在侧栏中点击“SSH keys”
3. 点击“Add SSH key”
4. 在“Title”字段中，添加一个描述性的标签。例如，“我的MacBook”
5. 在“Key”文本域中粘贴你的密钥
6. 点击“Add key”
7. 输入你的GitHub密码确认修改

---

## Test the connection

为了确保一切工作正常，你现在尝试连接到SSH。当你这样做时，会要求输入密码进行验证，这是你之前创建的SSH密钥口令。

1. 打开命令行窗口然后输入：

    ssh -T git@github.com
    # Attempts to ssh to GitHub

2. 你将看到警告内容：

    # The authenticity of host 'github.com (207.97.227.239)' can't be established.
    # RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
    # Are you sure you want to continue connecting (yes/no)?

检查验证信息中的指纹是否匹配，然后输入“yes”：

    # Hi username! You've successfully authenticated, but GitHub does not
    # provide shell access.

3. 如果信息中的username是你的，表明你成功设置了SSH密钥！

如果你收到一个关于“拒绝访问”的信息，你可以阅读这些[问题诊断](https://help.github.com/articles/error-permission-denied-publickey/)。

If you're switching from HTTPS to SSH, you'll now need to update your remote repository URLs. For more information, see Changing a remote's URL.
如果你从HTTPS切换到SSH，你需要更新远程仓库的URL。有关更多信息，请参阅[更改远程仓库的URL](https://help.github.com/articles/changing-a-remote-s-url/)。

---

## 参考资料
* [Generating SSH keys][generating-ssh-keys]

[generating-ssh-keys]: https://help.github.com/articles/generating-ssh-keys/
