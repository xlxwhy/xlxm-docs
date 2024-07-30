<template>
    <div>
        <div class="qrcode-button">
            <br>
            <button @click="htmlToCanvas()" v-if="!autoCreate">点击生成【二维码】</button>
        </div>
        <canvas id="outputCanvas"></canvas>
        <img id="image1" src="/image/qrcode-01.jpg" />
        <img id="image2" :src="image" />

        <div class="qrcode-layout" ref="bill" v-if="showQRCode">
            <div class="qrcode-header">

            </div>
            <div class="qrcode-title">
                {{ title ? title : "最新资讯" }}<br>
                <div v-if="image" class="qrcode-image">
                    <img id="qrcodeImage" :src="image" />
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
        <div class="qrcode-image-layout">
            <img :src="canvasImageUrl" />
        </div>
    </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'







export default {
    props: ['autoCreate', 'title', "image"],
    data() {
        let now = new Date();
        let nowString = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
        return {
            value: "https://www.baidu.com",
            size: 200,
            today: nowString,
            canvasImageUrl: "",
            showQRCode: false,
        }
    },
    components: {
        QrcodeVue
    },
    mounted() {
        this.value = window.location.href;
        if (this.autoCreate) {
            this.htmlToCanvas()
        }
    },
    methods: {
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
                xhr.responseType = "arraybuffer";//文件流
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








            // var img = new Image();
            // var url = 'https://media.prod.mdn.mozit.cloud/attachments/2013/06/22/5397/7a3ec0cae64a95ad454ac3bc2c71c004/rhino.jpg';
            // img.src = url + '?' + new Date().getTime();
            // img.setAttribute('crossOrigin', '');

            // img.onload = function () {
            //     ctx.drawImage(img, 0, 0);
            //     img.style.display = 'none';
            // };

            // console.log(await this.getImgBase64FromUrlByXhr(image.src));



            // var text = 'Hello World';
            // var x = 50;
            // var y = 50;
            // var font = '30px Arial';
            // ctx.font = font;
            // ctx.fillStyle = 'red'; //定义字体颜色
            // ctx.fillText(text, x, y);


            // var newBackImage=new Image();
            // newBackImage.src=image;

            // newBackImage.onload = function () { 
            //     ctx.drawImage( this, 100, 100, 236, 368 )
            // }  


            // ctx.drawImage(image, 0, 0, backImage.width, backImage.height);


            // ctx.textAlign="center"

            // ctx.fillText(title, 0, 0);

            // const img = new Image();
            // img.src = target.src ;
            // img.onload = function() {
            //     const canvas = document.createElement('canvas');
            //     const ctx = canvas.getContext('2d');


            //     // 计算新的宽度和高度
            //     var newWidth =w;
            //     var newHeight =h;
            //     var ratio=1;

            //     const wratio=w/img.width
            //     const hratio=h/img.height

            //     if(wratio>hratio){
            //         newHeight=img.height*wratio
            //         ratio=wratio
            //     }else{
            //         newWidth=img.width*hratio
            //         ratio=hratio
            //     }

            //     canvas.width = w;
            //     canvas.height = h;

            //     // 绘制裁剪后的图片
            //     console.log(left, top);
            //     ctx.drawImage(img, left, top, newWidth, newHeight);

            //     // 执行回调函数并传递裁剪后的图片数据URL
            //     var quality = document.getElementById('quality').value;
            //     var type = document.getElementById('type').value;
            //     var base64String = canvas.toDataURL('image/'+type, parseFloat(quality));
            //     target.src=base64String;

            //     image.style.display="none"
            // }; 
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

        htmlToCanvas() {
            this.createImage();
            // let _this=this
            // this.showQRCode=true
            // this.$nextTick(()=>{
            //     let qrcodeImage=document.getElementById("qrcodeImage") 
            //     qrcodeImage.src=qrcodeImage.src+"?"+new Date().getTime()
            //     qrcodeImage.crossOrign="" 
            //     qrcodeImage.onload = function() {
            //         html2canvas(_this.$refs.bill, { useCORS: false}).then((canvas) => {
            //             let imageUrl = canvas.toDataURL('image/png'); // 将canvas转成base64图片格式
            //             _this.canvasImageUrl = imageUrl; 
            //             _this.showQRCode=false
            //         });
            //     }
            // })
        }

    }
}
</script>


<style lang="scss">
.qrcode-layout {
    width: 390px;
    height: 768px;
    // background: no-repeat url("/image/qrcode-01.jpg");
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
        font-size: 18px;
        text-align: center;
        padding: 10px 20px;

        .qrcode-title-image {}

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
