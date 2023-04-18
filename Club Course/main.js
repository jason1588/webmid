$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicCount = topic.length;
    //一秒鐘有1000毫秒
    //每分鐘60秒、每小時60分鐘、每天24小時
    let millisecsPerDay = 24*60*60*1000;

    for(var x=0;x<topicCount;x++){
        var thisday=new Date(startDate.getTime()+7*x*millisecsPerDay)
        $("#courseTable").append(
            "<tr>"+
            `<td>${x+1}</td>`+
            `<td>${thisday.getMonth()+1+"/"+thisday.getDate()}</td>`+
            `<td>${topic[x]}</td>`+
            "</tr>");
    }
});

