import React from 'react'
import { fetchTutor } from "@/app/lib/data";
import UpdateTutorForm from "@/app/ui/dashboard/updateTutor/updateTutorForm";


const TutorProfile = async ({ params }) => {
    const { id } = params;
    const tutor = await fetchTutor(id);
  console.log(id)
  const plainTutor = JSON.parse(JSON.stringify(tutor)); // Convert to plain object
  console.log(plainTutor);
  
  return (
    <div className="h-full "> <UpdateTutorForm tutor={plainTutor}/></div>
  )
}

export default TutorProfile