"use server"

import { nanoid } from "nanoid";
import { User } from "./models";
import { connectToDB } from "./utils";
import { sendEmail } from "./sendEmail";
import bcrypt from "bcrypt";


// export async function forgetPassword(formData){

//   const {email} = Object.fromEntries(formData);


//     await connectToDB();
//     const user = await User.findOne({email:email})
//     if(user){
//         const resetToken = nanoid(34)
//         // Update user object with resetToken
//       user.resetPasswordToken = resetToken;
//       user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // Set expiration time
//         // console.log("Token:", token);
//          await user.save({ validateBeforeSave: false });

//         const resetPasswordUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;
//         const message = `<body style="font-family: Arial, sans-serif; color: #333333;">
//     <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
//       <div style="text-align: center; margin-bottom: 20px;">
//         <img src="https://makeahomefoundation.org/global_graphics/logo.png" alt="Logo" style="max-width: 150px; display: block; margin: 0 auto;">
//        <h2 style="margin-top: 10px; text-align: center; font-size: 24px; color: #1E3A8A; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">Assistance Management System</h2>
//       </div>
//       <div style="margin-bottom: 20px;">
//         <p>Your password reset token is:</p>
//         <p style="font-weight: bold;">${resetPasswordUrl}</p>
//       </div>
//       <div style="margin-bottom: 30px;">
//         <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; background-color: #1E3A8A; color: #ffffff; text-decoration: none; border-radius: 3px;">Reset Password</a>
//       </div>
//       <div style="font-size: 12px; color: #999999;">
//         <p>If you have not requested this email, please ignore it.</p>
//       </div>
//     </div>
//   </body>`;
//   try {
//     await sendEmail({
//       email: user.email,
//       subject: `System Password Recovery`,
//       message,
//     });
//     console.log("Email sent!");
//     return { success:"Password reset email has been sent!" }
// } catch (err) {
//     // user.resetPasswordToken = undefined;
//     // user.resetPasswordExpire = undefined;
//     }
// }
//     else{
//         console.log("user does not exists");
//         return {
//           err: "This user does not exist!",
//         };

//     }
// }



export async function forgetPassword({email}) {
  try {
    // const { email } = Object.fromEntries(formData);

    // Connect to the database
    await connectToDB();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If user does not exist, return an error
      return { err: "This user does not exist!" };
    }

    // Generate a reset token and set expiration time
    const resetToken = nanoid(34);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes expiration

    // Save the updated user object
    await user.save({ validateBeforeSave: false });

    // Construct the reset password URL
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;

    // Construct the email message
    const message = `<body style="font-family: Arial, sans-serif; color: #333333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://makeahomefoundation.org/global_graphics/logo.png" alt="Logo" style="max-width: 150px; display: block; margin: 0 auto;">
          <h2 style="margin-top: 10px; text-align: center; font-size: 24px; color: #1E3A8A; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">Assistance Management System</h2>
        </div>
        <div style="margin-bottom: 20px;">
          <p>Your password reset token is:</p>
          <p style="font-weight: bold;">${resetPasswordUrl}</p>
        </div>
        <div style="margin-bottom: 30px;">
          <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; background-color: #1E3A8A; color: #ffffff; text-decoration: none; border-radius: 3px;">Reset Password</a>
        </div>
        <div style="font-size: 12px; color: #999999;">
          <p>If you have not requested this email, please ignore it.</p>
        </div>
      </div>
    </body>`;

    // Send the email
    await sendEmail({
      email: user.email,
      subject: `System Password Recovery`,
      message,
    });

    return { success: "Password reset email has been sent!" };
  } catch (err) {
    console.error("Error occurred while processing forgetPassword:", err);
    return { err: "An error occurred while processing your request." };
  }
}





//Reset Password
// export async function resetPassword({newPassword, confirmNewPassword, resetToken}){
 
//   connectToDB();
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);

//   const user = await User.findOne({
//     resetPasswordToken:resetToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });
//   if (!user) {
//     console.log("Reset Password Token is invalid or has been expired")
//   }
//   if (newPassword !== confirmNewPassword) {
//     console.log("Password does not match the confirm password");
//   }

  

//   user.password = hashedPassword;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;
//   await user.save();
//   console.log("Password Successfully Reset!")
// }



export async function resetPassword({ newPassword, confirmNewPassword, resetToken }) {
  try {
    // Connect to the database
    await connectToDB();

    // Check if the passwords match
    if (newPassword !== confirmNewPassword) {
      throw new Error("Passwords do not match");
    }

    // Find the user with the provided reset token
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    // Check if user exists
    if (!user) {
      throw new Error("Reset password token is invalid or has expired");
    }

    // Generate a salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

  } catch (error) {
    console.error("Error resetting password:", error.message);
  }
}