---
layout: post
title:  react及flux架构范例Todomvc分析
date:   2015-05-29
categories: react
tags: react flux
---

# react及flux架构范例Todomvc分析

通过分析[flux-todomvc][flux-todomvc]源码，学习如何通过react构建web程序，了解编写react应用程序的一般步骤，同时掌握Flux的单向数据流动架构思想

## 关于react

react一个最吸引我的特性是组件，它是模块化的，所有的组件是独立的，又可以通过嵌套来构建更大型的组件，一个个小组件经过层层组装，最终形成web应用程序，它让我开始重新思考如何去构建大型的web应用程序。

## 关于Flux

[Flux][flux]是一个思想而非框架，强调数据自上而下传递的单向流动理念，已经有很多种实现，比较有名气的是[RefluxJs][refluxjs]。单向流动让数据走向更清晰：用户UI交互触发事件，事件回调执行Action，并将所有的变化数据作为参数payload传递进去，各种Stores从payload中取出自己所需的数据进行更新，最终重新渲染发生变化的DOM结点。

## 分析

以下简要分析 react + flux 实现的todomvc源码，主要研究其构建方式与单向数据流动思想，对具体代码编写不做深入分析。

### TodoApp组件

  * 在`getInitialStates`中设置初始值；
  * 在`componentDidMount`中添加store监听指定事件`_onChange`；
  * 在`componentWillUnmount`中清除store监听的事件及回调；
  * 在`render`中将state赋值给各个component的prop，子组件包含`Header`组件、`MainSection`组件、`Footer`组件；
  * 添加`_onChange`事件回调方法，触发该回调时，执行`setState`，更新UI。

Store只在顶级的组件中接入，子组件通过prop层层传递，所有子组件不直接从Store里检索数据，这是一种很好的设计方式，有助降低数据耦合度。

### Header组件

  * 在`render`中包含`TodoTextInput`组件，并将自身的`_onSave`方法作为`TodoTextInput`组件的prop；
  * 添加`_onSave`方法，在调用时，执行相应Action方法`create`。

`Header`组件统一管理`_onSave`方法，该方法将提供给子组件调用。

### MainSection组件

  * 基础的prop验证
  
    - 要求必须提供对象集合
    - 要求提供是否全部完成的布尔值；
        
  * 在`render`中分类处理，数据为空时，返回null，隐藏元素，有数据时，显示列表内容，包含`TodoItem`组件，同时提供一个checkbox控件用于设置是否全部完成；
  * 添加切换设置全部完成的回调方法`_onToggleCompleteAll`，在调用时，执行相应Action方法`toggleCompleteAll`。

### Footer组件

  * 基础的prop验证
  
    - 要求必须提供对象集合；
        
  * 在`render`中计算未完成项目数量，并根据是否存在已完成项来显示清除全部完成项按钮，按钮绑定`onClick`事件；
  * 添加清除全部完成项的回调方法`_onClearCompletedClick`，在调用时，执行相应Action方法`destroyCompleted`。

### TodoItem组件

  * 基础的prop验证
          
    - 要求项目不可空；
          
  * 在`getInitialStates`中设置初始值；
  * 在`render`中根据是否处于编辑状态，显示不同的元素，编辑状态下，包含了`TodoTextInput`组件，并设置了`onSave`和`value`的prop，非编辑状态下，显示切换是否完成的按钮，绑定了`onChange`事件，显示项目文字内容，绑定了`onDoubleClick`事件，显示删除按钮，绑定了`onClick`事件；
  * 添加切换是否完成的回调方法`_onToggleComplete`，在调用时，执行相应Action方法`toggleComplete`；
  * 添加双击文字时的回调方法`_onDoubleClick`，在调用时，通过`setState`设置当前项目为编辑状态；
  * 添加触发保存时的回调方法`_onSave`，在调用时，执行相应Action方法`updateText`，并通过设置`setState`退出编辑状态；
  * 添加删除时的回调方法`_onDestroyClick`，在调用时，执行相应Action方法`destroy`；

