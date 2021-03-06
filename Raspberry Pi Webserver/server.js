

var http = require('http');
var url = require('url');
var fs = require('fs');

//var host = '192.168.0.84';
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

            var bool = false;

            var keys = Object.keys(data);
            var word = keys[0];

            if(word in json)
            {
                console.log("exists in json");
                console.log(JSON.stringify(data[word]["version"]));
                console.log(JSON.stringify(json[word]["version"]));
                if(data[word]["version"] != json[word]["version"])
                {
                    console.log("not same version");
                    delete json[word];
                    json[word] = data[word];
                    console.log("version change " + json);
                    bool = true;

                }
                
            }else
            {
                json[word] = data[word];
                bool = true;
            }


            

            console.log(json);
            //console.log(data);
            //console.log(keys[0]);
            console.log(bool);
            if(bool)
            {
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
            }    
            res.statusCode = 200;
            res.end("POST Successful");
        }



    } catch (error) 
    {
        console.log("error: " + error.message);
        res.statusCode = 400;
        res.writeHead(400);
        res.end("error: " + error.message);
    }

}


function change_device_info(req, res)
{
    //storage container for message
    var message = "";

    //get the message
    req.on('data', function(data)
    {   
        message += data;
    });

    //Parse the data
    req.on('end', function()
    {
        console.log(message);
        
        //read json file
        fs.readFile("device_register.json", function(err, data)
        {
            //find element in file
            
            var error = false;

            if(err)
            {
                res.end(err);
                return;
            }
            
            //Read incoming JSON
            var message_json;
            try
            {
                message_json = JSON.parse(message);
            }catch
            {
                res.end("Error: bad input JSON");
                error = true;
            }

            //Read File Json
            var data_json;
            try
            {
                data_json = JSON.parse(data);
            }catch
            {
                res.end("Error: bad JSON");
                error = true;
            }
            console.log(message_json);
            console.log(message_json);
            console.log(data_json);
            if(error)
            {
                return;
            }
            message_keys = Object.keys(message_json);
            console.log(message_keys);

            data_keys = Object.keys(data_json);
            console.log(data_keys);

            //find device

            //check if valid and if new values != old value


        });      
        
        console.log("outside callback");


    });

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


function PUT(req, res)
{
    //check if url is valid
    switch(req.url)
    {
        case "/devices":
            //check stuff
            console.log("/devices");
            change_device_info(req, res);
            break;



        default:
            res.write("Error: Invalid PUT request");
            res.end();
            break;

    }
}



const request_handler = function(req, res)
{
    var q = url.parse(req.url, true);
    switch(req.method)
    {
        case "POST":

            POST(req, res);
            break;

        case "GET":

            GET(req, res, q);
            break;
        case "PUT":

            PUT(req, res);
            break;

    }
}



//Create the http server object
const server = http.createServer(request_handler).listen(port,()=>
{
    console.log(`Server is running on:${port}`);
});