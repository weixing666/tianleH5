import Vue from 'vue'
import moment from 'moment'


Vue.filter("dataFormat", function (date, format = "YYYY-MM-DD HH:mm:ss") {
    return moment(date).format(format)
})

Vue.filter('timeFormat', (time, format = "YYYY-MM-DD HH:mm:ss") => {
    return moment.unix(time).format(format)
})