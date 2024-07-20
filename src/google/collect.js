
let fs = require('fs')
const AxiosRequest =require("../http/AxiosRequest.js") 
const FileHelper =require("../helper/FileHelper.js") 
const fmt =require("../helper/FormatHelper.js") 
const wiki = require('wikipedia');
 

const translate = require("google-translate-api");

const config=require("./config.js");
const { log } = require('console');
const { resolve } = require('path');
 
const PATH="./docs/{lang}/news"
const SRCBASE="./src/google"
const CHANNEL="google"

// https://github.com/dopecodez/Wikipedia/blob/master/docs/wiki.md


const argv = require('minimist')(process.argv.slice(2));

function delay(time) { return new Promise(resolve => setTimeout(resolve, time)); }


function getFileName(channel, lang, year, month, day){
    return `${channel}-${year}${month}${day}.md`
}
function getFileFolder(base, channel, lang, year, month, day){
    return `${base}/${channel}/${year}/${month}`
}
async function translateByGoogle2(article){
    article.titleZh= article.title
    let res=await translate(article.titleZh, { to: 'en' })
    article.titleEn= res?res.text:article.titleZh
    return article
}
async function translateByGoogle(article){
    let config={
        headers:{
            "Host":"translate.google.com"
        }
    }
    let q=encodeURIComponent(article.title)
    let url=`https://142.251.43.14/translate_a/single?client=at&sl=zh-CN&tl=en&dt=t&q=${q}`
    let res=await fetch(url, config).then(async stream=>{
        return await stream.json().then(res=>{ 
            return res
        })
    })
    article.titleEn= (res&&res[0]&&res[0][0]&&res[0][0][0])?res[0][0][0]:article.title 
    return article
}





async function translateArticle(article){
    article.titleZh= article.title

    var appid = '2015063000000001';
    var key = '12345678';
    var salt = (new Date).getTime();
    var query = 'apple';
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'en';
    var to = 'zh';
    var str1 = appid + query + salt +key;
    var sign = MD5(str1);
    await fetch({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        method: 'get', 
        data: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        } 
    }) 

    article.titleEn= res?res.text:article.titleZh

    return article
}







function writeArticlesFile(base, lang, content, year, month, day){
    base=base.replace("{lang}",lang)
    const fileFolder=getFileFolder(base, CHANNEL, lang, year, month, day) 
    const fileName=getFileName(CHANNEL, lang, year, month, day) 
 
    if(!fs.existsSync(fileFolder)) { fs.mkdirSync(fileFolder, { recursive: true }); } 
     
    let path=`${fileFolder}/${fileName}` 
    FileHelper.write(path, content, "utf8", false)  
}



async function translateArticles(articles){
    let article=null  
    for (let index = 0; index < articles.length; index++) { 
        article=articles[index] 
        console.log("translating title: ", article.title); 
        await translateByGoogle(article)
        await delay(100)
    }
    return article
}

async function writeArticles(articles, year, month, day){
   
    let fileContent=""
    fileContent+=`---\n` 
    fileContent+=`layout: doc\n`
    fileContent+=`footer: true\n`
    fileContent+=`prev: false\n`
    fileContent+=`next: false\n`
    fileContent+=`navbar: false\n`
    fileContent+=`hideAdContent: false\n`
    fileContent+=`title: 最新资讯\n`
    fileContent+=`head:\n`; 
    fileContent+=`- - meta\n`; 
    fileContent+=`  - name: description\n`; 
    fileContent+=`    content: 中国最新资讯\n`; 
    fileContent+=`- - meta\n`; 
    fileContent+=`  - name: keywords\n`; 
    fileContent+=`    content: 中国最新资讯, 中国资讯, 双语资讯\n`; 
    fileContent+=`---\n`
    fileContent+=`# 最新资讯  \n`; 
    fileContent+=`Latest News  (${year}${month}${day})   \n`; 
 
    let article=null 
    let articleCount=0
    for (let index = 0; index < articles.length; index++) { 
        article=articles[index] 

        fileContent+=`## ${article.title}   \n`;
        fileContent+=`${article.titleEn}   \n`; 
        fileContent+=`${article.origin?article.origin:article.link}   \n`; 
        fileContent+=`\n`;   
        if(articleCount++>10){
            fileContent+=`<GoogleAdsense />\n`;  
            fileContent+=`\n`;  
            articleCount=0  
        }
    }

    writeArticlesFile(PATH, "zh", fileContent, year, month, day) 
 
}


 
async function main(){
    let autoTranslate=true
 
    // 日期
    let now=new Date() 
    let newsDate={year:fmt.fyear(now), month: fmt.fmonth(now), day:fmt.fday(now)}
    // let newsDate={year:"2023", month: "12", day: "06"}
    let dateString=`${newsDate.year}${newsDate.month}${newsDate.day}`
    // 文件
    let originFilePath=`${SRCBASE}/news/news-${dateString}-origin.json`
    let translateFilePath=`${SRCBASE}/news/news-${dateString}-translate.json`
    // 加载源文件
    let content=FileHelper.read(originFilePath)
    let articles=JSON.parse(content)

    // 翻译
    let isExist=await new Promise((resolve)=>{
        fs.access(translateFilePath, fs.constants.F_OK, (err) => { 
            resolve(err?false:true) 
        });
    })
    console.log("isExist",isExist);
    if(isExist){
        // 加载翻译
        content=FileHelper.read(translateFilePath)
        articles=JSON.parse(content)
    }else{
        // 翻译
        await translateArticles(articles)
        FileHelper.write(translateFilePath, JSON.stringify(articles, null, 2))
    }

    // 手动翻译
    if(!autoTranslate){
        let contentEn=FileHelper.read(`${SRCBASE}/news/news-${newsDate.year}${newsDate.month}${newsDate.day}-en.json`)
        let articlesEn=JSON.parse(contentEn)
        for (let ci = 0; ci < articlesEn.length; ci++) {
            const articleEn = articlesEn[ci];
            const article = articles[ci];
            article.titleEn=articleEn.title 
        }
    }

    writeArticles(articles, newsDate.year, newsDate.month, newsDate.day ) 
    console.log("Write news file finished! ");
}

async function test() {
    let article={title:"前11月内蒙古全区制造业投资同比增长52% 居全国第一"}
    // let article={title:"前11月内蒙古全区制造业投资同比增长52% 居全国第一"}
    article=await translateByGoogle(article)
    console.log(article);

}

main()
// test()

