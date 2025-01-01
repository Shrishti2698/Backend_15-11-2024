import {v2 as cloudinary} from  "Cloudinary"
import fs from "fs" // file system (we get it from nodejs: in documentation)
// used for making file read, write, remove etc - for management of file (go to the docs)


//    // Configuration
//    cloudinary.config({ 
//     cloud_name: 'dqm2kiusd', 
//     api_key: '422347465498975', 
//     api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
// });


// Configuration - will give permission to upload files: otherwise it won't know which account is login, what is username etc
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
  });


// we'll be creating a method, inside which we'll give local file's path(as a parameter), then I'll upload it - if successfully uploaded, then file will be unlinked/deleted.

  const uploadOnCloudinary = async (localFilePath) => {   // takestime, that's y async await
    try {  // using try-catch 'coz of complexity in file uploading
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {  // read doc for "uploader"
            resource_type: "auto"  // resource type of the file
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);  // we'll get public url after file has been uploaded
        fs.unlinkSync(localFilePath) // unlinking/deleting file after (last step ofthe video)
        return response;  // we're sending response; user will get the data they want from "response" (eg: response.data)

    } catch (error) {  // we're using cloudinary that means file is in the server, we have got the local path file, and if it is not uploaded then there is problem. So for a safe cleaning purpose we should remove the file from the server (otherwise millesious/curupted files would still remain in the server)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        // unlinkSync means unlink it in a synchrounous way
        return null;
    }
}



export {uploadOnCloudinary}