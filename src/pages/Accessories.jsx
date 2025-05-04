import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentAccessory, setCurrentAccessory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://sp-electro-1.onrender.com/api/products?category=Accessory");
      if (!response.ok) {
        throw new Error("Failed to fetch accessories");
      }
      const data = await response.json();
      setAccessories(data);
    } catch (err) {
      setError("Error loading accessories: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditClick = (accessoryId) => {
    navigate("/adminaccessories");
  };

  // Format Indian currency
  const formatIndianPrice = (number) => {
    return `Rs ${new Intl.NumberFormat("en-IN").format(number)}`;
  };

  // Handle the "Learn More" button click
  const handleLearnMore = (accessory) => {
    setCurrentAccessory(accessory); // Set the clicked accessory
    setShowPopup(true); // Show the popup
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Accessories</h1>
        {isAuthenticated && (
          <button
            onClick={() => navigate("/adminaccessories")}
            className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700"
          >
            Edit Accessories
          </button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      ) : accessories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No accessories available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.map((accessory) => (
            <div
              key={accessory._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200">
                <img
                  src={accessory.imageUrl || "/images/placeholder.jpg"}
                  alt={accessory.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{accessory.name}</h2>
                <p className="text-gray-600 mb-2">{accessory.description}</p>
                <p className="text-gray-800 font-bold mb-4">
                  {formatIndianPrice(accessory.price)}
                </p>
                <button
                  onClick={() => handleLearnMore(accessory)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Learn More Popup */}
      {showPopup && currentAccessory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPopup(false);
          }}
        >
          <div className="bg-white rounded-lg w-96 max-h-screen overflow-y-auto p-6">
            <img
              src={currentAccessory.imageUrl || "/images/placeholder.jpg"}
              alt={currentAccessory.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder.jpg";
              }}
            />
            <h2 className="text-2xl font-bold mb-2">{currentAccessory.name}</h2>
            <p className="text-gray-600 mb-4">
              {currentAccessory.detailedDescription ||
                currentAccessory.description}
            </p>
            <p className="text-gray-800 font-bold">
              {formatIndianPrice(currentAccessory.price)}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
