jQuery(function($){
    // xxxxxxxxxxxxxx用户管理xxxxxxxxxxxxxxxxxxxx
    $('.user').on('click',function(){
        user();
    })

    //用户注册
    $('.button_user').click(function(){
        $.post(common.baseUrl + '/register',{
            name:$('.input1user').val(),
            lianxiren:$('.input2user').val(),
            phone:$('.input3user').val(),
            leibei:$('.input4user').val(),
            dizhi:$('.input5user').val(),
            mail:$('.input6user').val(),
            zhanghao:$('.input7user').val(),
            shengfen:$('.input8user').val(),
            chengshi:$('.input9user').val()
        },function(response){
            response = JSON.parse(response);
            if(response.status){
                alert('添加成功');
                $('.inputuser').val('');
                user();
            } else {
                alert(response.message);
            }
        })
    })

    //删除用户
    setTimeout(function(){
        $('.userDel').each(function(){
            $(this).click(function(){
                var a = $(this).parent().parent().children();
                $(this).parent().parent().remove();
                var va1 = a[1].firstChild.value;
                var va2 = a[2].firstChild.value;
                var va3 = a[3].firstChild.value;
                var va4 = a[4].firstChild.value;
                var va5 = a[5].firstChild.value;
                var va6 = a[6].firstChild.value;
                var va7 = a[7].firstChild.value;
                var va8 = a[8].firstChild.value;
                var va9 = a[9].firstChild.value;
                $.post(common.baseUrl + '/user_delete',{
                    name:va1,
                    lianxiren:va2,
                    phone:va3,
                    leibei:va4,
                    mail:va5,
                    dizhi:va6,
                    zhanghao:va7,
                    shengfen:va8,
                    chengshi:va9
                },function(response){
                    /*response=JSON.parse(response);
                    if(response.status){
                        alert('删除成功');
                    } else {
                        alert(response.message);
                    }*/
                    user();
                })
            })
        })
    },3000)

    //编辑用户
    setTimeout(function(){
        var va11,va12,va13,va14,va15,va16,va17,va18,va19;
        $('.userCheck').each(function(i){
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
                    va19 = check[9].firstChild.value;
                }
            })
        })
                                                          
        $('.userEdit').each(function(i){
            $(this).click(function(){
                var newa = $(this).parent().parent().children();
                var va1 = newa[1].firstChild.value;
                var va2 = newa[2].firstChild.value;
                var va3 = newa[3].firstChild.value;
                var va4 = newa[4].firstChild.value;
                var va5 = newa[5].firstChild.value;
                var va6 = newa[6].firstChild.value;
                var va7 = newa[7].firstChild.value;
                var va8 = newa[8].firstChild.value;
                var va9 = newa[9].firstChild.value;
                $.post(common.baseUrl + '/user_updata',{
                    goods:JSON.stringify({
                        name:va1,
                        lianxiren:va2,
                        phone:va3,
                        leibei:va4,
                        mail:va5,
                        dizhi:va6,
                        zhanghao:va7,
                        shengfen:va8,
                        chengshi:va9
                    }),lists:JSON.stringify({
                        name:va11,
                        lianxiren:va12,
                        phone:va13,
                        leibei:va14,
                        mail:va15,
                        dizhi:va16,
                        zhanghao:va17,
                        shengfen:va18,
                        chengshi:va19
                    })},function(response){
                        $('.tbody_users').find(':checkbox').prop('checked',false);
                })
            })
        })
    },3000)

    //vip用户
    $('.vip').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $.post(common.baseUrl + '/user_search',{leibei:'vip',},function(response){
            response=JSON.parse(response);
            listsql=response.data;
            var th=$.map(listsql,function(item){
                return `<tr>
                    <td><input type="checkbox" name="check" class="userCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.lianxiren}"/></td>
                    <td><input type="text" class="input3" value="${item.phone}"/></td>
                    <td><input type="text" class="input4" value="${item.leibei}"/></td>
                    <td><input type="text" class="input5" value="${item.mail}"/></td>
                    <td><input type="text" class="input6" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input7" value="${item.zhanghao}"/></td>
                    <td><input type="text" class="input8" value="${item.shengfen}"/></td>
                    <td><input type="text" class="input9" value="${item. chengshi}"/></td>
                    <td><input type="text" value="删除" class="userDel"/></td>
                    <td><input type="button" value="编辑" class="userEdit"/></td>
                </tr>`
            }).join('');
            $('.tbody_users')[0].innerHTML = '';
            $('.tbody_users').html(th)
        })
    })

    //普通用户
    $('.huiyuan').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $.post(common.baseUrl + '/user_search',{leibei:'会员',},function(response){
            response=JSON.parse(response);
            listsql=response.data;
            var th=$.map(listsql,function(item){
                return `<tr>
                    <td><input type="checkbox" name="check" class="userCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.lianxiren}"/></td>
                    <td><input type="text" class="input3" value="${item.phone}"/></td>
                    <td><input type="text" class="input4" value="${item.leibei}"/></td>
                    <td><input type="text" class="input5" value="${item.mail}"/></td>
                    <td><input type="text" class="input6" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input7" value="${item.zhanghao}"/></td>
                    <td><input type="text" class="input8" value="${item.shengfen}"/></td>
                    <td><input type="text" class="input9" value="${item. chengshi}"/></td>
                    <td><input type="text" value="删除" class="userDel"/></td>
                    <td><input type="button" value="编辑" class="userEdit"/></td>
                </tr>`
            }).join('');
            $('.tbody_users')[0].innerHTML = '';
            $('.tbody_users').html(th)
        })
    })

    function user(){
        $.post(common.baseUrl + '/user_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="userCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.lianxiren}"/></td>
                    <td><input type="text" class="input3" value="${item.phone}"/></td>
                    <td><input type="text" class="input4" value="${item.leibei}"/></td>
                    <td><input type="text" class="input5" value="${item.mail}"/></td>
                    <td><input type="text" class="input6" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input7" value="${item.zhanghao}"/></td>
                    <td><input type="text" class="input8" value="${item.shengfen}"/></td>
                    <td><input type="text" class="input9" value="${item. chengshi}"/></td>
                    <td><input type="button" value="删除" class="userDel"/></td>
                    <td><input type="button" value="编辑" class="userEdit"/></td>
                </tr>`
            }).join('');
            $('.tbody_users').html('');
            $('.tbody_users').html(th);

            if(!response.status){
                alert(response.message);
            }
        })
    }
})