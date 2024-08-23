"use client"
import { addCategory } from '@/app/lib/actions';
import { getCurrentTime } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';

const AddCategoryForm = () => {

    const { toast } = useToast();
    const [thumbnail, setThumbnail] = useState("");

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

  return (
    <div>
<Card className="md:w-[350px] md:h-[80vh]">
      <CardHeader>
        <CardTitle>Create category</CardTitle>
        <CardDescription>Add your new category in one-click.</CardDescription>
      </CardHeader>
<form
        className=""
        action={async (formData) => {
          //client-side validation or some other things

          const result = await addCategory(formData);
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
            redirect("/dashboard/products");
          }
        }}
      >
      <CardContent>


          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Name of your category" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>

              <Textarea
                    name="description"
                    className=""
                    placeholder="Write here about the category"
                    type="textarea"
                    rows="4"/>

              {/* <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            <div className="relative  gap-2 grid h-full">
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
                            alt="Upload"
                            width="300"
                            height="300"
                            className="w-full inner-shadow rounded-[16px] border-2 border-slate-300 aspect-[5/3] object-cover"
                          />
                        )}
                      </label>
                    </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Add</Button>
      </CardFooter>
      </form>

    </Card>

    </div>
  )
}

export default AddCategoryForm