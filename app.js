const express = require('express');
const path = require('path')
const app = express();
// const { PDFDocument } = require('pdf-lib');
const multer = require('multer');
const {mergePdfs} = require('./merge');
// const fs = require('fs').promises;
const upload = multer({ dest:'uploads/' });
app.use('/static',express.static('saved'))

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , "public/index.html"));
// res.send("Hello Ravi and vishal Good Evening")
});

app.post('/merge', upload.array('pdfs',2),async(req, res,next) => {
    console.log(req.file)
    let d = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
//   res.sendFile(path.join(__dirname , '/public/index.html'));
// res.send("Hello Ravi and vishal Good Evening")
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
