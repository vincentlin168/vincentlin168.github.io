// Mock Data
const mockKPIs = [
    {
        id: 1,
        name: "降低成本15%",
        score: 10,
        status: "完全可实现",
        reason: "",
        measures: "",
        target: "15%",
        owner: "运营部"
    },
    {
        id: 2,
        name: "提升现金流20%",
        score: 8,
        status: "存在障碍",
        reason: "市场环境挑战，收款周期延长",
        measures: "实施新的收款策略，加强应收账款管理",
        target: "20%",
        owner: "财务部"
    },
    {
        id: 3,
        name: "新增5个客户",
        score: 6,
        status: "存在障碍",
        reason: "竞争激烈，获客成本提高",
        measures: "加强营销投入，提升产品差异化",
        target: "5个",
        owner: "销售部"
    }
];

const mockActivities = [
    {
        id: 1,
        name: "成本控制",
        status: "已保存",
        plan: "通过自动化提升效率，减少人工操作环节",
        budget: {
            revenue: [
                { name: "效率提升", py: 80, cy: 85, ny: 90 },
                { name: "成本节约", py: 100, cy: 110, ny: 120 }
            ],
            costs: [
                { name: "人工", py: 500, cy: 480, ny: 460 },
                { name: "系统", py: 200, cy: 220, ny: 240 },
                { name: "差旅", py: 100, cy: 90, ny: 85 },
                { name: "培训", py: 50, cy: 55, ny: 60 }
            ]
        }
    },
    {
        id: 2,
        name: "报表优化",
        status: "未保存",
        plan: "简化报表流程，提高数据准确性",
        budget: {
            revenue: [
                { name: "工时节约", py: 60, cy: 70, ny: 80 },
                { name: "质量提升", py: 50, cy: 60, ny: 75 }
            ],
            costs: [
                { name: "人工", py: 300, cy: 320, ny: 340 },
                { name: "系统", py: 150, cy: 170, ny: 180 },
                { name: "培训", py: 30, cy: 40, ny: 45 }
            ]
        }
    },
    {
        id: 3,
        name: "合规管理",
        status: "未保存",
        plan: "建立合规培训体系，降低风险",
        budget: {
            revenue: [
                { name: "风险降低", py: 90, cy: 95, ny: 100 }
            ],
            costs: [
                { name: "人工", py: 250, cy: 270, ny: 290 },
                { name: "咨询", py: 120, cy: 130, ny: 140 },
                { name: "培训", py: 80, cy: 90, ny: 100 }
            ]
        }
    },
    {
        id: 4,
        name: "资金管理",
        status: "未保存",
        plan: "优化资金流向，提高资金使用效率",
        budget: {
            revenue: [
                { name: "资金收益", py: 110, cy: 120, ny: 135 },
                { name: "利息节约", py: 45, cy: 50, ny: 60 }
            ],
            costs: [
                { name: "人工", py: 180, cy: 190, ny: 200 },
                { name: "系统", py: 90, cy: 100, ny: 110 },
                { name: "咨询", py: 70, cy: 75, ny: 80 }
            ]
        }
    },
    {
        id: 5,
        name: "应收账款",
        status: "已保存",
        plan: "加强应收账款管理，缩短收款周期",
        budget: {
            revenue: [
                { name: "现金流改善", py: 150, cy: 170, ny: 190 }
            ],
            costs: [
                { name: "人工", py: 220, cy: 230, ny: 240 },
                { name: "系统", py: 40, cy: 50, ny: 60 },
                { name: "差旅", py: 30, cy: 35, ny: 40 }
            ]
        }
    },
    {
        id: 6,
        name: "预算编制",
        status: "已保存",
        plan: "提升预算编制精度，加强与战略的关联",
        budget: {
            revenue: [
                { name: "精确度提升", py: 70, cy: 80, ny: 90 },
                { name: "资源优化", py: 110, cy: 120, ny: 130 }
            ],
            costs: [
                { name: "人工", py: 280, cy: 290, ny: 300 },
                { name: "系统", py: 60, cy: 70, ny: 80 },
                { name: "培训", py: 40, cy: 45, ny: 50 }
            ]
        }
    },
    {
        id: 7,
        name: "税务筹划",
        status: "未保存",
        plan: "优化税务结构，合理节税",
        budget: {
            revenue: [
                { name: "税负优化", py: 200, cy: 220, ny: 240 }
            ],
            costs: [
                { name: "人工", py: 150, cy: 160, ny: 170 },
                { name: "咨询", py: 180, cy: 200, ny: 220 },
                { name: "系统", py: 30, cy: 40, ny: 50 }
            ]
        }
    }
];

