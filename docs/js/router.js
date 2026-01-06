// 路由管理器
class Router {
    constructor() {
        this.routes = {
            'first': { name: 'first', url: './first-sub-app', baseroute: '/first' },
            'second': { name: 'second', url: './second-sub-app', baseroute: '/second' },
            'third': { name: 'third', url: './third-sub-app', baseroute: '/third' }
        };
        this.currentRoute = null;
    }

    init() {
        // 监听hash变化
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // 初始化默认路由
        if (!window.location.hash) {
            window.location.hash = '#first';
        } else {
            this.handleRoute();
        }

        // 绑定菜单点击事件
        this.bindMenuEvents();
    }

    bindMenuEvents() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const route = item.dataset.route;
                window.location.hash = `#${route}`;
            });
        });
    }

    handleRoute() {
        const hash = window.location.hash.substring(1);
        const routeConfig = this.routes[hash];

        if (routeConfig) {
            this.switchToRoute(routeConfig);
        } else {
            console.warn(`未找到路由: ${hash}`);
        }
    }

    switchToRoute(routeConfig) {
        console.log(`🔄 切换到路由: ${routeConfig.name}`);

        // 更新菜单激活状态
        this.updateMenuActiveState(routeConfig.name);

        // 切换micro-app
        this.switchMicroApp(routeConfig);

        this.currentRoute = routeConfig.name;
    }

    updateMenuActiveState(activeRoute) {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            if (item.dataset.route === activeRoute) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    switchMicroApp(routeConfig) {
        const contentArea = document.getElementById('content-area');

        // 清空现有内容
        contentArea.innerHTML = '';

        // 创建新的micro-app组件
        const microApp = document.createElement('micro-app');
        microApp.setAttribute('name', routeConfig.name);
        microApp.setAttribute('url', routeConfig.url);
        microApp.setAttribute('baseroute', routeConfig.baseroute);

        // 添加内容
        microApp.innerHTML = `
            <micro-app-head>${routeConfig.name.toUpperCase()} 应用</micro-app-head>
            <micro-app-body>
                <h3>${routeConfig.name} 应用内容</h3>
                <p>路由: ${routeConfig.baseroute}</p>
                <p>URL: ${routeConfig.url}</p>
                <p>当前时间: ${new Date().toLocaleString()}</p>
                <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 4px;">
                    <p><strong>验证说明：</strong></p>
                    <p>• 点击"DOM快照"按钮查看当前DOM结构</p>
                    <p>• 观察外部JS是否影响页面渲染</p>
                    <p>• 手动切换路由验证DOM变化</p>
                </div>
            </micro-app-body>
        `;

        contentArea.appendChild(microApp);
        console.log(`✅ ${routeConfig.name} micro-app 已加载`);
    }
}
