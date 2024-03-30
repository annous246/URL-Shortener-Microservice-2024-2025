require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const bp=require("body-parser")
// Options for dns.lookup() method
const options = {
 all: true, // Return all resolved addresses
};


// Basic Configuration
const port = process.env.PORT || 3000;
let id=0
app.use(cors());
app.use(bp.urlencoded({extended:true}))
app.use('/public', express.static(`${process.cwd()}/public`));
let mapit={}
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  //make shorted version
  let url=req.body.url
    let fp=url.substr(url.indexOf('/')+2)
    let sp=fp.substr(0,fp.indexOf('/'))
    if(sp==""){
      sp="http/dajzd.com"
    }
  
  dns.lookup(sp,(err,adr)=>{
      console.log(sp)
    if(err){
      //invalid url
      res.json({ error: 'invalid url' })
    }
    else{
      //valid
      id++;
      mapit[id]=url;
      let obj={ original_url :url, short_url : id}
      console.log(obj)
      res.json(obj)
      
    }
  })
});
app.get('/api/shorturl/1',(req,res)=> {
  console.log(req.params)
  console.log("iqzd")
  if(!isNaN(req.params.surl)){
    //valid number
    if(mapit.hasOwnProperty(req.params.surl)){
      //shorted
      res.redirect(mapit[id])
    }
    else{
    res.json({ error: 'invalid url' })}
    
    
  }
  else{
    res.json({ error: 'invalid url' })
  }
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
