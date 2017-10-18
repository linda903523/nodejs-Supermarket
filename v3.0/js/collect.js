jQuery(function($){
    // xxxxxxxxxxxxxx收银管理xxxxxxxxxxxxxxxxxxxx
    ////////////////删除//////////////////// 
    $(document).on('click',function(e){

        if($(e.target).attr('class') == 'btnDel_col'){
            // $(e.target).
            var $bianhao_id = $(e.target).parent('td').prevAll().eq(4).find('input').val();
            console.log($bianhao_id);
            $.post(common.baseUrl+'/col_delete',{_id:$bianhao_id},function(response){
                // console.log(response)
                response=JSON.parse(response);
                // console.log(response);
        
                if(response.status){
                        alert('删除成功');
                        // response.write(response.data);
                        // window.location.href = 'login.html';
                        coll();
                    } else {
                        alert(response.message);
                    }

            })
        }
        // console.log($(e.target));
    })


    $(document).on('keydown',function(e){
        
            // console.log(e.keyCode)
        
        if(e.keyCode == 13){
            // $('#QR').change(function(){
                console.log($('#QR').val());
            // })
            // 

            $.post(common.baseUrl + '/search',{tiaoma:$('#QR').val(),},function(response){
                response = JSON.parse(response);
                var list_col = response.data;

                console.log(list_col[0]);
                if(response.status){
                    // alert('ti');
                    $.post(common.baseUrl + '/col_create',list_col[0],function(response){
                        response = JSON.parse(response);
                        if(response.status){
                            // alert('加入');
                            coll();
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
    // $('.collect').on('click',function(){
    //     coll();
    // })
    function coll(){
        $.post(common.baseUrl + '/col_search',{},function(response){
                response = JSON.parse(response);
                var listsql = response.data;
                console.log(listsql)
                var th = $.map(listsql,function(item){
                    return `<tr class="table_tr">
                        <td><input type="checkbox" name="check"></td>
                        <td><input type="text" class="input1" value="${item.name}"/></td>
                        <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                        <td><input type="text" class="input3" value="${item._id}"/></td>
                        <td><input type="text" class="input4" value="1"/></td>
                        <td><input type="text" class="input5" value="${item.shoujia}"/></td>
                        <td><input type="text" class="input6" value="${item.shoujia}"/></td>
                        
                        <td class="tota7">修改</td>
                        <td><input type="button" value="删除" class="btnDel_col"/></td>
                    </tr>`
                }).join('');
                $('.table_th7 tbody').html('');
                $('.table_th7 tbody').html(th);
                
                if(!response.status){
                    alert(response.message);
                }
        })
    }
})