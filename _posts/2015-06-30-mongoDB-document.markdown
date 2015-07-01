---
layout: post
title:  mongoDB常用命令
date:   2015-06-30
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

# 创建集合

    > db.createCollection("users")

# 插入操作insert

    > db.users.insert({"name":"kiinlam","age":28})

# 查询操作find

#### 查找所有文档

    > db.users.find()

####查找指定文档

    > db.users.find({"name":"kiinlam"})

#### 查询一条

    > db.users.findOne({"name":"kiinlam"})

#### 大于$gt

    > db.users.find({"age":{$gt:22}})

#### 大于等于$gte

    > db.users.find({"age":{$gte:22}})
    
#### 小于$lt
    
    > db.users.find({"age":{$lt:22}})

#### 小于等于$gte
    
    > db.users.find({"age":{$lte:22}})

#### 不等于$ne
    
    > db.users.find("age":{$ne:22})

#### 或$or
    
    > db.users.find({$or:[{"name":"kiinlam"},{"name":"cheungkiinlam"}]})

#### 在集合中$in
    
    > db.users.find("name":{$in:["kiinlam","cheungkiinlam"]})

#### 不在集合中$nin
    
    > db.users.find("name":{$nin:["kiinlam","cheungkiinlam"]})


#### 正则查询
    
    > db.users.find({"name":/^k/,"name":/m$/})

#### 筛选查询$where
    
    // 使用js function作为筛选条件
    > db.users.find({$where: function(){return this.name=='kiinlam'}})


# 更新操作update

#### 指定文档全部更新，等于覆盖
    
    > db.users.update({"name":"kiinlam"}, {"name":"cheungkiinlam","age":27})

#### 局部更新一：增量更新$inc
    
    // age增加2，其他不变
    > db.users.update({"name":"kiinlam"}, {$inc:{"age":2}})

#### 局部更新二：字段修改$set
    
    // age改为20
    > db.users.update({"name":"kiinlam"}, {$set:{"age":20}})

#### 新增更新：如果不存在，就新增一条
    
    // 第三个参数为true
    > db.users.update({"name":"kiinlam"}, {$set:{"age":18}}, true)

#### 批量更新
    
    // 如果匹配多条，默认只改第一条，将第四个参数设为true可全部更新
    > db.users.update({"name":"kiinlam"}, {$set:{"age":18}}, true, true)

# 删除操作remove

删除操作不可恢复

#### 删除所有
    
    > db.users.remove()
    
#### 删除指定文档

    > db.users.remove({"name":"kiinlam"})

# 计数操作count
    
    > db.users.count()
    > db.users.count({"age":29})

# 唯一值查询distinct
    
#### 指定字段有多个相同时，只取一个，返回指定字段的值组合成的数组

    > db.users.distinct("age")

# 分组操作group

按照`age`进行分组操作，分组结果存放在`user`中，值为对应`age`的name值的数组

`key`：分组依据

`initial`：初始化函数，每个不同的age组共享同一个函数

`$reduce`： 第一个参数为当前文档，第二参数为前一次函数操作的累计对象，第一次为`initial`对应的对象

    > db.users.group({
                        "key": {"age": true},
                        "initial": {"user": []},
                        "$reduce": function(cur,prev){
                            prev.user.push(cur.name);
                        }
                    })

假设有数据如下：

    { "_id" : ObjectId("55910457607379845607d9e2"), "name" : "kiinlam", "age" : 29 }
    { "_id" : ObjectId("55910468607379845607d9e3"), "name" : "shadow", "age" : 26 }
    { "_id" : ObjectId("55910992607379845607d9e5"), "name" : "foo", "age" : 29 }
    { "_id" : ObjectId("55911fca607379845607d9e6"), "name" : "dd", "age" : 22 }
    { "_id" : ObjectId("55911fd3607379845607d9e7"), "name" : "mm", "age" : 22 }
    { "_id" : ObjectId("55911fdf607379845607d9e8"), "name" : "gg", "age" : 22 }
    { "_id" : ObjectId("55911feb607379845607d9e9"), "name" : "jj", "age" : 22 }
    { "_id" : ObjectId("55920545ff40738c1fd0a839"), "name" : "zz", "age" : 1 }

分组结果为：

    [
            {
                    "age" : 29,
                    "user" : [
                            "kiinlam",
                            "foo"
                    ]
            },
            {
                    "age" : 26,
                    "user" : [
                            "shadow"
                    ]
            },
            {
                    "age" : 22,
                    "user" : [
                            "dd",
                            "mm",
                            "gg",
                            "jj"
                    ]
            },
            {
                    "age" : 1,
                    "user" : [
                            "zz"
                    ]
            }
    ]

#### 更多分组功能

可选参数: `condition` 和 `finalize`。

    `condition` —— 过滤条件
    `finalize` —— 函数，分组完成后执行

