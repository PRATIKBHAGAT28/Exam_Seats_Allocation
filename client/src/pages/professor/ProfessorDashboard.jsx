import React, { useEffect, useState } from 'react';
import { getMyExams } from '../../services/exam.service';
import { allocateSeats, getSeatsByExam } from '../../services/seat.service';
import { useNavigate } from 'react-router-dom';

const ProfessorDashboard = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyExams();
  }, []);

  const fetchMyExams = async () => {
    try {
      const response = await getMyExams();
      setExams(response.data.exams);
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAllocateSeats = async (examId) => {
    try {
      await allocateSeats(examId);
      alert('Seats allocated successfully!');
      fetchMyExams();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to allocate seats');
      console.error('Failed to allocate seats:', error);
    }
  };

  const handleViewAllocation = async (examId) => {
    try {
      const response = await getSeatsByExam(examId);
      console.log('Seat allocations:', response.data);
      alert(`Total seats allocated: ${response.data.seats.length}`);
    } catch (error) {
      console.error('Failed to fetch allocations:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <nav className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Professor Dashboard</h1>
                <p className="text-emerald-100 text-sm">Welcome, {user.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2.5 rounded-lg hover:bg-red-600 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">My Exams</h2>
            <p className="text-gray-600">Manage and organize your exam schedules</p>
          </div>
          <button
            onClick={() => navigate('/professor/create-exam')}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create New Exam</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your exams...</p>
          </div>
        ) : exams.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Exams Created Yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first exam</p>
            <button
              onClick={() => navigate('/professor/create-exam')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Exam</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam, index) => (
              <div
                key={exam._id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
                    {exam.subject}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${exam.isAllocated ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {exam.isAllocated ? '✓ Allocated' : '⏳ Pending'}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{new Date(exam.examDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>

                  <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{exam.startTime} - {exam.endTime} ({exam.duration} min)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 px-3 py-2 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Department</p>
                      <p className="text-sm font-semibold text-gray-800">{exam.department}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 px-3 py-2 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Semester</p>
                      <p className="text-sm font-semibold text-gray-800">Sem {exam.semester}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Total Seats</p>
                    <p className="text-lg font-bold text-blue-600">{exam.totalSeats}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {!exam.isAllocated ? (
                    <button
                      onClick={() => handleAllocateSeats(exam._id)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>Allocate Seats</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleViewAllocation(exam._id)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Allocation</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorDashboard;
