

```js


// https://c.runoob.com/search-sites/

let list=$("#runoob_link_cate_13 li a")
let data=[]
for(var ei=0;ei<list.length;ei++){
    var e=list[ei] 
    let row={
        "logo": e.children[0].src,
        "name": e.innerText,
        "link": e.href,
        "title": $(e).attr("data-original-title")
    }
    data.push(row)
}
console.log(JSON.stringify(data))


//https://c.runoob.com/

//hot-tools.json
let list=$("#runoob-customer-hot li a")
let data=[]
for(var ei=0;ei<list.length;ei++){
    var e=list[ei] 
    let row={
        "logo": e.children[0].src,
        "name": e.innerText,
        "link": e.href,
        "title": $(e).attr("title")
    }
    data.push(row)
}
console.log(JSON.stringify(data))


//common-tools.json

let list=$("#runoob-goto-compile div div div a")
let data=[]
for(var ei=0;ei<list.length;ei++){
    var e=list[ei] 
    let row={
        "logo": e.children[0].children[0].src,
        "name": e.children[0].innerText,
        "link": e.href,
        "title": $(e).attr("data-original-title")
    }
    data.push(row)
}
console.log(JSON.stringify(data))

//compile-tools.json
let list=$("#runoob-goto-front-end div div div a")
let data=[]
for(var ei=0;ei<list.length;ei++){
    var e=list[ei] 
    let row={
        "logo": e.children[0].children[0].src,
        "name": e.children[0].innerText,
        "link": e.href,
        "title": $(e).attr("data-original-title")
    }
    data.push(row)
}
console.log(JSON.stringify(data))



function  fetchTools(tid){ 
    let data=[]
    let list=$("#"+tid+" div div div a")
    for(var ei=0;ei<list.length;ei++){
        var e=list[ei] 
        let row={
            "logo": e.children[0].children[0].src,
            "name": e.children[0].innerText,
            "link": e.href,
            "title": $(e).attr("data-original-title")
        }
        data.push(row)
    }
    return data
}

//online-tools.json
console.log(JSON.stringify(fetchTools("runoob-goto-15")))
//community.json
console.log(JSON.stringify(fetchTools("runoob-goto-38")))

//product-design.json
console.log(JSON.stringify(fetchTools("runoob-goto-109")))

//photo-design.json
console.log(JSON.stringify(fetchTools("runoob-goto-14")))
//video-design.json
console.log(JSON.stringify(fetchTools("runoob-goto-141")))

//more.json
console.log(JSON.stringify(fetchTools("runoob-goto-more-item")))




function  fetchTools1(tid){ 
    let data=[]
    let list=$("#"+tid+" div li  a")
    for(var ei=0;ei<list.length;ei++){
        var e=list[ei] 
        let row={
            "logo": e.children[0].src,
            "name": e.innerText,
            "link": e.href,
            "title": $(e).attr("data-original-title")
        }
        data.push(row)
    }
    return data
}
//shopping.json
console.log(JSON.stringify(fetchTools1("runoob-goto-102")))
//site-manager.json
console.log(JSON.stringify(fetchTools1("runoob-goto-40")))







```










