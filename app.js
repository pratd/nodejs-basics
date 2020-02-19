const url = require('url'); //for url requirement
const fs = require('fs'); //require filesystem
var path = require('path');//native nodejs for working with paths in the directories

const filePath = './index.html';
const serverLog = require('./log.js');
//Location of your favicon in the filesystem
var FAVICON = path.join(__dirname,'public','favicon.ico');

const cities = require('cities');

module.exports ={
    handleRequest: function(request, response){
        path = url.parse(request.url).pathname;
        var query = url.parse(request.url, true).query;
        var status = response.statusCode;

        serverLog.serverLog(path, query, status);

        switch(path){
            case '/favicon.ico':
                response.setHeader('Content-Type','image/x-icon');
                fs.createReadStream(FAVICON).pipe(response);
                response.end();
            break;
            case '/':
                var param = query.zipCode;
                if(param){
                    if(cities.zip_lookup(param)!=undefined){
                        var city =cities.zip_lookup(param).city;
                        response.end(`The city you are looking for is: ${city}`);
                    }else{
                        response.statusCode =404;
                        response.end('This zipcode not found');
                    }
                }else{
                    if(fs.existsSync(filePath)){
                        fs.readFile(filePath, null, function(err, data){
                            if(err){
                                response.statusCode =404;
                                response.end('file not found');
                            }
                            response.end(data);
                        });
                    }
                }
            break;
            default:
                response.statusCode = 404;
                response.end('This route does not exist');
            break;
        }
    }
};