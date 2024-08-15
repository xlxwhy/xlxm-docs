
const numeral = require('numeral');


 
module.exports = {
    fyear(date){
        return numeral(date.getFullYear()).format("0000")
    },
    fmonth(date){
        return numeral(date.getMonth()+1).format("00")
    },
    fday(date){
        return numeral(date.getDate()).format("00")
    }, 
    fhour(date){
        return numeral(date.getHours()).format("00")
    }, 
    getDate(year, month, day){
        let date = new Date('01 Jan, 1970 00:00:00');
        date.setFullYear(year)
        date.setMonth(month-1)
        date.setDate(day)
        return date
    },
    parseDate(dateString){
        let date = new Date('01 Jan, 1970 00:00:00');
        let dv=dateString.split("-")
        if(dv.length<3) dv=dateString.split("/")
        if(dv.length<3) return date
        date.setFullYear(Number(dv[0]))
        date.setMonth(Number(dv[1])-1)
        date.setDate(Number(dv[2]))
        return date
    },
    link(url,title){
        return `[${title?title:url}](${url})`
    }
}





