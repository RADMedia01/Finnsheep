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
import Spinner from "../spinner/spinner";
// import ThumbnailUpload from "../thumbnailUpload/thumbnailUpload";
import { addPortfolio } from "@/app/lib/actions";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const AddPortfolioForm = () => {
  const [step, setStep] = useState(1);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  console.log(category);

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

  const [data, setData] = useState({
    // Define form fields for each step
    projectName: "",
    projectUrl: "",
    clientName: "",
    technologiesUsed: [],
    category: "",
    otherCategory: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Set thumbnail to empty string when no file is selected
      setThumbnail("");
    }
  };
  console.log(data);

  return (
    <div>
      <form
        className=""
        action={async (formData) => {
          //client-side validation or some other things

          const result = await addPortfolio(formData, data);
          if (result?.err) {
            //show error
            toast({
              variant: "destructive",
              title: (
                <div className="flex gap-2 items-center">
                  <IoWarningOutline className="text-2xl" />
                  {result.err}
                </div>
              ),
              description: " Uh oh! Something went wrong.",
            });
          } else if (result.success) {
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
        <Tabs
          defaultValue={step}
          value={step}
          className="lg:w-2/3  mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 h-fit rounded-full gap-2">
            <TabsTrigger
              value={1}
              className={cn("data-[state=active]:bg-blue-100 bg-green-300 rounded-full")}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full border  ${
                  step === 1
                    ? "bg-slate-500 border-slate-400 border-2 text-white"
                    : step <= 2
                    ? "bg-green-500 border-green-400 border-2 text-white"
                    : ""
                }`}
              >
                {step === 2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  1
                )}
              </span>
            </TabsTrigger>
            <TabsTrigger value={2} className="rounded-full">
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2  ${
                  step === 2
                    ? "bg-slate-500 border-slate-400 border-2 text-white"
                    : ""
                }`}
              >
                2
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={1}>
            <Card className="h-ful">
              <div className="grid md:grid-cols-2 px-4 md:px-12 mx-auto col-span-2 py-12 items-start gap-8 t-12">
                <div className="grid items-center  gap-2">
                  <Label
                    htmlFor="projectName"
                    className="text-left font-normal flex items-center justify-between"
                  >
                    Project Title <span className="text-rose-400 font-normal text-xs">*Required</span>
                  </Label>
                  <Input
                    name="projectName"
                    className=" h-10 md:h-9 "
                    placeholder="Project"
                    required
                    value={data.projectName}
                    onChange={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^a-zA-Z0-9\s]/g, "")
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                      handleChange(e);
                    }}
                  />
                </div>

                <div className="grid items-center col-span-  gap-2">
                  <Label htmlFor="projectUrl" className="text-left font-normal flex items-center justify-between">
                    Project Link{" "}
                    <span className="text-gray-500 font-normal text-xs">(If any)</span>
                  </Label>
                  <Input
                    name="projectUrl"
                    type="text"
                    className="h-10 md:h-9"
                    placeholder="https://linktoproject.com"
                    required
                    value={data.projectUrl}
                    onChange={(e) => {
                      e.target.value = e.target.value
                        .toLowerCase()
                        .replace(/\s/g, "");
                      handleChange(e);
                    }}
                  />
                </div>

                <div className="grid items-center gap-2">
                  <Label htmlFor="clientName" className="text-left font-normal flex items-center justify-between">
                    Client Name
                    <span className="text-gray-500 font-normal text-xs">(Optional)</span>
                  </Label>
                  <Input
                    name="clientName"
                    type="text"
                    className="h-10 md:h-9"
                    placeholder="ABC Pvt. Ltd"
                    value={data.clientName}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\b\w/g, (c) =>
                        c.toUpperCase()
                      );
                      handleChange(e);
                    }}
                  />
                </div>

                <div className="grid items-center gap-2">
                  <Label
                    htmlFor="technologiesUsed"
                    className="text-left font-normal flex items-center justify-between"
                  >
                    Tools & Technologies Used{" "}
                    <span className="text-gray-500 font-normal text-xs">(Optional)</span>
                  </Label>
                  <Input
                    name="technologiesUsed"
                    type="text"
                    className="h-10 md:h-9"
                    placeholder="WordPress, Illustrator, Figma, etc."
                    required
                    value={data.technologiesUsed}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\b\w/g, (c) =>
                        c.toUpperCase()
                      );
                      handleChange(e);
                    }}
                  />
                </div>

                <div className="grid col-span-full items-center gap-2">
                  <Label
                    htmlFor="description"
                    className="text-left font-normal flex items-center justify-between"
                  >
                    Project Description
                    <span className="text-rose-400 font-normal text-xs">*Required</span>
                  </Label>
                  <Textarea
                    name="description"
                    className=""
                    placeholder="Write here about the project"
                    type="textarea"
                    rows="4"
                    value={data.description}
                    onChange={(e) => {
                      e.target.value =
                        e.target.value
                          .charAt(0) // Get the first character
                          .toUpperCase() + // Capitalize the first character
                        e.target.value.slice(1); // Append the rest of the string
                      handleChange(e);
                    }}
                  />
                </div>

                <div className="grid items-center gap-2">
                  <Label htmlFor="category" className="text-left font-normal flex items-center justify-between">
                    Project Category
                    <span className="text-rose-400 font-normal text-xs">*Required</span>
                  </Label>
                  <Select
                    name="category" 
                    onValueChange={(value) => {
                      setCategory(value); // Update category state with the new value
                      const e = { target: { name: "category", value: value } }; // Create a synthetic event object
                      handleChange(e); // Call handleChange function with the synthetic event object
                    }}
                    value={data.category}
                  >
                    <SelectTrigger className="w-[180px h-10 md:h-9">
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
                {category === "Other" ? (
                  <div className="grid items-center gap-2">
                    <Label
                      htmlFor="otherCategory"
                      className="text-left font-normal flex items-center justify-between"
                    >
                      Category Title{" "}
                      <span className="text-rose-400 font-normal text-xs">*Required</span>
                    </Label>
                    <Input
                      name="otherCategory"
                      type="text"
                      className="h-10 md:h-9"
                      placeholder="e.g. Branding"
                      disabled={category !== "Other"}
                      value={data.otherCategory}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/\b\w/g, (c) =>
                          c.toUpperCase()
                        );
                        handleChange(e);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}

                
                {/* Previous and Next buttons */}
                <div className="flex col-span-full justify-center gap-4">
                  {step !== 1 && (
                    <Button
                      className=" bg-slate-500 hover:bg-slate-600 px-4"
                      type="button"
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                  {step !== 2 ? (
                    <Button
                      className=" bg-slate-700 w-36 hover:bg-slate-600 px-4 flex items-center gap-2 font-normal"
                      type="button"
                      onClick={nextStep}
                      disabled={!data.projectName || !data.category || !data.description }

                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Button>
                  ) : (
                    <div className="col-span-full">
                      <SubmitButton />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value={2}>
            <Card>
              <div className="grid py-12  items-start gap-8">
                <div className="grid items-center gap-2">
                  {/* <ThumbnailUpload/> */}

                  <div className="flex items-center w-full h-full justify-center  space-x-">
                    <div className="relative md:w-2/5 gap-2 grid h-full">
                    <Label
                      htmlFor="images"
                      className="text-left  flex items-center justify-between  font-normal"
                    >
                      Thumbnail
                      <span className="text-gray-500 font-light">
                        {" "}
                        (Optional)
                      </span>
                    </Label>
                      <input
                        type="file"
                        name="thumbnailImg"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="sr-only"
                        id="thumbnail-input"
                      />
                      <label
                        htmlFor="thumbnail-input"
                        className="cursor-pointer w-full h-full flex justify-center"
                      >
                        {thumbnail ? (
                          <Image
                            src={thumbnail}
                            alt="Thumbnail"
                            width="300"
                            height="300"
                            className="w-full aspect-[5/3] outline outline- inner-shadow outline-indigo-50 outline-offset-4  rounded-2xl object-cover"
                          />
                        ) : (
                          <Image
                            src="/upload-thumbnail1.svg"
                            width="300"
                            height="300"
                            alt="Upload"
                            className="w-full inner-shadow rounded-[16px] border-2 border-slate-300 aspect-[5/3] object-cover"
                          />
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-center justify-center gap-2 ">
                  <div className="md:w-2/5 flex flex-col items-center px-4 md:px-0 gap-2 ">
                    <Label
                      htmlFor="images"
                      className="text-left flex items-center justify-between w-full font-normal"
                    >
                      Project Images
                      <span className="text-gray-500 font-light">
                        {" "}
                        (Optional)
                      </span>
                    </Label>

                    <Input
                      id="files"
                      name="files"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={createPortfolioImagesChange}
                      className=" text-gray-900 bg-white/70 shadow  cursor-pointer "
                    />

                    <div
                      className={`flex mt-2 gap-4 overflow-x-auto flex-wra  ${
                        imagesPreview.length === 0 ? "hidden" : ""
                      }`}
                    >
                      {imagesPreview.map((image, index) => (
                        <Image
                        width="600"
                        height="600"
                          key={index}
                          src={image}
                          alt="Images"
                          className="h-16 mb-4 rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Previous and Next buttons */}
                <div className="flex col-span-full items-center w-full px-4 md:px-0 md:w-2/5 mx-auto justify-between gap-4">
                  {step !== 1 && (
                    <Button
                      className=" bg-slate-500 min-w-32 hover:bg-slate-600 px-4 font-normal"
                      type="button"
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                  {step !== 2 ? (
                    <Button
                      className=" bg-slate-700 min-w-32 hover:bg-slate-600 px-4 flex items-center gap-2 font-normal"
                      type="button"
                      onClick={nextStep}
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Button>
                  ) : (
                    <div className="col-span-full">
                      <SubmitButton projectName={data.projectName} category={data.category} description={data.description}/>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default AddPortfolioForm;

function SubmitButton({ projectName, category, description }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="font-normal min-w-32"
         disabled={!projectName || !category || !description || pending}
    >
      {pending ? <Spinner /> : "Create"}
    </Button>
  );
}
