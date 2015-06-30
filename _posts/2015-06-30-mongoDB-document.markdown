---
layout: post
title:  mongoDB常用命令
date:   2015-06-19
categories: mongoDB
tags: mongoDB
---

# 安装

[mongoDB官网][mongoDB]下载安装（[Windows安装方法][install-on-windows]）

# 基础知识

集合——对应关系数据库中的表

文档——对应关系数据库中的行

# 启动数据库服务

定位到安装目录下的bin文件夹里后

    > mongod --dbpath ../data/db

如没有`data/db`文件夹，需先创建，`dbpath`用于指定数据存放位置

# 开启一个客户端访问数据库

同样的bin文件夹下执行

    > mongo

默认连接至`test`数据库

# 切换数据库

    > use test

# 插入操作insert

    > db.users.insert({"name":"kiinlam","age":28})

# 查询操作find

    // 查找所有文档
    > db.users.find()
    // 查找指定文档
    > db.users.find({"name":"kiinlam"})

#### 条件查询

    // 大于$gt
    > db.users.find({"age":{$gt:22}})
    // 大于等于$gte
    > db.users.find({"age":{$gte:22}})
    // 小于$lt
    > db.users.find({"age":{$lt:22}})
    // 小于等于$gte
    > db.users.find({"age":{$lte:22}})
    // 不等于$ne
    > db.users.find("age":{$ne:22})
    // 或$or
    > db.users.find({$or:[{"name":"kiinlam"},{"name":"cheungkiinlam"}]})
    // 在集合中$in
    > db.users.find("name":{$in:["kiinlam","cheungkiinlam"]})
    // 不在集合中$nin
    > db.users.find("name":{$nin:["kiinlam","cheungkiinlam"]})

#### 正则查询
    
    > db.users.find({"name":/^k/,"name":/m$/})

#### 筛选查询$where
    
    // 使用js function作为筛选条件
    > db.users.find({$where: function(){return this.name=='kiinlam'}})

#### 查询一条

    > db.users.findOne({"name":"kiinlam"})

# 更新操作update

    // 指定文档全部更新，等于覆盖
    > db.users.update({"name":"kiinlam"}, {"name":"cheungkiinlam","age":27})
    // 局部更新一：增量更新$inc
    // age增加2，其他不变
    > db.users.update({"name":"kiinlam"}, {$inc:{"age":2}})
    // 局部更新二：字段修改$set
    // age改为20
    > db.users.update({"name":"kiinlam"}, {$set:{"age":20}})
    // 新增更新：如果不存在，就新增一条
    // 第三个参数为true
    > db.users.update({"name":"kiinlam"}, {$set:{"age":18}}, true)
    // 批量更新
    // 如果匹配多条，默认只改第一条，将第四个参数设为true可全部更新
    > db.users.update({"name":"kiinlam"}, {$set:{"age":18}}, true, true)

# 删除操作remove

    // 删除操作不可恢复
    // 删除所有
    > db.users.remove()
    // 删除指定文档
    > db.users.remove({"name":"kiinlam"})

# 计数操作count
    
    > db.users.count()

# 唯一值查询distinct
    
    // 指定字段有多个相同时，只取一个，返回指定字段的值组合成的数组
    > db.users.distinct("age")

# 分组操作group

    // 按照age进行分组操作，分组结果存放在user中，值为对应age的name值的数组
    // key：分组依据
    // initial：初始化函数，每个不同的age组共享同一个函数
    // $reduce： 第一个参数为当前文档，第二参数为前一次函数操作的累计对象，第一次为initial对应的对象
    > db.users.group({
                        "key": {"age": true},
                        "initial": {"user": []},
                        "$reduce": function(cur,prev){
                            prev.person.push(cur.name);
                        }
                    })

- - -


## 参考资料
* [mongoDB][mongoDB]
* [install-on-windows](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
* [8天学通MongoDB系列](http://www.cnblogs.com/huangxincheng/category/355399.html)


[mongoDB]: https://www.mongodb.org/