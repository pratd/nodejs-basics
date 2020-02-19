var fs = require('fs');
function writeContent(data, path, query, status){

    var dataCollection = JSON.parse(data);
    var dataObject ={
        "path": path,
        "query":JSON.stringify(query.zipCode),
        "statusCode":status
    };
    dataCollection.push(dataObject);

    fs.writeFile('request.JSON', JSON.stringify(dataCollection), function(err){
        if(err){
            console.log('Error to load');
        }else{
            console.log(dataCollection);
        }
    });

}
module.exports ={
    serverLog: function (path, query, status) {
        try{
            fs.statSync('request.json');
            fs.readFile('request.json', function (err, data) {
                if(err){
                    console.log('error to load');
                }else{
                    writeContent(data, path, query, status);
                }
            });
        }
        catch(err){//append an empty array to push values inside it
            fs.appendFile('request.json', '[]', function(err){
                if(err){
                    console.log('Error while loading');
                }
            });
            fs.readFile('request.json', function(err, data){
                if(err){
                    console.log('error to load');
                }else{
                    writeContent(data, path, query, status);
                }
            });
        }
    }
}