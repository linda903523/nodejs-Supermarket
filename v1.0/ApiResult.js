module.exports = function(_result,_data,_message){
    var result = {status:_result,data:_data || null,message:_message || null};
    return JSON.stringify(result);
}