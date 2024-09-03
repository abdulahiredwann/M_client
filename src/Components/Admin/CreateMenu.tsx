import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/api";

// Define the schema for form validation
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  img_url: z.string().url("Invalid URL"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  price: z.number().positive("Price must be a positive number"),
});

export type CreateMenuForm = z.infer<typeof schema>;

function CreateMenu() {
  const [npoint, setnPoint] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMenuForm>({
    resolver: zodResolver(schema),
  });
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setnPoint(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const onSubmit = async (data: CreateMenuForm) => {
    try {
      // Make sure to use npoint value to dynamically set the endpoint
      if (!npoint) {
        return toast.error("Select catagory please!");
      }
      await api.post(`/${npoint}`, data);
      toast.success("Menu item added successfully");
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <>
      <Toaster />
      <div className=" pt-20 p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Menu Item</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              onChange={handleCategoryChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Choose Catagory</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="drink">Drink</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="img_url"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              id="img_url"
              type="text"
              {...register("img_url")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.img_url && (
              <p className="text-red-500">{errors.img_url.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Menu Item
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateMenu;
