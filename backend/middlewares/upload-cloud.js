const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  try {
    cloudinary.uploader.upload_stream(
      { folder: 'products' },
      (error, result) => {
        if (error) {
          console.error('Erro no upload para o Cloudinary:', error);
          return res.status(500).json({ error: 'Erro ao fazer upload para o Cloudinary.' });
        }
        req.cloudinaryUrl = result.secure_url;
        next();
      }
    ).end(req.file.buffer);
  } catch (error) {
    console.error('Erro no upload para o Cloudinary:', error);
    return res.status(500).json({ error: 'Erro ao fazer upload para o Cloudinary.' });
  }
};


module.exports = uploadToCloudinary;
