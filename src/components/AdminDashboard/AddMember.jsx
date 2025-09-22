import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaUserShield,
  FaUserTie,
  FaUserAlt,
} from "react-icons/fa";
import { authApiClient } from "../../services/apiServices";
import toast, { Toaster } from 'react-hot-toast';

const AddMember = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      role: "MEMBER",
      is_active: true,
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    toast.loading("Adding member...");

    try {
      const userData = {
        email: data.email.trim(),
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        address: data.address.trim(),
        phone_number: data.phone_number.trim(),
        role: data.role,
        is_active: data.is_active,
        password: data.password,
      };

      await authApiClient.post("user-list/", userData);
      toast.success("Member added successfully");
      navigate("/admin/members");
    } catch (error) {
      console.error("Error adding member:", error);
      const errorMessage = error.response?.data?.message || "Failed to add member";
      toast.error(errorMessage);
    }finally{
      toast.dismiss();
    }
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClasses = "block text-sm font-medium mb-1 text-gray-300";
  const errorClasses = "text-red-500 text-sm mt-1";

  // Available roles with icons
  const roles = [
    { value: "ADMIN", label: "Admin", icon: <FaUserShield className="mr-2" /> },
    { value: "STAFF", label: "Staff", icon: <FaUserTie className="mr-2" /> },
    { value: "MEMBER", label: "Member", icon: <FaUserAlt className="mr-2" /> },
  ];

  return (
    <div className="min-h-screen p-6 bg-transparent">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-lg shadow-lg bg-base-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-200">Add New Member</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    {...register("first_name", { required: "First name is required" })}
                    className={`${inputClasses} ${
                      errors.first_name ? "border-red-500" : ""
                    } pl-10`}
                    placeholder="John"
                  />
                </div>
                {errors.first_name && (
                  <p className={errorClasses}>{errors.first_name.message}</p>
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
                    {...register("last_name", { required: "Last name is required" })}
                    className={`${inputClasses} ${
                      errors.last_name ? "border-red-500" : ""
                    } pl-10`}
                    placeholder="Doe"
                  />
                </div>
                {errors.last_name && (
                  <p className={errorClasses}>{errors.last_name.message}</p>
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`${inputClasses} ${
                      errors.email ? "border-red-500" : ""
                    } pl-10`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className={errorClasses}>{errors.email.message}</p>
                )}
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
                    {...register("phone_number", {
                      pattern: {
                        value: /^\+?[0-9\s-]+$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    className={`${inputClasses} ${
                      errors.phone_number ? "border-red-500" : ""
                    } pl-10`}
                    placeholder="+1234567890"
                  />
                </div>
                {errors.phone_number && (
                  <p className={errorClasses}>{errors.phone_number.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className={labelClasses}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`${inputClasses} ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className={errorClasses}>{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirm_password" className={labelClasses}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirm_password"
                    {...register("confirm_password", {
                      required: "Please confirm your password",
                    })}
                    className={`${inputClasses} ${
                      errors.confirm_password ? "border-red-500" : ""
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirm_password && (
                  <p className={errorClasses}>{errors.confirm_password.message}</p>
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
                    {...register("address")}
                    className={`${inputClasses} ${
                      errors.address ? "border-red-500" : ""
                    } pl-10 min-h-[100px]`}
                    placeholder="123 Main St, City, Country"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>Role</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                        role.value === register("role").value
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("role")}
                        value={role.value}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex items-center">
                        {role.icon}
                        <span className="text-sm font-medium text-gray-200">
                          {role.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    {...register("is_active")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                  />
                  <label
                    htmlFor="is_active"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Active Account
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
                    Adding...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Add Member
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

export default AddMember;