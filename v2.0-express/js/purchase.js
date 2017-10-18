jQuery(function($){
    //采购   添加xxxxxxxxxxxxxxxx
    $(document).on('click',function(e){
        if(e.target.tagName.toLowerCase() == 'button'){
            var $btn_id=$(e.target).attr('class')
            $.post(common.baseUrl + '/search',{id:$btn_id},function(response){
                response=JSON.parse(response);
                var seda=response.data;
                if(response.status){
                    // alert('采购成功');
                    // console.log(seda);
                    // console.log(seda[0].name)
                    $.post(common.baseUrl + '/pur_create',{
                        name:seda[0].name,
                        tiaoma:seda[0].tiaoma,
                        id:seda[0].id,
                        img:seda[0].img,
                        dizhi:seda[0].dizhi,
                        number:seda[0].number,
                        shoujia:seda[0].shoujia,
                        bianhao:seda[0].bianhao,
                        purchase:20,
                        whole:2,
                        offic:0,
                        offic_many:0,
                    },function(response){
                        response=JSON.parse(response);
                        if(response.status){
                            alert('采购成功');
                            // console.log(response.data)
                        } else {
                            alert('采购失败');

                        }
                    })
                } else {
                    alert(response.message);
                }
            })
            console.log($btn_id);
        }
       
    })
    // xxxxxxxxxxxxxx采购管理xxxxxxxxxxxxxxxxxxxx
    $('.purchase').on('click',function(){
        axc();
    })
    ////////////////删除////////////////////
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'btnDel'){
            // $(e.target).
            var $bianhao_id = $(e.target).parent('td').prevAll().eq(6).find('input').val();
            console.log($bianhao_id);
            $.post(common.baseUrl+'/pur_delete',{id:$bianhao_id},function(response){
                // console.log(response)
                response=JSON.parse(response);
                console.log(response);
        
                if(response.status){
                        alert('删除成功');
                        // response.write(response.data);
                        // window.location.href = 'login.html';
                        axc();
                    } else {
                        alert(response.message);
                    }

            })
        }
        // console.log($(e.target));
    })
    // 提交采购订单
    var $table_th2_p = $('.table_th2>h2>p');
    $table_th2_p.on('click',function(){
        $.post(common.baseUrl + '/pur_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            console.log(listsql);

            if(response.status){
                for(var i=0; i<listsql.length; i++){
                    console.log(listsql[i].name);
                    $.post(common.baseUrl + '/rec_search',{
                        // name: listsql[i].name,
                        // tiaoma: listsql[i].tiaoma,
                        // id: listsql[i].id,
                        // img: listsql[i].img,
                        // dizhi: listsql[i].dizhi,
                        // number: listsql[i].number,
                        // shoujia: listsql[i].shoujia,
                        // bianhao: listsql[i].bianhao,
                        // purchase: listsql[i].purchase,
                        // whole: listsql[i].whole,
                        // offic: listsql[i].offic,
                        // offic_many: listsql[i].offic_many,
                    },function(response){
                        response = JSON.parse(response);
                        if(response.status){
                            alert('成功');
                        } else {
                            alert('失败');
                        }
                    })
                }
            } else {
                alert(response.message); 
            }
        })
    })
    console.log($table_th2_p);
    function axc(){

        $.post(common.baseUrl + '/pur_search',{},function(response){
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
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" value="${item.shoujia}"/></td>
                    <td><input type="text" class="input8" value="${item.bianhao}"/></td>
                    <td class="tota">${item.purchase*item.whole}</td>
                    <td><input type="button" value="删除" class="btnDel"/></td>
                </tr>`
            }).join('');
            $('.table_th2 tbody').html('');
            $('.table_th2 tbody').html(th);
            var $tota = $('.tota');
            var $tota_h2=0;
            for(var i=0;i<$tota.length;i++){
                $tota_h2 += Number($tota.eq(i).html());
                // console.log($tota_h2);
            }
            $('.table_th2>h2>i').html($tota_h2);
            if(!response.status){
                alert(response.message);
            }
        })
    }
})