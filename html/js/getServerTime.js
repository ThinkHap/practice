function getServerDate(func) {
    KISSY.IO({
        type:'HEAD',
        cache:false,
        url:window.location.href,
        success:function(data, status, xhr) {
            var date = new Date(xhr.getResponseHeader('Date'));
            var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            var _month = parseInt(date.getMonth(), 10);
			var _date=parseInt(date.getDate(), 10);
            var _hour = parseInt(date.getHours(), 10);
            func(_month,_date,_hour);
        }
    });
}
