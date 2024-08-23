"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { getCurrentTime } from "@/app/lib/utils";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormStatus } from "react-dom";
import { addPortfolio } from "@/app/lib/actions";
import Spinner from "@/app/ui/dashboard/spinner/spinner";
import ThumbnailUpload from '../../ui/dashboard/thumbnailUpload/thumbnailUpload';

const TestPage = () => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [category, setCategory] = useState('');

  console.log(category)

  const { toast } = useToast();

  const createPortfolioImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <form
        className=""
        action={async (formData) => {
          //client-side validation or some other things

          const result = await addPortfolio(formData);
          if (result?.err) {
            //show error
            toast({
              variant: "destructive",
              title: (
                <div className="flex gap-2 items-center">
                  <IoWarningOutline className="text-2xl" />
                 { result.err}
                </div>
              ),
              description:" Uh oh! Something went wrong.",
            });
          } else if (result.success){
            toast({
              variant: "success2",
              title: (
                <div className="flex gap-2 items-center">
                  <IoIosCheckmarkCircleOutline className="text-2xl" />
                  {result.success}
                </div>
              ),
              description: getCurrentTime(),
            });
            redirect("/dashboard/portfolio");
          }
        }}
      >
        <div className="grid items-center grid-cols-3 gap-12 py-4 mb-8">
          <div className="grid grid-cols-2 col-span-2 items-start gap-8">
            <div className="grid items-center col-span-  gap-2">
              <Label htmlFor="projectName" className="text-left font-normal">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                name="projectName"
                className="col-span-3  "
                placeholder="Project"
                required
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^a-zA-Z0-9\s]/g, "")
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                }}
              />
            </div>

            <div className="grid items-center col-span-  gap-2">
              <Label htmlFor="projectUrl" className="text-left font-normal">
                Project Link{" "}
                <span className="text-gray-500 font-light">(If any)</span>
              </Label>
              <Input
                name="projectUrl"
                type="text"
                className="col-span-3 "
                placeholder="https://linktoproject.com"
                required
                onChange={(e) => {
                  e.target.value = e.target.value
                    .toLowerCase()
                    .replace(/\s/g, "");
                }}
              />
            </div>


            <div className="grid items-center gap-2">
              <Label htmlFor="clientName" className="text-left font-normal">
                Client Name
              </Label>
              <Input
                name="clientName"
                type="text"
                className="col-span-3"
                placeholder="ABC Pvt. Ltd"
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                }}
              />
            </div>

            <div className="grid items-center gap-2">
              <Label htmlFor="technologiesUsed" className="text-left font-normal">
                Tools & Technologies Used{" "}
                <span className="text-gray-500 font-light">(Optional)</span>
              </Label>
              <Input
                name="technologiesUsed"
                type="text"
                className="col-span-3"
                placeholder="WordPress, Illustrator, Figma, etc."
                required
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                }}
              />
            </div>

            <div className="grid items-center  gap-2">
              <Label htmlFor="category" className="text-left font-normal">
              Project Category
              </Label>
              <Select name="category" onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-[180px">
                  <SelectValue placeholder="Project Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Website Development">
                    Website Development
                  </SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                  <SelectItem value="Graphics Design">
                    Graphics Design
                  </SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
              {category === "Other" ?  <div className="grid items-center gap-2">
              <Label htmlFor="otherCategory" className="text-left font-normal">
                Category Title{" "}
                <span className="text-gray-500 font-light">(If other)</span>
              </Label>
              <Input
                name="otherCategory"
                type="text"
                className="col-span-3"
                placeholder="Branding"
                disabled={category !== "Other"}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                }}
              />
            </div> : "" }
            

            

            <div className="grid col-span-full items-center gap-2">
              <Label htmlFor="description" className="text-left font-normal">
                Project Description
              </Label>
              <Textarea
                name="description"
                className="col-span-3"
                placeholder="Write here about the project"
                type="textarea"
                rows="4"
                onChange={(e) => {
                  e.target.value = e.target.value
                    .charAt(0) // Get the first character
                    .toUpperCase() // Capitalize the first character
                    + e.target.value.slice(1); // Append the rest of the string
                }}
              />
            </div>
            
           
           

           
          </div>

           <div className="grid  items-start gap-8">
            
           <div className="grid items-center gap-2">
           {/* <Label htmlFor="phone" className="text-left font-normal">
                Project Thumbnail
              </Label> */}
           <ThumbnailUpload/>
           </div>
           <div className="w-full grid items-center gap-2 ">
           <Label htmlFor="images" className="text-left font-normal">
                Project Images
                <span className="text-gray-500 font-light"> (Optional)</span>
              </Label>

{/* <div className="border-2 border-dashe rounded-2xl border-slate-300  bg-slate-00 py-12 px-8 min-h-44 flex flex-col gap-6 items-center justify-center"> */}
<Input id="files" name="files" type="file" accept='image/*' multiple onChange={createPortfolioImagesChange} className=" text-gray-900 bg-white/70 shadow cursor-pointer"/>

<div className={`flex mt-2 gap-4 overflow-x-auto flex-wra  ${imagesPreview.length === 0 ? "hidden" : "" }`}>
  {imagesPreview.map((image, index)=> (
      <img key={index} src={image} alt="Images" className='h-16 mb-4 rounded-md'/>
  ))}
</div>
{/* </div> */}
</div>

<div  className="col-span-full">
            <SubmitButton/>
            </div>
           
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestPage;

function SubmitButton({ passwordMatch, password, confirmPassword }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="mt-4 w-full"
      //    disabled={!passwordMatch || !password || !confirmPassword || pending}
    >
      {pending ?  <Spinner />  : 'Create'}
    </Button>
  );
}
