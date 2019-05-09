const express = require('express');
const app = express();

app.use(express.static('.'));

app.use(express.static(__dirname + '.'));

var server = app.listen(8080, () => {
   console.log('Server Running...');
   
});