"use server"
import fs from 'fs';
import path from 'path';
import { connectToDB } from "./utils";
import { User } from "./models";
import { parse } from 'json2csv';

export async function downloadCsvServerAction() {
  try {
    // Connect to the MongoDB database
    const db = await connectToDB();

    // Query the database to retrieve data
    const data = await User.find({})
    let index = 0;

    const fields = [
    { label: 'Index',
      value: () => String(++index) 
    },
    {
      label: 'Username',
      value: 'username'
    },
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Email',
      value: 'email'
    },
    {
      label: 'Role',
      value: (row) => row.isAdmin ? 'Admin' : 'Client'
    },
    {
      label: 'Phone',
      value: 'phone'
    },
    {
      label: 'Address',
      value: 'address'
    },
    {
      label: 'Created At',
      value: (row) => formatDate(row.createdAt)
    }, ];

    // Function to format date string to "dd-mm-yyyy"
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
    
    // Convert JSON data to CSV format
    const csvData = parse(data, { fields });


    // Write CSV data to a file
    const filePath = path.join('./public/uploads', 'Users.csv');
    fs.writeFileSync(filePath, csvData);
    const downloadPath = path.join('/uploads', 'Users.csv');

    return downloadPath;
  } catch (error) {
    console.error('Error downloading CSV:', error);
    throw new Error(error);
  }
}