let selectedKPI = null;
let selectedActivity = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Navigation
    initNavigation();
    
    // Initialize KPI Gallery
    initKPIGallery();
    
    // Initialize Activity Gallery
    initActivityGallery();
    
    // Initialize Form Handlers
    initFormHandlers();
    
    // Initialize Charts
    initCharts();
    
    // Initialize Modals
    initModals();
    
    // Initialize Tabs
    initTabs();
    
    // Set current date
    setCurrentDate();
});

// Set current date in the navigation
function setCurrentDate() {
    const dateElement = document.querySelector('.nav-date span');
    if (dateElement) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().substring(0, 10);
        dateElement.textContent = formattedDate;
    }
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding page
            const pageId = item.getAttribute('data-page');
            showPage(pageId);
        });
    });
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page with animation
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        selectedPage.style.opacity = 0;
        setTimeout(() => {
            selectedPage.style.opacity = 1;
        }, 50);
    }
}

// KPI Gallery
function initKPIGallery() {
    const gallery = document.getElementById('kpiGallery');
    if (!gallery) return;
    
    // Clear existing items
    gallery.innerHTML = '';
    
    // Add KPI items with animation
    mockKPIs.forEach((kpi, index) => {
        const item = createKPIItem(kpi);
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        gallery.appendChild(item);
        
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Select first KPI by default
    if (mockKPIs.length > 0) {
        selectedKPI = mockKPIs[0];
        updateKPIForm(selectedKPI);
        
        // Mark first item as selected
        const firstItem = gallery.querySelector('.gallery-item');
        if (firstItem) {
            firstItem.classList.add('selected');
        }
    }
}

function createKPIItem(kpi) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.style.transition = 'all 0.3s ease';
    
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h4>${kpi.name}</h4>
            <span class="badge ${kpi.score >= 9 ? 'bg-success' : 'bg-warning'}">${kpi.status}</span>
        </div>
        <div class="item-details">
            <div class="item-meta">
                <span class="item-owner">${kpi.owner}</span>
                <span class="item-target">目标: ${kpi.target}</span>
            </div>
            <div class="progress mt-2">
                <div class="progress-bar" role="progressbar" style="width: ${(kpi.score/12)*100}%"
                    aria-valuenow="${kpi.score}" aria-valuemin="0" aria-valuemax="12">
                    ${kpi.score}/12
                </div>
            </div>
        </div>
    `;
    
    div.addEventListener('click', () => {
        // Update selected KPI
        selectedKPI = kpi;
        
        // Update form with KPI details
        updateKPIForm(kpi);
        
        // Update selection
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.classList.remove('selected');
        });
        div.classList.add('selected');
    });
    
    return div;
}

function updateKPIForm(kpi) {
    document.getElementById('kpiScore').value = kpi.score;
    document.getElementById('scoreValue').textContent = kpi.score;
    document.getElementById('kpiReason').value = kpi.reason;
    document.getElementById('kpiMeasures').value = kpi.measures;
    
    // Update required fields based on score
    const score = kpi.score;
    const reasonField = document.getElementById('kpiReason');
    const measuresField = document.getElementById('kpiMeasures');
    
    if (score <= 8) {
        reasonField.required = true;
        measuresField.required = true;
        reasonField.parentElement.classList.add('required');
        measuresField.parentElement.classList.add('required');
    } else {
        reasonField.required = false;
        measuresField.required = false;
        reasonField.parentElement.classList.remove('required');
        measuresField.parentElement.classList.remove('required');
    }
}

// Activity Gallery
function initActivityGallery() {
    const gallery = document.getElementById('activityGallery');
    if (!gallery) return;
    
    // Clear existing items
    gallery.innerHTML = '';
    
    // Add activity items with animation
    mockActivities.forEach((activity, index) => {
        const item = createActivityItem(activity);
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        gallery.appendChild(item);
        
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Select first activity by default
    if (mockActivities.length > 0) {
        selectedActivity = mockActivities[0];
        updateBudgetTable(selectedActivity.budget);
        updateActivityName(selectedActivity.name);
        
        // Mark first item as selected
        const firstItem = gallery.querySelector('.gallery-item');
        if (firstItem) {
            firstItem.classList.add('selected');
        }
    }
}

function createActivityItem(activity) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.style.transition = 'all 0.3s ease';
    
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h4>${activity.name}</h4>
            <span class="badge ${activity.status === '已保存' ? 'bg-success' : 'bg-warning'}">${activity.status}</span>
        </div>
    `;
    
    div.addEventListener('click', () => {
        // Update selected activity
        selectedActivity = activity;
        
        // Update budget table
        updateBudgetTable(activity.budget);
        
        // Update activity name
        updateActivityName(activity.name);
        
        // Update selection
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.classList.remove('selected');
        });
        div.classList.add('selected');
    });
    
    return div;
}

