<template>
    <div :class="'ad-container  ad-container-' + padding">
        <div class="ad-content">
            <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6579111049316949"
                crossorigin="anonymous"></script>
            <!-- 模向广告 -->
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-6579111049316949"
                data-ad-slot="8705179855" data-ad-format="auto" data-full-width-responsive="true"></ins>
            <component :is="'script'">
                (adsbygoogle = window.adsbygoogle || []).push({});
            </component>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        padding: {
            type: [String],
            default: "article"
        },
    },
    data() {
        return {
        }
    },
    components: {
    },
    mounted() {
    },
    methods: {

    }
}
</script>


<style lang="scss">
.ad-container {
    display: flex;
    justify-content: center;

    .ad-content {
        max-width: 850px;
        width: 800px;
    }
}

.ad-container-home {
    padding: 0px;
}
.ad-container-article {
    padding-left: 225px;
}
</style>
