import { v2 as cloudinary} from "cloudinary";
import fs from 'fs';

const uploadonCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        return response
        //file has been succcessfully uploading
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locallt saved temporary file

    }
}
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECREY
})
export {uploadonCloudinary}