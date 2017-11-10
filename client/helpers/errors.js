// 集合的数据将不会保存在服务器端的数据库中
Errors = new Mongo.Collection(null); 

throwError = function(message){
    Errors.insert({message});
}
