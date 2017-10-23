$.fn.datagrid = function(opts){
	var _defalt = {
		url: '',
		cols: null,
		edit: false,
		delete: false,
		purchase:true
	}

	var options = $.extend(_defalt, opts);

	var container = $(this);

	var init = function(){
		var $table = $('<table class="table table-striped table-bordered table-hover table-full-width"></table>').click(function(event){
				events(event);
			});
		var $thead = $('<thead></thead>');
		var $tbody = $('<tbody></tbody>');
		$.get('../lib/dictionary/commonDic.text', function(dic){
				var dicObj = JSON.parse(dic);
			$.post(options.url, function(response){
				response = JSON.parse(response);
				if(response.status && response.data[0]){
					var cols = options.cols ? options.cols.split(',') : options.cols;

					//生成 thead
					var $tr = $('<tr></tr>');
					for(var key in response.data[0]){
						if(!cols || (cols && cols.indexOf(key) > -1)){
							$("<th></th>").text(dicObj['cn'][key] || key).appendTo($tr);
						}
					}
					if(options.purchase){
						$('<th></th>').text('采购').appendTo($tr);
					}
					if(options.edit){
						$('<th></th>').text('编辑').appendTo($tr);
					}
					if(options.delete){
						$('<th></th>').text('删除').appendTo($tr);
					}				
					$tr.appendTo($thead);
					$thead.appendTo($table);

					//生成 tbody
					for(var i = 0; i < response.data.length; i++){
						$tr = $('<tr></tr>');
						for(var key in response.data[i]){
							if(!cols || (cols && cols.indexOf(key) > -1)){
								$("<td></td>").text(response.data[i][key]).appendTo($tr);
							}
						}
						if(options.purchase){
							$('<td><span flag="purchase" objectid="' + response.data[i]['_id'] + '">采购</span></td>').appendTo($tr);
						}
						if(options.edit){
							$('<td><span flag="edit" objectid="' + response.data[i]['_id'] + '">编辑</span></td>').appendTo($tr);
						}
						if(options.delete){
							$('<td><span flag="delete" objectid="' + response.data[i]['_id'] + '">删除</span></td>').appendTo($tr);
						}					
						$tr.appendTo($tbody);
					}
					$tbody.appendTo($table);

					$table.appendTo(container);
				}
			})
		})
	}

	init();

	var events = function(event){
		var currObj = $(event.target);
		if(currObj.is('span') && currObj.attr('flag') == 'delete'){
			$.post(common.baseUrl + '/delete', {_id: currObj.attr('objectid')}, function(response){
				response = JSON.parse(response);
				if(response.status){
					currObj.closest('tr').remove();
				} else {
					//输出错误信息
				}
			})
		}
		if(currObj.is('span') && currObj.attr('flag') == 'edit'){
            $('.modal').modal('toggle');
			var children = currObj.parent().parent().children();
			var va1 = $(children[0]).text();
			var va2 = $(children[1]).text();
			var va3 = $(children[2]).text();
			var va4 = $(children[3]).text();
			var va5 = $(children[4]).text();
			var va6 = $(children[5]).text();
			var old = JSON.stringify({name:va1,tiaoma:va2,dizhi:va3,number:va4,shoujia:va5,bianhao:va6});
			var newb;
			$('#putaway_but').click(function(){
				var va11= $('.putaway_input11').val();
				var va12= $('.putaway_input12').val();
				var va13= $('.putaway_input13').val();
				var va14= $('.putaway_input14').val();
				var va15= $('.putaway_input15').val();
				var va16= $('.putaway_input16').val();
				newb = JSON.stringify({name:va11,tiaoma:va12,dizhi:va13,number:va14,shoujia:va15,bianhao:va16});
				$.post(common.baseUrl+"/put_updata",{lists:old,goods:newb},function(response){
					console.log(response);
				})
				$('.putaway_datagrid').datagrid({
	                url: common.baseUrl + '/put_search',
	                cols: 'name,tiaoma,dizhi,number,shoujia,bianhao',
	                edit: true,
	                delete: true
	            })
	            $('.chacha').click(function(){
	            	$('.putaway_input11').val('');
					$('.putaway_input12').val('');
					$('.putaway_input13').val('');
					$('.putaway_input14').val('');
					$('.putaway_input15').val('');
					$('.putaway_input16').val('');
	            })
			});
		}
	}
}