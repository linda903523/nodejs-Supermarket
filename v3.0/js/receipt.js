/*------------收货管理-----------*/
jQuery(function($){
    $('.receipt').on('click',function(){
        receipt();
    })
    
    function receipt(){
        $.post(common.baseUrl + '/rec_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.purchaseNumber}"/></td>
                    <td><input type="text" class="input5" value="${item.price}"/></td>
                    <td><input type="text" class="input6" value="${item.receiptNumber}"/></td>
                    <td><input type="text" class="input7" /></td>
                    <td><input type="text" class="input8" value="${item.receiptNumber*item.price}"/></td>
                    <td><input type="button" value="退货" class="btnCan"/></td>
                    <td><input type="button" value="删除" class="btnDel_rec"/></td>
                </tr>`
            }).join('');
            $('.table_th5 tbody').html('');
            $('.table_th5 tbody').html(th);
            
            if(!response.status){
                alert(response.message);
            }
        })
    }

    //删除
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'btnDel_rec'){
            var $bianhao_id = $(e.target).parent('td').prevAll().eq(6).find('input').val();
            $.post(common.baseUrl+'/rec_delete',{id:$bianhao_id},function(response){
                response=JSON.parse(response);        
                if(response.status){
                    alert('删除成功');
                    receipt();
                } else {
                    alert(response.message);
                }
            })
        }
    })
})