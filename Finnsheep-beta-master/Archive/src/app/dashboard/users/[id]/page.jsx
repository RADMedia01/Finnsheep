import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchUser } from "@/app/lib/data";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/app/lib/actions";
import UpdateUserForm from "@/app/ui/dashboard/updateUser/updateUserForm";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);
  console.log(id)
  const plainUser = JSON.parse(JSON.stringify(user)); // Convert to plain object
  console.log(plainUser);

  return (
    <div className="h-screen ">
      <UpdateUserForm user={plainUser}/>
    </div>
  );
};

export default SingleUserPage;
