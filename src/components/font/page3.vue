<template>
    <div class="carousel-container">
        <UserHome></UserHome>
    </div>
</template>

<script>
import Page2 from "@/components/font/page2.vue";
import UserHome from "@/components/font/UserHome.vue";

export default {
    name: "page3",
    components: {UserHome, Page2},
    /*data() {
        return {
            images: [
                'https://picsum.photos/id/1014/1920/1080',
                'https://picsum.photos/id/1015/1920/1080',
                'https://picsum.photos/id/1016/1920/1080'
            ]
        }
    }*/
}
</script>

<style scoped>
.carousel-container {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    width: 100%;
    height: 100vh; /* 设置容器高度 */
    background-size: cover; /* 背景图缩放方式 */
    background-position: center; /* 背景图位置 */
    /*animation: slide 10s infinite; !* 定义动画 *!*/
    animation: slide 20s infinite;
}

/* 定义动画 */
@keyframes slide {
    0% { background-image: url('@/assets/01.png'); }
    25% { background-image: url('@/assets/02.png'); }
    50% { background-image: url('@/assets/03(1).png'); }
    75% { background-image: url('@/assets/04.png'); }
    100% { background-image: url('@/assets/6.png'); }
}
</style>