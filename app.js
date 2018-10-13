const express = require('express')
const app = express() // Instantiating Express
var exphbs = require('express-handlebars');

// Main.handlebars all other templates inherit from
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // Main Template => main.handlebars
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
