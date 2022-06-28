const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/raghav.html");
});
app.post("/",function(req,res){
const name = req.body.name;
const mail = req.body.email;
const phone = req.body.phone;
const address = req.body.address;
const subject = req.body.subject;
const messege = req.body.messege;
const data ={
    members: [
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: name,
                }

        }
    ]
};
const jsonData = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/c5573e7e14";
const option={
    method:"POST",
    auth :"its_rm:8c859a421626f5c8cfdec240acc04ca2-us5"
}
const request = https.request(url,option,function(response){
    if(response.statusCode===200){
prompt("Thanks for your messege");
}else{
         prompt("uh Oh!,your responsse is not submitted please try again");
       
    }
    response.on("data",function(data){
       console.log(JSON.parse(data));

    })
})

request.write(jsonData);
request.end();
});
// app.post("/failure",function(req,res){
//     res.redirect("/");
// })
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running in 3000 port");
})
// apikey
// 8c859a421626f5c8cfdec240acc04ca2-us5
// Lxit ID
// c5573e7e14