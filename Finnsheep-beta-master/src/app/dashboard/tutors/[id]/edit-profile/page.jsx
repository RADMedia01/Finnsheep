import React from 'react'
import { fetchTutor } from "@/app/lib/data";
import EditTutorProfile from '@/app/ui/editTutorProfile/editTutorProfile';

const EditProfilePage = async ({ params }) => {
  const { id } = params;
  const tutor = await fetchTutor(id);

  const plainTutor = JSON.parse(JSON.stringify(tutor)); // Convert to plain object
  console.log(plainTutor);

  return (
   <div className="h-full lg:py-24 py-4  justify-center  flex items-center "> <EditTutorProfile tutor={plainTutor}/></div>
  )
}

export default EditProfilePage