<template>
    <div>
        <div class="qrcode-button">
            <br>点击生成
            <button @click="htmlToCanvas(true)" v-if="!autoCreate">【二维码1】</button>
            <button @click="htmlToCanvas(false)" v-if="!autoCreate">【二维码2】</button>
        </div>
        <div v-if="loading">正在生成二维码...</div>
        <div class="qrcode-layout" ref="bill" v-if="showQRCodeHtml">
            <div class="qrcode-header">

            </div>
            <div class="qrcode-title">
                {{ title ? title : "最新资讯" }}<br>
                <div v-if="image && withImage" class="qrcode-image">
                    <img :src="image" />
                </div>
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
        <div class="qrcode-image-layout" v-if="showQRCode">
            <img :src="canvasImageUrl" />
        </div>
    </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'



export default {
    props: ['autoCreate', 'title', "image", "channel", "id"],
    data() {
        let now = new Date();
        let nowString = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
        return {
            value: "https://www.baidu.com",
            size: 200,
            today: nowString,
            canvasImageUrl: "",
            showQRCode: false,
            showQRCodeHtml: false,
            withImage: false,
            loading: false,
        }
    },
    components: {
        QrcodeVue
    },
    mounted() {
        let url=window.location.href.split("#")[0] 
        //##湖南资兴直升机救援已飞行181架次-累计投送物资48-4吨
        //##湖南资兴直升机救援已飞行181架次%20累计投送物资48-4吨
        //#错一个字重新打印一本-为何会有办事人员宁可浪费
        //#-错一个字重新打印一本-？为何会有办事人员宁可浪费
        let newTitle=this.transformTitle(this.title)
        url+="#"+encodeURIComponent(newTitle)

        this.value = url;
        if (this.autoCreate) {
            this.htmlToCanvas()
        }
    },
    methods: {
        checkTitleStartWithNumber(str) {
            return /^\d/.test(str);
        },
        checkTitleStart(str) {
            return /^\-/.test(str);
        },
        checkTitleEnd(str) {
            return /\-$/.test(str) ;
        },
        
        transformTitle(title) {
            let reg="[ ~！!@#$%…^&*()（）+=‘“”’：；;:'\"\\\\/?？<>,\.，\{\}\\\[\\\]\-\|｜\s]+"
            title=title.replace(new RegExp(reg,"g"), "-") 
            title=title.replace(new RegExp("[￥]","g"), "¥") 
            title=title.replace(new RegExp("[①]","g"), "1") 
            title=title.replace(new RegExp("[②]","g"), "2") 
            title=title.replace(new RegExp("[③]","g"), "3") 
            title=title.replace(new RegExp("[④]","g"), "4") 
            title=title.replace(new RegExp("[⑤]","g"), "5") 
            title=title.replace(new RegExp("[⑥]","g"), "6") 
            title=title.replace(new RegExp("[⑦]","g"), "7") 
            title=title.replace(new RegExp("[⑧]","g"), "8") 
            title=title.replace(new RegExp("[⑨]","g"), "9") 
            if(this.checkTitleStartWithNumber(title)){
                title="_"+title
            }

            if(this.checkTitleStart(title)){
                title=title.substring(1)
            }
            if(this.checkTitleEnd(title)){
                title=title.substring(0, title.length-1)
            }
            return title ;
        },
        async getImgBase64FromUrlByXhr(url) {
            return new Promise((resolve, reject) => {
                if (url) {
                    let xhr = new XMLHttpRequest();
                    xhr.open('get', url, true);
                    xhr.responseType = 'blob';
                    xhr.onload = () => {
                        if (xhr.status == 200) {
                            let oFileReader = new FileReader();
                            oFileReader.readAsDataURL(xhr.response);
                            oFileReader.onloadend = (e) => {
                                oFileReader = null;
                                xhr = null;
                                resolve(e.target.result);
                            };
                        }
                    };
                    xhr.send();
                } else {
                    reject();
                }
            });
        },
        async getImgBase64FromUrlByDom(url) {
            return new Promise((resolve, reject) => {
                if (url) {
                    let img = new Image();
                    img.crossOrigin = '';
                    img.src = url;
                    // img.crossOrigin = 'Anonymous';
                    img.setAttribute('crossOrigin', 'Anonymous');
                    img.onload = () => {
                        let canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;

                        canvas
                            .getContext('2d')
                            ?.drawImage(img, 0, 0, img.width, img.height);

                        const dataURL = canvas.toDataURL(
                            'image/' +
                            img.src
                                .substring(img.src.lastIndexOf('.') + 1)
                                .toLowerCase()
                        );

                        img = null;
                        canvas = null;
                        resolve(dataURL);
                    };
                } else {
                    reject();
                }
            });
        },



        image2Base64(img) {//导入的图片路径https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg
            var toBase64 = new Promise(function (resolve, reject) {
                window.URL = window.URL || window.webkitURL;
                var xhr = new XMLHttpRequest();
                xhr.open("get", img, true);
                // 至关重要
                xhr.responseType = "blob";//文件流
                xhr.onload = function (res) {
                    if (res.currentTarget.status == 200) {
                        //得到一个blob对象
                        var blob = res.currentTarget.response;
                        // 至关重要
                        let oFileReader = new FileReader();
                        oFileReader.onloadend = function (e) {
                            let base64 = e.target.result;//base64
                            resolve(base64)
                        };
                        oFileReader.readAsDataURL(blob);
                    }
                }
                xhr.send();
            });
            console.log("toBase64")
            console.log(toBase64)
            return toBase64;
        },

        async makeImage(backImage, image, title, dateString) {

            var canvas = document.getElementById('outputCanvas');
            canvas.width = backImage.width;
            canvas.height = backImage.height;
            var ctx = canvas.getContext('2d');

            var img = new Image();
            this.image2Base64(image.src).then(base64 => {
                console.log("base64-------------")
                console.log(base64)
                img.src = base64
                img.crossOrigin = '*'
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                }

            })


        },

        createImage() {
            let image1Element = document.getElementById('image1');
            let image2Element = document.getElementById('image2');
            // image1Element.src = image1Element.src + "?" + new Date().getTime()
            // image2Element.src = image2Element.src + "?" + new Date().getTime()
            // image1Element.crossOrign = ""
            // image2Element.crossOrign = ""

            this.makeImage(image1Element, image2Element, "title"); // Alpha value between 0 and 1
            // let _this=this
            // image1Element.onload = function() {
            //     image2Element.onload = function() {
            //         _this.mergeImages(image1Element, image2Element, 0.5); // Alpha value between 0 and 1
            //     };
            // };
        },

        htmlToCanvas(withImage) {
            // this.createImage();

            let _this = this
            this.showQRCodeHtml = true
            this.withImage=withImage;
            this.loading=true;
            this.$nextTick(() => { 
                if (!withImage) { 
                    html2canvas(_this.$refs.bill, { }).then((canvas) => {
                        let imageUrl = canvas.toDataURL('image/png'); // 将canvas转成base64图片格式
                        _this.canvasImageUrl = imageUrl;
                        _this.showQRCode = true
                        _this.showQRCodeHtml = false
                        _this.loading=false;
                    });
                }else{
                    _this.showQRCode = false
                    _this.loading=false;
                }
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
        line-height: 32px;
        font-size: 18px;
        text-align: center;
        padding: 10px 20px;
        font-family: Helvetica, Tahoma, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', STXihei, 'Microsoft YaHei', SimHei;
        .qrcode-image {
            display: flex;
            justify-content: center;
        }

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
