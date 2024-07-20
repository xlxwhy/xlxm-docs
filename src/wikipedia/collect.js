
let fs = require('fs')
const AxiosRequest =require("../http/AxiosRequest.js") 
const FileHelper =require("../helper/FileHelper.js") 
const fmt =require("../helper/FormatHelper.js") 
const wiki = require('wikipedia');



const translate = require("google-translate-api");

const config=require("./config.js")
 
const PATH="./docs/{lang}/news"
const CHANNEL="wikipedia"

// https://github.com/dopecodez/Wikipedia/blob/master/docs/wiki.md


const argv = require('minimist')(process.argv.slice(2));


function getNewsFileName(channel, lang, year, month, day){
    return `${channel}-${year}${month}${day}.md`
}
function getNewsFileFolder(base, channel, lang, year, month, day){
    return `${base}/${channel}/${year}/${month}`
}


function writeNewsFile(base, lang, content, year, month, day){
    base=base.replace("{lang}",lang)
    const fileFolder=getNewsFileFolder(base, CHANNEL, lang, year, month, day) 
    const fileName=getNewsFileName(CHANNEL, lang, year, month, day) 
 
    if(!fs.existsSync(fileFolder)) { fs.mkdirSync(fileFolder, { recursive: true }); } 
     
    let path=`${fileFolder}/${fileName}` 
    FileHelper.write(path, content, "utf8", false)  
}

async function writeArticleFile(articles, year, month, day, includes){
  
    let fileContentEn=`# Today's news (${year}${month}${day})   \n`;
    let fileContentZh=`# 今日资讯  (${year}${month}${day})   \n`; 
 
    let article=null
    let max=20
    for (let index = 0; index < articles.length; index++) {
        if(--max<0) break
        article=articles[index] 
        if(includes.length!=0 && !includes.includes(article.pageid)){
            continue; 
        }
        await transformArticle(article)

        fileContentEn+=`## ${article.titleEn}   \n`;
        fileContentEn+=`${article.summaryEn}   \n\n`
        // fileContentEn+=`Detail[${article.pageid}]: ${fmt.link(article.content_urls.desktop.page)}   \n\n` 

        fileContentZh+=`## ${article.titleZh.text}   \n` 
        fileContentZh+=`${article.summaryZh.text}   \n\n` 
        // fileContentZh+=`阅读延伸[${article.pageid}]: ${fmt.link(article.content_urls.desktop.page)}   \n\n` 
    }
    writeNewsFile(PATH, "en", fileContentEn, year, month, day)
    writeNewsFile(PATH, "zh", fileContentZh, year, month, day)
    console.log(article);
}

async function transformArticle(article){
    const summary=await wiki.summary(article.title);
    article.summaryEn= summary.extract_html
    article.summaryZh= await translate(summary.extract, { to: 'zh-CN' })
    article.titleEn= article.title
    article.titleZh= await translate(article.title, { to: 'zh-CN' })
    console.log(article.title ,  article.content_urls.desktop.page );
    return article
}

 
async function main(){
    // wiki配置
    await wiki.setUserAgent('whimpark(whimpark@gmail.com)'); 

    
    let query, news, content

    // 某天资讯
    console.log(argv["date"] );
    if(argv["date"] && argv["date"].length>0){
        // 查询日期 与 资讯日期
        let queryDate = fmt.parseDate(argv["date"]);  
        let newsDate=new Date(queryDate.getTime()-24*3600*1000)
        query={year:fmt.fyear(queryDate), month:fmt.fmonth(queryDate), day:fmt.fday(queryDate)}
        news={year:fmt.fyear(newsDate), month: fmt.fmonth(newsDate), day:fmt.fday(newsDate)}
        content = await wiki.featuredContent(query);
        let dateKey=`${news.year}${news.month}${news.day}`
        writeArticleFile(content.mostread.articles, news.year, news.month, news.day, config.includes[dateKey])
    }


    // 最新资讯
    if(argv["latest"]=="true"){
        let today=new Date()
        query={year:fmt.fyear(today), month:fmt.fmonth(today), day:fmt.fday(today)}
        news={year:fmt.fyear(today), month: fmt.fmonth(today), day:"00"}
        content = await wiki.featuredContent(query);
        writeArticleFile(content.mostread.articles, news.year, news.month, news.day, [])
    }

}


main()
     






