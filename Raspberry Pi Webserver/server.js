

var http = require('http');
var url = require('url');
var fs = require('fs');

var host = '192.168.0.84';
var port = 8080;

var index = fs.readFileSync("index.html");
var file = fs.readFileSync("style.css");


function addDevice(req, res, body)
{
    try 
    {
        console.log(body);
        var data = JSON.parse(body);
        console.log("data: " + JSON.stringify(data));
      
        fs.readFile("device_register.json", adding);
        
        function adding(err, device_register)
        {
            if(err)
            { 
                console.log(err);
                throw err;
            }else
            {
                console.log("file read");
            }
            
            var json = JSON.parse(device_register);
            console.log(json);

            var keys = Object.keys(data);
            var word = keys[0];

            json[word] = data[word];

            console.log(json);
            //console.log(data);
            //console.log(keys[0]);
            

            /*
            try
            {
                fs.writeFile("testy.json", JSON.stringify(json, null, 2), function(err)
                {
                    if(err)
                    { 
                        console.log(err);
                        throw err;
                    }else
                    {
                        console.log("The file has been saved");
                    }
                });    
            } catch (error)
            {
                console.log(error);
                throw error;    
            }
            */
        }
        
        

        
        res.statusCode = 200;
        res.end("POST Successful");

    } catch (error) 
    {
        console.log("error: " + error.message);
        res.statusCode = 400;
        res.writeHead(400);
        res.end("error: " + error.message);
    }

}

function POST(req, res)
{
    var body = "";
    req.on('data', function(data)
    {   
        body += data;
        //console.log(data);
        //console.log(data.toString());
    });
    req.on('end',() => 
    {
        switch(req.url)
        {
            case "/devices":
                addDevice(req, res, body);
        
            break;
            
            default:
                res.statusCode = 400;
                res.write("not a valid POST request");
                res.end();
        }
  
    });
}

function GET(req, res, q)
{
    switch(q.pathname)
    {
    case "/devices":
        fs.readFile("device_register.json", devices);
        function devices(err, data)
        {
            if(err)
            {
                console.log("error: " + err);
            }else
            {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.write(data);
                res.end();
                //console.log(register);
            }
        }
        
        break;
    
    case "/style.css":
        res.setHeader("Content-Type", "text/css");
        res.writeHead(200);
        res.write(file);
        res.end();
        break;

    default:
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.write(index);
        res.end();

    }
}


const request_handler = function(req, res)
{
    var q = url.parse(req.url, true);
    if(req.method == "POST")
    {
        POST(req, res);

    }else if(req.method == "GET")
    {
        GET(req, res, q);
    }
}



//Create the http server object
const server = http.createServer(request_handler).listen(port, host,()=>
{
    console.log(`Server is running on http://${host}:${port}`);
});