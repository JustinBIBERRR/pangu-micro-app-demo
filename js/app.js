// 主应用入口文件
class App {
    constructor() {
        this.init();
    }

    async init() {
        console.log('🚀 微前端框架验证工具启动');

        // 加载外部JS资源
        await this.loadExternalJS();

        // 初始化路由
        this.router = new Router();

        // 初始化DOM监控
        this.domMonitor = new DOMMonitor();

        // 绑定事件
        this.bindEvents();

        // 启动应用
        this.router.init();
    }

    async loadExternalJS() {
        try {
            console.log('📦 正在加载外部JS资源...');
            const script = document.createElement('script');
            script.src = 'https://res.hc-cdn.com/pangu-chat-client/1.0.90/loader/js/pangu-chat-loader.js';
            script.async = true;

            return new Promise((resolve, reject) => {
                script.onload = () => {
                    console.log('✅ 外部JS资源加载完成',window.pangu);
                    const option = {
                        config: { mode: 'side', draggable: true, resizable: true, adsorbable: true },
                        context: {
                            site: 'china', lang: 'zh-cn'
                        },
                        adapter: {}
                    }
                    window.pangu.setChatConfig({ selector: '#chat-container', option })
                    resolve();
                };
                script.onerror = () => {
                    console.error('❌ 外部JS资源加载失败');
                    reject(new Error('外部JS加载失败'));
                };
                document.head.appendChild(script);
            });
        } catch (error) {
            console.error('外部JS加载异常:', error);
        }
    }

    bindEvents() {

        // 唤起盘古按钮
        document.getElementById('pangu-btn').addEventListener('click', () => {
            console.log('🚀 唤起盘古');
            window.pangu.renderChat()
        });

        // DOM快照按钮
        document.getElementById('snapshot-btn').addEventListener('click', () => {
            this.domMonitor.takeSnapshot();
        });

        // 清空控制台按钮
        document.getElementById('clear-console-btn').addEventListener('click', () => {
            console.clear();
            console.log('🧹 控制台已清空');
        });
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
