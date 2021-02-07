
//初始配置
var setting = {
    view: {
        selectedMulti: false
    },
    callback:{
        //右键点击菜单
        onRightClick: OnRightClick,
        onClick     : zTreeOnClick,
        beforeRename: beforeRename,   //编辑结束时触发，用来验证输入的数据是否符合要求
        onRename    : onRename
    },
    data: {
        simpleData: {
            enable : true,
            idKey  : "id",
            pIdKey : "pId",
            rootPId: 0
        },
        keep:{
            parent: true
        }
    },
};
var zTree, rMenu;
var user = getParams("user");
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r   = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
if(user){
    console.log("树状结构");
    $.ajax({
        url : "http://127.0.0.1:8000/notes/getTree",
        data: {
            "user": user,
            },
        async   : true,            // 是否异步
        dataType: "JSON",
        success : function(data){
            console.log(data['data'])
            var zNodes = data['data']['data'];
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            zTree = $.fn.zTree.getZTreeObj("treeDemo");
            rMenu = $("#rMenu");
        },
        error:function(data){
            console.log(JSON.stringify(data));
        }
    })
}
// $(document).ready(function(){
//     console.log("user:"+user);
//     $.ajax({
//         url : "http://127.0.0.1:8000/notes/getTree",
//         data: {
//             "user": user,
//             },
//         async   : true,            // 是否异步
//         dataType: "JSON",
//         success : function(data){
//             console.log(data['data'])
//             var zNodes = data['data']['data'];
//             $.fn.zTree.init($("#treeDemo"), setting, zNodes);
//             zTree = $.fn.zTree.getZTreeObj("treeDemo");
//             rMenu = $("#rMenu");
//         },
//         error:function(data){
//             console.log(JSON.stringify(data));
//         }
//     })
// });
var newCount = 1;
function OnRightClick(event, treeId, treeNode) {
    // alert(1);
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        showRMenu("node", event.clientX, event.clientY);
    }
}
function zTreeOnClick(e, treeId, treeNode) {
    // console.log(treeNode.id+","+","+treeNode.name); 
    // console.log(treeNode.children);
    var ids = [];
        ids = getChildren(ids, treeNode);  //TreeNode是选中节点，ids是子节点id数组，格式：123,223,4,55
    // console.log(ids)
    window.parent.cleanNote();
    window.parent.initContent();
    window.parent.closePageslide();
    window.parent.getNoteList(ids);
    var title = $("#editTitle",parent.document)
    // console.log(Object.keys(title))
    // console.log(title['0'])
    // alert($("#editTitle").display);
    // $.ajax({
    //     url    : "data/content.json",
    //     type   : "post",
    //     success: function(data) {
    //         var title = treeNode.name;
    //         var abs;
    //         var content;
            // for(var i=0;i<data.length;i++){
            //     if(data[i]['id']==treeNode.id){
            //         abs     = treeNode.abs;
            //         content = data[i].content;
            //     }
            // }
            // alert(title+","+content);
            // $jq("#editTitle input").val(title);
            // $jq(".summernote").summernote('code', content);
            // var appendStr  = '';
            //     appendStr += '<span class="glyphicon glyphicon-tags" style="margin:0 5px"></span>';
            //     appendStr += '<input type="text" id="tagValue" >';
            // $   ("#editTags").html(appendStr);
            // tag.initView();
            // tagTake.setInputValue("tagValue",treeNode.name);
    //     }
    // });
};
// 返回值是否包含选中节点id，根据情况而定
 function getChildren(ids, treeNode) {
    ids.push(treeNode.id);//将当前节点压入栈中
    // 如果当前节点存在子节点
    if (treeNode.isParent) {
        for (var obj in treeNode.children) {
            // console.log(treeNode.children[obj])
            if(treeNode.children[obj].isParent){
                ids = getChildren(ids,treeNode.children[obj])
            }else{
                ids.push(treeNode.children[obj].id);
            }
       }
    }
   return ids;
}
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type=="root") {
        $("#m_add").hide();
        $("#m_del").hide();
        $("#m_rename").hide();
    } else {
        $("#m_add").show();
        $("#m_del").show();
        $("#m_rename").show();
    }

    y += document.body.scrollTop;
    x += document.body.scrollLeft;
    rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

    $("body").bind("mousedown", onBodyMouseDown);
}
function hideRMenu() {
    if (rMenu) rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event){
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
        rMenu.css({"visibility" : "hidden"});
    }
}
var addCount = 1;
function addTreeNode() {
    //先隐藏掉下拉菜单，然后新建节点，添加
    hideRMenu();
    var name    = new Date().getTime();  //利用时间戳生成节点名称，保证节点名称唯一
    var newNode = {
        name: name
    };
    if (zTree.getSelectedNodes()[0]) {
        newNode.checked = zTree.getSelectedNodes()[0].checked;
        newNode.pid     = zTree.getSelectedNodes()[0].id;
        zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
    } else {
        zTree.addNodes(null, newNode);
    }
    $.ajax({
        type: "post",                                  // 请求类型（get/post）
        url : "http://127.0.0.1:8000/notes/addNote",
        data: {
        "userID": user,
        "note"  : JSON.stringify(newNode),
        },
        async   : true,             // 是否异步
        dataType: "json",           // 设置数据类型
        success : function (data){
            console.log('success');
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
function removeTreeNode() {
    //隐藏掉下拉菜单，然后找到节点，如果子元素比较多，提醒，然后确认删除。否则直接删除。
    hideRMenu();
    var nodes = zTree.getSelectedNodes();
    var ids   = [];
        ids   = getChildren(ids, nodes['0']);
    // console.log(nodes)
    // console.log(ids)
    if (nodes && nodes.length > 0) {
        if (confirm("该操作会将关联数据同步删除，是否确认删除？") == true){
            $.ajax({
                type: "Post",
                url : "http://127.0.0.1:8000/notes/deleteNote",
                data: {
                    "userID": user,
                    "noteID": ids
                },
                traditional: true,
                async      : true,              // 是否异步
                dataType   : "JSON",
                success    : function (data) {
                    console.log(data)
                    if (data['status'] == "200") {
                        zTree.removeNode(nodes[0]);
                    }
                    else {
                        alert("删除失败。");
                    }
                }
            });
        }
    }
}
function renameTreeNode() {
    //隐藏掉下拉菜单，然后找到节点，如果子元素比较多，提醒，然后确认删除。否则直接删除。
    hideRMenu();
    nodes    = zTree.getSelectedNodes(),
    treeNode = nodes[0];
    console.log(treeNode);
    if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
    }
    id = treeNode['id'];
    zTree.editName(treeNode);
}
function beforeRename(treeId, treeNode, newName, isCancel) {
    console.log(treeNode.name);
    if (newName.length == 0) {
        setTimeout(function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.cancelEditName();
            alert("节点名称不能为空.");
        }, 0);
        return false;
    }
    return true;
}
function onRename(e, treeId, treeNode, isCancel) {
    $.ajax({
        type: "post",                                     // 请求类型（get/post）
        url : "http://127.0.0.1:8000/notes/renameNote",
        data: {
        "userID"  : user,
        "noteID"  : treeNode.id,
        "newTitle": treeNode.name,
        },
        async   : true,             // 是否异步
        dataType: "json",           // 设置数据类型
        success : function (data){
            console.log('success');
            // var info = data['data']['msg'];
            // console.log(info)
        },
        error: function (errorMsg){
            // 请求失败
            alert("请求失败");
        }
    });
    console.log(user)
    console.log(treeNode.id)
   console.log(treeNode.name);
}
