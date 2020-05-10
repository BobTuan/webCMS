
$(function(){ 
    $("input").focus(function(event){
        // alert($("input[type=password]").css('border-color'));
        // 输入框点击之后恢复原来的效果
        if($("input[type=password]").css('border-color')=="rgb(255, 0, 0)"){
            $("input[type=password]").css("border-color",  "rgb(214,214,214)");
        }
        if($("input[type=text]").css('border-color')=="rgb(255, 0, 0)"){
            $("input[type=text]").css("border-color",  "rgb(214,214,214)");
        }
        if($("#confirm").text()=="Login"){
            if(this.type=="text"){
                $("#noId").css('display','block');
                
            }else{
                $("#noPwd").css('display','block');		
            }
        }
        
    })
    $("input").blur(function(event){
        if($("#confirm").text()=="Login"){
            if(this.type=="text"){
                setTimeout(function(){$("#noId").css('display','none');},100);
            }else{
                setTimeout(function(){$("#noPwd").css('display','none');},100);
            }
        }
        
    })
    $('#confirm').click(function(event){
        var token = $("#confirm").text();
        if(token=="Login"){
            var id  = $('input[type="text"]').val();
            var pwd = $('input[type="password"]').val();
            // 密码不正确的输入框红色
            if(id!="858046022@qq.com"){
                $("input[type=text]").css("border-color", "red");
                if(pwd!="123"){
                    $("input[type=password]").css("border-color", "red");
                }
            }
            if(id=="858046022@qq.com"){
                if(pwd=="123"){
                    window.location.href = "data.html";
                }else{
                    $("input[type=password]").css("border-color", "red");
                }
            }
        }else if(token=="Register"){
            // alert("Register");
            var id = $('input[type="text"]').val();
            if(id=="858046022@qq.com"){
                window.location.href = "data.html";
                $("#confirm").text("Login");
            }else{
                $("input[type=text]").css("border-color", "red");
            }
           
        }else if(token=="Find"){
            var id = $('input[type="text"]').val();
            if(id=="858046022@qq.com"){
                $("input[type=password]").show();
                $('input[type="text"]').val();
                $("#confirm").text("Login");
            }else{
                $("input[type=text]").css("border-color", "red");
            }
        }       
    });
    $("#noId").click(function(){
        $("#confirm").text("Register");
        // $("#noId").css('display','none');
        // $("#noPwd").css('display','none');

    })
    $("#noPwd").click(function(){
        $("#confirm").text("Find");
        $("input[type=password]").hide();
        // $("#noId").css('display','none');
        // $("#noPwd").css('display','none');

    })
}); 