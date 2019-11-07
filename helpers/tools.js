const Tools = {
    timeStamp: function(){
        const time = new Date(Date.now());
        return `${time.getDate()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}.${time.getSeconds()}.${time.getMilliseconds()}`;
    },
    log: function(logInput){
        console.log(this.timeStamp()+' '+logInput);
    },
    error: function(logInput){
        console.error(this.timeStamp()+' '+logInput);
    },

}

module.exports = Tools;