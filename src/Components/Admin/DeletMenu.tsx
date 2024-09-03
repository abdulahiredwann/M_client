import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/api";

// Define the type for a menu item
type MenuItem = {
  _id: string;
  name: string;
  img_url: string;
  description: string;
  price: number;
};

const DeleteMenu: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Fetch menu items based on category
  useEffect(() => {
    if (category) {
      fetchMenuItems(category);
    }
  }, [category]);

  const fetchMenuItems = async (selectedCategory: string) => {
    try {
      const response = await api.get<MenuItem[]>(`/${selectedCategory}`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      toast.error("Failed to fetch menu items.");
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/${category}/${id}`);
      toast.success("Menu item deleted successfully.");
      setMenuItems(menuItems.filter((item) => item._id !== id)); // Remove the deleted item from the list
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error("Failed to delete menu item.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="pt-20 p-4">
        {/* Category Selector */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Select Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Choose Category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden relative"
            >
              <img
                src={item.img_url}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="badge badge-accent text-xl p-4 badge-outline">
                  ETB {item.price}
                </div>
              </div>
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeleteMenu;
