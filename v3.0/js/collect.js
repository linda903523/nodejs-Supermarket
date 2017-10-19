/*------------收银管理-----------*/
jQuery(function($){
    $('.collect').on('click',function(){
        collect();
    })

    //删除
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'btnDel_col'){
            var $name = $(e.target).parent().prevAll().find('.input1').val();
            var $tiaoma = $(e.target).parent().prevAll().find('.input2').val();
            var $id = $(e.target).parent().prevAll().find('.input3').val();
            var $shoujia = $(e.target).parent().prevAll().find('.input5').val();
            $.post(common.baseUrl+'/col_delete',{
                name:$name,
                tiaoma:$tiaoma,
                id:$id,
                shoujia:$shoujia
            },function(response){
                response=JSON.parse(response);        
                if(response.status){
                    alert('删除成功');
                    collect();
                } else {
                    alert(response.message);
                }
            })
        }
    })

    var qtys = [];
    $(document).on('keydown',function(e){  
        var qty=0;     
        if(e.keyCode == 13){
            var qr=$('#QR').val()
            qtys.push(qr);
            for(var i=0;i<qtys.length;i++){
                if(qtys[i] == String(qr)){
                }
            }
            $.post(common.baseUrl + '/search',{tiaoma:$('#QR').val()},function(response){
                response = JSON.parse(response);
                var list_col = response.data;
                if(response.status){
                    $.post(common.baseUrl + '/col_create',list_col[0],function(response){
                        response = JSON.parse(response);
                        if(response.status){
                            collect();
                        } else {
                            alert('失败');
                        }
                    })
                } else {
                    alert('该商品不存在');
                }
                // 获取所有商品总计
                var $coll_h2 = $('.collect_detail>h2>i');
                var $coll_put6 = $('.table_th8 tbody tr td .input6')
                var coll_tato=0;
                for(var i=0;i<$coll_put6.length;i++){
                    if($coll_put6.eq(i).val() != 'undefined'){
                        coll_tato += Number($coll_put6.eq(i).val());
                    }
                }
                $coll_h2.html(coll_tato);
                $('#QR').val('');
            })
        }
    })
    
    function collect(){
        $.post(common.baseUrl + '/col_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="collectCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4 qty${item.tiaoma}" value="${item.qty}"/></td>
                    <td><input type="text" class="input5" value="${item.shoujia}"/></td>
                    <td><input type="text" class="input6" value="${item.shoujia*item.qty}"/></td>
                    <td><input type="button" value="删除" class="btnDel_col"/></td>
                </tr>`
            }).join('');
            $('.table_th8 tbody').html('');
            $('.table_th8 tbody').html(th);
            
            if(!response.status){
                alert(response.message);
            }
            // 获取所有商品总计
            var $coll_h2 = $('.collect_detail>h2>i');
            var $coll_put6 = $('.table_th8 tbody tr td .input6')
            var coll_tato=0;
            for(var i=0;i<$coll_put6.length;i++){
                if($coll_put6.eq(i).val() != 'undefined'){
                    coll_tato += Number($coll_put6.eq(i).val());
                }
            }
            $coll_h2.html(coll_tato);
        })
    }

    //二维码
    $('#btnAdd8').on('click',function(){
        $('.erweima').css({display:'block'})
    })
    $('.erweima>span').on('click',function(){
        $('.erweima').css({display:'none'})        
    })
})
