// 导航栏模块（滚动效果 + 高亮 + 点击跳转）
window.NavbarModule = {
    init() {
        this.bindScrollEvent();
        this.bindClickEvent();
    },

    // 滚动事件：导航栏样式切换 + section高亮 + 可见性更新
    bindScrollEvent() {
        window.addEventListener('scroll', () => {
            this.handleNavbarStyle();
            this.handleNavHighlight();
            window.CommonUtils.initVisibleSections(); // 复用公共函数
        });
    },

    // 导航栏滚动样式切换
    handleNavbarStyle() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    },

    // 导航链接高亮匹配当前section
    handleNavHighlight() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-item a');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    },

    // 导航链接点击跳转（平滑滚动）
    bindClickEvent() {
        const navLinks = document.querySelectorAll('.nav-item a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // 移除所有高亮，给当前点击添加高亮
                    navLinks.forEach(link => link.classList.remove('active'));
                    link.classList.add('active');

                    // 计算目标位置（适配导航栏高度）
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    // 平滑滚动
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};