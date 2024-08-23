"use server";
import { revalidatePath } from "next/cache";
import { User, Portfolio, Message, Tutor, Enquiry, Product, Category } from "./models";
import { connectToDB } from "./utils";
import bcrypt from "bcrypt";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
// import { signIn } from "../auth";
const fs = require('fs').promises;
const { join } = require('path');


// <-- User Actions Start-->

export const addUser = async (formData) => {
  const { username, name, email, phone, address, isAdmin, password,avatar } =
    Object.fromEntries(formData);

  // await new Promise(resolve => setTimeout(resolve, 1000))
  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    if (avatar && avatar.name !== "undefined") {
      const img = await processAvatar(avatar);
      newUser = new User({
        username,
        name,
        email,
        phone,
        address,
        isAdmin,
        password: hashedPassword,
        img,
      });
    } else {
      newUser = new User({
        username,
        name,
        email,
        phone,
        address,
        isAdmin,
        password: hashedPassword,
      });
    }

    await newUser.save();

  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return {
        err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
      };
    }
    return {
      err: "There was a problem creating this user!",
    };
  }

  revalidatePath("/dashboard/users");
  return { success:"Bingo! User successfully created!" }
};



export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDB();
      // Fetch the user before deleting
    const user = await User.findById(id);

      // Delete the associated image file if it exists
    if (user.img) {
      const imagePath = `./public${user.img}`;
      await fs.unlink(imagePath);
    }

      await User.findByIdAndDelete(id);
    } catch (err) {
    return {
        err: "There was a problem deleting this user!",
      };
    }
  
    revalidatePath("/dashboard/users");
  };
  

  export const updateUser = async (formData) => {
    const { id, username, name, email, phone, address, password , avatar, isAdmin } =
      Object.fromEntries(formData);
  await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {

      connectToDB();
      const updateFields = {
        username,
        name,
        email,
        phone,
        address,
        isAdmin
      };

 // Check if password exists before hashing
 if (password && password.trim() !== '') {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  updateFields.password = hashedPassword;
}

  // Check if avatar is defined and avatar name is not undefined before updating img
  if (avatar && avatar.name !== "undefined") {
    updateFields.img = await processAvatar(avatar);
  }

  Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );
        
      await User.findByIdAndUpdate(id, updateFields);
 
      
    } catch (err) {
      if (err.code === 11000) {
        const duplicateField = Object.keys(err.keyValue)[0];
        return {
          err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
        };
      }
      return {
        err: "There was a problem updating this user!",
      };
    }

    revalidatePath("/dashboard/users");
    return { success:"Bingo! User updated successfully!" }
    // redirect("/dashboard/users");

  };




  export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  

    try {
      await signIn("credentials", { username, password });
    } catch (err) {
      console.error("Error during sign-in:", err.message);

    if (err.type === "CredentialsSignin") {
      return "Invalid Username or Password!";
    } 
      throw err;
    }
  };


  //Avatar Image Upload Functionality
  async function processAvatar(avatar) {
    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    const generateUniqueFilename = (originalFilename) => {
      const timestamp = Date.now();
      const filenameParts = originalFilename.split('.');
      const extension = filenameParts.pop();
      const filename = filenameParts.join('.');
      return `${filename}_${timestamp}.${extension}`;
    };
  
    // With the file data in the buffer, you can do whatever you want with it.
    // For this example, we'll just write it to the filesystem in a new location
    const imgPath = join('/uploads', generateUniqueFilename(avatar.name));
    const filePath = join('./public', imgPath);
    await fs.writeFile(filePath, buffer);
    
    return imgPath;
  }


  // <-- User Actions End -->

  // <-- Portfolio Actions Start -->

  export const addPortfolio = async (formData,data) => {

    const { projectName, projectUrl, category, otherCategory, description, technologiesUsed,clientName } =  data;

    const { thumbnailImg, files,  } =  Object.fromEntries(formData);
  
  
    await new Promise(resolve => setTimeout(resolve, 1000))
    try {
      connectToDB();
  
  
      let newPortfolio;
      if (thumbnailImg && thumbnailImg.name !== "undefined" && files && files.name !== "undefined") {
        const thumbnail = await processThumbnail(thumbnailImg);
        const imageUrls = await processImages(formData);

        newPortfolio = new Portfolio({
          projectName,
          projectUrl,
          category: category === "Other" ? otherCategory : category,
          description,
          technologiesUsed,
          clientName,
          thumbnail,
          imageUrls
        });
      } 
       else if (thumbnailImg && thumbnailImg.name !== "undefined") {
        const thumbnail = await processThumbnail(thumbnailImg);
        newPortfolio = new Portfolio({
          projectName,
          projectUrl,
          category: category === "Other" ? otherCategory : category,
          description,
          technologiesUsed,
          clientName,
          thumbnail,
        });
      } else {
        newPortfolio = new Portfolio({
          projectName,
          projectUrl,
          category: category === "Other" ? otherCategory : category,
          description,
          technologiesUsed,
          clientName,
        });
      }
  
      await newPortfolio.save();
  
    } catch (err) {
      if (err.code === 11000) {
        const duplicateField = Object.keys(err.keyValue)[0];
        return {
          err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
        };
      }
      throw new Error(err)
      return {
        err: "There was a problem creating this project portfolio!",
      };
    }
  
    revalidatePath("/dashboard/portfolio");
    return { success:"Bingo! Project portfolio successfully created!" }
  };



  export const updatePortfolio = async (formData,data) => {
    const { id,projectName, projectUrl, category, otherCategory, description, technologiesUsed,clientName } =  data;
    
    const { thumbnailImg, files,  } =  Object.fromEntries(formData);
  await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {

      connectToDB();
      const updateFields = {
        projectName,
        projectUrl,
        category: category === "Other" ? otherCategory : category,
        description,
        technologiesUsed,
        clientName,
      };


  // Check if avatar is defined and avatar name is not undefined before updating img
  if (thumbnailImg && thumbnailImg.name !== "undefined") {
    updateFields.thumbnail = await processThumbnail(thumbnailImg);
  }

  if (files && files.name !== "undefined") {
    updateFields.imageUrls = await processImages(formData);
  }

  Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );
        
      await Portfolio.findByIdAndUpdate(id, updateFields);
 
      
    } catch (err) {
      if (err.code === 11000) {
        const duplicateField = Object.keys(err.keyValue)[0];
        return {
          err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
        };
      }
      return {
        err: "There was a problem updating this project portfolio!",
      };
    }

    revalidatePath("/dashboard/portfolio");
    return { success:"Bingo! Project portfolio updated successfully!" }
    // redirect("/dashboard/users");

  };




  export const deletePortfolio = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDB();
      // Fetch the user before deleting
    const portfolio = await Portfolio.findById(id);

      // Delete the associated image file if it exists
    if (portfolio.thumbnail) {
      const thumbnailPath = `./public${portfolio.thumbnail}`;
      await fs.unlink(thumbnailPath);
    }

      await Portfolio.findByIdAndDelete(id);
    } catch (err) {
    return {
        err: "There was a problem deleting this portfolio!",
      };
    }
  
    revalidatePath("/dashboard/portfolio");
  };




