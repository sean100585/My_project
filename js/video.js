// 视频模态框模块（影视作品视频播放）
window.VideoModalModule = {
    init() {
        // 元素缓存
        this.modal = document.getElementById('videoModal');
        this.modalVideo = document.getElementById('modalVideo');
        this.closeBtn = document.querySelector('.modal-close');
        this.overlay = document.querySelector('.modal-overlay');
        this.productTitles = document.querySelectorAll('#film-tv .product-info h4');

        // 视频资源映射表
        this.videoSources = {
            '《小城良方》': '',
            '《谍报上不封顶》': '../videos/videos-film/谍报上不封顶.mp4',
            '《藏海传》': '../videos/videos-film/藏海传.mp4',
            '《骄阳伴我》': '../videos/videos-film/骄阳伴我.mp4',
            '《玉骨遥》': '../videos/videos-film/玉骨遥.mp4',
            '《梦中的那片海》': '../videos/videos-film/梦中的那片海.mp4',
            '《斗罗大陆》': '../videos/videos-film/斗罗大陆.mp4',
            '《陈情令》': '../videos/videos-film/陈情令.mp4',
            '《得闲谨制》': '../videos/videos-film/得闲谨制.mp4',
            '《射雕英雄传之侠之大者》': '../videos/videos-film/射雕英雄传之侠之大者.mp4',
            '《诛仙I》': '../videos/videos-film/诛仙.mp4'
        };

        // 绑定事件
        this.bindEvents();
    },

    // 关闭模态框（复用逻辑）
    closeModal() {
        this.modal.style.display = 'none';
        this.modalVideo.pause();
        this.modalVideo.src = '';
        document.body.style.overflow = '';
    },

    // 绑定所有交互事件
    bindEvents() {
        // 影视作品标题点击触发播放
        this.productTitles.forEach(title => {
            title.addEventListener('click', () => {
                const titleText = title.textContent.trim();
                const videoUrl = this.videoSources[titleText];

                if (videoUrl) {
                    this.modalVideo.src = videoUrl;
                    this.modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    this.modalVideo.play();
                }
            });
        });

        // 关闭按钮 + 遮罩层点击关闭
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.overlay.addEventListener('click', () => this.closeModal());

        // 视频播放结束自动关闭
        this.modalVideo.addEventListener('ended', () => this.closeModal());

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }
};