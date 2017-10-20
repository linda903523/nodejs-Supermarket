/*------------小票打印-----------*/
jQuery(function($){
    $('.print').click(function(){
        print();
    })

    var time=$('#time');
    showTime();

    // 每隔1s执行一次showTime
    setInterval(showTime,1000);
    function showTime(){
        // 获取当前时间
        var now = new Date();
        // 年月日
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var date = now.getDate();

        // 时分秒
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();

        // 补0操作
        month = month<10 ? '0'+month : month;
        date = date<10 ? '0'+date : date;
        hour = hour<10 ? '0'+hour : hour;
        min = min<10 ? '0'+min : min;
        sec = sec<10 ? '0'+sec : sec;
        // 时间写入页面
        time[0].innerHTML = year + '年' + month + '月' + date + '日 ' + hour + ':' + min + ':' + sec;
    }
    var printtime=$('#time').html();

    $('.printcui').on('click',function(){
        $.post(common.baseUrl + '/col_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `${item.name}                 ${item.qty +'件'}          ${item.shoujia*item.qty + '元'}\n`
            }).join('');
            var a = $('.zongnmber').text();
            var b = $('.moneynumber').text();
            console.log(a,b)
            $.post("http://10.3.131.33:81/print", {text:`皇冠超市\n*************************************\n商品名称   单品数量     商品金额 \n\n${th}\n*************************************\n时间:${printtime}\n\n总数量：${a}     总价：${b}\n\n付款：应付人民币${b}\n*********************************************\n        \n`},function(res){
                console.log(res);
            })
        })
    })
    function print(){
        $('.complete').hide();
        $.post(common.baseUrl + '/col_search',{},function(response){
            response = JSON.parse(response);
            listsql = response.data;
            var th=$.map(listsql,function(item){
                return `<tr>
                    <td><input type="text" class="input1_print" value="${item.name}"/></td>
                    <td><input type="text" class="input2_print" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3_print" value="${item.qty}"/></td>
                    <td><input type="text" class="input4_print" value="${item.shoujia*item.qty }"/></td>
                </tr>`
            }).join('');
            $('.mongytbody')[0].innerHTML = '';
            $('.mongytbody').html(th);
            $('.input1_print').each(function(i){
                //console.log($(this).val());
            })
            var tatil=0;
            $('.input3_print').each(function(i){
                tatil+=Number($(this).val());
            })
            var money=0;
            $('.zongnmber').html(tatil+'件');
            $('.input4_print').each(function(i){
                money+=Number($(this).val());
            })
            $('.moneynumber').html(money+'元');
        });                  
    }
    
    var ws;
    ws = new WebSocket("ws://10.3.131.14:888");
    ws.onmessage = function(_msg){
        console.log(_msg.data);
        $('.complete').show().html(_msg.data);
        $('.erweima').hide();
    } 
})