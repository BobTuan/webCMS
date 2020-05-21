
//初始配置
var setting = {
    view: {
        selectedMulti: false
    },
    callback:{
        //右键点击菜单
        onRightClick: OnRightClick,
        onClick     : zTreeOnClick
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
    // edit: {
    //     enable: true
    // }
};
var zTree, rMenu;
var user;
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r   = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

$(document).ready(function(){
    console.log("user:"+getParams("user"));
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
});
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
    console.log(ids)
    window.parent.closePageslide();
    window.parent.getNoteList(ids);
    // window.location.href = 'manage.html';
    // $.pageslide.close();
    var title = $("#editTitle",parent.document)
    console.log(Object.keys(title))
    console.log(title['0'])
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
        $("#m_reset").hide();
    } else {
        $("#m_add").show();
        $("#m_del").show();
        $("#m_reset").show();
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
    var newNode = { name:"newNode " + (addCount++)};
    if (zTree.getSelectedNodes()[0]) {
        newNode.checked = zTree.getSelectedNodes()[0].checked;
        zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
    } else {
        zTree.addNodes(null, newNode);
    }
}
function removeTreeNode() {
    //隐藏掉下拉菜单，然后找到节点，如果子元素比较多，提醒，然后确认删除。否则直接删除。
    hideRMenu();
    var nodes = zTree.getSelectedNodes();
    if (nodes && nodes.length>0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
            var msg = "If you delete this node will be deleted along with sub-nodes. \n\nPlease confirm!";
            if (confirm(msg)==true){
                zTree.removeNode(nodes[0]);
            }
        } else {
            zTree.removeNode(nodes[0]);
        }
    }
}
function resetTree() {
    //先隐藏带下拉菜单，然后恢复默认的树
    hideRMenu();
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
}

