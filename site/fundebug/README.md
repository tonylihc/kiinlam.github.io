fundebug
=================

https://fundebug.com/

前端JavaScript错误监测

错误汇报

### 使用方法

#### 1、发送非异常通知

    fundebug.report(name, message, option)

####2、发送异常通知

    fundebug.report(error, message, option)
    
    name：错误的名称
    message: 错误信息，使用异常通知时会附加到option.metaData.msg
    error：错误对象
    option：自定义option对象，可选，基本属性如下:
        - name: 错误的名字
        - message: 错误消息，不建议使用，仅在message参数为空时才会出现
        - severity: 错误的严重程度， 例如：error, warning, notification
        - user: 用户信息，包含name与email属性
        - 其它属性会附加到option.metaData下
