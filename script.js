// 页面导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航功能
    initNavigation();

    // 初始化移动端菜单
    initMobileMenu();

    // 初始化滚动效果
    initScrollEffects();

    // 初始化代码演示
    initCodeDemo();

    // 初始化标签页切换
    initTabSwitching();

    // 初始化联系信息显示
    initContactInfo();

    // 加载首屏动画
    loadInitialAnimations();
});

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });
}

function navigateToSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // 隐藏所有 section
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // 移除所有导航链接的 active 类
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 显示目标 section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add('active');
            // 重新触发动画
            animateSectionElements(targetSection);
        }, 100);
    }

    // 激活对应的导航链接
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // 关闭移动端菜单
    closeMobileMenu();

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 移动端菜单
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (navMenu) {
        navMenu.classList.remove('active');
    }
    if (hamburger) {
        hamburger.classList.remove('active');
    }
}

// 滚动效果
function initScrollEffects() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 12px rgba(60, 64, 67, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// 代码演示功能
function initCodeDemo() {
    // 默认显示第一个演示步骤
    showDemoStep(0);
}

function runDemo() {
    const demoSteps = document.querySelectorAll('.demo-step');
    const demoBtn = document.querySelector('.demo-btn');

    // 更改按钮状态
    demoBtn.innerHTML = '<span class="material-icons">refresh</span> 重新演示';
    demoBtn.disabled = true;

    // 重置所有步骤
    demoSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
    });

    // 逐个显示步骤
    let currentStep = 0;
    const showNextStep = () => {
        if (currentStep < demoSteps.length) {
            showDemoStep(currentStep);
            currentStep++;
            setTimeout(showNextStep, 800);
        } else {
            // 演示完成，重新启用按钮
            setTimeout(() => {
                demoBtn.disabled = false;
            }, 1000);
        }
    };

    setTimeout(showNextStep, 300);
}

function showDemoStep(stepIndex) {
    const demoSteps = document.querySelectorAll('.demo-step');

    if (demoSteps[stepIndex]) {
        demoSteps[stepIndex].style.opacity = '1';
        demoSteps[stepIndex].style.transform = 'translateX(0)';
        demoSteps[stepIndex].style.transition = 'all 0.6s ease-out';
    }
}

// 标签页切换
function initTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/switchTab\(this, '([^']+)'\)/)[1];
            switchTab(this, tabName);
        });
    });
}

function switchTab(tabBtn, tabName) {
    // 移除所有标签的 active 类
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // 激活当前标签
    tabBtn.classList.add('active');

    // 显示对应内容
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// 联系信息显示
function initContactInfo() {
    // 已经通过内联 onclick 处理
}

function showContact() {
    const contactInfo = document.getElementById('contact-info');
    const btn = event.target.closest('button');

    if (contactInfo.style.display === 'none') {
        contactInfo.style.display = 'block';
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            contactInfo.style.transition = 'all 0.3s ease-out';
            contactInfo.style.opacity = '1';
            contactInfo.style.transform = 'translateY(0)';
        }, 10);

        btn.innerHTML = '<span class="material-icons">close</span> 关闭';
    } else {
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            contactInfo.style.display = 'none';
        }, 300);

        btn.innerHTML = '<span class="material-icons">chat</span> 联系我';
    }
}

// 首屏动画
function loadInitialAnimations() {
    animateSectionElements(document.querySelector('.section.active'));
}

function animateSectionElements(section) {
    if (!section) return;

    // 重新触发动画
    const animatedElements = section.querySelectorAll('.feature-card, .highlight-item, .feature-item, .demo-step');

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    const sections = ['home', 'gdg', 'devtools', 'about'];
    const currentSection = document.querySelector('.section.active');

    if (!currentSection) return;

    const currentIndex = sections.indexOf(currentSection.id);

    switch(e.key) {
        case 'ArrowLeft':
            if (currentIndex > 0) {
                navigateToSection(sections[currentIndex - 1]);
            }
            break;
        case 'ArrowRight':
            if (currentIndex < sections.length - 1) {
                navigateToSection(sections[currentIndex + 1]);
            }
            break;
    }
});

// 添加触摸滑动支持 (移动端)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const sections = ['home', 'gdg', 'devtools', 'about'];
    const currentSection = document.querySelector('.section.active');

    if (!currentSection) return;

    const currentIndex = sections.indexOf(currentSection.id);
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentIndex < sections.length - 1) {
            // 向左滑动，下一个页面
            navigateToSection(sections[currentIndex + 1]);
        } else if (diff < 0 && currentIndex > 0) {
            // 向右滑动，上一个页面
            navigateToSection(sections[currentIndex - 1]);
        }
    }
}

// 性能优化：使用 Intersection Observer 实现懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // 降级处理
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// 添加页面加载完成后的额外效果
window.addEventListener('load', function() {
    // 添加加载完成的视觉反馈
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 初始化懒加载
    initLazyLoading();
});

// 处理错误
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);

    // 可以在这里添加错误上报逻辑
    // 或显示用户友好的错误信息
});

// 添加浏览器兼容性检查
function checkBrowserCompatibility() {
    const requiredFeatures = [
        'fetch',
        'Promise',
        'IntersectionObserver',
        'requestAnimationFrame'
    ];

    const missingFeatures = requiredFeatures.filter(feature => !(feature in window));

    if (missingFeatures.length > 0) {
        console.warn('浏览器缺少以下功能:', missingFeatures);

        // 可以在这里添加降级处理或用户提示
        if (missingFeatures.includes('IntersectionObserver')) {
            // 为不支持 IntersectionObserver 的浏览器启用备用方案
            initLazyLoadingFallback();
        }
    }
}

// IntersectionObserver 的备用方案
function initLazyLoadingFallback() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
    });
}

// 执行兼容性检查
checkBrowserCompatibility();