// <-- Products Actions Start -->

export const addProduct = async (formData,data) => {

  const { name, price, category, otherCategory, description, stock, weight } =  data;

  const { thumbnailImg, files,  } =  Object.fromEntries(formData);


  // await new Promise(resolve => setTimeout(resolve, 1000))
  try {
    connectToDB();


    let newProduct;
    if (thumbnailImg && thumbnailImg.name !== "undefined" && files && files.name !== "undefined") {
      const thumbnail = await processThumbnail(thumbnailImg);
      const images = await processImages(formData);

      newProduct = new Product({
        name,
        price,
        category: category === "Other" ? otherCategory : category,
        description,
        stock,
        weight,
        thumbnail,
        images
      });
    } 
     else if (thumbnailImg && thumbnailImg.name !== "undefined") {
      const thumbnail = await processThumbnail(thumbnailImg);
      newProduct = new Product({
        name,
        price,
        category: category === "Other" ? otherCategory : category,
        description,
        stock,
        weight,
        thumbnail,
      });
    } else {
      newProduct = new Product({
        name,
        price,
        category: category === "Other" ? otherCategory : category,
        description,
        stock,
        weight
      });
    }

    await newProduct.save();

  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return {
        err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
      };
    }
    throw new Error(err)
    return {
      err: "There was a problem creating this product!",
    };
  }

  revalidatePath("/dashboard/product");
  return { success:"Bingo! Product successfully created!" }
};



