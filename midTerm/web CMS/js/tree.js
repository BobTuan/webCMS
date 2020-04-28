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
$(document).ready(function(){
    $.ajax({
        url     : "data/tree.json",
        dataType: "JSON",
        success : function(data){
            var zNodes = data;
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
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        showRMenu("node", event.clientX, event.clientY);
    }
}
function zTreeOnClick(e, treeId, treeNode) {
    // alert(treeNode.id+","+","+treeNode.name); 
    $.ajax({
        url    : "data/content.json",
        type   : "get",
        success: function(data) {
            var title = treeNode.name;
            var abs;
            var content;
            for(var i=0;i<data.length;i++){
                if(data[i]['id']==treeNode.id){
                    abs     = treeNode.abs;
                    content = data[i].content;
                }
            }
            // alert(title+","+content);
            $jq("#editTitle input").val(title);
            $jq(".summernote").summernote('code', content);
            var appendStr  = '';
                appendStr += '<span class="glyphicon glyphicon-tags" style="margin:0 5px"></span>';
                appendStr += '<input type="text" id="tagValue" >';
            $   ("#editTags").html(appendStr);
            tag.initView();
            tagTake.setInputValue("tagValue",treeNode.name);
        }
    });
};
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

