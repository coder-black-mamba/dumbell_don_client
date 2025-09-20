import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaExclamationTriangle, FaSync } from "react-icons/fa";
import { authApiClient } from "../../services/apiServices";
import AttendenceCard from "./AttendenceCard";
import { div } from "framer-motion/client";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";
// Constants
const ITEMS_PER_PAGE = 10;

const Attendance = () => {
  // State
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch attendance data
  const fetchAttendance = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    setRefreshing(true);

    try {
      const response = await authApiClient.get("classes/attendance/");
      setAttendance(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setError(
        err.response?.data?.message || "Failed to fetch attendance records"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAttendance();
  }, []);

  // Calculate pagination
  // const totalPages = Math.ceil(attendance.length / ITEMS_PER_PAGE);
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const paginatedAttendance = attendance.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handlers
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    fetchAttendance(true);
  };

  if (loading) {
    return (
      <div class="my-6">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-6">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {attendance.map((item) => (
          <AttendenceCard key={item.id} attendance={item} />
        ))}
      </div>
    </div>
  );
};

export default Attendance;