export const updateProduct = async (formData,data) => {
  const { id,name, price, category, otherCategory, description, stock, } =  data;
  
  const { thumbnailImg, files,  } =  Object.fromEntries(formData);
  
await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {

    connectToDB();
    const updateFields = {
      name,
      price,
      category: category === "Other" ? otherCategory : category,
      description,
      stock,
      weight
    };


// Check if avatar is defined and avatar name is not undefined before updating img
if (thumbnailImg && thumbnailImg.name !== "undefined") {
  updateFields.thumbnail = await processThumbnail(thumbnailImg);
}

if (files && files.name !== "undefined") {
  updateFields.images = await processImages(formData);
}

Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
      
    await Product.findByIdAndUpdate(id, updateFields);

    
  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return {
        err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
      };
    }
    return {
      err: "There was a problem updating this product!",
    };
  }

  revalidatePath("/dashboard/product");
  return { success:"Bingo! Product updated successfully!" }
  // redirect("/dashboard/users");

};




export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    // Fetch the user before deleting
  const product = await Product.findById(id);

    // Delete the associated image file if it exists
  if (product.thumbnail) {
    const thumbnailPath = `./public${product.thumbnail}`;
    await fs.unlink(thumbnailPath);
  }

    await Product.findByIdAndDelete(id);
  } catch (err) {
  return {
      err: "There was a problem deleting this product!",
    };
  }

  revalidatePath("/dashboard/product");
};





    //Thumbnail Image Upload Functionality
    async function processThumbnail(thumbnailImg) {
      const bytes = await thumbnailImg.arrayBuffer();
      const buffer = Buffer.from(bytes);
    
      const generateUniqueFilename = (originalFilename) => {
        const timestamp = Date.now();
        const filenameParts = originalFilename.split('.');
        const extension = filenameParts.pop();
        const filename = filenameParts.join('.');
        return `${filename}_${timestamp}.${extension}`;
      };
    
      // With the file data in the buffer, you can do whatever you want with it.
      // For this example, we'll just write it to the filesystem in a new location
      const imgPath = join('/uploads/thumbnails', generateUniqueFilename(thumbnailImg.name)).replace(/\\/g, '/');
      const filePath = join('./public', imgPath);
      await fs.writeFile(filePath, buffer);
      
      return imgPath;
    }


    //Project Images Upload Functionality
    async function processImages(formData) {
      const processedImages = [];
    
      // Loop over the entries in the FormData object
      for (const entry of formData.entries()) {
        const [name, value] = entry;
    
        // Check if the entry corresponds to a file field under the key 'files'
        if (name === 'files') {
          // Check if the value is a single file or an array of files
          if (Array.isArray(value)) {
            // If it's an array, loop over each file
            for (const file of value) {
              await processImageFile(file, processedImages);
            }
          } else {
            // If it's a single file, process it directly
            await processImageFile(value, processedImages);
          }
        }
      }
      return processedImages;
    }
    
    async function processImageFile(file, processedImages) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
    
      const generateUniqueFilename = (originalFilename) => {
        const timestamp = Date.now();
        const filenameParts = originalFilename.split('.');
        const extension = filenameParts.pop();
        const filename = filenameParts.join('.');
        return `${filename}_${timestamp}.${extension}`;
      };
    
      const imgPath = join('/uploads/images', generateUniqueFilename(file.name));
      const filePath = join('./public', imgPath);
      await fs.writeFile(filePath, buffer);
      
      processedImages.push(imgPath);
    }
    
// <-- Portfolio Actions End-->


