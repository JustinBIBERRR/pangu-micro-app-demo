// 自定义 Micro-app Web Component
class MicroApp extends HTMLElement {
    constructor() {
        super();
        console.log('🆕 Micro-app 组件创建');
    }

    connectedCallback() {
        console.log('🔗 Micro-app 组件已连接到DOM');

        // 获取属性
        const name = this.getAttribute('name');
        const url = this.getAttribute('url');
        const baseroute = this.getAttribute('baseroute');

        console.log(`📋 Micro-app 属性: name=${name}, url=${url}, baseroute=${baseroute}`);

        // 如果没有内容，创建默认结构
        if (!this.querySelector('micro-app-head') || !this.querySelector('micro-app-body')) {
            this.createDefaultStructure(name, url, baseroute);
        }
    }

    disconnectedCallback() {
        console.log('🔌 Micro-app 组件已从DOM断开');
    }

    createDefaultStructure(name, url, baseroute) {
        this.innerHTML = `
            <micro-app-head>默认应用头部</micro-app-head>
            <micro-app-body>
                <p>应用名称: ${name}</p>
                <p>应用URL: ${url}</p>
                <p>基础路由: ${baseroute}</p>
            </micro-app-body>
        `;
    }

    // 属性变化监听
    static get observedAttributes() {
        return ['name', 'url', 'baseroute'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            console.log(`📝 Micro-app 属性变化: ${name} 从 "${oldValue}" 变为 "${newValue}"`);
        }
    }
}

// 注册自定义元素
if (!customElements.get('micro-app')) {
    customElements.define('micro-app', MicroApp);
}

// Micro-app-head 组件
class MicroAppHead extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('📋 Micro-app-head 组件已连接');
    }
}

// Micro-app-body 组件
class MicroAppBody extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('📄 Micro-app-body 组件已连接');
    }
}

// 注册子组件
if (!customElements.get('micro-app-head')) {
    customElements.define('micro-app-head', MicroAppHead);
}

if (!customElements.get('micro-app-body')) {
    customElements.define('micro-app-body', MicroAppBody);
}

console.log('🎯 自定义 Web Components 已注册');
