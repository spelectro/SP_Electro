import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showLearnMorePopup, setShowLearnMorePopup] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch vehicles from backend
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/products?category=EV");
      if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
      }
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      setError("Error loading vehicles: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      return data.imageUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Error uploading image: ' + err.message);
      return null;
    } finally {
      setUploadLoading(false);
    }
  };

  const handleAddVehicle = async () => {
    setLoading(true);
    setError("");
    try {
      // Upload image first if there's a file
      let imageUrl = form.image;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          throw new Error('Image upload failed');
        }
      }

      const vehicleData = {
        name: form.name,
        price: parseInt(form.price),
        description: form.description,
        imageUrl: imageUrl || "/images/placeholder.jpg",
        category: "EV",
      };

      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        throw new Error("Failed to add vehicle");
      }

      const newVehicle = await response.json();
      setVehicles([...vehicles, newVehicle]);
      setForm({ name: "", price: "", description: "", image: "" });
    } catch (err) {
      setError("Error adding vehicle: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditVehicle = (vehicle) => {
    setForm({
      name: vehicle.name,
      price: vehicle.price,
      description: vehicle.description,
      image: vehicle.imageUrl,
    });
    setImagePreview(vehicle.imageUrl);
    setImageFile(null);
    setCurrentVehicle(vehicle);
    setShowEditPopup(true);
  };

  const handleUpdateVehicle = async () => {
    setLoading(true);
    setError("");
    try {
      // Upload image first if there's a file
      let imageUrl = form.image;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          throw new Error('Image upload failed');
        }
      }

      const vehicleData = {
        name: form.name,
        price: parseInt(form.price),
        description: form.description,
        imageUrl: imageUrl,
        category: "EV",
      };

      const response = await fetch(`http://localhost:3000/api/products/${currentVehicle._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        throw new Error("Failed to update vehicle");
      }

      const updatedVehicle = await response.json();
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle._id === currentVehicle._id ? updatedVehicle : vehicle
        )
      );
      setForm({ name: "", price: "", description: "", image: "" });
      setShowEditPopup(false);
    } catch (err) {
      setError("Error updating vehicle: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete vehicle");
      }

      setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
    } catch (err) {
      setError("Error deleting vehicle: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLearnMore = (vehicle) => {
    setCurrentVehicle(vehicle);
    setShowLearnMorePopup(true); // Show the Learn More Popup
  };

  const formatIndianPrice = (number) => {
    return `Rs ${new Intl.NumberFormat("en-IN").format(number)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Panel - Vehicles</h1>
        <button
          onClick={() => {
            setForm({ name: "", price: "", description: "", image: "" });
            setShowEditPopup(true);
            setCurrentVehicle(null);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {vehicles.length === 0 && !loading ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-500">No vehicles found. Add your first vehicle!</p>
          </div>
        ) : (
          vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200">
                <img
                  src={vehicle.imageUrl || "/images/placeholder.jpg"}
                  alt={vehicle.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{vehicle.name}</h2>
                <p className="text-gray-600 mb-4">
                  Starting from {formatIndianPrice(vehicle.price)}
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => handleLearnMore(vehicle)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  >
                    Learn More
                  </button>
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle._id)}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Learn More Popup */}
      {showLearnMorePopup && currentVehicle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLearnMorePopup(false);
          }}
        >
          <div className="bg-white rounded-lg w-96 max-h-screen overflow-y-auto p-6">
            <img
              src={currentVehicle.imageUrl || "/images/placeholder.jpg"}
              alt={currentVehicle.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder.jpg";
              }}
            />
            <h2 className="text-2xl font-bold mb-2">{currentVehicle.name}</h2>
            <p className="text-gray-600 mb-4">{currentVehicle.description}</p>
            <p className="text-gray-800 font-bold">
              {formatIndianPrice(currentVehicle.price)}
            </p>
            <button
              onClick={() => setShowLearnMorePopup(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {showEditPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEditPopup(false);
          }}
        >
          <div className="bg-white rounded-lg w-120 max-h-screen flex flex-col">
            <div className="overflow-y-auto flex-grow p-6">
              <h2 className="text-2xl font-bold mb-4">
                {currentVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Vehicle Name"
                value={form.name}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-4 rounded w-full"
              />
              <input
                type="number"
                name="price"
                placeholder="Price (Rs ...)"
                value={form.price}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-4 rounded w-full"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 mb-4 rounded w-full"
              ></textarea>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Vehicle Image
                </label>
                <div className="flex flex-col space-y-2">
                  {(imagePreview || form.image) && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                      <img 
                        src={imagePreview || form.image} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded border border-gray-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/placeholder.jpg";
                        }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                  <p className="text-sm text-gray-500">Upload a new image or keep the existing one</p>
                  {form.image && !imageFile && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="keepExistingImage"
                        checked={!!form.image}
                        onChange={(e) => {
                          if (!e.target.checked) {
                            setForm({ ...form, image: "" });
                            setImagePreview("");
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="keepExistingImage" className="text-sm text-gray-700">
                        Keep existing image
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Footer with Buttons */}
            <div className="flex justify-end space-x-4 bg-gray-100 p-4">
              <button
                onClick={() => setShowEditPopup(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={currentVehicle ? handleUpdateVehicle : handleAddVehicle}
                disabled={loading}
                className={`${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md`}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
