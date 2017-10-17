jQuery(function($){
    /*//显示登录框
    $('#login').click(function(){
        $('.login').show();
    })

    //取消登录
    $('#btnExit').click(function(){
        $('.login').hide();
    })

    //登录
    $('#btnLogin').click(function(){
        $.post(common.baseUrl + '/login',{
            username:$('#username').val(),
            password:$('#password').val()
        },function(response){
            console.log(response);
            response=JSON.parse(response);
             console.log(response.status);
            if(response.status){
                alert('登录成功');*/
                $('.login').hide();
                $('.detail').show();
            /*} else {
                alert(response.message);
            }
        })
    })*/

    asd();
    // 采购  到采购管理
    
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // 
    // 新增按钮xxxxxxxxxxxxxxxxxxxxxxxxxxx
    $('#btnAdd').on('click', function(){
        $('.added_id').css({display : "block"})
    })
    $('#colse').on('click', function(){
        $('.added_id').css({display:"none"})
    })
    
    // 增加商品
    $('#app').on('click', function(){
        $.post(common.baseUrl + '/create',{
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
                $('.added_id').css({display:"none"})
                $('.added_id td input').val('');
                asd();
            } else {
                alert(response.message);
            }
        })
    })
    
    function asd(){
        $.post(common.baseUrl + '/search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="text" class="input8" value="${item.bianhao}"/></td>
                    <td class="Meter"><meter min="1" max="100" value="${item.number}" low="30"hight="80" optimun="90"></meter><button class="${item.bianhao}">采购</button></td>
                    <td><input type="button" value="删除" class="btnDel"/></td>
                </tr>`
            }).join('');
            $('.table_th tbody').html('');
            $('.table_th tbody').html(th);

            if(!response.status){
                alert(response.message);
            }
        })
    }

    //搜索商品
    $('#shou').click(function(){
        $('.added>a').hide();
        $.post(common.baseUrl + '/search',{name:$('#shousuo').val()},function(response){
            response=JSON.parse(response);
            var listsql=response.data;
            var th=$.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="text" class="input8" value="${item. bianhao}"/></td>
                    <td class="Meter"><meter min="1" max="100" value="${item.number}" low="30"hight="80" optimun="90"></meter><button class="${item.bianhao}">采购</button></td>
                    <td><input type="button" value="删除" class="btnDel"/></td>
                </tr>`
            }).join('');
            $('.table_th tbody').html('');
            $('.table_th tbody').html(th);

            if(response.status){
                alert('搜索成功');
            } else {
                alert(response.message);
            }
        })       
    })

    //删除商品
    setTimeout(function(){
        $('.btnDel').each(function(){
            $(this).click(function(){
                var a=$(this).parent().parent().children();
                $(this).parent().parent().remove();
                var va1=a[1].firstChild.value;
                var va2=a[2].firstChild.value;
                var va3=a[3].firstChild.value;
                var va4=a[4].firstChild.value;
                var va5=a[5].firstChild.value;
                var va6=a[6].firstChild.value;
                var va7=a[7].firstChild.value;
                var va8=a[8].firstChild.value;
                $.post(common.baseUrl + '/delete',{
                    name:va1,
                    tiaoma:va2,
                    id:va3,
                    img:va4,
                    dizhi:va5,
                    number:va6,
                    shoujia:va7,
                    bianhao:va8
                },function(response){
                    // console.log(99);
                    //console.log(response);
                    response=JSON.parse(response);
                    //console.log(response.status);
                    if(response.status){
                        alert('删除成功');
                        //asd();
                    } else {
                        alert(response.message);
                    }
                })                   
            })
        })
    },3000)

    //修改商品
    /*setTimeout(function(){
        $('#btnUpdata').click(function(){
            $.post(common.baseUrl + '/delete',{
                name:$('.table_tr .input1').val(),
                tiaoma:$('.table_tr .input2').val(),
                id:$('.table_tr .input3').val(),
                img:$('.table_tr .input4').val(),
                dizhi:$('.table_tr .input5').val(),
                number:$('.table_tr .input6').val(),
                shoujia:$('.table_tr .input7').val(),
                bianhao:$('.table_tr .input8').val(),
            },function(response){
                response=JSON.parse(response);
                var listsql=response.data;
                var th=$.map(listsql,function(item){
                    return `<tr class="table_tr">
                        <td><input type="checkbox" name="check"></td>
                        <td><input type="text" class="input1" value="${item.name}"/></td>
                        <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                        <td><input type="text" class="input3" value="${item.id}"/></td>
                        <td><input type="text" class="input4" value="${item.img}"/></td>
                        <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                        <td><input type="text" class="input6" value="${item.number}"/></td>
                        <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                        <td><input type="text" class="input8" value="${item. bianhao}"/></td>
                        <td class="Meter"><meter min="1" max="100" value="${item.number}" low="30"hight="80" optimun="90"></meter><button class="${item.bianhao}">采购</button></td>
                        <td><input type="button" value="删除" class="btnDel"/></td>
                    </tr>`
                }).join('');
                $('.table_th tbody').html('');
                $('.table_th tbody').html(th);

                if(response.status){
                    alert('修改成功');
                    asd();
                } else {
                    alert(response.message);
                }
            })
        })
    },3000)*/
})