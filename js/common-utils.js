// 公共工具函数（供其他模块复用）
window.CommonUtils = {
    // 初始化/更新可见区域的section（滚动时和页面加载时复用）
    initVisibleSections() {
        const sections = document.querySelectorAll('.section');
        const windowHeight = window.innerHeight;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
};