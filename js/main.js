// 项目入口文件：统一初始化所有模块（确保依赖加载完成后执行）
document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化公共工具（可见区域section）
    if (window.CommonUtils) {
        window.CommonUtils.initVisibleSections();
    }

    // 2. 初始化导航栏模块（页面必有，直接初始化）
    if (window.NavbarModule) {
        window.NavbarModule.init();
    }

    // 3. 初始化轮播图模块（判断页面是否有轮播图元素，避免报错）
    if (window.CarouselModule && document.querySelector('.carousel-slides')) {
        window.CarouselModule.init();
    }

    // 4. 初始化视频模态框模块（判断页面是否有模态框元素，避免报错）
    if (window.VideoModalModule && document.getElementById('videoModal')) {
        window.VideoModalModule.init();
    }
});