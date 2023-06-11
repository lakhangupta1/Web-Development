
const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        UseNewUrlParser:true,
        useUnifiedTopology :true
    })
    .then(()=>{console.log("Db Connection Successfully !")})
    .catch((err)=>{
        console.log("not Connected Here ! ?");
        // console.log(err);
        process.exit(1);

    });
};