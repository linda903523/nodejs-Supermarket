$.fn.datagrid = function(opts){
	var _defalt = {
		url: '',
		cols: null,
		/*method: 'get',*/
		edit: false,
		delete: false
	}

	var options = $.extend(_defalt, opts);

	var container = $(this);

	var init = function(){
		var $table = $('<table class="table table-striped table-bordered table-hover table-full-width"></table>').click(function(event){
			events(event);
		});
		var $thead = $('<thead></thead>');
		var $tbody = $('<tbody></tbody>');
		$.get('../lib/dictionary/commonDic.txt', function(dic){
			/*var dicObj = JSON.parse(dic);*/
		
			$.get(options.url, function(response){
				if(response.status && response.data[0]){
					var cols = options.cols ? options.cols.split(',') : options.cols;

					//生成 thead
					var $tr = $('<tr></tr>');
					for(var key in response.data[0]){
						if(!cols || (cols && cols.indexOf(key) > -1)){
							$("<th></th>").text(dicObj["cn"][key] || key).appendTo($tr);
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

	/*var events = function(event){
		console.log(event.target);
		var currObj = $(event.target);
		if(currObj.is('span') && currObj.attr('flag') == 'delete'){
			//do delete
			$.post('deleteproduct', {id: currObj.attr('objectid')}, function(response){
				if(response.status){
					currObj.closest('tr').remove();
				} else {
					//输出错误信息
				}
			})
		}
	}*/
}