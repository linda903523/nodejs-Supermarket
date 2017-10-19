/*------供应商管理-------*/
jQuery(function($){
    $('.supplier').on('click',function(){
        supplier();
    })
    
    function supplier(){
        $.post(common.baseUrl + '/sup_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="supplierCheck"></td>
                    <td><input type="text" class="input1" value="${item.company}"/></td>
                    <td><input type="text" class="input2" value="${item.address}"/></td>
                    <td><input type="text" class="input3" value="${item.name}"/></td>
                    <td><input type="text" class="input4" value="${item.number}"/></td>
                    <td><input type="text" class="input5" value="${item.mail}"/></td>
                    <td><input type="button" value="删除" class="supplierDel"/></td>
                    <td><input type="button" value="编辑" class="supplierEdit"/></td>
                </tr>`
            }).join('');
            $('.table_th4 tbody').html('');
            $('.table_th4 tbody').html(th);
            
            if(!response.status){
                alert(response.message);
            }
        })
    }

    // 新增按钮
    $('#btnAdd4').on('click', function(){
        $('.added_id4').css({display : "block"})
    })
    $('#colse4').on('click', function(){
        $('.added_id4').css({display:"none"})
    })
    
    // 增加
    $('#app4').on('click', function(){
        $.post(common.baseUrl + '/sup_create',{
            company:$('#input_ss4 .input1').val(),
            address:$('#input_ss4 .input2').val(),
            name:$('#input_ss4 .input3').val(),
            number:$('#input_ss4 .input4').val(),
            mail:$('#input_ss4 .input5').val()
        },function(response){
            response = JSON.parse(response);
            if(response.status){
                alert('添加成功');
                $('.added_id4').css({display:"none"})
                $('.added_id4 td input').val('');
                supplier();
            } else {
                alert(response.message);
            }
        })
    })

    //搜索
    $('#shou4').click(function(){
        $('.added4>a').hide();
        $.post(common.baseUrl + '/sup_search',{company:$('#shousuo4').val()},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="supplierCheck"></td>
                    <td><input type="text" class="input1" value="${item.company}"/></td>
                    <td><input type="text" class="input2" value="${item.address}"/></td>
                    <td><input type="text" class="input3" value="${item.name}"/></td>
                    <td><input type="text" class="input4" value="${item.number}"/></td>
                    <td><input type="text" class="input5" value="${item.mail}"/></td>
                    <td><input type="button" value="删除" class="supplierDel"/></td>
                    <td><input type="button" value="编辑" class="supplierEdit"/></td>
                </tr>`
            }).join('');
            $('.table_th4 tbody').html('');
            $('.table_th4 tbody').html(th);

            if(response.status){
                alert('搜索成功');
            } else {
                alert(response.message);
            }
        })       
    })

    //删除
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'supplierDel'){
            var $company = $(e.target).parent().prevAll().find('.input1').val();
            $.post(common.baseUrl+'/sup_delete',{company:$company},function(response){
                response=JSON.parse(response);        
                if(response.status){
                    alert('删除成功');
                    supplier();
                } else {
                    alert(response.message);
                }
            })
        }
    })

    //编辑：1.选择复选框  2.编辑信息  3.点击“编辑”
    setTimeout(function(){
        var va11,va12,va13,va14,va15;
        $('.supplierCheck').each(function(i){
            $(this).click(function(){
                 var check = $(this).parent().parent().children();
                 if(check[0].firstChild.checked){
                    va11 = check[1].firstChild.value;
                    va12 = check[2].firstChild.value;
                    va13 = check[3].firstChild.value;
                    va14 = check[4].firstChild.value;
                    va15 = check[5].firstChild.value;
                }
            })
        })
        $('.supplierEdit').each(function(i){
            $(this).click(function(){
                var a = $(this).parent().parent().children();
                var va1 = a[1].firstChild.value;
                var va2 = a[2].firstChild.value;
                var va3 = a[3].firstChild.value;
                var va4 = a[4].firstChild.value;
                var va5 = a[5].firstChild.value;
                $.post(common.baseUrl + '/sup_update',{
                    goods:JSON.stringify({
                        company:va1,
                        address:va2,
                        name:va3,
                        number:va4,
                        mail:va5
                    }),lists:JSON.stringify({
                        company:va11,
                        address:va12,
                        name:va13,
                        number:va14,
                        mail:va15
                    })},function(response){
                        $('.table_th4').find(':checkbox').prop('checked',false);
                })
            })
        })
    },3000)
})