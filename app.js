const express = require('express')
const app = express() // Instantiating Express

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
