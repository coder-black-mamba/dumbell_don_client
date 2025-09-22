import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { toast } from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaTimes,
  FaUserShield,
  FaUserTie,
  FaUserAlt,
} from "react-icons/fa";
import { authApiClient } from "../../services/apiServices";
import Loader from "../common/Loader";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { member: initialMember } = location.state || {};
  
  const [loading, setLoading] = useState(!initialMember);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: initialMember?.email || "",
    first_name: initialMember?.first_name || "",
    last_name: initialMember?.last_name || "",
    address: initialMember?.address || "",
    phone_number: initialMember?.phone_number || "",
    role: initialMember?.role || "MEMBER",
    profile_picture: initialMember?.profile_picture_url || "",
  });
  const [errors, setErrors] = useState({});

  // Available roles with icons
  const roles = [
    { value: "ADMIN", label: "Admin", icon: <FaUserShield className="mr-2" /> },
    { value: "STAFF", label: "Staff", icon: <FaUserTie className="mr-2" /> },
    { value: "MEMBER", label: "Member", icon: <FaUserAlt className="mr-2" /> },
  ];

  // Fetch member data if not provided in location state
  useEffect(() => {
    if (!initialMember) {
      const fetchMember = async () => {
        try {
          const response = await authApiClient.get(`/api/users/${id}/`);
          const memberData = response.data;
          setFormData({
            email: memberData.email,
            first_name: memberData.first_name,
            last_name: memberData.last_name,
            address: memberData.address || "",
            phone_number: memberData.phone_number || "",
            role: memberData.role || "MEMBER",
            profile_picture: memberData.profile_picture_url || "",
          });
        } catch (error) {
          console.error("Error loading member data:", error);
          toast.error("Failed to load member data");
          navigate(-1);
        } finally {
          setLoading(false);
        }
      };
      fetchMember();
    } else {
      setLoading(false);
    }
  }, [id, initialMember, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    if (!formData.first_name?.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name?.trim()) newErrors.last_name = "Last name is required";
    if (formData.phone_number && !/^\+?[0-9\s-]+$/.test(formData.phone_number)) {
      newErrors.phone_number = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);
      const updateData = {
        email: formData.email.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        address: formData.address.trim(),
        phone_number: formData.phone_number.trim(),
        role: formData.role,
      };

      await authApiClient.put(`/api/users/${id}/`, updateData);
      toast.success("Member updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error updating member:", error);
      const errorMessage = error.response?.data?.message || "Failed to update member";
      toast.error(errorMessage);

      if (error.response?.data) {
        setErrors((prev) => ({
          ...prev,
          ...error.response.data,
        }));
      }
    } finally {
      setSaving(false);
    }
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClasses = "block text-sm font-medium mb-1 text-gray-700";
  const errorClasses = "text-red-500 text-sm mt-1";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-lg shadow-lg bg-base-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-200">
              Edit Member
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className={labelClasses}>
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.first_name ? "border-red-500" : ""} pl-10`}
                    placeholder="John"
                  />
                </div>
                {errors.first_name && (
                  <p className={errorClasses}>{errors.first_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className={labelClasses}>
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.last_name ? "border-red-500" : ""} pl-10`}
                    placeholder="Doe"
                  />
                </div>
                {errors.last_name && (
                  <p className={errorClasses}>{errors.last_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.email ? "border-red-500" : ""} pl-10`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className={errorClasses}>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone_number" className={labelClasses}>
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.phone_number ? "border-red-500" : ""} pl-10`}
                    placeholder="+1234567890"
                  />
                </div>
                {errors.phone_number && (
                  <p className={errorClasses}>{errors.phone_number}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className={labelClasses}>
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.address ? "border-red-500" : ""} pl-10 min-h-[100px]`}
                    placeholder="123 Main St, City, Country"
                  />
                </div>
                {errors.address && (
                  <p className={errorClasses}>{errors.address}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>Role</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                        formData.role === role.value
                          ? "border-gray-300 hover:bg-base-100 text-gray-200"
                          : "border-gray-300 hover:bg-base-100 text-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex items-center">
                        {role.icon}
                        <span className="text-sm font-medium">
                          {role.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.role && <p className={errorClasses}>{errors.role}</p>}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center ${
                  saving ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMember;