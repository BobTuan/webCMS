function Tag(inputId){
	var obj = new Object();
	if(inputId==null||inputId==""){
		alert("初始化失败，请检查参数！");
		return;
	}
	obj.inputId = inputId;
	//初始化
	obj = (function(obj){
		obj.tagValue  = "";
		obj.isDisable = false;
		return obj;
	})(obj);
	
	//初始化界面
	obj.initView=function(){
		// 根据id找到inputID对象
		var inputObj = $jq("#"+this.inputId);
		var inputId  = this.inputId;
		inputObj.css("display","none");
		//初始化完整的taghtml代码
		var appendStr  = '';
		    appendStr += '<div class="tagsContaine" id="'+inputId+'_tagcontaine">';
		    appendStr += '<div class="tagList"></div><input type="text" class="tagInput"/>';
		    appendStr += '</div>';
		// 在tagName后面插入指定html代码
		inputObj.after(appendStr);
		var tagInput = $jq("#"+inputId+"_tagcontaine .tagInput");
		if(!this.isDisable){
			$jq("#"+inputId+"_tagcontaine").attr("ds","1");
			// 回车之后的操作
			tagInput.keydown(function(event){
				if(event.keyCode==13){
					 var inputValue = $jq(this).val();
					 //回车以后调用这个函数
			         tagTake.setInputValue(inputId,inputValue);
			         $jq(this).val("");
			    }
			});
		}else{
			$jq("#"+inputId+"_tagcontaine").attr("ds","0");
			tagInput.remove();
		}
		if(this.tagValue!=null&&this.tagValue!=""){
			tagTake.setInputValue(inputId,this.tagValue);
			if(this.isDisable){
				$jq("#"+inputId+"_tagcontaine .tagList .tagItem .delete").remove();
			}
		}
	}
	//禁用标签的修改添加等操作
	obj.disableFun=function(){
		if(this.isDisable){
			return;
		}
		var inputId  = this.inputId;
		var tagInput = $jq("#"+inputId+"_tagcontaine .tagInput");
		tagInput.remove();
		this.isDisable = true;
		$jq("#"+inputId+"_tagcontaine").attr("ds","0");
		$jq("#"+inputId+"_tagcontaine .tagList .tagItem .delete").remove();
		tagTake.initTagEvent(inputId);
		
	}
	//启用标签的编辑，添加和修改等操作
	obj.unDisableFun = function(){
		if(!this.isDisable){
			return;
		}
		var inputId     = this.inputId;
		var tagContaine = $jq("#"+inputId+"_tagcontaine");
		tagContaine.append('<input type="text" class="tagInput"/>');
		this.isDisable = false;
		$jq("#"+inputId+"_tagcontaine").attr("ds","1");
		var tagInput = $jq("#"+inputId+"_tagcontaine .tagInput");
		tagInput.keydown(function(event){
				if(event.keyCode==13){
			         var inputValue = $jq(this).val();
			         tagTake.setInputValue(inputId,inputValue);
			         $jq(this).val("");
			    }
		});
		$jq("#"+inputId+"_tagcontaine .tagList .tagItem").append('<div class="delete"></div>');
		tagTake.initTagEvent(inputId);
		
	}
	
	return obj;
}

var tagTake ={
	"setInputValue":function(inputId,inputValue){
		if(inputValue==null||inputValue==""){
			return;
		}
		// 这个样式的列表
		var tagListContaine = $jq("#"+inputId+"_tagcontaine .tagList");
		    inputValue      = inputValue.replace(/，/g,",");
		var inputValueArray = inputValue.split(",");
		for(var i=0;i<inputValueArray.length;i++){
			var valueItem = $jq.trim(inputValueArray[i]);
			if(valueItem!=""){
				//创建一个建好的tag的样式
				var appendListItem = tagTake.getTagItemModel(valueItem);
				tagListContaine.append(appendListItem);
			}
		}
		tagTake.resetTagValue(inputId);
		// 给添加好的标签增加一些响应事件
		tagTake.initTagEvent(inputId);
	},
	"initTagEvent":function(inputId){
		$jq("#"+inputId+"_tagcontaine .tagList .tagItem .delete").off();
		$jq("#"+inputId+"_tagcontaine .tagList .tagItem").off();
		var ds = $jq("#"+inputId+"_tagcontaine").attr("ds");
		if(ds=="0"){
			return;
		}
		$jq("#"+inputId+"_tagcontaine .tagList .tagItem .delete").mousedown(function(){
			$jq(this).parent().remove();
			tagTake.resetTagValue(inputId);
		});
		
		$jq("#"+inputId+"_tagcontaine .tagList .tagItem").dblclick(function(){
			var tagItemObj = $jq(this);
			 $jq(this).css("display","none");
			var updateInputObj = $jq("<input type='text' class='updateInput' value='"+tagItemObj.find("span").html()+"'>");
			updateInputObj.insertAfter(this);
			updateInputObj.focus();
			updateInputObj.blur(function(){
				var inputValue = $jq(this).val();
				if(inputValue!=null&&inputValue!=""){
					tagItemObj.find("span").html(inputValue);
					tagItemObj.css("display","block");
				}else{
					tagItemObj.remove();
				}
				updateInputObj.remove();
				tagTake.resetTagValue(inputId);
			});
			updateInputObj.keydown(function(event){
				if(event.keyCode==13){
			        var inputValue = $jq(this).val();
					if(inputValue!=null&&inputValue!=""){
						tagItemObj.find("span").html(inputValue);
						tagItemObj.css("display","block");
					}else{
						tagItemObj.remove();
					}
					updateInputObj.remove();
					tagTake.resetTagValue(inputId);
			    }
			});
		});
	},
	"resetTagValue":function(inputId){
		var tags    = $jq("#"+inputId+"_tagcontaine .tagList .tagItem");
		var tagsStr = "";
		for(var i=0;i<tags.length;i++){
			tagsStr += tags.eq(i).find("span").html()+",";
		}
		tagsStr = tagsStr.substr(0,tagsStr.length-1);
		$jq("#"+inputId).val(tagsStr);
	},
	"getTagItemModel":function(valueStr){
		return '<div class="tagItem"><span>'+valueStr+'</span><div class="delete"></div></div>';
	}
}

