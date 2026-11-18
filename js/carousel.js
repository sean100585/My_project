// 轮播图模块（含自动轮播、触摸滑动、响应式适配）
window.CarouselModule = {
    init() {
        // 元素缓存
        this.carouselSlides = document.querySelector('.carousel-slides');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.arrowLeft = document.querySelector('.carousel-arrow-left');
        this.arrowRight = document.querySelector('.carousel-arrow-right');
        
        // 状态变量
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.carouselInterval = null;
        this.isDragging = false;
        this.startX = 0;
        this.startScrollLeft = 0;

        // 初始化执行
        this.initCarouselWidth();
        this.startAutoCarousel();
        this.bindEvents();
    },

    // 初始化轮播图宽度（适配任意图片数量）
    initCarouselWidth() {
        this.carouselSlides.style.width = `${this.slideCount * 100}%`;
        this.slides.forEach(slide => {
            slide.style.width = `${100 / this.slideCount}%`;
        });
    },

    // 自动轮播（6秒切换）
    startAutoCarousel() {
        this.carouselInterval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.slideCount;
            this.updateCarousel();
        }, 6000);
    },

    // 重置自动轮播
    restartAutoCarousel() {
        clearInterval(this.carouselInterval);
        this.startAutoCarousel();
    },

    // 更新轮播状态（位置 + 指示器）
    updateCarousel() {
        const slideWidth = 100 / this.slideCount;
        this.carouselSlides.style.transform = `translateX(-${this.currentIndex * slideWidth}%)`;
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    },

    // 绑定所有事件（箭头 + 指示器 + 触摸滑动 + 窗口缩放）
    bindEvents() {
        // 左右箭头
        this.arrowLeft.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
            this.updateCarousel();
            this.restartAutoCarousel();
        });

        this.arrowRight.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % this.slideCount;
            this.updateCarousel();
            this.restartAutoCarousel();
        });

        // 指示器
        this.indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                this.currentIndex = parseInt(indicator.getAttribute('data-index'));
                this.updateCarousel();
                this.restartAutoCarousel();
            });
        });

        // 触摸滑动（移动端）
        this.carouselSlides.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].clientX;
            this.startScrollLeft = this.carouselSlides.scrollLeft;
            this.carouselSlides.style.transition = 'none';
            this.restartAutoCarousel();
        });

        this.carouselSlides.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.touches[0].clientX;
            const walk = (x - this.startX) * 2;
            this.carouselSlides.scrollLeft = this.startScrollLeft - walk;
        });

        this.carouselSlides.addEventListener('touchend', () => {
            this.isDragging = false;
            this.carouselSlides.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            const slideWidth = this.carouselSlides.clientWidth / this.slideCount;
            const scrollDistance = this.carouselSlides.scrollLeft - this.startScrollLeft;

            if (Math.abs(scrollDistance) > slideWidth / 3) {
                this.currentIndex = scrollDistance > 0 ? this.currentIndex + 1 : this.currentIndex - 1;
                this.currentIndex = Math.max(0, Math.min(this.currentIndex, this.slideCount - 1));
            }

            this.updateCarousel();
        });

        // 窗口缩放适配
        window.addEventListener('resize', () => this.initCarouselWidth());
    }
};