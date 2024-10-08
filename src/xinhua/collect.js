// 获取当前执行脚本所在的目录
const DIRNAME = __dirname;

const https = require('https');
const http = require('http');
let fs = require('fs')
const AxiosRequest = require("../http/AxiosRequest.js")
const FileHelper = require("../helper/FileHelper.js")
const Helper = require("../helper/Helper.js")
const fmt = require("../helper/FormatHelper.js")
const wiki = require('wikipedia');


// node src/wikipedia/collect.js --TENCENT_SECRET_ID=xxxxxxxx  --TENCENT_SECRET_KEY=xxxxxxx --latest=true

const PATH = "./docs/{lang}/news"
const PUBLIC = "./docs/public"
const CHANNEL = "xinhua"

// https://github.com/dopecodez/Wikipedia/blob/master/docs/wiki.md


const argv = require('minimist')(process.argv.slice(2));


const tencentTranslateClient = require("../translate/TencentTranslate.js")


function getChannelFile(base, channel, lang, file) {
    base = base.replace("{lang}", lang)
    return `${base}/${channel}/${file}`
}


function getNewsFile(channel, lang, year, month, day, hour) {
    const fileFolder = getNewsFileFolder(base, channel, lang, year, month, day, hour)
    const fileName = getNewsFileName(channel, lang, year, month, day, hour)
    return  `${fileFolder}/${fileName}`
}
function getNewsFileName(channel, lang, year, month, day, hour) {
    return `${channel}-${year}${month}${day}${hour?hour:""}.md`
}
function getNewsFileFolder(base, channel, lang, year, month, day, hour) {
    base = base.replace("{lang}", lang)
    return `${base}/${channel}/${year}/${month}`
}
function getLatestNewsFile(base, channel, lang) {
    return `${PUBLIC}/${channel}/latest.json`
}
async function getLatestNews(base, channel, lang) {
    try {
        let news = await getLatestNewsOnline()
        if (news) {
            return news;
        }
    } catch (error) {
        console.log(error);
    }
    try {
        let content = FileHelper.read(getLatestNewsFile(base, channel, lang))
        return content ? JSON.parse(content) : {}
    } catch (error) {
        console.log(error);
    }
    return {}
}
function getLatestNewsOnline(channel) {
    let url = `https://xlxm.cn/${channel}/latest.json`
    return fetch(url).then(function (response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return null
        }
    });
}

function saveLatestNews(base, channel, lang, newsMap) {
    FileHelper.write(getLatestNewsFile(base, channel, lang), JSON.stringify(newsMap));
}




function writeNewsFile(base, lang, content, year, month, day, hour) {
    const fileFolder = getNewsFileFolder(base, CHANNEL, lang, year, month, day, hour)
    const fileName = getNewsFileName(CHANNEL, lang, year, month, day, hour)

    if (!fs.existsSync(fileFolder)) { fs.mkdirSync(fileFolder, { recursive: true }); }

    let path = `${fileFolder}/${fileName}`
    FileHelper.write(path, content, "utf8", false)
}

function getLatestNewsTitle(year, month, day) {
    let title = `# 最新资讯 `;
    title += parseInt(year) > 0 ? `(${year}-${month}-${day})` : "";
    return title
}



// 获取图片base64
async function getImgBase64(url) {
    let base64Img
    return new Promise(function (resolve, reject) {
        let httpClient=url.split(":")[0]=="http"? http:https
        let req = httpClient.get(url, function (res) {
            let chunks = [];
            let size = 0;
            res.on("data", function (chunk) {
                chunks.push(chunk);
                size += chunk.length; //累加缓冲数据的长度
            });
            res.on("end", function (err) {
                //Buffer.concat()方法将chunks中的所有缓冲区对象合并为一个缓冲区对象
                let data = Buffer.concat(chunks, size);
                base64Img = data.toString("base64");
                resolve({ success: true, base64Img });
            });
        });
        req.on('error', (e) => {
            resolve({ success: false, errmsg: e.message });
        });
        req.end();
    })
}


