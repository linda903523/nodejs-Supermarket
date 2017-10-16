jQuery(function($){
    //显示登录框
    $('#login').click(function(){
        $('.login').show();
    })

    //取消登录
    $('#btnExit').click(function(){
        $('.login').hide();
    })

    //登录
    $('#btnLogin').click(function(){
        $.post("http://localhost:12/login",{
            username:$('#username').val(),
            password:$('#password').val()
        },function(response){
            console.log(response);
            response=JSON.parse(response);
             console.log(response.status);
            if(response.status){
                alert('登录成功');
                $('.login').hide();
                $('.detail').show();
            } else {
                alert(response.message);
            }
        })
    })

    asd();
    // 采购  到采购管理
    
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // 
    // 新增按钮xxxxxxxxxxxxxxxxxxxxxxxxxxx
    $('.added>a').on('click', function(){
        $('.added_id').css({display : "block"})
    })
    $('#colse').on('click', function(){
        $('.added_id').css({display:"none"})
    })
    
    // 增加商品
    $('#app').on('click', function(){
        $.post("http://localhost:12/create",{
            name:$('#input_ss .input1').val(),
            tiaoma:$('#input_ss .input2').val(),
            id:$('#input_ss .input3').val(),
            img:$('#input_ss .input4').val(),
            dizhi:$('#input_ss .input5').val(),
            number:$('#input_ss .input6').val(),
            shoujia:$('#input_ss .input7').val(),
            bianhao:$('#input_ss .input8').val(),
        },function(response){
            console.log(response);
            response=JSON.parse(response);
             console.log(response.status);
            if(response.status){
                alert('添加成功');
                asd();
                // window.location.href = 'login.html';
            } else {
                alert(response.message);
            }
        })
    })
    
    function asd(){
        $.post("http://localhost:12/create",{},function(response){
            response=JSON.parse(response);
            listsql=response.data;
            var listsql=JSON.parse(listsql);
            // console.log(typeof listsql);
            var th=$.map(listsql,function(item){
                return `<tr>
                    <td><input type="checkbox" name="check"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.bianhao}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="text" class="input8" value="${item. bianhao}"/></td>
                    <td class="Meter"><meter min="1" max="100" value="${item.number}" low="30"hight="80" optimun="90"></meter><button class="${item.bianhao}">采购</button></td>
                    <td><button>删除</button></td>
                </tr>`
            }).join('');
            // console.log(th);
            $('tbody')[0].innerHTML = '';
                // console.log($('tbody'));
            $('tbody').eq(0).html(th)
            if(response.status){
                // alert('注册成功');
                // response.write(response.data);
                // window.location.href = 'login.html';
            } else {
                alert(response.message);
            }
        })
    }

    //搜索商品
    $('#shou').click(function(){
        $.post("http://localhost:12/search",{
            name:$('#shousuo').val()
        },function(response){
            // console.log(response)
            response=JSON.parse(response);
            listsql=response.data;
            console.log(listsql);
            // console.log( listsql);
            var listsql=JSON.parse(listsql);
            console.log(listsql);
            console.log(typeof listsql);
            var th=$.map(listsql,function(item){
                console.log(item);
                return `<tr>
                    <td><input type="checkbox" name="check"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.bianhao}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="text" class="input8" value="${item. bianhao}"/></td>
                    <td class="Meter"><meter min="1" max="100" value="${item.number}" low="30"hight="80" optimun="90"></meter><button class="${item.bianhao}">采购</button></td>
                    <td><button>删除</button></td>
                </tr>`
            }).join('');
            console.log(th);
            $('tbody')[0].innerHTML = '';
            $('tbody').html(th)

            if(response.status){
                alert('搜索成功');
            } else {
                alert(response.message);
            }
        })       
    })
})