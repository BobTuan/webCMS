function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r   = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
var user    = 1;
var noteIDs = [0];
function getIDs(ids){
    noteIDs = ids;
}
$(document).ready(function(){
    console.log("user:"+getParams("user"));
    console.log("curID:"+getParams("curID"));
    getNoteList(noteIDs);
});
function cleanNote(){
    $("#noteList").empty();
}
function getNoteList(noteIDs){
    console.log(noteIDs);
    $.ajax({
        type: 'get',
        url : "http://127.0.0.1:8000/notes/getNotesList",
        data: {
            "userID" : user,
            "noteIDs": noteIDs,
            },
        traditional: true,
        async      : true,            // 是否异步
        dataType   : "JSON",
        success    : function(data){
            noteList = data['data']['data']
            console.log(noteList);
            // str = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start ">'+
            // '<h5 class="mb-1">'+title+' </h5><small>'+time+'</small></a>'
            for(var i=0;i<noteList.length;i++){
                // console.log(noteList[i])
                title = noteList[i]['title']
                time  = noteList[i]['createTime']
                id    = noteList[i]['id']
                if(time==null){
                    time = "还没有时间"
                }
                str = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start "'+'id='+id+'>'+
            '<h5 class="mb-1">'+title+' </h5><small>'+time+'</small></a>'
                $("#noteList").append(str)
            }
            $("#noteList a").click(function(){
                // alert(this.id);
                $.ajax({
                    type: "get",                                          // 请求类型（get/post）
                    url : "http://127.0.0.1:8000/notes/getNoteContent",
                    data: {
                    "userID": user,
                    "noteID": this.id,
                    },
                    async   : true,             // 是否异步
                    dataType: "json",           // 设置数据类型
                    success : function (data){
                        content = data['data']['data'][0]['content']
                        title   = data['data']['data'][0]['title']
                        $jq("#noteEdit").summernote('code', content);
                        $jq("#editTitle input").val(title);
                        // var info = data['data']['msg'];
                        // console.log(info)
                    },
                    error: function (errorMsg){
                        // 请求失败
                        alert("请求失败");
                    }
                });
            })
            
        },
        error:function(data){
            console.log(JSON.stringify(data));
        }
    })
}
