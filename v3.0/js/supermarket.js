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
            response=JSON.parse(response);
            if(response.status){
                alert('登录成功');*/
                $('.login').hide();
                $('.detail').show();
            /*} else {
                alert(response.message);
            }
        })
    })*/

    //导航条xxxxxxxxxxxxxxxxxxxxxx
    var $manage_a = $('.manage>ul>li>a');
    for(let i=0;i<$manage_a.length;i++){
        // 默认产品管理
        $manage_a.eq(0).addClass('active');
        $('.' + $manage_a.eq(0).addClass('active').parent('li').attr('class') + '_detail').css({display : 'block'})
        $manage_a.eq(i).on('click',function(){
            $(this).addClass('active').parent('li').siblings('li').find('a').removeClass('active');
            var $classDetail=$(this).parent('li').attr('class');
            $('.' + $classDetail + '_detail').css({display : 'block'}).siblings('div').css({display : 'none'});
        })
    }
    
    asd();
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
            response = JSON.parse(response);
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

    //搜索商品
    $('#shou').click(function(){
        $('.added>a').hide();
        $.post(common.baseUrl + '/search',{name:$('#shousuo').val()},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="productCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="text" class="input8" value="${item. bianhao}"/></td>
                    <td class="Meter"><meter min="1" max="100" value="${item.number}" low="30"hight="80" optimun="90"></meter><button class="${item.id}">采购</button></td>
                    <td><input type="button" value="删除" class="productDel"/></td>
                    <td><input type="button" value="编辑" class="productEdit"/></td>
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
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'productDel'){
            var $name = $(e.target).parent().prevAll().find('.input1').val();
            var $tiaoma = $(e.target).parent().prevAll().find('.input2').val();
            var $id = $(e.target).parent().prevAll().find('.input3').val();
            var $img = $(e.target).parent().prevAll().find('.input4').val();
            var $dizhi = $(e.target).parent().prevAll().find('.input5').val();
            var $number = $(e.target).parent().prevAll().find('.input6').val();
            var $shoujia = $(e.target).parent().prevAll().find('.input7').val();
            var $bianhao = $(e.target).parent().prevAll().find('.input8').val();

            $.post(common.baseUrl + '/delete',{
                name:$name,
                tiaoma:$tiaoma,
                id:$id,
                img:$img,
                dizhi:$dizhi,
                number:$number,
                shoujia:$shoujia,
                bianhao:$bianhao
            },function(response){
                response=JSON.parse(response);
                if(response.status){
                    alert('删除成功');
                    asd();
                } else {
                    alert(response.message);
                }
            })                   
        }
    })

    //编辑商品：1.选择复选框  2.编辑信息  3.点击“编辑”
    setTimeout(function(){
        var va11,va12,va13,va14,va15,va16,va17,va18;
        $('.productCheck').each(function(i){
            $(this).click(function(){
                 var check = $(this).parent().parent().children();
                 if(check[0].firstChild.checked){
                    va11 = check[1].firstChild.value;
                    va12 = check[2].firstChild.value;
                    va13 = check[3].firstChild.value;
                    va14 = check[4].firstChild.value;
                    va15 = check[5].firstChild.value;
                    va16 = check[6].firstChild.value;
                    va17 = check[7].firstChild.value;
                    va18 = check[8].firstChild.value;
                }
            })
        })
        $('.productEdit').each(function(i){
            $(this).click(function(){
                var a = $(this).parent().parent().children();
                var va1 = a[1].firstChild.value;
                var va2 = a[2].firstChild.value;
                var va3 = a[3].firstChild.value;
                var va4 = a[4].firstChild.value;
                var va5 = a[5].firstChild.value;
                var va6 = a[6].firstChild.value;
                var va7 = a[7].firstChild.value;
                var va8 = a[8].firstChild.value;
                $.post(common.baseUrl + '/update',{
                    goods:JSON.stringify({
                        name:va1,
                        tiaoma:va2,
                        id:va3,
                        img:va4,
                        dizhi:va5,
                        number:va6,
                        shoujia:va7,
                        bianhao:va8
                    }),lists:JSON.stringify({
                        name:va11,
                        tiaoma:va12,
                        id:va13,
                        img:va14,
                        dizhi:va15,
                        number:va16,
                        shoujia:va17,
                        bianhao:va18
                    })},function(response){
                        $('.table_th').find(':checkbox').prop('checked',false);
                })
            })
        })
    },3000)

    function asd(){
        $.post(common.baseUrl + '/search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="productCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="text" class="input8" value="${item.bianhao}"/></td>
                    <td class="Meter"><meter min="1" max="100" value="${item.number}" low="30"hight="80" optimun="90"></meter><button class="${item.id}">采购</button></td>
                    <td><input type="button" value="删除" class="productDel"/></td>
                    <td><input type="button" value="编辑" class="productEdit"/></td>
                </tr>`
            }).join('');
            $('.table_th tbody').html('');
            $('.table_th tbody').html(th);

            if(!response.status){
                alert(response.message);
            }
        })
    }
})