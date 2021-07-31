const ex = require("express");
const https = require("https");
const app = ex();

app.use(ex.urlencoded({extended:true}));
app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html");
    
    
});


app.post("/weatherporcast", function(req,res){
    
    const loc = req.body.CityName;
    const appid = "eaa9bbc673eda43cf2c9d99bed986c54";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ loc +"&appid=" + appid + "&units=" + unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const x = JSON.parse(data);
            const temp = x.main.temp;
            const description = x.weather[0].description;
            const icon = x.weather[0].icon;
            const imageUrl = " http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            console.log("temperature = "+ temp);
            console.log(description);
            res.write("<p>The weather is currently " + description+ "<p>");
            
            res.write("<h1>The temperature in "+ loc +" is "+ temp+" degrees Celcius</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
            
        });
        
    });

});






app.listen(3000,function(){
    console.log("Server is starting at port 3000");
});
