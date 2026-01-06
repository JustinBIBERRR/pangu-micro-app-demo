// DOM监控器
class DOMMonitor {
    constructor() {
        this.snapshots = [];
        console.log('📊 DOM监控器已初始化');
    }

    takeSnapshot() {
        const timestamp = new Date().toISOString();
        const contentArea = document.getElementById('content-area');

        if (!contentArea) {
            console.error('❌ 找不到内容区域');
            return;
        }

        // 获取DOM结构
        const domStructure = this.getDOMStructure(contentArea);

        // 创建快照
        const snapshot = {
            timestamp,
            route: window.location.hash,
            domStructure,
            html: contentArea.innerHTML,
            childCount: contentArea.children.length
        };

        // 保存快照
        this.snapshots.push(snapshot);

        // 输出到控制台
        console.group(`📸 DOM快照 - ${timestamp}`);
        console.log('路由:', snapshot.route);
        console.log('子元素数量:', snapshot.childCount);
        console.log('DOM结构:', domStructure);
        console.log('HTML内容:', snapshot.html);
        console.groupEnd();

        // 保留最近5个快照
        if (this.snapshots.length > 5) {
            this.snapshots.shift();
        }

        return snapshot;
    }

    getDOMStructure(element) {
        const structure = {
            tagName: element.tagName,
            id: element.id,
            className: element.className,
            attributes: {},
            children: []
        };

        // 获取属性
        Array.from(element.attributes).forEach(attr => {
            structure.attributes[attr.name] = attr.value;
        });

        // 获取子元素结构（只获取第一层）
        Array.from(element.children).forEach(child => {
            structure.children.push({
                tagName: child.tagName,
                id: child.id,
                className: child.className,
                textContent: child.textContent.substring(0, 50) + (child.textContent.length > 50 ? '...' : '')
            });
        });

        return structure;
    }

    compareSnapshots(snapshot1, snapshot2) {
        // 简单的差异比较
        const differences = [];

        if (snapshot1.childCount !== snapshot2.childCount) {
            differences.push(`子元素数量变化: ${snapshot1.childCount} → ${snapshot2.childCount}`);
        }

        if (snapshot1.route !== snapshot2.route) {
            differences.push(`路由变化: ${snapshot1.route} → ${snapshot2.route}`);
        }

        // 检查DOM结构变化
        if (JSON.stringify(snapshot1.domStructure) !== JSON.stringify(snapshot2.domStructure)) {
            differences.push('DOM结构发生变化');
        }

        return differences;
    }

    getLatestSnapshots(count = 2) {
        return this.snapshots.slice(-count);
    }

    // 辅助方法：自动监控路由变化
    startAutoMonitoring() {
        let lastRoute = window.location.hash;

        const checkRouteChange = () => {
            const currentRoute = window.location.hash;
            if (currentRoute !== lastRoute) {
                console.log(`🔄 检测到路由变化: ${lastRoute} → ${currentRoute}`);

                // 获取最近的快照进行比较
                const snapshots = this.getLatestSnapshots(2);
                if (snapshots.length === 2) {
                    const differences = this.compareSnapshots(snapshots[0], snapshots[1]);
                    if (differences.length > 0) {
                        console.group('⚠️ 路由切换检测到DOM变化');
                        differences.forEach(diff => console.log('•', diff));
                        console.groupEnd();
                    }
                }

                lastRoute = currentRoute;
            }
        };

        // 每秒检查一次路由变化
        setInterval(checkRouteChange, 1000);
        console.log('🔍 已启动自动路由监控');
    }
}

console.log('📊 DOM监控模块已加载');