// <-- Message Actions Start-->



    export const sendMessage = async (formData) => {
      const {  name, email, contactNo, message, subject } =
        Object.fromEntries(formData);
    
      await new Promise(resolve => setTimeout(resolve, 1000))
      try {
        connectToDB();
    
    
        let  newMessage = new Message({
            name,
            email,
            contactNo,
            message,
            subject,
          });
    
        await newMessage.save();
    
      } catch (err) {
        if (err.code === 11000) {
          const duplicateField = Object.keys(err.keyValue)[0];
          return {
            err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
          };
        }
        throw new Error(err);
        return {
          err: "There was a problem sending this message!",
        };
      }
    
      revalidatePath("/dashboard/messages");
      return { success:"Bingo! Your message was sent successfully!" }
    };




  export const deleteMessage = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDB();
      // Fetch the user before deleting
    const message = await Message.findById(id);

      await Message.findByIdAndDelete(id);
    } catch (err) {
    return {
        err: "There was a problem deleting this portfolio!",
      };
    }
  
    revalidatePath("/dashboard/messages");
  };



    export const updateOpened = async (id,data) => {
      // const { id,projectName, projectUrl, category, otherCategory, description, technologiesUsed,clientName } =  data;
      
      
      try {
  
        connectToDB();
        // Construct the update object
        const update = { isOpened: data.isOpened };

        // Update the message by ID with the new isOpened value
        await Message.findByIdAndUpdate(id, update);
      revalidatePath("/dashboard/messages");
          
      } catch (err) {
        return {
          err: "There was a problem updating the read receipt!",
        };
      }
  
      revalidatePath("/dashboard/messages");
      return { success:"Bingo! Message updated successfully!" }
      // redirect("/dashboard/users");
  
    };


    export const markImportant = async (id,data) => {
      // const { id,projectName, projectUrl, category, otherCategory, description, technologiesUsed,clientName } =  data;
      
      
      try {
  
        connectToDB();
        // Construct the update object
        const update = { isImportant: data.isImportant };

        // Update the message by ID with the new isOpened value
        await Message.findByIdAndUpdate(id, update);
      revalidatePath("/dashboard/messages");
          
      } catch (err) {
        return {
          err: "There was a problem marking this Important!",
        };
      }
  
      revalidatePath("/dashboard/messages");
      return { success:"Bingo! Message updated successfully!" }
      // redirect("/dashboard/users");
  
    };
  

// <-- Message Actions End-->




// <-- Tutor Actions Start -->

export const addTutor = async (formData,data) => {

  const { name, username, email, contactNo, dob, password, address, state, city, pincode, tutorType, fromClass, toClass, yearsOfExperience, boards, qualification, subjects, termsAndConditions } =  data;

  const { profilePic } =  Object.fromEntries(formData);


  await new Promise(resolve => setTimeout(resolve, 1000))
  try {
    connectToDB();


    let newTutor;
    if (profilePic && profilePic.name !== "undefined") {
      const img = await processProfilePic(profilePic);
      const imageUrls = await processImages(formData);

      newTutor = new Tutor({
        name,
        username,
        email,
        contactNo,
        dob,
        password,
        address,
        state,
        city,
        pincode,
        tutorType,
        fromClass,
        toClass,
        yearsOfExperience,
        boards,
        qualification,
        subjects,
        termsAndConditions,
        img
      });
    }  else {
      newTutor = new Tutor({
        name,
        username,
        email,
        contactNo,
        dob,
        password,
        address,
        state,
        city,
        pincode,
        tutorType,
        fromClass,
        toClass,
        yearsOfExperience,
        boards,
        qualification,
        subjects,
        termsAndConditions,
      });
    }

    await newTutor.save();

  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return {
        err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
      };
    }
    throw new Error(err)
    return {
      err: "There was a problem registering this tutor!",
    };
  }

  // revalidatePath("/dashboard/portfolio");
  return { success:"Bingo! Tutor successfully registered!" }
};



