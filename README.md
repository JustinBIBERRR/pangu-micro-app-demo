# 微前端框架验证工具

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/JustinBIBERRR/pangu-micro-app-demo)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://justinbiberrr.github.io/pangu-micro-app-demo/)

这是一个用于验证外部JS资源对微前端框架影响的快速原型工具。

## 功能特性

- ✅ 左侧菜单栏驱动的路由切换
- ✅ 右侧内容区显示自定义micro-app组件
- ✅ 外部JS资源动态加载
- ✅ 基础DOM监控和快照功能
- ✅ 纯原生JavaScript实现，无复杂依赖

## 项目结构

```
├── index.html          # 主页面
├── styles.css          # 样式文件
├── js/
│   ├── app.js          # 主应用入口
│   ├── router.js       # 路由管理器
│   ├── micro-app.js    # 自定义Web Components
│   └── dom-monitor.js  # DOM监控器
└── README.md           # 说明文档
```

## 使用方法

1. **启动服务器**
   ```bash
   # 使用Node.js http-server (推荐)
   npx http-server -p 8080

   # 或使用Python
   python -m http.server 8080
   ```

2. **访问应用**
   ```bash
   # 本机访问
   http://localhost:8080

   # 其他设备访问 (替换为您的实际IP)
   http://[您的IP地址]:8080
   ```

3. **验证步骤**
   - 点击左侧菜单切换不同的micro-app
   - 点击"DOM快照"按钮查看当前DOM结构
   - 观察控制台输出，了解路由切换和DOM变化
   - 手动验证外部JS是否影响页面渲染

## Micro-app组件

每个micro-app组件具有以下结构：

```html
<micro-app name="first" url="./first-sub-app" baseroute="/first">
    <micro-app-head>应用头部</micro-app-head>
    <micro-app-body>
        应用内容
    </micro-app-body>
</micro-app>
```

## 验证目标

- **DOM结构完整性**: 验证路由切换时右侧内容区的DOM是否保持完整
- **JS资源影响**: 检查外部JS是否意外修改页面DOM
- **组件隔离**: 确认不同micro-app的渲染是否独立

## 控制台输出

- 🚀 应用启动日志
- 📦 外部JS加载状态
- 🔄 路由切换信息
- 📸 DOM快照数据
- 🎯 Web Components注册状态

## 🔗 局域网访问指南

### 📡 获取您的IP地址

**Windows系统**:
```cmd
ipconfig
```
查找"WLAN"或"以太网"适配器的IPv4地址。

**macOS/Linux系统**:
```bash
ifconfig
# 或
ip addr show
```

### 🌐 网络访问步骤

1. **确保在同一局域网**:
   - 您的电脑和其他设备连接到同一个WiFi
   - 或连接到同一个路由器

2. **检查防火墙**:
   - 确保防火墙允许8080端口的入站连接
   - Windows: Windows Defender防火墙 → 高级设置 → 入站规则

3. **测试连接**:
   ```bash
   # 在其他设备上测试
   curl http://[您的IP]:8080
   # 或直接在浏览器中打开
   ```

### ⚠️ 故障排除

**无法访问的常见原因**:
- 防火墙阻止了连接
- 不在同一网络中
- IP地址不正确
- 服务器未启动

**验证服务器运行**:
```bash
# 检查端口占用 (Windows)
netstat -ano | findstr :8080

# 检查端口占用 (macOS/Linux)
netstat -tlnp | grep :8080

# 测试本地连接
curl http://localhost:8080
```

### 🔒 安全注意事项

- 此设置仅用于开发测试
- 生产环境请使用适当的安全措施
- 避免在公共网络中运行此类服务器

## 🌐 在线访问

### GitHub Pages
项目已部署到GitHub Pages，您可以通过以下地址在线访问：
```
https://justinbiberrr.github.io/pangu-micro-app-demo/
```

### 本地运行
如果要在本地运行：

```bash
# 安装依赖
npm install -g http-server

# 启动服务器
npx http-server -p 8080

# 访问
http://localhost:8080
```

## 📊 项目统计

- **文件数量**: 27个
- **代码行数**: ~1800行
- **技术栈**: 原生JavaScript + HTML5 + CSS3
- **架构**: 自定义Web Components + Hash路由

## 注意事项

- 这是一个验证原型，专注于功能验证而非生产优化
- DOM监控功能输出到浏览器控制台
- 外部JS资源会自动加载，无需手动干预
