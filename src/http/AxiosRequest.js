


const axios = require("axios")

module.exports = {
    get(url, config) {
        return axios.get(url, config).then((res) => {
            return res.data
        }).catch(ex => {
            console.error(ex)
        })
    },
    post(url, data) {
        return axios.post(url, data).then((res) => {
            return res.data
        }).catch(ex => {
            console.error(ex)
        })
    }
}





