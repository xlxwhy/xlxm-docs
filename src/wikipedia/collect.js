
let fs = require('fs')
const AxiosRequest = require("../http/AxiosRequest.js")
const FileHelper = require("../helper/FileHelper.js")
const fmt = require("../helper/FormatHelper.js")
const wiki = require('wikipedia');


// node src/wikipedia/collect.js --TENCENT_SECRET_ID=xxxxxxxx  --TENCENT_SECRET_KEY=xxxxxxx --latest=true

const PATH = "./docs/{lang}/news"
const PUBLIC = "./docs/public"
const CHANNEL = "wikipedia"

// https://github.com/dopecodez/Wikipedia/blob/master/docs/wiki.md


const argv = require('minimist')(process.argv.slice(2));



const tencentcloud = require("tencentcloud-sdk-nodejs");
const { channel } = require('diagnostics_channel');
const { log } = require('console');

// 导入对应产品模块的client models。
const TmtClient = tencentcloud.tmt.v20180321.Client

// 实例化要请求产品(以cvm为例)的client对象
const client = new TmtClient({
    // 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
    // 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
    credential: {
        secretId: argv["TENCENT_SECRET_ID"],
        secretKey: argv["TENCENT_SECRET_KEY"],
    },

    // 产品地域
    region: "ap-shanghai",
    // 可选配置实例
    profile: {
        signMethod: "TC3-HMAC-SHA256", // 签名方法
        httpProfile: {
            reqMethod: "POST", // 请求方法
            reqTimeout: 30, // 请求超时时间，默认60s
            headers: {
                // 自定义 header
            },
            // proxy: "http://127.0.0.1:8899" // http请求代理
        },
    },
})




function getNewsFileName(channel, lang, year, month, day) {
    return `${channel}-${year}${month}${day}.md`
}
function getNewsFileFolder(base, channel, lang, year, month, day) {
    base= base.replace("{lang}", lang) 
    return `${base}/${channel}/${year}/${month}`
}
function getLatestNewsFile(base, channel, lang) { 
    return `${PUBLIC}/${channel}/latest.json`
}
async function getLatestNews(base, channel, lang) {
    try { 
        let news=await getLatestNewsOnline() 
        if(news){
            return news;
        }
    } catch (error) {
        console.log(error); 
    }
    try {  
        let content=FileHelper.read(getLatestNewsFile(base, channel, lang))
        return content?JSON.parse(content):{}
    } catch (error) {
        console.log(error);
    }
    return {}
}
function getLatestNewsOnline() {
    let url="https://docs.xlxm.cn/wikipedia/latest.json"
    return fetch(url).then(function(response) {
        if(response.status === 200){
          return response.json();
        }else{
          return null
        }
    });
}

function saveLatestNews(base, channel, lang, newsMap) { 
    FileHelper.write(getLatestNewsFile(base, channel, lang), JSON.stringify(newsMap));
}



function writeNewsFile(base, lang, content, year, month, day) { 
    const fileFolder = getNewsFileFolder(base, CHANNEL, lang, year, month, day)
    const fileName = getNewsFileName(CHANNEL, lang, year, month, day)

    if (!fs.existsSync(fileFolder)) { fs.mkdirSync(fileFolder, { recursive: true }); }

    let path = `${fileFolder}/${fileName}`
    FileHelper.write(path, content, "utf8", false)
}

function getLatestNewsTitle(year, month, day){
    let title = `# 最新资讯 `;
    title += parseInt(year)>0?`(${year}${month}${day})`:"";
    return title
}

async function writeArticleFile(articles, year, month, day, includes) {
    let newsMap = await getLatestNews(PATH, CHANNEL, "zh")
    let fileContentZh = getLatestNewsTitle(year, month, day)+ ` \n`;

    let article = null
    let max = 20
    for (let index = 0; index < articles.length; index++) {
        if (--max < 0) break
        article = articles[index]
        if (includes.length != 0 && !includes.includes(article.pageid)) {
            continue;
        }
        if (newsMap && newsMap[article.pageid]) {
            article = newsMap[article.pageid]
        } 
        if(!article.summaryZh || !article.titleZh){
            await transformArticle(article)
        }else{
            console.log("history: ",article.pageid, article.title, article.content_urls.desktop.page);
        }
        newsMap[article.pageid]=article
        fileContentZh += `## ${article.titleZh}   \n`
        fileContentZh += `${article.summaryEn}   \n\n`
        fileContentZh += `${article.summaryZh}   \n\n`
        fileContentZh += `阅读延伸[${article.pageid}]: ${fmt.link(article.content_urls.desktop.page)}   \n\n`
    }
    writeNewsFile(PATH, "zh", fileContentZh, year, month, day)
    saveLatestNews(PATH, CHANNEL, "zh", newsMap)
}

async function transformArticle(article) {
    const summary = await wiki.summary(article.title);

    req = { "SourceText": summary.extract, "Source": "en", "Target": "zh", "ProjectId": 0 }

    req.SourceText = summary.extract
    article.summaryEn = summary.extract
    article.summaryZh = (await client.TextTranslate(req)).TargetText

    req.SourceText = article.title
    article.titleEn = article.title
    article.titleZh = (await client.TextTranslate(req)).TargetText
    console.log("translate: ",article.pageid, article.title, article.content_urls.desktop.page);
    return article
}


async function main() {
    // wiki配置
    await wiki.setUserAgent('whimpark(whimpark@gmail.com)');


    let query, news, content

    // 某天资讯
    console.log("date=",argv["date"]);
    if (argv["date"] && argv["date"].length > 0) {
        // 查询日期 与 资讯日期
        let queryDate = fmt.parseDate(argv["date"]);
        let newsDate = new Date(queryDate.getTime() - 24 * 3600 * 1000)
        query = { year: fmt.fyear(queryDate), month: fmt.fmonth(queryDate), day: fmt.fday(queryDate) }
        news = { year: fmt.fyear(newsDate), month: fmt.fmonth(newsDate), day: fmt.fday(newsDate) }
        content = await wiki.featuredContent(query);
        let dateKey = `${news.year}${news.month}${news.day}`
        writeArticleFile(content.mostread.articles, news.year, news.month, news.day, [])
    }


    // 最新资讯
    if (argv["latest"] == "true") {
        let today = new Date()
        query = { year: fmt.fyear(today), month: fmt.fmonth(today), day: fmt.fday(today) }
        news = { year: "0000", month: "00", day: "00" }
        content = await wiki.featuredContent(query);
        writeArticleFile(content.mostread.articles, news.year, news.month, news.day, [])
    }

}


main()







