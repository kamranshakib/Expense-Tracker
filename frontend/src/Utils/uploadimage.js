import { API_PATHS } from "./apiPaths";
import axiosinstance from "./axiosInstance";

const uploadImage= async (imageFile) => {
    const formData = new formData();
    // Append Image file to form data
    formData.append('image', imageFile);

        try{
            const response= await axiosinstance.post (API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',    //set header for file upload
                },
            });


            return  response.data; //Returmn response data
        }catch(error){
            console.error('Error uploading the image:', error)
            throw error;   //Rethrow error for handlig 
        } 
    };

    export default uploadImage;