// 页面路径映射
const pageMap = {
    'budget-targets': 'pages/budget-targets.html',
    'budget-input': 'pages/budget-input.html',
    'budget-analysis': 'pages/budget-analysis.html',
    'activity-management': 'pages/activity-management.html',
    'budget-approval': 'pages/budget-approval.html'
};

// 页面标题映射
const titleMap = {
    'budget-targets': '预算目标',
    'budget-input': '预算填报',
    'budget-analysis': '预算分析',
    'activity-management': '作业管理',
    'budget-approval': '预算审批'
};

// 当文档加载完成时执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取页面元素
    const pageContent = document.getElementById('page-content');
    const pageTitle = document.getElementById('page-title');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // 初始化页面
    loadPage('budget-targets');

    // 添加导航点击事件监听
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            
            // 更新活动链接样式
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // 加载相应页面
            loadPage(pageName);
        });
    });

    // 添加移动端导航点击事件监听
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            
            // 更新活动链接样式
            mobileNavLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // 关闭移动菜单
            mobileMenu.classList.add('hidden');
            
            // 加载相应页面
            loadPage(pageName);
        });
    });

    // 移动端菜单按钮点击事件
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.remove('hidden');
    });

    // 关闭移动端菜单按钮点击事件
    closeMobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
    });

    // 页面加载函数
    function loadPage(pageName) {
        // 更新iframe源
        pageContent.src = pageMap[pageName];
        
        // 更新页面标题
        pageTitle.textContent = titleMap[pageName];
        
        // 更新文档标题
        document.title = `预算管理系统 - ${titleMap[pageName]}`;
        
        // 同步导航链接
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        mobileNavLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 窗口调整大小时自动关闭移动菜单
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
        }
    });

    // 全局消息通知函数
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg transition-all transform translate-x-0 z-50 ${
            type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' :
            type === 'error' ? 'bg-red-50 text-red-800 border-l-4 border-red-500' :
            type === 'warning' ? 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500' :
            'bg-blue-50 text-blue-800 border-l-4 border-blue-500'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <div class="mr-3">
                    <i class="fas ${
                        type === 'success' ? 'fa-check-circle' :
                        type === 'error' ? 'fa-exclamation-circle' :
                        type === 'warning' ? 'fa-exclamation-triangle' :
                        'fa-info-circle'
                    }"></i>
                </div>
                <div>
                    <p>${message}</p>
                </div>
                <button class="ml-auto text-gray-500 hover:text-gray-900" onclick="this.parentNode.parentNode.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 3秒后自动关闭
        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };

    // iframe通信处理
    window.addEventListener('message', function(event) {
        const data = event.data;
        
        if (data.action === 'navigate') {
            loadPage(data.page);
        } else if (data.action === 'notification') {
            window.showNotification(data.message, data.type);
        }
    });
}); 