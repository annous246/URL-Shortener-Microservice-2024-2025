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

// Calling dns.lookup() for a hostname and displaying the results in the console
dns.lookup('example.com', options, (err, addresses) => {
 if (err) {
    console.error('Error:', err);
 } else {
    console.log('addresses:', addresses);
 }
});

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bp.json({extended:true}))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  //make shorted version
  console.log(req.body)
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
