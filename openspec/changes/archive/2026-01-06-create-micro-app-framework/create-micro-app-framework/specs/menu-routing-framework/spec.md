## ADDED Requirements

### Requirement: 主框架UI布局
系统MUST提供包含导航菜单的主框架UI，采用左侧菜单栏+右侧内容区的布局。

#### Scenario: 主框架布局渲染成功
- **WHEN** 应用启动时
- **THEN** 顶部导航栏显示
- **AND** 左侧菜单栏显示在左侧
- **AND** 右侧内容区容器准备就绪

#### Scenario: 菜单项可用
- **WHEN** 左侧菜单渲染时
- **THEN** 显示3-4个可点击的菜单项
- **AND** 当前选中菜单项有视觉反馈

### Requirement: 菜单驱动路由管理
系统MUST实现基于菜单点击的路由管理，支持micro-app组件切换。

#### Scenario: 菜单点击触发路由切换
- **WHEN** 用户点击左侧菜单项
- **THEN** URL hash更新
- **AND** 触发对应的micro-app切换

#### Scenario: Micro-app切换成功
- **WHEN** 路由切换到新micro-app
- **THEN** 右侧内容区显示对应的micro-app组件
- **AND** micro-app具有正确的name、url、baseroute属性

### Requirement: 外部JS资源集成
系统MUST在主框架启动时加载外部JS资源"https://res.hc-cdn.com/pangu-chat-client/1.0.90/loader/js/pangu-chat-loader.js"。

#### Scenario: JS资源加载成功
- **WHEN** 主框架启动时
- **THEN** 外部JS资源成功加载
- **AND** 可以在控制台看到加载日志

### Requirement: 基础DOM监控
系统MUST提供基础DOM监控功能，记录micro-app切换前后的DOM变化。

#### Scenario: DOM快照记录
- **WHEN** 点击快照按钮时
- **THEN** 在控制台输出当前右侧内容区的DOM结构
- **AND** 包含时间戳信息

### Requirement: 自定义Micro-app组件
系统MUST支持自定义的micro-app Web Component，具有head和body区域。

#### Scenario: Micro-app组件渲染
- **WHEN** micro-app组件加载时
- **THEN** 显示micro-app-head和micro-app-body区域
- **AND** 支持自定义内容填充
