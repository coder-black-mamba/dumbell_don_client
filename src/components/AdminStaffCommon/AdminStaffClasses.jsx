import React, { useState, useEffect } from 'react';
import SingleClass from './SingleClass';
import {  FaPlus, FaSearch  } from 'react-icons/fa';
import Loader from "../common/Loader"
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { authApiClient } from '../../services/apiServices';
import ErrorMessage from '../common/ErrorMessage'


const AdminStaffClasses = () => {
  const [classes, setClasses] = useState();
  const [filteredClasses,setFilteredClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');  
  const { isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();
  

  // Load classes
  useEffect(() => {
    const fetchClasses= async ()=>{
      setLoading(true);
      try {
        const response=await authApiClient.get('fitness-classes/');
        setClasses(response.data.data);
        setFilteredClasses(response.data.data.results)
      } catch (error) {
        console.log(error)
        setError(error)
      }finally{
        setLoading(false);
      }
    }
    fetchClasses();
  }, []);
 

  // Filter classes based on search term
  // const filteredClasses = classes?.filter(cls => 
  //   cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   cls.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   cls.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleAddClass = () => {
    if (isAdmin) {
      navigate(`/admin/classes/add`);
    } else if (isStaff) {
      navigate(`/staff/classes/add`);
    } else {
      navigate("/unauthorized");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.length > 0) {
      const filtered = classes?.results?.filter((cls) =>
        `${cls.name} ${cls.instructor}`.toLowerCase().includes(value.toLowerCase()) ||
        cls.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classes?.results);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader/>
      </div>
    );
  }

  if(error){
    return (
      <div className="flex justify-center items-center h-64">
         <ErrorMessage message={"Something Went Wrong PLease Try Again"}/>
      </div>
    );
  }

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-200 mb-4 md:mb-0">Classes </h1>
        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search classes..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={handleAddClass}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Add Class
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredClasses?.length > 0 ? (
          filteredClasses?.map((cls) => (
            <SingleClass cls={cls} key={cls.id}/>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No classes found. Create your first class to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStaffClasses;