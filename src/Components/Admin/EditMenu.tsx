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

const EditMenu: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

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

  const openEditModal = (item: MenuItem) => {
    setSelectedItem(item);
    const modalCheckbox = document.getElementById(
      "edit_modal"
    ) as HTMLInputElement;
    modalCheckbox.checked = true; // Open the modal
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    // Construct an object with only the necessary fields
    const { name, img_url, description, price } = selectedItem;

    const itemToUpdate = {
      name,
      img_url,
      description,
      price,
    };

    try {
      await api.put(`/${category}/edit/${selectedItem._id}`, itemToUpdate); // Use _id as part of the URL
      toast.success("Menu item updated successfully.");
      setMenuItems(
        menuItems.map((item) =>
          item._id === selectedItem._id ? { ...item, ...itemToUpdate } : item
        )
      );
      setSelectedItem(null);

      // Close the modal after editing
      const modalCheckbox = document.getElementById(
        "edit_modal"
      ) as HTMLInputElement;
      modalCheckbox.checked = false;
    } catch (error) {
      console.error("Error updating menu item:", error);
      toast.error("Failed to update menu item.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!selectedItem) return;
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
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
              {/* Edit Button */}
              <button
                onClick={() => openEditModal(item)}
                className="absolute top-2 right-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Edit Form */}
      <input type="checkbox" id="edit_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Menu Item</h3>
          {selectedItem && (
            <form onSubmit={handleEditSubmit}>
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedItem.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={selectedItem.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price (ETB)
                </label>
                <input
                  type="number"
                  name="price"
                  value={selectedItem.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="py-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="img_url"
                  value={selectedItem.img_url}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <label htmlFor="edit_modal" className="btn">
                  Cancel
                </label>
              </div>
            </form>
          )}
        </div>
        <label className="modal-backdrop" htmlFor="edit_modal">
          Close
        </label>
      </div>
    </>
  );
};

export default EditMenu;
