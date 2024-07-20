<template>
    <div>
        <div class="qrcode-button">
            <br>
            <button @click="htmlToCanvas()" v-if="!autoCreate">点击生成【资讯二维码】</button>
        </div>
        <div class="qrcode-layout" ref="bill" v-if="showQRCode">
            <div class="qrcode-header">

            </div>
            <div class="qrcode-title">
                新闻资讯<br>
            </div>
            <div class="qrcode-date">
                {{ today }}
            </div>
            <div class="qrcode-body">
                <qrcode-vue :value="value" :size="size" level="H" />
            </div>
            <div class="qrcode-footer">
                @最新资讯
            </div>
        </div>
        <div class="qrcode-image-layout">
            <img :src="canvasImageUrl" />
        </div>
    </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'

export default {
    props: ['autoCreate'],
    data() {
        let now = new Date();
        let nowString = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
        return {
            value: "https://www.baidu.com",
            size: 200,
            today: nowString,
            canvasImageUrl:"",
            showQRCode: false,
        }
    },
    components: {
        QrcodeVue
    },
    mounted(){
        this.value=window.location.href;
        if(this.autoCreate){
            this.htmlToCanvas()
        }
    },
    methods: {
        htmlToCanvas() {
            this.showQRCode=true
            this.$nextTick(()=>{
                html2canvas(this.$refs.bill, {}).then((canvas) => {
                    let imageUrl = canvas.toDataURL('image/png'); // 将canvas转成base64图片格式
                    this.canvasImageUrl = imageUrl; 
                    this.showQRCode=false
                });
            })
        }

    }
}
</script>


<style lang="scss">
.qrcode-layout {
    width: 390px;
    height: 768px;
    background: no-repeat url("/image/qrcode-01.jpg");
    border: 0px solid #ccc;
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    .qrcode-header {
        flex: 1;
    }

    .qrcode-title {
        line-height: 50px;
        font-size: 28px;

    }

    .qrcode-date {
        line-height: 50px;
        font-size: 16px;

    }

    .qrcode-body {
        background-color: #ddd;

        canvas {
            margin: 10px;
        }
    }  
    .qrcode-button {
        margin: 20px;
        line-height: 50px;
    }

    .qrcode-footer {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: right;
        align-items: end;
        color: #999;
        padding: 10px;
    }
}
</style>
