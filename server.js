const express = require('express')
const path = require('path');
const app = express()
// app.set('port', (process.env.PORT || 3000));
const port = process.env.PORT || 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/", function(req, res){
    res.render(__dirname + "/dist/index.html");
})

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))



// app.use(express.static(__dirname + '/public'));
// app.set('views', __dirname + '/public/views');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());



// app.get('*', function(req, res){
//     res.render('index.html');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));