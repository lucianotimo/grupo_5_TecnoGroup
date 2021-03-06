const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { get } = require('express/lib/response');


const controllersAdmin = require(path.resolve(__dirname,'../controllers/controllersAdmin'));

//Como podemos indicar para subir el archivo nombre y donde guardarlo

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/img'));
    },
    filename: function (req, file, cb) {
      cb(null, 'products-'+Date.now()+path.extname(file.originalname))
    }
  })

  const upload = multer({ storage })

  router.get('/administrar',controllersAdmin.index);
  router.get('/administrar/create',controllersAdmin.create); 
  router.post('/administrar/create', upload.single('image') ,controllersAdmin.save); 
  router.get('/administrar/detail/:id', controllersAdmin.show);
  router.get('/administrar/edit/:id', controllersAdmin.edit);
  router.put('/administrar/edit/:id',upload.single('image') , controllersAdmin.update);
  router.get('/administrar/delete/:id', controllersAdmin.destroy);


module.exports = router;