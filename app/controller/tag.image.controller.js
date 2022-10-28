const logger = require('../../logger');
const tagImageService = require('../services/tag.image.service');

const uploadImageBlob = async (req,res) => {
    try{
        const fileData = req.files['image'];
        if(fileData['mimetype'].startsWith('image')){
            const data = await(tagImageService.uploadImageBlob(fileData,req.body));
            logger.info('Successfuly saved the image with tag');
            res.status(201).json({'message':'success',data:{
                'id': data.id,
                'image_name': data.image_name,
                'tag_name': data.tag_name
            }});
        }
        else{
            logger.info('The file passed is not an image file but it is ' + fileData['mimetype'].split('/')[1] );
            res.status(200).json({'message':'Only images are accepted and not ' +fileData['mimetype'].split('/')[1]});
        }
        
    }
    catch(error){
        logger.error("Error in uploding and tagging image in controller",error);
        res.status(500).json({
            'message':'internal server error!!'
        });
    } 
}

const uploadImageBucket = async (req,res) => {
    try{
        const fileData = req.files['image'];
        if(fileData['mimetype'].startsWith('image')){
            logger.info('Sstarted upload '+fileData['name']);
            const data = await(tagImageService.uploadImageBucket(fileData,req.body));
            logger.info('Successfuly saved the image with tag');
            res.status(201).json({'message':'success',data:{
                'id': data.id,
                'image_name': data.image_name,
                'tag_name': data.tag_name
            }});
        }
        else{
            logger.info('The file passed is not an image file but it is ' + fileData['mimetype'].split('/')[1] );
            res.status(200).json({'message':'Only images are accepted and not ' +fileData['mimetype'].split('/')[1]});
        }
        
    }
    catch(error){
        logger.error("Error in uploding and tagging image in controller",error);
        res.status(500).json({
            'message':error
        });
    } 
}

module.exports ={
    uploadImageBlob:uploadImageBlob,
    uploadImageBucket:uploadImageBucket
}