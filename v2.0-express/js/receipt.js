jQuery(function($){
    $('.receipt').on('click',function(){
        axc();
    })
    // axc()
    function axc(){
        $.post(common.baseUrl + '/rec_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.purchase}"/></td>
                    <td><input type="text" class="input5" value="${item.whole}"/></td>
                    <td><input type="text" class="input6" value="${item.purchase*item.whole}"/></td>
                    <td><input type="text" class="input7" value="${item.offic}"/></td>
                    <td><input type="text" class="input8" value="${item.offic_many}"/></td>
                    <td class="tota5">${item.purchase*item.whole}</td>
                    <td><input type="button" value="删除" class="btnDel"/></td>
                </tr>`
            }).join('');
            $('.table_th5 tbody').html('');
            $('.table_th5 tbody').html(th);
            
            if(!response.status){
                alert(response.message);
            }
        })
    }
})