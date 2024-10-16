"use client"


import { deleteUser } from "@/app/lib/actions";

import { useToast } from "@/components/ui/use-toast"
import { redirect } from "next/navigation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { getCurrentTime } from '@/app/lib/utils';
import { Button } from "@/components/ui/button";




const DeleteUserForm = ({ userId }) => {

    const { toast } = useToast()


  return (
    <form
      action={async (formData) => {
        //client-side validation or some other things

        const result = await deleteUser(formData);
        if (result?.err) {
          //show error
          toast({
            variant: "destructive",
            title: (
              <div className="flex gap-2 items-center">
                <IoWarningOutline className="text-2xl" />
                Uh oh! Something went wrong.
              </div>
            ),
            description: result.err,
          });
        } else {
          toast({
            variant: "success2",
            title: (
              <div className="flex gap-2 items-center">
                <IoIosCheckmarkCircleOutline className="text-2xl" />
                Bingo! User deleted successfully!
              </div>
            ),
            description: getCurrentTime(),
          });
          redirect("/dashboard/users");
        }
      }}
    >
      <input type="hidden" name="id" value={userId} />
      <Button className="w-full" >Delete</Button>
      {/* <button className="">Continue</button> */}
    </form>
  );
};

export default DeleteUserForm;
