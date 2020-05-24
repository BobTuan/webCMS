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
var curNoteID;
$(document).ready(function(){
    console.log("user:"+getParams("user"));
    console.log("curID:"+getParams("curID"));
    getNoteList(noteIDs);
    $("#save").click(function(event){
        var text = $("#save").text()
        console.log(curNoteID);
        if(text=="保存"){
            var content = $jq('#noteEdit').summernote('code');
            var keyword = $jq("#keywordEdit").summernote('code');
            var idea    = $jq("#ideaEdit").summernote('code');
            var title   = $("#editTitle input").val();
            var tags    = $('#tags').val();

            var note    = {
                "idea"   : idea,
                "keyword": keyword,
                "content": content,
                "title"  : title,
                "tags"   : tags
            }
            console.log(note)
            $.ajax({
                type: "post",                                   // 请求类型（get/post）
                url : "http://127.0.0.1:8000/notes/editNote",
                data: {
                "userID": user,
                "noteID": curNoteID,
                "note"  : JSON.stringify(note),
                },
                async   : true,             // 是否异步
                dataType: "json",           // 设置数据类型
                success : function (data){
                    console.log('success');
                    $("#"+curNoteID+" h5").text(title);
                    // var ids = [];
                    //     ids = getChildren(ids, nodes['0']);
                    // window.parent.getNoteList(ids);
                },
                error: function (errorMsg){
                    // 请求失败
                    alert("请求失败");
                }
            });
        }
    });
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
                var noteID = this.id;
                $.ajax({
                    type: "get",                                          // 请求类型（get/post）
                    url : "http://127.0.0.1:8000/notes/getNoteContent",
                    data: {
                    "userID": user,
                    "noteID": noteID,
                    },
                    async   : true,             // 是否异步
                    dataType: "json",           // 设置数据类型
                    success : function (data){
                        content   = data['data']['data'][0]['content']
                        title     = data['data']['data'][0]['title']
                        idea      = data['data']['data'][0]['idea']
                        brief     = data['data']['data'][0]['brief']
                        tags      = data['data']['data'][0]['tags']
                        curNoteID = noteID;
                        if(tags==null){
                            // console.log("没有标签")
                            // $("#tags").attr("value","");
                            $jjjq('input[data-role="tagsinput"]').tagsinput('removeAll');
                        }else{
                            // console.log(tags)
                            // $("#tags").attr("value",tags);
                            console.log($("#tags").val())
                            $jjjq('input[data-role="tagsinput"]').tagsinput('removeAll');
                            $jjjq('input[data-role="tagsinput"]').tagsinput('add', tags);
                        }
                        $jq('#noteEdit').summernote({
                            height     : 430,
                            tabsize    : 2,
                            lang       : 'zh-CN',
                            placeholder: "请输入笔记",
                            focus      : true});
                            $jq('#keywordEdit').summernote({
                                height : 568,
                                tabsize: 2,
                                // airMode: true,
                                lang       : 'zh-CN',
                                placeholder: "请输入关键字",
                                toolbar    : []
                            });
                            $('#keywordEdit').css('font-size','36px');
                            $jq('#ideaEdit').summernote({
                                height     : 112,
                                tabsize    : 2,
                                lang       : 'zh-CN',
                                placeholder: "请输入想法",
                                toolbar    : []
                            });
                        $jq("#noteEdit").summernote('code', content);
                        $jq("#ideaEdit").summernote('code', idea);
                        $jq("#keywordEdit").summernote('code', brief);
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
