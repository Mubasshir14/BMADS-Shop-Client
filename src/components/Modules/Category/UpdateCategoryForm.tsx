"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updateCategory } from "@/components/services/Category";
import { toast } from "sonner";

const UpdateCategoryForm = ({ category }: { category: any }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();

  useEffect(() => {
    if (category?.icon) {
      setImagePreview([category.icon]);
    }
  }, [category]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const toastId = "updating";
      const modifiedData = {
        ...data,
      };
      // console.log("", modifiedData);
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("icon", imageFiles[0] as File);

      const res = await updateCategory(formData, category?._id);

      if (res?.success) {
        toast.success(res?.message, {
          id: toastId,
        });
        router.push("/dashboard/admin/category/manage-category");
      } else {
        toast.error(res?.message, {
          id: toastId,
        });
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-lg mx-auto shadow-xl shadow-blue-100 ">
      <h2 className="text-xl text-blue-500 text-center font-bold mb-4">
        Update Product Category
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-36 w-full"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6">
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            ) : (
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Icon"
              />
            )}
          </div>

          <Button type="submit" className="mt-5 w-full bg-blue-500">
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateCategoryForm;
