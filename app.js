const express = require('express')
const app = express() // Instantiating Express
var exphbs = require('express-handlebars');

// Main.handlebars all other templates inherit from
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // Main Template => main.handlebars
app.set('view engine', 'handlebars');

let dreams = [
    {title: "When I was in Cambodia", msg: "It was a cold day"},
    {title: "When I was young", msg: "It was a colder day."}
]

app.get('/dreams', (req, res) => {
    res.render('dreams-index', {dreams});
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
