/*------------上架管理-----------*/
jQuery(function($){
    $('.putaway').on('click',function(){
        putaway();
    })
    
    function putaway(){
        $.post(common.baseUrl + '/can_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="putawayCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="button" value="删除" class="putawayDel"/></td>
                    <td><input type="button" value="编辑" class="putawayEdit"/></td>
                </tr>`
            }).join('');
            $('.table_th7 tbody').html('');
            $('.table_th7 tbody').html(th);
            
            if(!response.status){
                alert(response.message);
            }
        })
    }

    // 新增按钮xxxxxxxxxxxxxxxxxxxxxxxxxxx
    $('#btnAdd7').on('click', function(){
        $('.added_id7').css({display : "block"})
    })
    $('#colse7').on('click', function(){
        $('.added_id7').css({display:"none"})
    })
    
    // 增加
    $('#app7').on('click', function(){
        $.post(common.baseUrl + '/can_create',{
            name:$('#input_ss7 .input1').val(),
            tiaoma:$('#input_ss7 .input2').val(),
            id:$('#input_ss7 .input3').val(),
            img:$('#input_ss7 .input4').val(),
            dizhi:$('#input_ss7 .input5').val(),
            number:$('#input_ss7 .input6').val(),
            shoujia:$('#input_ss7 .input7').val(),
            bianhao:$('#input_ss7 .input8').val(),
        },function(response){
            response = JSON.parse(response);
            if(response.status){
                alert('添加成功');
                $('.added_id7').css({display:"none"})
                $('.added_id7 td input').val('');
                putaway();
            } else {
                alert(response.message);
            }
        })
    })

    //搜索
    $('#shou7').click(function(){
        $('.added7>a').hide();
        $.post(common.baseUrl + '/can_search',{name:$('#shousuo7').val()},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="putawayCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="button" value="删除" class="putawayDel"/></td>
                    <td><input type="button" value="编辑" class="putawayEdit"/></td>
                </tr>`
            }).join('');
            $('.table_th7 tbody').html('');
            $('.table_th7 tbody').html(th);

            if(response.status){
                alert('搜索成功');
            } else {
                alert(response.message);
            }
        })       
    })

    //删除
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'putawayDel'){
            var $bianhao_id = $(e.target).parent().prevAll().find('.input3').val();
            $.post(common.baseUrl+'/can_delete',{id:$bianhao_id},function(response){
                response=JSON.parse(response);        
                if(response.status){
                    alert('删除成功');
                    putaway();
                } else {
                    alert(response.message);
                }
            })
        }
    })

    //编辑：1.选择复选框  2.编辑信息  3.点击“编辑”
    setTimeout(function(){
        var va11,va12,va13,va14,va15,va16,va17;
        $('.putawayCheck').each(function(i){
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
        $('.putawayEdit').each(function(i){
            $(this).click(function(){
                var a = $(this).parent().parent().children();
                var va1 = a[1].firstChild.value;
                var va2 = a[2].firstChild.value;
                var va3 = a[3].firstChild.value;
                var va4 = a[4].firstChild.value;
                var va5 = a[5].firstChild.value;
                var va6 = a[6].firstChild.value;
                var va7 = a[7].firstChild.value;
                $.post(common.baseUrl + '/can_update',{
                    goods:JSON.stringify({
                        name:va1,
                        tiaoma:va2,
                        id:va3,
                        img:va4,
                        dizhi:va5,
                        shoujia:va6,
                        bianhao:va7
                    }),lists:JSON.stringify({
                        name:va11,
                        tiaoma:va12,
                        id:va13,
                        img:va14,
                        dizhi:va15,
                        shoujia:va16,
                        bianhao:va17
                    })},function(response){
                        response=JSON.parse(response);
                        if(response.status){
                            $('.table_th7').find(':checkbox').prop('checked',false);
                            alert('编辑成功');
                        } else {
                            alert(response.message);
                        }
                })
            })
        })
    },3000)
})