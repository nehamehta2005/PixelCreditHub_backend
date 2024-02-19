
import forgotPasswordSchema from "../models/forgotPasswordSchema.js";
import User from "../models/userSchema.js"
import bcrypt from  'bcrypt';
import express from 'express';
const resetTokens = {};

export const forgotPassword=(req, res) => {
    const { email } = req.body;
  
    // Find user by email (replace this with a database query)
    const user = User.find((u) => u.email === email);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user) {
      user.password = newPassword;
      user.save();
    } 
      
    }


    export const compareSEcurityAnswer = async (req, res) => {
      try {
        const { email,  securityAnswer, securityQuestion } = req.body;
    
        console.log(req.body);
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.json({ success: false, message: 'User not found.' });
        }
    
        // Check if the provided security answer matches the stored answer
        if (user.securityAnswer === securityAnswer && user.securityQuestion === securityQuestion) {
          
           
           return res.json({ success: true, message: 'Security answer matched.', userId: user._id, userEmail: user.email  });
    
        } else {
          return res.json({ success: false, message: 'Security answer or Question did not match.' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    };

  // export const resetPassword= async (req, res) => {
  //     try {
  //       const { email, newPassword } = req.body;
    
  //       // Update the user's password directly
  //       const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  //       await User.updateOne({ email }, { $set: { password: hashedNewPassword } });
    
  //       return res.json({ success: true, message: 'Password changed successfully.' });
  //     } catch (error) {
  //       console.error('Error:', error);
  //       res.status(500).json({ success: false, message: 'Internal Server Error' });
  //     }
  //   };


  export const resetPassword= async (req, res) => {
    console.log("hello");
    try {
      const { email, newPassword } = req.body;
  
      // Find the user by email (replace with your actual user model)
      const user = await User.findById(req.params.userId);
  console.log(user);
      if (!user) {
        return res.json({ success: false, message: 'User not found.' });
      }
  
      // Update the user's password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      // user.password = hashedNewPassword;
      await  User.findByIdAndUpdate(user, {password:hashedNewPassword});
      return res.json({ success: true, message: 'Password changed successfully.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
