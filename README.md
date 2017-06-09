# 简介

预览地址：[https://upload.isecret.vip](https://upload.isecret.vip/)

这是一个基于七牛云存储的上传程序。

基于七牛云社区SDK([qiniu-php-sdk](https://github.com/crossmaya/qiniu-php-sdk))开发，自己写了一个验证码的类([php-checkCode](https://github.com/isecret/php-checkCode)）。

界面使用弹性盒子布局，Mac OS风格，有上传验证码，上传完成能一键复制。一键复制仅针对PC端，IOS端已经测试无效。背景图片使用百度云盘的一张背景，自适应代码可以参见 css/main.css:5 。

# 安装

下载||克隆该项目，修改 upload.php:9 中的access_token,secret_token,bucket，详细参见 [文档](https://developer.qiniu.com/kodo/manual/1644/security#1)

修改 js/main.js:1 为你的七牛云储存地址；

修改 index.html 中站点信息

# 支持

![](http://v.isecret.vip/images/juanzhu.jpg)

请支持我，谢谢。
