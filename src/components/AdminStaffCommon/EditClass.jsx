import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { authApiClient } from "../../services/apiServices";
import { toast } from "react-hot-toast";
import {
  FaArrowLeft,
  FaSave,
  FaTrash,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaDollarSign,
  FaMapMarkerAlt,
  FaUserAlt,
} from "react-icons/fa";

const EditClass = () => {
  const { state } = useLocation();
  const { cls: initialData } = state || {};
  const navigate = useNavigate();
  const { isAdmin, isStaff } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
      capacity: 20,
      price_cents: 0,
      duration_minutes: 45,
      start_datetime: "",
      end_datetime: "",
      location: "",
      is_active: true,
      instructor: "",
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      await authApiClient.put(`fitness-classes/${initialData.id}/`, data);
      toast.success("Class updated successfully");
      navigate(isAdmin ? "/admin/classes" : "/staff/classes");
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error("Failed to update class");
    }
  };
 

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this class? This action cannot be undone."
      )
    ) {
      try {
        await authApiClient.delete(`fitness-classes/${initialData.id}/`);
        toast.success("Class deleted successfully");
        navigate(isAdmin ? "/admin/classes" : "/staff/classes");
      } catch (error) {
        console.error("Error deleting class:", error);
        toast.error("Failed to delete class");
      }
    }
  };

  const handleBack = () => {
    navigate(isAdmin ? "/admin/classes" : "/staff/classes");
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Classes
        </button>
      </div>

      <div className="bg-base-300 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-300 mb-6">Edit Class</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Class Title</span>
            </label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    type="text"
                    className={`input input-bordered w-full pl-10 ${
                      errors.title ? "input-error" : ""
                    }`}
                    placeholder="Enter class title"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserAlt className="text-gray-400" />
                  </div>
                </div>
              )}
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300 block">
                Description
              </span>
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`textarea textarea-bordered h-24 block w-full${
                    errors.description ? "textarea-error" : ""
                  }`}
                  placeholder="Enter class description"
                />
              )}
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capacity */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaUsers className="mr-2" /> Capacity
                </span>
              </label>
              <Controller
                name="capacity"
                control={control}
                rules={{
                  required: "Capacity is required",
                  min: { value: 1, message: "Capacity must be at least 1" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="1"
                    className={`input input-bordered w-full ${
                      errors.capacity ? "input-error" : ""
                    }`}
                  />
                )}
              />
              {errors.capacity && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.capacity.message}
                  </span>
                </label>
              )}
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaDollarSign className="mr-2" /> Price (cents)
                </span>
              </label>
              <Controller
                name="price_cents"
                control={control}
                rules={{
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="0"
                    className={`input input-bordered w-full ${
                      errors.price_cents ? "input-error" : ""
                    }`}
                  />
                )}
              />
              {errors.price_cents && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.price_cents.message}
                  </span>
                </label>
              )}
            </div>

            {/* Duration */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaClock className="mr-2" /> Duration (minutes)
                </span>
              </label>
              <Controller
                name="duration_minutes"
                control={control}
                rules={{
                  required: "Duration is required",
                  min: {
                    value: 1,
                    message: "Duration must be at least 1 minute",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="1"
                    className={`input input-bordered w-full ${
                      errors.duration_minutes ? "input-error" : ""
                    }`}
                  />
                )}
              />
              {errors.duration_minutes && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.duration_minutes.message}
                  </span>
                </label>
              )}
            </div>

            {/* Instructor */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaUserAlt className="mr-2" /> Instructor ID
                </span>
              </label>
              <Controller
                name="instructor"
                control={control}
                rules={{
                  required: "Instructor is required",
                  min: { value: 1, message: "Invalid instructor ID" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="1"
                    className={`input input-bordered w-full ${
                      errors.instructor ? "input-error" : ""
                    }`}
                  />
                )}
              />
              {errors.instructor && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.instructor.message}
                  </span>
                </label>
              )}
            </div>

            {/* Start Datetime */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaCalendarAlt className="mr-2" /> Start Date & Time
                </span>
              </label>
              <Controller
                name="start_datetime"
                control={control}
                rules={{ required: "Start date and time is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="datetime-local"
                    className={`input input-bordered w-full ${
                      errors.start_datetime ? "input-error" : ""
                    }`}
                  />
                )}
              />
              {errors.start_datetime && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.start_datetime.message}
                  </span>
                </label>
              )}
            </div>

            {/* End Datetime */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaCalendarAlt className="mr-2" /> End Date & Time
                </span>
              </label>
              <Controller
                name="end_datetime"
                control={control}
                rules={{ required: "End date and time is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="datetime-local"
                    className={`input input-bordered w-full ${
                      errors.end_datetime ? "input-error" : ""
                    }`}
                  />
                )}
              />
              {errors.end_datetime && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.end_datetime.message}
                  </span>
                </label>
              )}
            </div>

            {/* Location */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text text-gray-300 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Location
                </span>
              </label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.location ? "input-error" : ""
                    }`}
                    placeholder="Enter class location"
                  />
                )}
              />
              {errors.location && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.location.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Active Status */}
          <div className="form-control">
            <label className="cursor-pointer label justify-start">
              <Controller
                name="is_active"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="toggle toggle-primary mr-2"
                  />
                )}
              />
              <span className="label-text text-gray-300">Active</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              <FaTrash className="mr-2" />
              Delete
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              <FaSave className="mr-2" />
               Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClass;
