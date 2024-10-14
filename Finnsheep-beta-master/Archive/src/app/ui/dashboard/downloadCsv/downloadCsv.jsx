"use client"
import { downloadCsvServerAction } from '@/app/lib/downloadCsvServerAction';
import { Button } from '@/components/ui/button';
import React from 'react'

const DownloadCsv = (filePath) => {

  const handleDownload = async () => {
    try {
      const downloadPath = await downloadCsvServerAction();
      console.log('CSV file created:', downloadPath);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = downloadPath;
      link.download = 'Users.csv'; // Set the desired filename

      // Simulate a click event on the link
      document.body.appendChild(link);
      link.click();

      // Clean up: remove the link from the DOM after the download
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      // Handle error
    }
  };
  return (
    <button onClick={handleDownload} className="bg-slate-700 text-nowrap text-xs rounded-md px-3 py-2  text-white h-[38px] hover:bg-slate-600 flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="1rem"
      height="1rem">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
      <span className="hidden lg:block">Export</span>
    </button>
  )
}

export default DownloadCsv