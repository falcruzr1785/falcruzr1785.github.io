const express = require('express');
const { dirname } = require('path');
const mongoose = require('mongoose');



const app = express();

require('dotenv').config();

const puerto = process.env.PORT || 3001;
//motor de plantilla
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');//ruta donde estan ubicadas las platillas


const uri= `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.xkyfv4a.mongodb.net/${process.env.NOMBREBD}?retryWrites=true&w=majority
`;

mongoose.connect(uri,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then( ()=> console.log(`base de datos conectada `) )
        
    .catch (error => console.log(error)
    ); 




app.use(express.static(__dirname + "/public"));

app.use('/',require('./router/rutaWeb'));

app.use('/tabla',require('./router/rutaTabla'));

app.listen(puerto,()=>{
    console.log(`estoy escuchando en el puerto ${puerto}`);
});