function updateActivityName(name) {
    const activityNameElement = document.getElementById('activityName');
    if (activityNameElement) {
        activityNameElement.textContent = name;
    }
}

function updateBudgetTable(budget) {
    const table = document.getElementById('budgetTable');
    if (!table) return;
    
    table.innerHTML = `
        <h4 class="table-title"><i class="bi bi-graph-up-arrow"></i> 收益指标</h4>
        <table class="power-datatable">
            <thead>
                <tr>
                    <th>指标</th>
                    <th>前年实际</th>
                    <th>今年计划</th>
                    <th>明年预算</th>
                    <th>同比变化</th>
                </tr>
            </thead>
            <tbody>
                ${budget.revenue.map(item => {
                    const change = ((item.ny - item.cy) / item.cy * 100).toFixed(1);
                    return `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.py}</td>
                            <td>${item.cy}</td>
                            <td>${item.ny}</td>
                            <td class="${change >= 0 ? 'positive-change' : 'negative-change'}">
                                ${change >= 0 ? '+' : ''}${change}%
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
        
        <h4 class="table-title mt-4"><i class="bi bi-cash-stack"></i> 成本要素</h4>
        <table class="power-datatable">
            <thead>
                <tr>
                    <th>要素</th>
                    <th>前年实际</th>
                    <th>今年计划</th>
                    <th>明年预算</th>
                    <th>同比变化</th>
                </tr>
            </thead>
            <tbody>
                ${budget.costs.map(item => {
                    const change = ((item.ny - item.cy) / item.cy * 100).toFixed(1);
                    return `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.py}</td>
                            <td>${item.cy}</td>
                            <td>${item.ny}</td>
                            <td class="${change >= 0 ? 'positive-change' : 'negative-change'}">
                                ${change >= 0 ? '+' : ''}${change}%
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

// Form Handlers
function initFormHandlers() {
    // KPI Score Handler
    const scoreInput = document.getElementById('kpiScore');
    const scoreValue = document.getElementById('scoreValue');
    
    if (scoreInput && scoreValue) {
        scoreInput.addEventListener('input', (e) => {
            scoreValue.textContent = e.target.value;
            
            // Show/hide required fields based on score
            const score = parseInt(e.target.value);
            const reasonField = document.getElementById('kpiReason');
            const measuresField = document.getElementById('kpiMeasures');
            
            if (score <= 8) {
                reasonField.required = true;
                measuresField.required = true;
                reasonField.parentElement.classList.add('required');
                measuresField.parentElement.classList.add('required');
            } else {
                reasonField.required = false;
                measuresField.required = false;
                reasonField.parentElement.classList.remove('required');
                measuresField.parentElement.classList.remove('required');
            }
            
            // Update score display color
            if (score >= 9) {
                scoreValue.className = 'score-display high-score';
            } else if (score >= 5) {
                scoreValue.className = 'score-display medium-score';
            } else {
                scoreValue.className = 'score-display low-score';
            }
        });
    }
}

// Modal Functions
function initModals() {
    // Close modal on overlay click
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', closeModal);
    });
}

function openAddOperation() {
    const modal = document.getElementById('addOperationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.power-modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Tab Functions
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Chart Initialization with enhanced visuals
function initCharts() {
    initBudgetTrendChart();
    initCostBreakdownChart();
}

function initBudgetTrendChart() {
    const ctx = document.getElementById('budgetTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['前年实际', '今年计划', '明年预算'],
            datasets: [
                {
                    label: '收入',
                    data: [1200, 1350, 1500],
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: '支出',
                    data: [1000, 1100, 1200],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: '利润',
                    data: [200, 250, 300],
                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#0f172a',
                    bodyColor: '#0f172a',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    boxPadding: 4,
                    usePointStyle: true
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)'
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initCostBreakdownChart() {
    const ctx = document.getElementById('costBreakdownChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['人工成本', '系统成本', '差旅费', '其他费用'],
            datasets: [{
                data: [460, 240, 150, 100],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.7)',
                    'rgba(5, 150, 105, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(124, 58, 237, 0.7)'
                ],
                borderColor: [
                    'rgba(37, 99, 235, 1)',
                    'rgba(5, 150, 105, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(124, 58, 237, 1)'
                ],
                borderWidth: 1,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#0f172a',
                    bodyColor: '#0f172a',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    cornerRadius: 8,
                    boxPadding: 4,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Export Functions
function exportPDF() {
    const notification = showNotification('正在生成PDF...', 'info');
    
    // Simulate PDF generation
    setTimeout(() => {
        hideNotification(notification);
        showNotification('PDF已成功导出', 'success');
    }, 1500);
}

function exportExcel() {
    const notification = showNotification('正在生成Excel...', 'info');
    
    // Simulate Excel generation
    setTimeout(() => {
        hideNotification(notification);
        showNotification('Excel已成功导出', 'success');
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `power-notification ${type}`;
    
    // Add icon based on type
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="bi bi-check-circle-fill"></i>';
            break;
        case 'error':
            icon = '<i class="bi bi-x-circle-fill"></i>';
            break;
        case 'warning':
            icon = '<i class="bi bi-exclamation-triangle-fill"></i>';
            break;
        default:
            icon = '<i class="bi bi-info-circle-fill"></i>';
    }
    
    notification.innerHTML = `
        ${icon}
        <span>${message}</span>
        <button class="close-notification"><i class="bi bi-x"></i></button>
    `;
    
    // Add to document
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    document.querySelector('.notification-container').appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add close button event
    notification.querySelector('.close-notification').addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }
    
    return notification;
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Navigation Functions
function returnToEdit() {
    showPage('budget-entry');
}

function submitBudget() {
    if (confirm('确认提交预算？提交后将进入审批流程。')) {
        showNotification('预算已成功提交，进入审批流程', 'success');
        setTimeout(() => {
            showPage('approval');
        }, 1000);
    }
}

// Utility Functions
function logout() {
    if (confirm('确定要退出系统吗？')) {
        showNotification('正在退出系统...', 'info');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
} 