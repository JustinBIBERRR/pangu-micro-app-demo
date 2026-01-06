# Change: 创建快速验证原型 - 导航菜单框架和DOM结构验证

## Why
需要快速创建一个bug验证原型，验证主框架引入外部JS资源"https://res.hc-cdn.com/pangu-chat-client/1.0.90/loader/js/pangu-chat-loader.js"是否会影响微前端框架路由切换时的DOM结构。框架包含左侧菜单栏和右侧内容区，菜单切换时右侧显示自定义的micro-app组件。

## What Changes
- 创建主框架UI布局：顶部导航 + 左侧菜单栏 + 右侧内容容器
- 实现菜单驱动的路由管理，支持自定义micro-app组件切换
- 集成外部JS资源加载
- 建立基础DOM监控，记录micro-app切换前后的DOM变化
- 提供手动验证机制，支持开发者手动切换路由观察DOM变化

## Impact
- 新增规格: `menu-routing-framework`
- 影响代码: 新建主框架布局和自定义Web Components
- 保持纯净: 使用原生JavaScript，无复杂依赖
