import contactUsSchema from "../models/contactUsSchema.js";

 export const contactUs = async (req, res, next) => { 
    try {

       const newContactdata=  await contactUsSchema.create(req.body); 

       console.log(newContactdata);
       

         res.status(200).send(newContactdata)

         await contactUsSchema.save();
  

    }
     catch(err){
        next(err)
     }
}

 