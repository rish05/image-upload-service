const db = require("../../configs/postgres.conf");
const logger = require("../../logger");
const imageTagBlob = db.image_tag_blob;
const imageTagBucket = db.image_tag_bucket
const Op = db.Sequelize.Op;
const storageUtil = require('../utils/gcpStorage');

const uploadImageBlob = async (imageData,data) => {
    try{
        const tagImage = await imageTagBlob.create({
            tag_name: data.tag_name,
            image_type:imageData.mimetype,
            image_name:imageData.name,
            image_data:imageData.data,
            created_at: new Date()
        });
        return tagImage;
    }
    catch(error){
        logger.error("Error in saving image and tag data",error);
        throw error;
    }
}


const uploadImageBucket = async (imageData,data) => {
    try{
        const imageUrl = await storageUtil.uploadImage(imageData);
        const tagImage = await imageTagBucket.create({
            tag_name: data.tag_name,
            image_type:imageData.mimetype,
            image_name:imageData.name,
            image_url:imageUrl,
            created_at: new Date()
        });
        return tagImage;
    }
    catch(error){
        logger.error("Error in saving image and tag data",error);
        throw error;
    }
}

module.exports = {
    uploadImageBlob:uploadImageBlob,
    uploadImageBucket:uploadImageBucket
}