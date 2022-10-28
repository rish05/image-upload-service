const { Storage } = require('@google-cloud/storage');
const util = require('util');
const path = require('path');
const crypto = require('crypto');
const logger = require("../../logger");
const serviceKey = path.join(__dirname, '../../experimental-330205-207077d91771.json');
const { format } = util
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'experimental-330205',
  })

const bucket = storage.bucket('sci_expriment') 

const uploadImage = (file) => new Promise((resolve, reject) => {
    const timestamp= new Date().getTime();
    const hash=crypto.randomBytes(20).toString('hex');
    const blob = bucket.file(hash+".jpg");
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file['mimetype'],
      metadata: {
        contentType: file['mimetype']
      }
    });
    blobStream.on('finish', () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      logger.info("Successfuly uploaded image to bucket "+file['name']);
      resolve(publicUrl)
    })
    .on('error', (error) => {
      logger.error(`Unable to upload image, something went wrong`,error);
      reject(error)
    })
    .end(file['data'])
  })

module.exports = {
    uploadImage:uploadImage 
}