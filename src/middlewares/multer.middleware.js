import Multer from "multer"; // read docs


/*
app.post('/profile', upload.single('avatar'), function (req, res, next) {  // upload.single('avatar') - is a midddleware
// profile pe req aayi, humne direct upload krwadi middleware ki tarah then we've called up a method
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })
*/

const storage = Multer.diskStorage({  // using diskstorage; not memorystorage 'cause of memory limitations
    destination: function (req, file, cb) {  // "file", multer k ps hi hota h. "req" k andar json data (coming from body) milta hae 
      cb(null, "./public/temp")  // cb - callback
      // "./public/temp" - we'll keep the files here in this folder
    },   // 07:30:30
    filename: function (req, file, cb) {     
      cb(null, file.originalname)
    }
  })
  
export const upload = Multer({ 
    storage,   // or, storage: storage; - both are same #ES6 concept
})
