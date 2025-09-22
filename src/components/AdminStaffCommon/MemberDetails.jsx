import React from 'react';
import {FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft, FaEdit , FaTrash} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { authApiClient } from '../../services/apiServices';
import toast, { Toaster } from 'react-hot-toast';

const MemberDetails = () => {
    const { member } = useLocation().state;
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    // const isAdmin = true;

    // Format date to a more readable format
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        // Handle edit functionality
        console.log('Edit member:', member.id);
        navigate(`/admin/members/edit/${member.id}`, { state: { member } });
    };

    const handleDelete =async () => {
        // Handle delete functionality
        console.log('Delete member:', member.id);
        // navigate(`/admin/members/delete/${member.id}`, { state: { member } });
        try {
            toast.loading("Deleting member...");
           const response = await authApiClient.delete(`user-list/${member.id}/`); 
           console.log(response);
           navigate('/admin/members');
           toast.success("Member deleted successfully");
        } catch (error) {
            toast.error("Failed to delete member");
            console.log(error);
        }finally{
            toast.dismiss();
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Members
                    </button>
                    {isAdmin && (
                        <>
                        <button
                        onClick={handleDelete}
                        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        <FaTrash className="mr-2" />
                        Delete Member
                    </button>
                        <button
                            onClick={handleEdit}
                            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                            <FaEdit className="mr-2" />
                            Edit Member
                        </button>
                        </>
                    )}
                </div>

                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 text-white border-b border-gray-700">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center ring-4 ring-blue-500/20">
                                    {member.profile_picture_url ? (
                                        <img 
                                            className="h-24 w-24 rounded-full object-cover" 
                                            src={member.profile_picture_url} 
                                            alt={`${member.first_name} ${member.last_name}`} 
                                        />
                                    ) : (
                                        <FaUser className="h-12 w-12 text-gray-400" />
                                    )}
                                </div>
                                <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {member.role}
                                </span>
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-bold text-white">{member.first_name} {member.last_name}</h1>
                                <p className="text-gray-300 mt-1">Member since {formatDate(member.join_date)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-200 flex items-center">
                                    <FaUser className="mr-2 text-blue-400" />
                                    Contact Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start bg-gray-750 p-3 rounded-lg">
                                        <FaEnvelope className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-400">Email</p>
                                            <p className="text-gray-200">{member.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start bg-gray-750 p-3 rounded-lg">
                                        <FaPhone className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-400">Phone</p>
                                            <p className="text-gray-200">{member.phone_number || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start bg-gray-750 p-3 rounded-lg">
                                        <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-400">Address</p>
                                            <p className="text-gray-200">{member.address || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Membership Details */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-200 flex items-center">
                                    <FaCalendarAlt className="mr-2 text-blue-400" />
                                    Membership Details
                                </h2>
                                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-400">Membership Status</p>
                                            <p className="font-medium text-blue-400">Active</p>
                                        </div>
                                        <span className="px-3 py-1 text-xs font-semibold bg-green-900/30 text-green-400 rounded-full border border-green-400/30">
                                            Verified
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-400">Member Since</p>
                                        <p className="text-gray-200">{formatDate(member.join_date)}</p>
                                    </div>
                                </div>

                                {/* Additional Stats */}
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="bg-gray-750 p-4 rounded-lg text-center border border-gray-700">
                                        <p className="text-2xl font-bold text-blue-400">12</p>
                                        <p className="text-xs text-gray-400">Classes Attended</p>
                                    </div>
                                    <div className="bg-gray-750 p-4 rounded-lg text-center border border-gray-700">
                                        <p className="text-2xl font-bold text-blue-400">3</p>
                                        <p className="text-xs text-gray-400">Active Bookings</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-1">
                                Send Message
                            </button>
                            <button className="px-4 py-2 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors flex-1">
                                View Activity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;