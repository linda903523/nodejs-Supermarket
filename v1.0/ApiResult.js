module.exports=function(_status,_data,_message){
    var result={status:_status,data:_data,message:_message};
    return JSON.stringify(result);
}