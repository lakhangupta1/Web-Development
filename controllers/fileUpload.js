
const File  = require("../models/File");
const cloudinary  = require("cloudinary").v2;

//local file Upload -> handler Function 

exports.localfileUpload = async(req, res) =>{
    try{

        //fetch file 
        console.log("1");
        const file  = req.files.file;
        console.log("2");
        console.log("File is here -> ",file);
        let path  = __dirname+"/files/"+Date.now() + `.${file.name.split('.')[1]}` ;


       console.log("path-> " , path);

        file.mv(path , (err)=>{
            console.log(err);
        });

        res.json({
            success : true ,
            message : " Local File Uploaded Successfully ! ",
        });

    }catch(err){
         
        console.log("Not able to upload the file on server ! /  ");

        console.log(err);
        
    }

}


function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file , folder){
    const options =  {folder};
    options.resource_type = "auto" ;
   return  await cloudinary.uploader.upload(file.tempFilePath , options );
}


//image upload handler 
exports.imageUpload  = async (req, res)=>{
    try{
        //data fetch 
        const { name , tags , email } = req.body ;
        console.log(name , email , tags );

        const file = req.files.imageFile;
        console.log(file);
    

        //validation 
        const supportedTypes = ["jpg" , "jpeg" , "png" , "pdf"] ; 
        const fileType = file.name.split('.')[1].toLowerCase();
         
        console.log(fileType);



        console.log("File Support check")
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).jason({
                success:false,
                message:"file formate not supported "
            })

        }
        console.log("File Support check suceess");


        //file formate supported here 
       
        console.log("1");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);
        console.log("2");


        //db me entry create 
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl : response.secure_url , 
        })


        res.json({
            success:true,
            imageUrl : response.secure_url,
            message:"image uploaded successfullly ! "
        })


        

    }catch(err){
        console.error(err);

        console.log(err);
        res.json({
            succes:false,
            message:"something went wrongs ! "
        })


    }
}


//videos uploaded here 

exports.videoUpload  = async (req,res)=>{
    try{
        const {name , tags , email } = req.body;

        console.log(name , tags , email );
    
        const file = req.files.videoFile;
        console.log(file);


        const supportedTypes = ["mp4" , "mov"] ; 
        const fileType = file.name.split('.')[1].toLowerCase();
         
        console.log(fileType);


       //  TODO :add upper limit of 5MB for videos 

        console.log("video File Support check")
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).jason({
                success:false,
                message:"file formate not supported "
            })

        }
        console.log("File Support check suceess");

         console.log("response")
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);
        console.log("response success");


         //db me entry create 
         const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl : response.secure_url , 
        })


        res.json({
            success:true,
            imageUrl : response.secure_url,
            message:"Video uploaded successfullly ! "
        })



    }catch(error){
        console.log(error);

        res.status(400).json({
            success:false,
            message:"Something went wrongs in videos catch "
        })
    }
}