export const updateTutor = async (formData, data) => {

  const { name, username, email, contactNo, dob, password, address, state, city, pincode, tutorType, fromClass, toClass, yearsOfExperience, boards, qualification, subjects, termsAndConditions } =  data;



  const {id,profilePic} =
    Object.fromEntries(formData);
await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {

    connectToDB();

    let updateFields;
    if (profilePic && profilePic.name !== "undefined") {
      const img = await processProfilePic(profilePic);

      updateFields = {
        name,
        username,
        email,
        contactNo,
        dob,
        password,
        address,
        state,
        city,
        pincode,
        tutorType,
        fromClass,
        toClass,
        yearsOfExperience,
        boards,
        qualification,
        subjects,
        termsAndConditions,
        img
      } }
      else {
        updateFields = {
          name,
          username,
          email,
          contactNo,
          dob,
          password,
          address,
          state,
          city,
          pincode,
          tutorType,
          fromClass,
          toClass,
          yearsOfExperience,
          boards,
          qualification,
          subjects,
          termsAndConditions,
        };
      };

// Check if password exists before hashing
if (password && password.trim() !== '') {
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
updateFields.password = hashedPassword;
}

// Check if avatar is defined and avatar name is not undefined before updating img
if (profilePic && profilePic.name !== "undefined") {
  updateFields.img = await processProfilePic(profilePic);
}

Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
      
    await Tutor.findByIdAndUpdate(id, updateFields);

    
  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return {
        err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
      };
    }
    return {
      err: "There was a problem updating this tutor!",
    };
  }

  revalidatePath("/dashboard/tutors");
  return { success:"Bingo! Tutor profile updated successfully!" }
  // redirect("/dashboard/users");

};



//Avatar Image Upload Functionality
async function processProfilePic(profilePic) {
  const bytes = await profilePic.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const generateUniqueFilename = (originalFilename) => {
    const timestamp = Date.now();
    const filenameParts = originalFilename.split('.');
    const extension = filenameParts.pop();
    const filename = filenameParts.join('.');
    return `${filename}_${timestamp}.${extension}`;
  };

  // With the file data in the buffer, you can do whatever you want with it.
  // For this example, we'll just write it to the filesystem in a new location
  const imgPath = join('/uploads/tutor', generateUniqueFilename(profilePic.name));
  const filePath = join('./public', imgPath);
  await fs.writeFile(filePath, buffer);
  
  return imgPath;
}



// <-- Enquiry Actions Start-->



export const sendEnquiry = async (formData) => {
  const {  name, tutorType, contactNo,  } =
    Object.fromEntries(formData);

  await new Promise(resolve => setTimeout(resolve, 1000))
  try {
    connectToDB();


    let  newEnquiry = new Enquiry({
        name,
        contactNo,
        tutorType,
      });

    await newEnquiry.save();

  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return {
        err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
      };
    }
    throw new Error(err);
    return {
      err: "There was a problem sending this enquiry!",
    };
  }

  revalidatePath("/dashboard/enquiries");
  return { success:"Bingo! Your enquiry was sent successfully!" }
};




export const updateStatus = async (formData) => {


  const {id,status} =
    Object.fromEntries(formData);
await new Promise(resolve => setTimeout(resolve, 1000))
  


    connectToDB();

    let updateStatus;
    
    updateStatus = {
          status,
        };



Object.keys(updateStatus).forEach(
      (key) =>
        (updateStatus[key] === "" || undefined) && delete updateStatus[key]
    );
      
    await Enquiry.findByIdAndUpdate(id, updateStatus);

    
  
  
  revalidatePath("/dashboard/enquiries");
  return { success:"Bingo! Enquiry status updated successfully!" }
  // redirect("/dashboard/users");

};




export const deleteEnquiry = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    // Fetch the user before deleting
  const enquiry = await Enquiry.findById(id);

    await Enquiry.findByIdAndDelete(id);
  } catch (err) {
  return {
      err: "There was a problem deleting this enquiry!",
    };
  }

  revalidatePath("/dashboard/enquiries");
};






// <-- Category Actions Start-->



export const addCategory = async (formData) => {
  const {  name, description, thumbnailImg  } =
    Object.fromEntries(formData);

  

  await new Promise(resolve => setTimeout(resolve, 1000))
  try {
    connectToDB();

    let newCategory;

    if (thumbnailImg && thumbnailImg.name !== "undefined") {
      const thumbnail = await processThumbnail(thumbnailImg);
      newCategory = new Category({
        name,
        description,
        thumbnail,
      });
    } else {
      newCategory = new Category({
        name,
        description,
      });
    }

    await newCategory.save();

  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      return {
        err: `This '${duplicateField.charAt(0).toUpperCase()}${duplicateField.slice(1)}' already exists!`,
      };
    }
    throw new Error(err);
    return {
      err: "There was a problem creating this category!",
    };
  }

  // revalidatePath("/dashboard/enquiries");
  return { success:"Bingo! Category was created!" }
};
