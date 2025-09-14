import React, { useState, useEffect } from 'react';
import { 
  FaFileExport, 
  FaFilePdf, 
  FaFileCsv, 
  FaChartBar, 
  FaChartLine, 
  FaCalendarAlt,
  FaDownload,
  FaSyncAlt,
  FaFileExcel,
  FaCheck,
  FaTimes,
  FaUser,
  FaFileInvoice,
  FaMoneyBillWave,
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const reportTypes = [
    { id: 'attendance', label: 'Attendance Report' },
    { id: 'feedback', label: 'Feedback Report' },
    { id: 'membership', label: 'Membership Report' },
    { id: 'payment', label: 'Payment Report' },
  ];

//   const fetchReportData = async (type) => {
//     setIsLoading(true);
//     try {
//       let endpoint = '';
//       switch(type) {
//         case 'attendance':
//           endpoint = '/api/v1/reports/attendance-reports/';
//           break;
//         case 'feedback':
//           endpoint = '/api/v1/reports/feedback-reports/';
//           break;
//         case 'membership':
//           endpoint = '/api/v1/reports/membership-reports/';
//           break;
//         case 'payment':
//           endpoint = '/api/v1/reports/payment-reports/';
//           break;
//         default:
//           return;
//       }

//       // Add date range parameters
//       const params = new URLSearchParams({
//         start_date: startDate.toISOString().split('T')[0],
//         end_date: endDate.toISOString().split('T')[0]
//       });

//       const response = await fetch(`${endpoint}?${params}`);
//       const data = await response.json();
//       setReportData(data.data);
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
const fetchReportData = async (type) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let mockData = {};
  
      switch(type) {
        case 'attendance':
          mockData = {
            stats: {
              total_attendance: 85,
              total_members: 120,
              absent: 15,
              present: 70,
              present_percentage: 82.4,
              absent_percentage: 17.6
            },
            report: Array.from({ length: 10 }, (_, i) => ({
              present: Math.random() > 0.2,
              booking_data: {
                member_name: `Member ${i + 1}`,
                class_data: {
                  title: `Class ${i % 3 === 0 ? 'Yoga' : i % 3 === 1 ? 'HIIT' : 'Zumba'} ${Math.floor(i / 3) + 1}`
                }
              },
              marked_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
            }))
          };
          break;
  
        case 'feedback':
          const ratings = Array.from({ length: 10 }, (_, i) => ({
            rating: i + 1,
            count: Math.floor(Math.random() * 15) + 1
          }));
          
          mockData = {
            stats: {
              total_feedback: ratings.reduce((sum, r) => sum + r.count, 0),
              total_members: 85,
              total_positive: ratings.slice(7).reduce((sum, r) => sum + r.count, 0),
              total_negative: ratings.slice(0, 4).reduce((sum, r) => sum + r.count, 0),
              total_neutral: ratings.slice(4, 7).reduce((sum, r) => sum + r.count, 0),
              average_rating: (ratings.reduce((sum, r) => sum + (r.rating * r.count), 0) / 
                             ratings.reduce((sum, r) => sum + r.count, 0)).toFixed(1),
              rating_distribution: ratings
            },
            report: Array.from({ length: 15 }, (_, i) => ({
              member: i + 1,
              member_name: `Member ${i + 1}`,
              fitness_class: (i % 5) + 1,
              class_name: `Class ${['Yoga', 'HIIT', 'Zumba', 'Pilates', 'CrossFit'][i % 5]}`,
              rating: Math.floor(Math.random() * 10) + 1,
              comment: `This is a sample feedback comment ${i + 1} about the class.`
            }))
          };
          break;
  
        case 'membership':
          const statuses = ['ACTIVE', 'EXPIRED', 'CANCELLED', 'PENDING'];
          mockData = {
            stats: {
              total_subscriptions: 120,
              total_members: 100,
              total_active: 85,
              total_inactive: 15,
              total_cancelled: 10,
              total_expiring: 5,
              total_expired: 15,
              total_auto_renew: 70
            },
            report: Array.from({ length: 20 }, (_, i) => {
              const status = statuses[Math.floor(Math.random() * statuses.length)];
              const startDate = new Date();
              startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 12));
              const endDate = new Date(startDate);
              endDate.setMonth(endDate.getMonth() + (status === 'ACTIVE' ? 1 : -1));
              
              return {
                member: i + 1,
                member_name: `Member ${i + 1}`,
                plan: (i % 3) + 1,
                plan_name: ['Basic', 'Premium', 'VIP'][i % 3],
                status,
                auto_renew: Math.random() > 0.3,
                start_date: startDate.toISOString().split('T')[0],
                end_date: endDate.toISOString().split('T')[0]
              };
            })
          };
          break;
  
        case 'payment':
          mockData = {
            stats: {
              total_paid: '$12,450.00',
              total_outstanding: '$1,250.50',
              total_invoices: 45,
              total_payments: 42
            },
            report: Array.from({ length: 15 }, (_, i) => {
              const status = Math.random() > 0.2 ? 'PAID' : 'PENDING';
              const amount = (Math.random() * 500 + 50).toFixed(2);
              const paidAmount = status === 'PAID' ? amount : (Math.random() * parseFloat(amount)).toFixed(2);
              
              return {
                invoice_number: `INV-${1000 + i}`,
                member_email: `member${i + 1}@example.com`,
                invoice_total: `$${amount}`,
                total_paid: `$${paidAmount}`,
                outstanding_balance: status === 'PAID' ? '$0.00' : `$${(amount - paidAmount).toFixed(2)}`,
                status,
                payments: status === 'PAID' ? [{
                  reference: `ref-${Math.random().toString(36).substr(2, 8)}`,
                  amount: `$${paidAmount}`,
                  currency: 'USD',
                  status: 'PAID',
                  paid_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
                }] : []
              };
            })
          };
          break;
  
        default:
          return;
      }
  
      setReportData(mockData);
    } catch (error) {
      console.error('Error with mock data:', error);
      setReportData(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchReportData(activeTab);
  }, [activeTab, startDate, endDate]);

  const handleExport = (format) => {
    // Implement export functionality
    console.log(`Exporting ${activeTab} report as ${format}`);
  };

  const renderReportContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!reportData) {
      return <div className="text-center py-10">No data available for the selected period.</div>;
    }

    switch (activeTab) {
      case 'attendance':
        return renderAttendanceReport();
      case 'feedback':
        return renderFeedbackReport();
      case 'membership':
        return renderMembershipReport();
      case 'payment':
        return renderPaymentReport();
      default:
        return null;
    }
  };

  const renderAttendanceReport = () => {
    const stats = reportData?.stats || {};
    const report = reportData?.report || [];
    
    const chartData = {
      labels: ['Present', 'Absent'],
      datasets: [
        {
          label: 'Attendance',
          data: [stats.present || 0, stats.absent || 0],
          backgroundColor: ['#10B981', '#EF4444'],
        },
      ],
    };

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Attendance" 
            value={stats.total_attendance || 0} 
            icon={<FaChartBar className="text-blue-500" />} 
          />
          <StatCard 
            title="Present" 
            value={`${stats.present_percentage || 0}%`} 
            icon={<FaCheck className="text-green-500" />} 
          />
          <StatCard 
            title="Absent" 
            value={`${stats.absent_percentage || 0}%`} 
            icon={<FaTimes className="text-red-500" />} 
          />
          <StatCard 
            title="Total Members" 
            value={stats.total_members || 0} 
            icon={<FaUser className="text-purple-500" />} 
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
          <div className="h-64">
            <Bar 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }} 
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Attendance Details</h3>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.booking_data?.member_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.booking_data?.class_data?.title || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.present ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.marked_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderFeedbackReport = () => {
    const stats = reportData?.stats || {};
    const report = reportData?.report || [];
    
    const ratingDistribution = stats.rating_distribution?.map(item => item.count) || [];
    const ratingLabels = stats.rating_distribution?.map(item => `${item.rating} Stars`) || [];

    const chartData = {
      labels: ratingLabels,
      datasets: [
        {
          label: 'Rating Distribution',
          data: ratingDistribution,
          backgroundColor: [
            '#EF4444', '#F59E0B', '#FBBF24', '#84CC16', '#10B981', 
            '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'
          ].slice(0, ratingLabels.length),
        },
      ],
    };

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Feedback" 
            value={stats.total_feedback || 0} 
            icon={<FaChartBar className="text-blue-500" />} 
          />
          <StatCard 
            title="Average Rating" 
            value={stats.average_rating ? `${stats.average_rating}/10` : 'N/A'} 
            icon={<FaChartLine className="text-green-500" />} 
          />
          <StatCard 
            title="Positive" 
            value={stats.total_positive || 0} 
            icon={<FaCheck className="text-green-500" />} 
          />
          <StatCard 
            title="Negative" 
            value={stats.total_negative || 0} 
            icon={<FaTimes className="text-red-500" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
            <div className="h-64">
              <Pie 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }} 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Rating Trend</h3>
            <div className="h-64">
              <Line 
                data={{
                  labels: ratingLabels,
                  datasets: [
                    {
                      label: 'Rating Count',
                      data: ratingDistribution,
                      borderColor: '#3B82F6',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      tension: 0.3,
                      fill: true,
                    },
                  ],
                }} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }} 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Feedback Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.member_name || `Member ${item.member}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.class_name || `Class ${item.fitness_class}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(item.rating / 2) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm font-medium text-gray-500">
                          {item.rating}/10
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {item.comment || 'No comment'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderMembershipReport = () => {
    const stats = reportData?.stats || {};
    const report = reportData?.report || [];
    
    const chartData = {
      labels: ['Active', 'Inactive', 'Expired', 'Expiring Soon'],
      datasets: [
        {
          label: 'Membership Status',
          data: [
            stats.total_active || 0,
            stats.total_inactive || 0,
            stats.total_expired || 0,
            stats.total_expiring || 0,
          ],
          backgroundColor: [
            '#10B981', // Green for active
            '#6B7280', // Gray for inactive
            '#EF4444', // Red for expired
            '#F59E0B', // Yellow for expiring
          ],
        },
      ],
    };

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Subscriptions" 
            value={stats.total_subscriptions || 0} 
            icon={<FaChartBar className="text-blue-500" />} 
          />
          <StatCard 
            title="Active" 
            value={stats.total_active || 0} 
            icon={<FaCheck className="text-green-500" />} 
          />
          <StatCard 
            title="Expired" 
            value={stats.total_expired || 0} 
            icon={<FaTimes className="text-red-500" />} 
          />
          <StatCard 
            title="Expiring Soon" 
            value={stats.total_expiring || 0} 
            icon={<FaCalendarAlt className="text-yellow-500" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Membership Status</h3>
            <div className="h-64">
              <Pie 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }} 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Membership Growth</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <p>Membership growth chart would be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Membership Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auto Renew</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.member_name || `Member ${item.member}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.plan_name || `Plan ${item.plan}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                          item.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                          item.status === 'CANCELLED' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.auto_renew ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {item.auto_renew ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentReport = () => {
    const stats = reportData?.stats || {};
    const report = reportData?.report || [];
    
    // Calculate payment status distribution
    const paidAmount = parseFloat(stats.total_paid?.replace('$', '') || 0);
    const outstandingAmount = parseFloat(stats.total_outstanding?.replace('$', '') || 0);
    const totalAmount = paidAmount + outstandingAmount;
    const paidPercentage = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;
    const outstandingPercentage = 100 - paidPercentage;

    const chartData = {
      labels: ['Paid', 'Outstanding'],
      datasets: [
        {
          data: [paidPercentage, outstandingPercentage],
          backgroundColor: ['#10B981', '#EF4444'],
        },
      ],
    };

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Invoices" 
            value={stats.total_invoices || 0} 
            icon={<FaFileInvoice className="text-blue-500" />} 
          />
          <StatCard 
            title="Total Paid" 
            value={stats.total_paid || '$0.00'} 
            icon={<FaCheck className="text-green-500" />} 
          />
          <StatCard 
            title="Outstanding" 
            value={stats.total_outstanding || '$0.00'} 
            icon={<FaTimes className="text-red-500" />} 
          />
          <StatCard 
            title="Total Payments" 
            value={stats.total_payments || 0} 
            icon={<FaMoneyBillWave className="text-green-500" />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
            <div className="h-64">
              <Pie 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.label}: $${(context.raw * totalAmount / 100).toFixed(2)} (${context.raw.toFixed(1)}%)`;
                        }
                      }
                    }
                  },
                }} 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Trend</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <p>Payment trend chart would be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('csv')}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaFileCsv className="mr-2 h-4 w-4" />
                Export CSV
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaFilePdf className="mr-2 h-4 w-4 text-red-500" />
                Export PDF
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.invoice_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.member_email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.invoice_total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.total_paid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          item.status === 'PAID' ? 'bg-green-100 text-green-800' :
                          item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.payments?.[0]?.paid_at ? 
                        new Date(item.payments[0].paid_at).toLocaleDateString() : 
                        'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewInvoice(item.invoice_number)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const handleViewInvoice = (invoiceNumber) => {
    // Implement view invoice functionality
    console.log('View invoice:', invoiceNumber);
  };

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reports Dashboard</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={new Date()}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              dateFormat="MMM d, yyyy"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date()}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              dateFormat="MMM d, yyyy"
            />
          </div>
          <button
            onClick={() => fetchReportData(activeTab)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaSyncAlt className="mr-2 h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex overflow-x-auto">
            {reportTypes.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mb-6">
        {renderReportContent()}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Export Report</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleExport('pdf')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FaFilePdf className="mr-2 h-5 w-5" />
            Export as PDF
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaFileCsv className="mr-2 h-5 w-5" />
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaFileExcel className="mr-2 h-5 w-5" />
            Export as Excel
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, className = '' }) => {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;