过滤掉`age`大于22的文档，增加属性标明分组中文档的数量

    > db.users.group({
                        "key": {"age": true},
                        "initial": {"user": []},
                        "$reduce": function(cur,prev){
                            prev.user.push(cur.name);
                        },
                        "condition": {"age":{$lte:22}},
                        "finalize": function(out){
                            out.count = out.user.length;
                        }
                    })

分组结果为：

    [
            {
                    "age" : 22,
                    "user" : [
                            "dd",
                            "mm",
                            "gg",
                            "jj"
                    ],
                    "count" : 4
            },
            {
                    "age" : 1,
                    "user" : [
                            "zz"
                    ],
                    "count" : 1
            }
    ]

# mapReduce

`map`：映射函数，内部调用`emit(key,value)`，集合按照`key`进行映射分组。

`reduce`：简化函数，对`map`分组后的数据进行分组简化，`reduce(key,value)`中的`key`是`emit`中的`key`，而`value`则是`emit`分组结果的集合。

`mapReduce`：最后执行的函数，参数为`map`、`reduce`和一些可选参数。

    > db.users.mapReduce
    function ( map , reduce , optionsOrOutString ){
        var c = { mapreduce : this._shortName , map : map , reduce : reduce };
        assert( optionsOrOutString , "need to supply an optionsOrOutString" )

        if ( typeof( optionsOrOutString ) == "string" )
            c["out"] = optionsOrOutString;
        else
            Object.extend( c , optionsOrOutString );

        var raw = this._db.runCommand( c );
        if ( ! raw.ok ){
            __mrerror__ = raw;
            throw Error( "map reduce failed:" + tojson(raw) );
        }
        return new MapReduceResult( this._db , raw );

    }

创建`map`函数

    function (){
        emit(this.name,{count:1});
    }

创建`reduce`函数
    
    function (key,value){
        var result = {count:0};
        for(var i = 0; i < value.length; i++){
            result.count += value[i].count;
        }
        return result;
    }

执行`mapReduce`操作

    > db.users.mapReduce(map,reduce,{"out":"collection"})

假设有数据如下

    { "_id" : ObjectId("55910457607379845607d9e2"), "name" : "kiinlam", "age" : 29 }
    { "_id" : ObjectId("55910468607379845607d9e3"), "name" : "shadow", "age" : 26 }
    { "_id" : ObjectId("55910992607379845607d9e5"), "name" : "foo", "age" : 29 }
    { "_id" : ObjectId("55920545ff40738c1fd0a839"), "name" : "zz", "age" : 1 }
    { "_id" : ObjectId("55911fca607379845607d9e6"), "name" : "foo", "age" : 22 }
    { "_id" : ObjectId("55911fd3607379845607d9e7"), "name" : "foo", "age" : 22 }
    { "_id" : ObjectId("55911fdf607379845607d9e8"), "name" : "foo", "age" : 22 }
    { "_id" : ObjectId("55911feb607379845607d9e9"), "name" : "foo", "age" : 22 }

输出结果

    {
            "result" : "collection",    // 存放最终结果的集合名
            "timeMillis" : 28,
            "counts" : {
                    "input" : 8,    // 传入文档的次数
                    "emit" : 8,    // emit函数被调用次数
                    "reduce" : 1,    // reduce函数被调用次数
                    "output" : 4    // 最后返回文档的个数
            },
            "ok" : 1
    }

查看集合`collection`中的结果

    > db.collection.find()

输出结果

    { "_id" : "foo", "value" : { "count" : 5 } }
    { "_id" : "kiinlam", "value" : { "count" : 1 } }
    { "_id" : "shadow", "value" : { "count" : 1 } }
    { "_id" : "zz", "value" : { "count" : 1 } }

# 游标

游标只表示一个引用，并不是真正的执行，在需要的时候，通过for循环或`next()`方法进行遍历读取，枚举结束后，游标销毁，不再返回数据。

申明一个游标

    > var list = db.collection.find()

通过`forEach`遍历游标

    > list.forEach(function(i){
          print(i._id);
      })

输出结果

    foo
    kiinlam
    shadow
    zz

或者通过`next`遍历集合

    > var list = db.collection.find()
    > list.next()
    { "_id" : "foo", "value" : { "count" : 5 } }
    > list.next()
    { "_id" : "kiinlam", "value" : { "count" : 1 } }
    > list.next()
    { "_id" : "shadow", "value" : { "count" : 1 } }
    > list.next()
    { "_id" : "zz", "value" : { "count" : 1 } }
    > list.next()
    2015-07-01T11:27:38.186+0800 E QUERY    Error: error hasNext: false
        at Error (<anonymous>)
        at DBQuery.next (src/mongo/shell/query.js:255:15)
        at (shell):1:6 at src/mongo/shell/query.js:255
    > list
    >

- - -


## 参考资料
* [mongoDB][mongoDB]
* [install-mongodb-on-windows][install-on-windows]
* [8天学通MongoDB系列](http://www.cnblogs.com/huangxincheng/category/355399.html)


[mongoDB]: https://www.mongodb.org/
[install-on-windows]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/