"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategories } from "@/components/services/Category";
import { updateProduct } from "@/components/services/Product";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateProductForm = ({ product }: { product: any }) => {
  const [categories, setCategories] = useState<any>();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    product?.imageUrls || []
  );
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: product?.name || "",
      price: product?.price || "",
      category: product?.category || "",
      stock: product?.stock || "",
      description: product?.description || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data: category } = await getAllCategories();
        setCategories(category);
        if (category && product?.category) {
          form.setValue("category", product?.category);
        }
      } catch (err) {
        console.error("Failed to fetch category:", err);
      }
    };

    fetchCategory();
  }, [product?.category, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = "updating";
    const modifiedData = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    for (const file of imageFiles) {
      formData.append("images", file);
    }

    try {
      const res = await updateProduct(formData, product?._id);

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
        router.push("/dashboard/admin/product/manage-product");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-blue-300 rounded-xl flex-grow max-w-2xl mx-auto p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        <h1 className="text-xl text-blue-400 text-center font-bold">
          Update Product{" "}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-400">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-400">Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-400">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select Product Category"
                          className="border-blue-400"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-blue-400">
                      {categories?.map((c: any) => (
                        <SelectItem key={c?._id} value={c?._id}>
                          {c?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-400">Stock</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-5">
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-blue-400 font-bold text-xl">Description</p>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-400">
                    Product Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      className="border-blue-400"
                      placeholder="Enter product description here"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-blue-400 font-bold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4 "
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-5 w-full bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Product....." : "Update Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProductForm;
