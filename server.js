// used npm init -y which creates json  and makes folder as node.js project 
//used pm i express for server (pkg-lock json)
//npm i multer ....to send file to server
const express = require('express')
const path = require('path')
const multer  = require('multer')
const{ mergePdfs } = require('./merge')       //destucturing it
const upload = multer({ dest: 'uploads/' })
const app = express()
app.use('/static', express.static('public'))      //from express js ....static
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'templates/index.html'))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
  console.log(req.files)
  let d= await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf`)
  // res.send({data:req.files})
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
