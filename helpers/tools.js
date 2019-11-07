const Tools = {
    timeStamp: function(){
        const time = new Date(Date.now());
        return `${time.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2})}/${time.getMonth().toLocaleString(undefined, {minimumIntegerDigits: 2})}/${time.getFullYear()} ${time.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2})}:${time.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2})}.${time.getSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2})}.${time.getMilliseconds().toLocaleString(undefined, {minimumIntegerDigits: 3})}`;
    },
    log: function(logInput){
        console.log(this.timeStamp()+' '+logInput);
    },
    error: function(logInput){
        console.error(this.timeStamp()+' '+logInput);
    },

}

module.exports = Tools;