### TodoTextInput组件

  * 基础的prop验证
          
    - 要求`className`、`id`、`placeholder`、`value`为字符串；
    - 存在`onSave`方法
  
  * 在`getInitialStates`中设置初始值；
  * 在`render`中返回输入文本框，绑定多个事件`onBlur`、`onChange`、`onKeyDown`；
  * 添加失去焦点时的回调方法`_save`，在调用时，执行父级元素提供的`onSave`方法，并调用setState清空文字；
  * 添加内容变化时的回调方法`_onChange`，在调用时，调用setState更新虚拟DOM并刷新DOM元素；
  * 添加按下键盘时的回调方法`onKeyDown`，在调用时，检测是否按下回车键以执行`onSave`方法；

TodoTextInput组件仅依赖于父级通过prop传递下来的数据与方法，不直接与`Action`、`Store`进行操作

### TodoActions

  * 对外提供完成具体功能的action方法，内部会调用事件分发器`AppDispatcher`发出一个具体的action（携带数据`payload`），并设置`payload`的`actionType`为action对应的类型。

### AppDispatcher

  * 注册一个集中的Action管理回调方法
  * 分发actions（在`TodoActions`中的具体方法中触发）。

`AppDispatcher`既分发actions，又是actions的接收者，在接到actions后负责调用先前注册的Action管理回调方法。

Action管理回调方法中根据`actionType`来完成不同的操作，并在操作结束时触发`TodoStore`绑定的事件。

### TodoStore

  * 提供对所有数据进行增删改查的方法
  * 注册事件回调函数，在数据发生改变后，手动触发该事件。

## 总结

react组件通过用户UI交互触发event，event回调函数被执行，在这些函数中调用Action对象对应的方法，发出action，事件分发器接收到action后，做出相应处理，然后触发Store改变事件，通过setState重新渲染DOM元素。

以TodoMVC为例，分两个阶段完成该应用程序的设计。

初始化阶段：

1. 构建顶级组件及子组件；
2. 获取Stroe数据，逐级提供到子组件上；
3. Store绑定`change`事件，发生变化时，更新组件的数据；
4. 子组件绑定各类事件，响应用户操作；
5. 事件分发器注册一个接收到action时的事件处理回调函数；

交互阶段（以新增一个todo项为例）：

1. 在子组件上触发DOM事件，执行回调函数；
2. 回调函数中调用Action方法；
3. Action调用事件分发器，发出一个action；
4. action中的数据被事件分发器传递给初始化阶段注册的事件处理回调函数；
5. 事件处理回调函数根据不同的`actionType`进行处理；
6. 如在处理中涉及数据变化，则手动触发初始化阶段Store绑定的`change`事件；
7. Store接收到事件后，重新检索出所有数据提供给顶级组件的setState方法；
8. 顶级组件自动调用render方法，重新渲染UI界面。

交互阶段的数据环

Event --> Action --> Dispatcher（携带数据） --> Store --> View --> Event

Flux主要包括三部分：Dispatcher、Store和Views（React组件），与传统的MVC(model-View-Controller)不同。Flux中的Dispatcher以controller-view的形式存在，所有数据操作都在Dispatcher的回调中进行，并反映到View上。view通常处于应用的顶层，它从Stores中获取数据，同时将这些数据传递给它的后代节点。

- - -

## 参考资料
* [flux-todomvc][flux-todomvc]
* [flux][flux]
* [refluxjs][refluxjs]
* [flux-overview][flux-overview]

[flux-todomvc]: https://github.com/facebook/flux/tree/master/examples/flux-todomvc/
[flux]: http://facebook.github.io/flux/
[refluxjs]: https://github.com/spoike/refluxjs
[flux-overview]: http://reactjs.cn/react/docs/flux-overview.html