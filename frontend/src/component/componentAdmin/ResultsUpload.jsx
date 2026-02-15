import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2 } from "lucide-react";
import ImageComponent from "../componentGeneral/ImageComponent.jsx"; // Adjust path if needed
import useAuthAdminStore from "../../store/AuthAdminStore.js"; // Use alias or adjust if needed

const BrandUpload = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editingImageId, setEditingImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useAuthAdminStore();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/getallresults`);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    if (apiUrl) fetchImages(); // avoid call on undefined URL
  }, [apiUrl]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imgSrc", file);
    formData.append("description", description);

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/createresults`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.imgSrc) {
        setImages((prevImages) => [...prevImages, response.data]);
      }
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageDelete = async (imageId) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to delete this image?")
    ) {
      try {
        await axios.delete(`${apiUrl}/deletebyidresults/${imageId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages((prevImages) =>
          prevImages.filter((img) => img._id !== imageId),
        );
      } catch (error) {
        console.error("Error deleting image", error);
      }
    }
  };

  const handleDescriptionUpdate = async (imageId, newDescription) => {
    try {
      setLoading(true);
      await axios.put(
        `${apiUrl}/updateresults/${imageId}`,
        { description: newDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setImages((prevImages) =>
        prevImages.map((img) =>
          img._id === imageId ? { ...img, description: newDescription } : img,
        ),
      );
      setEditingImageId(null);
      setEditedDescription("");
    } catch (error) {
      console.error("Error updating description", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 shadow bg-white rounded-lg">
      <h1 className="border-l-4 primaryBorderColor primaryTextColor mb-6 pl-2 text-lg font-semibold self-start">
        Manage Image Gallery
      </h1>

      <div className="w-full mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Enter image description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <label className="cursor-pointer inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition duration-300">
        <Upload className="mr-2" size={18} />
        Select Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {loading && <p className="text-blue-500 mt-3">Uploading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AnimatePresence>
          {images.length > 0 ? (
            images.map((image) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative bg-white shadow rounded-lg overflow-hidden p-4"
              >
                <ImageComponent
                  imageName={image.imgSrc}
                  className="object-cover rounded-lg mb-2"
                />
                {editingImageId === image._id ? (
                  <div className="flex flex-col">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      rows="3"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          handleDescriptionUpdate(image._id, editedDescription)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingImageId(null);
                          setEditedDescription("");
                        }}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-700">
                      {image.description || "No description"}
                    </p>
                    <button
                      onClick={() => {
                        setEditingImageId(image._id);
                        setEditedDescription(image.description || "");
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-300"
                    >
                      Edit
                    </button>
                  </div>
                )}
                <button
                  onClick={() => handleImageDelete(image._id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transition duration-300"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3">No images uploaded yet.</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrandUpload;
