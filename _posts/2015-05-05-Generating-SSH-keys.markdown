---
layout: post
title:  github帮助-生成SSH密钥
date:   2015-05-05
categories: github
tags: SSH github
---
Github提供的生成SSH密钥帮助页面经常抽风，要不访问不了，要不就是证书问题，决定把该页面拿下来备用。

1. [Check for SSH keys](#Check-for-SSH-keys)
1. [Generate a new SSH key](#Generate-a-new-SSH-key)
2. [Add your key to the ssh-agent](#Add-your-key-to-the-ssh-agent)
3. [Add your SSH key to your account](#Add-your-SSH-key-to-your-account)
3. [Test the connection](#Test-the-connection)
3. [Test the connection](#Test-the-connection)

SSH keys are a way to identify trusted computers, without involving passwords. The steps below will walk you through generating an SSH key and adding the public key to your GitHub account.

We recommend that you regularly review your SSH keys list and revoke any that haven't been used in a while.

---

## Check for SSH keys

First, we need to check for existing SSH keys on your computer. Open the command line and enter:

ls -al ~/.ssh
# Lists the files in your .ssh directory, if they exist

Check the directory listing to see if you already have a public SSH key. By default, the filenames of the public keys are one of the following:

id_dsa.pub
id_ecdsa.pub
id_ed25519.pub
id_rsa.pub

---

## Generate a new SSH key

With the command line still open, copy and paste the text below. Make sure you substitute in your GitHub email address.

ssh-keygen -t rsa -C "your_email@example.com"
# Creates a new ssh key, using the provided email as a label
# Generating public/private rsa key pair.
We strongly suggest keeping the default settings as they are, so when you're prompted to "Enter a file in which to save the key", just press Enter to continue.

# Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
You'll be asked to enter a passphrase.

# Enter passphrase (empty for no passphrase): [Type a passphrase]
# Enter same passphrase again: [Type passphrase again]
Tip: We strongly recommend a very good, secure passphrase. For more information, see "Working with SSH key passphrases".
After you enter a passphrase, you'll be given the fingerprint, or id, of your SSH key. It will look something like this:

# Your identification has been saved in /Users/you/.ssh/id_rsa.
# Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com

---

## Add your key to the ssh-agent

To configure the ssh-agent program to use the SSH key you've generated:

Ensure ssh-agent is enabled:

# start the ssh-agent in the background
eval "$(ssh-agent -s)"
# Agent pid 59566
Add your generated SSH key to the ssh-agent:

ssh-add ~/.ssh/id_rsa

---

## Add your SSH key to your account

To configure your GitHub account to use your SSH key:

In your favorite text editor, open the ~/.ssh/id_rsa.pub file.
Select the entire contents of the file and copy it to your clipboard. Do not add any newlines or whitespace.
Warning: It's important to copy the key exactly without adding newlines or whitespace.
Add the copied key to GitHub:

In the top right corner of any page, click . Settings icon in the user bar

In the user settings sidebar, click SSH keys. SSH keys

Click Add SSH key. SSH Key button

In the Title field, add a descriptive label for the new key. For example, if you're using a personal Mac, you might call this key "Personal MacBook Air".
Paste your key into the "Key" field. The key field
Click Add key. The Add key button
Confirm the action by entering your GitHub password.

---

## Test the connection

To make sure everything is working, you'll now try to SSH into . When you do this, you will be asked to authenticate this action using your password, which is the SSH key passphrase you created earlier.

Open the command line and enter:

ssh -T git@github.com
# Attempts to ssh to GitHub
You may see this warning:

# The authenticity of host 'github.com (207.97.227.239)' can't be established.
# RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
# Are you sure you want to continue connecting (yes/no)?
Verify the fingerprint in the message you see matches the following message, then type yes:

# Hi username! You've successfully authenticated, but GitHub does not
# provide shell access.
If the username in the message is yours, you've successfully set up your SSH key!

If you receive a message about "access denied," you can read these instructions for diagnosing the issue.

If you're switching from HTTPS to SSH, you'll now need to update your remote repository URLs. For more information, see Changing a remote's URL.

---



---

## 参考资料
* [Generating SSH keys][generating-ssh-keys]

[generating-ssh-keys]: https://help.github.com/articles/generating-ssh-keys/
