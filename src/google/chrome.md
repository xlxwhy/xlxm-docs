


## 在Chrome中执行脚本
```js

// https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JYcG9MVU5PR2dKRFRpZ0FQAQ?hl=zh-CN&gl=CN&ceid=CN%3Azh-Hans

function printNews01(){
    let links=document.getElementsByTagName("h4")
    let contents=[]
    for(let ki=0;ki<links.length;ki++){
        let link=links[ki]
        let plink=link.parentNode
        contents.push({
            "title":link.innerText,
            "link":plink.href,
        })
    }
    let contentString=JSON.stringify(contents)
    contentString=contentString.replace(/“/g, "'")
    contentString=contentString.replace(/”/g, "'")
    contentString=contentString.replace(/\\\"/g, "'")
    console.log(contentString) 
}

function printNews02(){
    let links=document.getElementsByTagName("a")
    let contents=[]
    for(let ki=0;ki<links.length;ki++){
        let link=links[ki] 
        contents.push({
            "title":link.innerText,
            "link":link.href,
        })
    }
    let contentString=JSON.stringify(contents)
    contentString=contentString.replace(/“/g, "'")
    contentString=contentString.replace(/”/g, "'")
    contentString=contentString.replace(/\\\"/g, "'")
    console.log(contentString) 
}

function printNews03(){
    let links=document.getElementsByTagName("a")
    let contents=[]
    for(let ki=0;ki<links.length;ki++){
        let link=links[ki] 

        if(!link.innerText || link.innerText.length<10) continue;
        contents.push({
            "title":link.innerText,
            "link":link.href,
        })
    }
    let contentString=JSON.stringify(contents)
    contentString=contentString.replace(/“/g, "'")
    contentString=contentString.replace(/”/g, "'")
    contentString=contentString.replace(/\\\"/g, "'")
    console.log(contentString) 
}

function fetchJson(url){
    return fetch(url).then(stream=>{
        return stream.html().then(res=>{
            console.log(res)
        })
    })
}
function fetchHtml(url){
    return fetch(url).then(stream=>{
        return stream.html().then(res=>{
            console.log(res)
        })
    })
}

url="https://news.google.com/articles/CBMi0AFodHRwczovL2NuLndzai5jb20vYXJ0aWNsZXMvJUU0JUI4JUFEJUU1JTlCJUJEJUU5JUEyJTg2JUU1JUFGJUJDJUU0JUJBJUJBJUU4JUFBJTkzJUU4JUE4JTgwJUU1JThBJUEwJUU1JUE0JUE3JUU1JUFGJUI5JUU3JTk2JUIyJUU1JUJDJUIxJUU3JUJCJThGJUU2JUI1JThFJUU3JTlBJTg0JUU2JTk0JUFGJUU2JThDJTgxJUU1JThBJTlCJUU1JUJBJUE2LTQ1N2ZiODc30gHUAWh0dHBzOi8vY24ud3NqLmNvbS9hbXAvYXJ0aWNsZXMvJUU0JUI4JUFEJUU1JTlCJUJEJUU5JUEyJTg2JUU1JUFGJUJDJUU0JUJBJUJBJUU4JUFBJTkzJUU4JUE4JTgwJUU1JThBJUEwJUU1JUE0JUE3JUU1JUFGJUI5JUU3JTk2JUIyJUU1JUJDJUIxJUU3JUJCJThGJUU2JUI1JThFJUU3JTlBJTg0JUU2JTk0JUFGJUU2JThDJTgxJUU1JThBJTlCJUU1JUJBJUE2LTQ1N2ZiODc3?hl=zh-CN&gl=CN&ceid=CN%3Azh-Hans"

fetch(url).then(stream=>{
    stream.text().then(res=>{
        console.log(res)
    }) 
})


function appendFrame(url, index){
    var iframe = document.createElement('iframe');
    iframe.src=url
    iframe.id="newsFrame"+index
    iframe.width="1px"
    iframe.height="1px" 
    document.body.appendChild(iframe); 
    
}

appendFrame(url,1)

function getFrameUrl(id){
    var iframe = document.getElementById(id);
    console.log(iframe.contentWindow.location.href)
}



getFrameUrl("newFrame1")

url="https://news.google.com/articles/CBMi0AFodHRwczovL2NuLndzai5jb20vYXJ0aWNsZXMvJUU0JUI4JUFEJUU1JTlCJUJEJUU5JUEyJTg2JUU1JUFGJUJDJUU0JUJBJUJBJUU4JUFBJTkzJUU4JUE4JTgwJUU1JThBJUEwJUU1JUE0JUE3JUU1JUFGJUI5JUU3JTk2JUIyJUU1JUJDJUIxJUU3JUJCJThGJUU2JUI1JThFJUU3JTlBJTg0JUU2JTk0JUFGJUU2JThDJTgxJUU1JThBJTlCJUU1JUJBJUE2LTQ1N2ZiODc30gHUAWh0dHBzOi8vY24ud3NqLmNvbS9hbXAvYXJ0aWNsZXMvJUU0JUI4JUFEJUU1JTlCJUJEJUU5JUEyJTg2JUU1JUFGJUJDJUU0JUJBJUJBJUU4JUFBJTkzJUU4JUE4JTgwJUU1JThBJUEwJUU1JUE0JUE3JUU1JUFGJUI5JUU3JTk2JUIyJUU1JUJDJUIxJUU3JUJCJThGJUU2JUI1JThFJUU3JTlBJTg0JUU2JTk0JUFGJUU2JThDJTgxJUU1JThBJTlCJUU1JUJBJUE2LTQ1N2ZiODc3?hl=zh-CN&gl=CN&ceid=CN%3Azh-Hans"

var w = window.open(url,"title","width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
w.location.href

console.log(w)


let url="#"
let win = window.open();  //打开新的空白窗口
win.document.write ("<a href=\""+url+"\">Link</a>");  //在新窗口中输出提示信息



// win.focus();  //让原窗口获取焦点
// win.opener.document.write ("<h1>这是原来窗口</h1>");  //在原窗口中输出提示信息
// console.log(win.opener == window);  //检测window.opener属性值


--allow-file-access-from-files --user-data-dir="C:/chrome-data" --disable-web-security


```

## 保存为content.json




## 



