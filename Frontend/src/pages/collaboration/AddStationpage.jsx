import { useContext, useState } from "react";
import { Upload, X } from "lucide-react"; // Import icons from lucide-react
import { toast } from "react-toastify";
import { addStaionAPI } from "../../Server/allAPI";
import { addStaionResponseContext } from "../../context/ContextAPI";



const AddStationpage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // context APi
   const {addStaionResponse,setAddStaionResponse}=useContext(addStaionResponseContext)

  const [addStationDetails, setAddStationDetails] = useState({
    stationName: "",
    chargingType: "",
    vehicleType:"",
    mapUrl: "",
    pricePerHour: "",
    image: null,
    latitude: "",
    longitude: "",
    city: "",
    state: "",
    availableSlots: "",
  });
  console.log(addStationDetails);

  // modal open/close
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setImage(null);
    setPreviewUrl(null);
    setAddStationDetails({
      stationName: "",
      mapUrl: "",
      pricePerHour: "",
      image: null,
      latitude: "",
      longitude: "",
      city: "",
      state: "",
      availableSlots: "",
    });
  };

  //image upload section
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setAddStationDetails({ ...addStationDetails, image: file });
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  //  add station detail handler
  const stationDetailHandler = async () => {
    console.log("stationDetailHandler");
    console.log("addStationDetails:", addStationDetails);
  
    const {
      stationName,
      chargingType,
      mapUrl,
      pricePerHour,
      latitude,
      vehicleType,
      longitude,
      city,
      state,
      availableSlots,
      image,
    } = addStationDetails;
  
    // Utility function to validate latitude and longitude
    const isValidCoordinates = (longitude, latitude) => {
      const lon = parseFloat(longitude);
      const lat = parseFloat(latitude);
      return (
        !isNaN(lon) &&
        !isNaN(lat) &&
        lon >= -180 &&
        lon <= 180 &&
        lat >= -90 &&
        lat <= 90
      );
    };
  
    // Utility function to validate URL format
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    };
  
    // Validate required fields
    if (
      !stationName ||
      !chargingType ||
      !mapUrl ||
      !vehicleType ||
      !pricePerHour ||
      !latitude ||
      !longitude ||
      !city ||
      !state ||
      !availableSlots ||
      !image
    ) {
      toast.info("Please fill all the fields", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
  
    // Validate longitude & latitude format
    if (!isValidCoordinates(longitude, latitude)) {
      toast.error("Invalid longitude or latitude format", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
  
    // Validate URL format
    if (!isValidUrl(mapUrl)) {
      toast.error("Invalid map URL format", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    // Prepare FormData
    const reqBody = new FormData();
    reqBody.append("stationName", stationName);
    reqBody.append("chargingType", chargingType);
    reqBody.append("mapUrl", mapUrl);
    reqBody.append("pricePerHour", pricePerHour);
    reqBody.append("latitude", latitude);
    reqBody.append("longitude", longitude);
    reqBody.append("vehicleType", vehicleType);
    reqBody.append("city", city);
    reqBody.append("state", state);
    reqBody.append("availableSlots", availableSlots);
    reqBody.append("image", image instanceof File ? image : "");
  
    console.log("reqBody", reqBody);
  
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found", {
        position: "top-right",
        theme: "dark",
      });
      setIsSubmitting(false);
      return;
    }
  
    const reqHeaders = {
      Authorization: `Bearer ${token}`,
    };
  
    try {
      const result = await addStaionAPI(reqBody, reqHeaders);
      console.log("result", result);
      // api call---
      if (result?.status === 200) {
        toast.success(result.data.message, {
          position: "top-right",
          theme: "dark",
        });
        setAddStaionResponse(result)
        closeModal();
      } else if (result?.status === 400 ) {
        toast.warning(result.data.message, {
          position: "top-right",
          theme: "dark",
        });
      } else {
        toast.error(" station is already existing..", {
          position: "top-right",
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
  
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
  
      toast.error(errorMessage, { position: "top-right", theme: "dark" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <button
        onClick={openModal}
        className="px-3 py-1 md:px-4 md:py-1 font-[DM_Sans] rounded-xl bg-gradient-to-b from-gray-900 to-zinc-900 hover:-translate-y-1 hover:scale-105 duration-300 hover:text-amber-100 text-amber-50 text-sm md:text-base"
      >
        Add +
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed font-[DM_Sans] inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Modal Content */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden border border-gray-700">
            {/* Modal Header */}
            <div className="border-b border-gray-700 px-4 py-3 md:px-6 md:py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold text-gray-100">
                  Add Station
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-200 focus:outline-none transition-colors"
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-4 py-3 md:px-6 md:py-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image section */}
                <div className="w-full md:w-1/3">
                  <label className="block cursor-pointer group">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <div className="relative mb-3 rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-dashed border-gray-700 hover:border-gray-500 transition-colors">
                      {previewUrl ? (
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Station preview"
                          className="w-full h-48 sm:h-64 md:h-96 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 sm:h-64 md:h-96 flex flex-col items-center justify-center text-gray-400 group-hover:text-gray-300">
                          <Upload className="w-8 h-8 mb-2" />
                          <span className="text-sm">Click to upload image</span>
                          <span className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 10MB
                          </span>
                        </div>
                      )}
                      {previewUrl && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm">
                            Change image
                          </span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Input fields section */}
                <div className="w-full md:w-2/3 space-y-2 md:space-y-3">
                  {/* station name */}
                  <div>
                    <input
                      onChange={(e) =>
                        setAddStationDetails({
                          ...addStationDetails,
                          stationName: e.target.value,
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                      type="text"
                      placeholder="Station name"
                      value={addStationDetails.stationName}
                    />
                  </div>
                  {/* station location */}

                  {/* label for latitude and longitude */}
                  <div className=" w-full flex flex-col md:flex-row gap-2">
                    <div>
                      <input
                        onChange={(e) =>
                          setAddStationDetails({
                            ...addStationDetails,
                            latitude: e.target.value,
                          })
                        }
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                        type="text"
                        placeholder="latitude"
                        value={addStationDetails.latitude}
                      />
                    </div>
                    <div>
                      <input
                        onChange={(e) =>
                          setAddStationDetails({
                            ...addStationDetails,
                            longitude: e.target.value,
                          })
                        }
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                        type="text"
                        placeholder="longitude"
                        value={addStationDetails.longitude}
                      />
                    </div>
                  </div>
                  {/* label for city and state */}
                  <div className=" w-full flex flex-col md:flex-row gap-2">
                    <div>
                      <input
                        onChange={(e) =>
                          setAddStationDetails({
                            ...addStationDetails,
                            city: e.target.value,
                          })
                        }
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                        type="text"
                        placeholder="city"
                        value={addStationDetails.city}
                      />
                    </div>
                    <div>
                      <input
                        onChange={(e) =>
                          setAddStationDetails({
                            ...addStationDetails,
                            state: e.target.value,
                          })
                        }
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                        type="text"
                        placeholder="state"
                        value={addStationDetails.state}
                      />
                    </div>
                  </div>
                  {/*  charging type and vechile type */}
                  <div className=" w-full flex flex-col md:flex-row gap-2">
                    <div className="w-full">
                      <select
                        onChange={(e) =>
                          setAddStationDetails({
                            ...addStationDetails,
                            vehicleType: e.target.value,
                          })
                        }
                        value={addStationDetails.vehicleType}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-gray-800/50">
                          Select Vehicle Type
                        </option>
                        <option value="2-wheeler" className="bg-gray-800">
                          2-wheeler
                        </option>
                        <option value="3-wheeler" className="bg-gray-800">
                          3-wheeler
                        </option>
                        <option value="4-wheeler" className="bg-gray-800">
                          4-wheeler
                        </option>
                      </select>
                    </div>
                    <div className="w-full">
                      <select
                        onChange={(e) =>
                          setAddStationDetails({
                            ...addStationDetails,
                            chargingType: e.target.value,
                          })
                        }
                        value={addStationDetails.chargingType}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                      >
                        <option value="" className="bg-gray-800/50">
                          Select Charging Type
                        </option>
                        <option value="slow" className="bg-gray-800">
                          Slow
                        </option>
                        <option value="fast" className="bg-gray-800">
                          Fast
                        </option>
                        <option value="superfast" className="bg-gray-800">
                          superFast
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* map url */}
                  <div>
                    <input
                      onChange={(e) =>
                        setAddStationDetails({
                          ...addStationDetails,
                          mapUrl: e.target.value,
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                      type="url"
                      placeholder="Map url"
                      value={addStationDetails.mapUrl}
                    />
                  </div>
                  {/* price */}
                  <div>
                    <input
                      onChange={(e) =>
                        setAddStationDetails({
                          ...addStationDetails,
                          availableSlots: e.target.value,
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                      type="number"
                      placeholder="Active Slots"
                      value={addStationDetails.availableSlots}
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) =>
                        setAddStationDetails({
                          ...addStationDetails,
                          pricePerHour: e.target.value,
                        })
                      }
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors"
                      type="number"
                      placeholder="Price/hr"
                      value={addStationDetails.pricePerHour}
                    />
                  </div>
                  {/* <div>
                    <textarea 
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-2.5 text-gray-100 placeholder-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none transition-colors resize-none" 
                      placeholder='Notes'
                      rows="3"
                    />
                  </div> */}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-700 px-4 py-3 md:px-6 md:py-4 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-1.5 md:px-5 md:py-2 rounded-lg text-sm md:text-base font-medium text-gray-300 hover:text-gray-100 bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={stationDetailHandler}
                disabled={isSubmitting}
                className={`px-4 py-1.5 md:px-5 md:py-2 rounded-lg text-sm md:text-base font-medium text-white bg-gradient-to-r from-green-500 to-green-900 hover:from-green-900 hover:to-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Adding..." : "Add Station"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStationpage;
