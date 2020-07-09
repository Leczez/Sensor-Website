

var http = require('http');
var url = require('url');
var fs = require('fs');


function POST(req, res)
{

}

function GET(req, res, q)
{
    switch(q.pathname)
    {
    case "/devices":
        var register = fs.readFileSync("device_register.json");
        res.writeHead(200,{"Content-Type": "text/html"})
        res.write(register);
        break;
    
    case "/style.css":
        var file = fs.readFileSync("style.css");
        res.writeHead(200,{"Content-Type": "text/css"});
        res.write(file);
        break;

    default:
        var content = fs.readFileSync("index.html");
        res.writeHead(200,{"Content-Type": "text/html"})
        res.write(content);

    }
}






//Create the http server object
http.createServer(function(req, res)
{
    var q = url.parse(req.url, true);
    if(req.method == "POST")
    {
        POST(req, res);

    }else if(req.method == "GET")
    {
        GET(req, res, q);
    }
    
    return res.end();

}).listen(8080);