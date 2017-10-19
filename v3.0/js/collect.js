/*------------收银管理-----------*/
jQuery(function($){
    //删除信息
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'btnDel_col'){
            var $bianhao_id = $(e.target).parent('td').prevAll().eq(4).find('input').val();
            $.post(common.baseUrl+'/col_delete',{_id:$bianhao_id},function(response){
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


    $(document).on('keydown',function(e){       
        if(e.keyCode == 13){
            $.post(common.baseUrl + '/search',{tiaoma:$('#QR').val(),},function(response){
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
            })
            $('#QR').val('');
        }
    })
    
    function collect(){
        $.post(common.baseUrl + '/col_search',{},function(response){
                response = JSON.parse(response);
                var listsql = response.data;
                var th = $.map(listsql,function(item){
                    return `<tr class="table_tr">
                        <td><input type="checkbox" name="check"></td>
                        <td><input type="text" class="input1" value="${item.name}"/></td>
                        <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                        <td><input type="text" class="input3" value="${item._id}"/></td>
                        <td><input type="text" class="input4" value="1"/></td>
                        <td><input type="text" class="input5" value="${item.shoujia}"/></td>
                        <td><input type="text" class="input6" value="${item.shoujia}"/></td>                        
                        <td class="tota8">修改</td>
                        <td><input type="button" value="删除" class="btnDel_col"/></td>
                    </tr>`
                }).join('');
                $('.table_th8 tbody').html('');
                $('.table_th8 tbody').html(th);
                
                if(!response.status){
                    alert(response.message);
                }
        })
    }
})