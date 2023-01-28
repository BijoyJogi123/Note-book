const connectToMongo  = require('./db')
var cors = require('cors')
const express = require('express')
connectToMongo();
const app = express()
const port = 5000

//middleware
app.use(express.json());
app.use(cors())
app.use(express.json())


//AVilable routes
app.use('/app/auth',require('./routes/auth'));
app.use('/app/notes',require('./routes/notes'));








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
