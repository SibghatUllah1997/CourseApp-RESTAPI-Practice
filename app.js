const express = require('express');
const app = express();
function dowork(Duration){

    const start = Date.now();

    while(Date.now() - start < Duration){
    }
}
app.get('/' , (req, res ) =>

{ 
    dowork(5000);

    res.send("hi there")
});

app.listen(3000);