const multer = require('multer'); //LIB PARA UPLOAD DE IMAGE
const path = require('path'); //DO NODE

//OBJETO DE CONFIGURAÇÕES
module.exports = {
    storage: multer.diskStorage({ //COMO O MULTER VAI GERENCIAR AS IMAGENS UPADAS
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //INFORMANDO QUAL A PASTA Q IREI GUARDAR OS ARQ
        filename: (req, file, cb) => { //NOME DO ARQUIVO (file: extensões, cb: callback)
            
            const ext = path.extname(file.originalname); //path.extname(file.originalname) EXTENSÃO DA IMAGEM
            const name = path.basename(file.originalname, ext); //path.basename(file.originalname) RETORNA O NOME DA IMAGEM SEM EXTENSÃO

            //callBack DEVE SER CHAMADA ASSIM QUE O NOME DO ARQUIVO ESTIVER PRONTO
            cb(null, `${name}-${Date.now()}${ext}`) //Date.now(): PARA GARANTIR Q A IMAGE SEJA ÚNICA
        }, 
    }),
};