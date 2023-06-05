require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
var bodyParser = require('body-parser')
var morgan = require('morgan')



require('./db/conn.js')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'))




// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/eventRouter'))
app.use('/api', require('./routes/activitiesRouter'))

app.get('/',(req,res)=>{
res.send('server is running')
})

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//     })
// }


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log('Server is running on port', port)
})