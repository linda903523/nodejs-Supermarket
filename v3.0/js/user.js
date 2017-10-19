/*------------用户管理-----------*/
jQuery(function($){
    $('.user').on('click',function(){
        user();
    })

    //用户注册
    $('.button_user').click(function(){
        $.post(common.baseUrl + '/register',{
            name:$('.input1user').val(),
            phone:$('.input2user').val(),
            lianxiren:$('.input3user').val(),
            dizhi:$('.input4user').val(),
            leibei:$('.input5user').val(),
            shengfen:$('.input6user').val(),
            mail:$('.input7user').val()
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
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'userDel'){
            var $name = $(e.target).parent().prevAll().find('.input1').val();
            var $phone = $(e.target).parent().prevAll().find('.input2').val();
            var $lianxiren = $(e.target).parent().prevAll().find('.input3').val();
            var $dizhi = $(e.target).parent().prevAll().find('.input4').val();
            var $leibei = $(e.target).parent().prevAll().find('.input5').val();
            var $shengfen = $(e.target).parent().prevAll().find('.input6').val();
            var $mail = $(e.target).parent().prevAll().find('.input7').val();

            $.post(common.baseUrl + '/user_delete',{
                name:$name,
                phone:$phone,
                lianxiren:$lianxiren,
                dizhi:$dizhi,
                leibei:$leibei,
                shengfen:$shengfen,
                mail:$mail
            },function(response){
                response=JSON.parse(response);
                if(response.status){
                    alert('删除成功');
                    user();
                } else {
                    alert(response.message);
                }
            })
        }
    })

    //编辑用户
    setTimeout(function(){
        var va11,va12,va13,va14,va15,va16,va17;
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
                $.post(common.baseUrl + '/user_updata',{
                    goods:JSON.stringify({
                        name:va1,
                        phone:va2,
                        lianxiren:va3,
                        dizhi:va4,
                        leibei:va5,
                        shengfen:va6,
                        mail:va7
                    }),lists:JSON.stringify({
                        name:va11,
                        phone:va12,
                        lianxiren:va13,
                        dizhi:va14,
                        leibei:va15,
                        shengfen:va16,
                        mail:va17
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
                    <td><input type="text" class="input2" value="${item.phone}"/></td>
                    <td><input type="text" class="input3" value="${item.lianxiren}"/></td>
                    <td><input type="text" class="input4" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input5" value="${item.leibei}"/></td>
                    <td><input type="text" class="input6" value="${item.shengfen}"/></td>
                    <td><input type="text" class="input7" value="${item.mail}"/></td>
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
                    <td><input type="text" class="input2" value="${item.phone}"/></td>
                    <td><input type="text" class="input3" value="${item.lianxiren}"/></td>
                    <td><input type="text" class="input4" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input5" value="${item.leibei}"/></td>
                    <td><input type="text" class="input6" value="${item.shengfen}"/></td>
                    <td><input type="text" class="input7" value="${item.mail}"/></td>
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
                    <td><input type="text" class="input2" value="${item.phone}"/></td>
                    <td><input type="text" class="input3" value="${item.lianxiren}"/></td>
                    <td><input type="text" class="input4" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input5" value="${item.leibei}"/></td>
                    <td><input type="text" class="input6" value="${item.shengfen}"/></td>
                    <td><input type="text" class="input7" value="${item.mail}"/></td>
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