
$(function(){ 
    $("input").focus(function(event){
        // alert($("input[type=password]").css('border-color'));
        // 输入框点击之后恢复原来的效果
        // if($("input[type=password]").css('border-color')=="rgb(255, 0, 0)"){
        //     $("input[type=password]").css("border-color",  "rgb(214,214,214)");
        // }
        // if($("input[type=text]").css('border-color')=="rgb(255, 0, 0)"){
        //     $("input[type=text]").css("border-color",  "rgb(214,214,214)");
        // }
        if($("#confirm").text()=="Login"){
            if(this.id=="id"){
                $("#noId").css('display','block');
                
            }else if(this.id=="pwd"){
                $("#noPwd").css('display','block');		
            }
        }else if($("#confirm").text()=="Register"){
            if(this.id=="phone"){
                $("#sendCode").css('display','block');	
            }
        }
        
    })
    $("input").blur(function(event){
        if($("#confirm").text()=="Login"){
            if(this.id=="id"){
                setTimeout(function(){$("#noId").css('display','none');},100);
            }else if(this.id=="pwd"){
                setTimeout(function(){$("#noPwd").css('display','none');},100);
            }
        }else if($("#confirm").text()=="Register"){
            if(this.id=="phone"){
                setTimeout(function(){$("#sendCode").css('display','none');},100);
            }
        }

        
    })
    $('#confirm').click(function(event){
        var token = $("#confirm").text();
        if(token=="Login"){
            var id  = $('input[type="text"]').val();
            var pwd = $('input[type="password"]').val();
            $.ajax({
                type: "get",                                 // 请求类型（get/post）
                url : "http://127.0.0.1:8000/users/login",
                data: {
                "email"   : id,
                "password": pwd
                },
                async   : true,             // 是否异步
                dataType: "json",           // 设置数据类型
                success : function (data){
                    console.log(data);
                    var info = data['message'];
                    console.log(info)
                    if(info=="注册成功！"){
                        window.location.href = "data.html";
                    }else if(info="验证码错误！"){
                        $("#code").css("border-color", "red");
                    }
                },
                error: function (errorMsg){
                    // 请求失败
                    alert("请求失败");
                }
            });
        }else if(token=="Register"){
            // alert("Register");
            var id    = $('#id').val();
            var pwd   = $('#pwd').val();
            var phone = $('#phone').val();
            var code  = $('#code').val();
            $.ajax({
                type: "get",                                    // 请求类型（get/post）
                url : "http://127.0.0.1:8000/users/register",
                data: {
                "username": id,
                "pwd"     : pwd,
                "phone"   : phone,
                "email"   : id,
                "code"    : code,
                },
                async   : true,             // 是否异步
                dataType: "json",           // 设置数据类型
                success : function (data){
                    console.log(data);
                    var info = data['data']['msg'];
                    console.log(info)
                    if(info=="注册成功！"){
                        window.location.href = "data.html";
                    }else if(info="验证码错误！"){
                        $("#code").css("border-color", "red");
                    }
                },
                error: function (errorMsg){
                    // 请求失败
                    alert("请求失败");
                }
            });
           
        }else if(token=="Find"){
            var id = $('#id').val();
            $.ajax({
                type: "get",                                          // 请求类型（get/post）
                url : "http://127.0.0.1:8000/users/sendactivecode",
                data: {
                "email": id,
                },
                async   : true,             // 是否异步
                dataType: "json",           // 设置数据类型
                success : function (data){
                    console.log(data);
                    // var info = data['data']['msg'];
                    var info = data['message']
                    console.log(info)
                    if(info=="发送成功！"){
                        window.location.href = "data.html";
                    }else if(info="邮箱未注册！"){
                        $("#code").css("border-color", "red");
                    }
                },
                error: function (errorMsg){
                    // 请求失败
                    alert("请求失败");
                }
            });
        }       
    });
    $("#noId").click(function(){
        $("#confirm").text("Register");
        $(".container h1").toggle();
        $("#phone").css('display','block');	
        $("#code").css('display','block');	
        // $("#noId").css('display','none');
        // $("#noPwd").css('display','none');

    })
    $("#noPwd").click(function(){
        $("#confirm").text("Find");
        $("input[type=password]").hide();
        // $("#noId").css('display','none');
        // $("#noPwd").css('display','none');

    })
    $("#id").bind("input propertychange",function(event){
        if($("#id").val()==""){
            $("#id").css("border-color", "rgb(214,214,214)");
        }else{
            if(isEmail($("#id").val())){
                $("#id").css("border-color", "rgb(214,214,214)");
            }else{
                $("#id").css("border-color", "red");
            }
        }
    })
    $("#phone").bind("input propertychange",function(event){
        if($("#phone").val()==""){
            $("#phone").css("border-color", "rgb(214,214,214)");
        }else{
            if(isPhone($("#phone").val())){
                $("#phone").css("border-color", "rgb(214,214,214)");
            }else{
                $("#phone").css("border-color", "red");
            }
        }
    })
    $("#code").bind("input propertychange",function(event){
        if($("#code").val()==""){
            $("#code").css("border-color", "rgb(214,214,214)");
        }
    })
    //检查email邮箱
    function isEmail(str){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(str);
    }
    function isPhone(str){
        var reg = /^1[3456789]\d{9}$/;
        return reg.test(str);
    }
}); 