async function writeArticles(articles, newsDate, fileDate) {
    let newsMap = await getLatestNews(PATH, CHANNEL, "zh")
    let fileContent = getLatestNewsTitle(newsDate.year, newsDate.month, newsDate.day) + ` \n`;

    let article = null
    for (let index = 0; index < articles.length; index++) {
        article = articles[index]
        if (newsMap && newsMap[article.id]) {
            article = newsMap[article.id]
            console.log("history: ", article.id);
        }
        await translateArticle(article)

        newsMap[article.id] = article
        fileContent += `## ${article.titleZh}   \n`
        fileContent += `${article.summaryEn}   \n\n`
        if (article.image) {
            fileContent += `<img src="${article.image}" />   \n\n`
        }
        fileContent += `${article.summaryZh}   \n`
        if(article.url){
            fileContent += `延伸阅读: ${fmt.link(article.url,'文章详情')}   \n\n`
        } 
        fileContent += `<qrcode title="${article.titleZh}" image="${article.image}" />   \n\n`
        console.log(article.id, article.titleZh);
    }

    writeNewsFile(PATH, "zh", fileContent, fileDate.year, fileDate.month, fileDate.day, fileDate.hour)
    saveLatestNews(PATH, CHANNEL, "zh", newsMap)
}

function formatArticles(list) {
    if (!list) return []
    let articles = []
    for (let index = 0; index < list.length; index++) {
        const e = list[index];
        articles.push({
            id: e.id,
            titleZh: e.title,
            summaryZh: e.brief,
            titleEn: null,
            summaryEn: null,
            image: e.image,
            url: e.url,
            keywors: e.keywords
        })
    }
    return articles;
}


async function translateArticles(articles) {
    if (!articles) return []
    articles.forEach(e => { translateArticle(e) });
    return articles
}
async function translateArticle(e) {
    if (!e) return e;
    if (!e.titleEn) e.titleEn = await translate(e.titleZh, "zh", "en")
    if (!e.titleZh) e.titleZh = await translate(e.titleEn, "en", "zh")
    if (!e.summaryEn) e.summaryEn = await translate(e.summaryZh, "zh", "en")
    if (!e.summaryZh) e.summaryZh = await translate(e.summaryEn, "en", "zh")
    return e
}
async function translate(words, from, to) {
    from = from ? from : "zh"
    to = to ? to : "en"
    req = { "SourceText": words, "Source": from, "Target": to, "ProjectId": 0 }
    let result = await tencentTranslateClient.TextTranslate(req)
    console.log(result.TargetText);
    await Helper.sleep(500)
    return result.TargetText
}



async function main() {

    let config = JSON.parse(FileHelper.read(`${DIRNAME}/config.json`))


    // 某天资讯
    console.log("date=", argv["date"]);
    if (argv["date"] && argv["date"].length > 0) {
        // 查询日期 与 资讯日期

    }


    // 最新资讯
    if (argv["latest"] == "true") {
        let today = new Date()
        newsDate = { year: fmt.fyear(today), month: fmt.fmonth(today), day: fmt.fday(today), hour: fmt.fhour(today) }
        fileDate = { year: "0000", month: "00", day: "00", hour: "00" }

        eval("function news(data){ return data;}");
        let pack = await AxiosRequest.get(config.url)
        pack = eval(pack);
        let articles = formatArticles(pack?.data?.list)
        articles = articles.slice(0, 20)
        await writeArticles(articles, newsDate, fileDate)
        await writeArticles(articles, newsDate, newsDate)
 
        let channel="xinhua"
        let channelFile = getChannelFile(PATH, channel, "zh", "content.md")
        let newsFileName=getNewsFileName(channel,"zh", newsDate.year, newsDate.month,newsDate.day, newsDate.hour)
        let contentLink=`/zh/news/${channel}/${newsDate.year}/${newsDate.month}/${newsFileName}`
        let contentTitle=articles[0].titleZh
        let content=`${newsDate.year}-${newsDate.month}-${newsDate.day}:${newsDate.hour}: ${fmt.link(contentLink, contentTitle)}`
        let fileContent=FileHelper.read(channelFile);
        FileHelper.write(channelFile,content+"\n\n")
        FileHelper.append(channelFile,fileContent) 
        
    }

}


try {
    main()
} catch (error) {
    console.log(error);
}







