 
module.exports = {
 
    avgList(list, start, end, field) {
        let sum=0;
        for (let i = start; i < end; i++) { 
            sum+=Number(list[i][field])
        }
        return sum/(end-start)
    },

    formatDate(date) {
        var date =date?date: new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return year +""+ month +""+ day;
    },

    sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    },
 


}


