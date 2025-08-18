import React, { useState, useEffect } from 'react';
import { User, MapPin, Star, DollarSign, Clock, MessageCircle, Settings, Plus, Search, Filter, Heart, Shield, Bell, Edit, Trash2, Check, X, AlertTriangle, Flag, Eye, Ban, UserPlus, Send, Calendar, Phone, Mail, Home, ChevronDown, ChevronUp } from 'lucide-react';

const NeighborHub = () => {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'job_applied', message: 'Mike Chen applied for your lawn care job', time: '2 hours ago', read: false },
    { id: 2, type: 'job_completed', message: 'Your snow removal job has been completed', time: '1 day ago', read: false },
    { id: 3, type: 'new_review', message: 'You received a 5-star review', time: '2 days ago', read: true }
  ]);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Lawn Care & Yard Work",
      description: "Need help with weekly lawn mowing and hedge trimming. Front and back yard. Tools will be provided.",
      category: "Lawn Care",
      payment: 30,
      paymentType: "hourly",
      location: "Oak Street, Ashbury Heights",
      urgency: "Flexible",
      datePosted: "2024-01-15",
      timePosted: "2 hours ago",
      poster: "Sarah Johnson",
      posterId: 1,
      posterRating: 4.8,
      status: "open",
      applicants: [],
      images: [],
      notes: "Please be careful around the flower beds"
    },
    {
      id: 2,
      title: "Babysitting - Saturday Evening",
      description: "Looking for reliable babysitter for 2 kids (ages 6 & 8) from 6pm-10pm. Kids are well-behaved and will mostly watch movies.",
      category: "Childcare",
      payment: 15,
      paymentType: "hourly",
      location: "Maple Drive, Ashbury Heights",
      urgency: "Scheduled",
      datePosted: "2024-01-14",
      timePosted: "1 day ago",
      poster: "Mike Chen",
      posterId: 2,
      posterRating: 4.9,
      status: "open",
      applicants: [],
      images: [],
      notes: "Must have childcare experience"
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "sarah_j",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 123-4567",
      address: "123 Oak Street, Ashbury Heights",
      dateOfBirth: "1985-03-15",
      rating: 4.8,
      reviews: 23,
      verified: true,
      backgroundCheck: true,
      role: "user",
      skills: ["Organization", "Communication", "Time Management"],
      bio: "Reliable neighbor always happy to help with various tasks around the community.",
      joinDate: "2023-06-15",
      completedJobs: 15,
      totalEarned: 450,
      completionRate: 98,
      blockedUsers: [],
      favoriteUsers: [],
      jobsPosted: 8,
      status: "active",
      lastActive: "2024-01-15T10:30:00"
    },
    {
      id: 2,
      username: "mike_c",
      name: "Mike Chen",
      email: "mike@example.com",
      phone: "(555) 234-5678",
      address: "456 Maple Drive, Ashbury Heights",
      dateOfBirth: "1990-07-22",
      rating: 4.9,
      reviews: 31,
      verified: true,
      backgroundCheck: true,
      role: "user",
      skills: ["Lawn Care", "Home Repair", "Snow Removal"],
      bio: "Experienced handyman with 10+ years of home maintenance experience.",
      joinDate: "2023-04-10",
      completedJobs: 28,
      totalEarned: 840,
      completionRate: 100,
      blockedUsers: [],
      favoriteUsers: [1],
      jobsPosted: 5,
      status: "active",
      lastActive: "2024-01-15T09:15:00"
    },
    {
      id: 3,
      username: "admin",
      name: "HOA Admin",
      email: "admin@ashburyheights.com",
      phone: "(555) 345-6789",
      address: "789 Community Center, Ashbury Heights",
      dateOfBirth: "1975-12-01",
      rating: 5.0,
      reviews: 0,
      verified: true,
      backgroundCheck: true,
      role: "admin",
      skills: ["Community Management", "Conflict Resolution"],
      bio: "Official HOA administrator managing community services.",
      joinDate: "2023-01-01",
      completedJobs: 0,
      totalEarned: 0,
      completionRate: 100,
      blockedUsers: [],
      favoriteUsers: [],
      jobsPosted: 0,
      status: "active",
      lastActive: "2024-01-15T11:00:00"
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      jobId: 1,
      senderId: 2,
      receiverId: 1,
      message: "Hi! I'm interested in your lawn care job. I have 5+ years experience.",
      timestamp: "2024-01-15T09:30:00",
      read: false
    }
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      reviewerId: 1,
      reviewedId: 2,
      jobId: 1,
      rating: 5,
      comment: "Excellent work on the lawn care. Very professional and thorough. Would definitely hire again!",
      date: "2024-01-13",
      reported: false
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    category: '',
    payment: '',
    paymentType: 'hourly',
    urgency: 'Flexible',
    notes: '',
    ageFilter: { min: 16, max: 65 }
  });

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const [filters, setFilters] = useState({
    category: '',
    minPayment: '',
    maxPayment: '',
    urgency: '',
    location: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Authentication Functions
  const handleLogin = (username, password) => {
    const user = users.find(u => u.username === username && u.status === 'active');
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setShowModal(null);
    setSelectedJob(null);
    setSelectedUser(null);
  };

  // Job Functions
  const handleCreateJob = () => {
    if (newJob.title && newJob.description && newJob.category && newJob.payment) {
      const job = {
        id: jobs.length + 1,
        ...newJob,
        payment: parseInt(newJob.payment),
        location: currentUser.address,
        datePosted: new Date().toISOString().split('T')[0],
        timePosted: "Just now",
        poster: currentUser.name,
        posterId: currentUser.id,
        posterRating: currentUser.rating,
        status: "open",
        applicants: [],
        images: []
      };
      setJobs([job, ...jobs]);
      setNewJob({ title: '', description: '', category: '', payment: '', paymentType: 'hourly', urgency: 'Flexible', notes: '', ageFilter: { min: 16, max: 65 } });
      setShowModal(null);
      setCurrentView('dashboard');
    }
  };

  const handleApplyForJob = (jobId) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        const isAlreadyApplied = job.applicants.some(app => app.userId === currentUser.id);
        if (!isAlreadyApplied) {
          return {
            ...job,
            applicants: [...job.applicants, {
              userId: currentUser.id,
              userName: currentUser.name,
              rating: currentUser.rating,
              appliedDate: new Date().toISOString(),
              status: 'pending'
            }]
          };
        }
      }
      return job;
    }));
    
    // Add notification for job poster
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setNotifications(prev => [...prev, {
        id: notifications.length + 1,
        type: 'job_applied',
        message: `${currentUser.name} applied for your "${job.title}" job`,
        time: 'Just now',
        read: false
      }]);
    }
    
    setShowModal(null);
  };

  const handleAcceptApplicant = (jobId, applicantUserId) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'assigned',
          applicants: job.applicants.map(app => ({
            ...app,
            status: app.userId === applicantUserId ? 'accepted' : 'rejected'
          }))
        };
      }
      return job;
    }));
  };

  const handleCompleteJob = (jobId) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, status: 'completed' };
      }
      return job;
    }));
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    setShowModal(null);
  };

  // User Management Functions
  const handleBlockUser = (userId) => {
    setUsers(users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          blockedUsers: [...user.blockedUsers, userId]
        };
      }
      return user;
    }));
  };

  const handleFavoriteUser = (userId) => {
    setUsers(users.map(user => {
      if (user.id === currentUser.id) {
        const isFavorite = user.favoriteUsers.includes(userId);
        return {
          ...user,
          favoriteUsers: isFavorite 
            ? user.favoriteUsers.filter(id => id !== userId)
            : [...user.favoriteUsers, userId]
        };
      }
      return user;
    }));
    setCurrentUser(prev => ({
      ...prev,
      favoriteUsers: prev.favoriteUsers.includes(userId)
        ? prev.favoriteUsers.filter(id => id !== userId)
        : [...prev.favoriteUsers, userId]
    }));
  };

  const handleSuspendUser = (userId) => {
    if (currentUser.role === 'admin') {
      setUsers(users.map(user => {
        if (user.id === userId) {
          return { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' };
        }
        return user;
      }));
    }
  };

  const handleVerifyUser = (userId) => {
    if (currentUser.role === 'admin') {
      setUsers(users.map(user => {
        if (user.id === userId) {
          return { ...user, verified: !user.verified };
        }
        return user;
      }));
    }
  };

  // Review Functions
  const handleSubmitReview = (reviewedUserId, jobId) => {
    const review = {
      id: reviews.length + 1,
      reviewerId: currentUser.id,
      reviewedId: reviewedUserId,
      jobId: jobId,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      reported: false
    };
    setReviews([...reviews, review]);
    
    // Update user rating
    const userReviews = reviews.filter(r => r.reviewedId === reviewedUserId);
    const avgRating = (userReviews.reduce((sum, r) => sum + r.rating, 0) + newReview.rating) / (userReviews.length + 1);
    
    setUsers(users.map(user => {
      if (user.id === reviewedUserId) {
        return { ...user, rating: Math.round(avgRating * 10) / 10, reviews: user.reviews + 1 };
      }
      return user;
    }));
    
    setNewReview({ rating: 5, comment: '' });
    setShowModal(null);
  };

  // Message Functions
  const handleSendMessage = (receiverId, jobId, message) => {
    const newMessage = {
      id: messages.length + 1,
      jobId: jobId,
      senderId: currentUser.id,
      receiverId: receiverId,
      message: message,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages([...messages, newMessage]);
  };

  // Filter Functions
  const getFilteredJobs = () => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filters.category || job.category === filters.category;
      const matchesMinPayment = !filters.minPayment || job.payment >= parseInt(filters.minPayment);
      const matchesMaxPayment = !filters.maxPayment || job.payment <= parseInt(filters.maxPayment);
      const matchesUrgency = !filters.urgency || job.urgency === filters.urgency;
      
      return matchesSearch && matchesCategory && matchesMinPayment && matchesMaxPayment && matchesUrgency;
    });
  };

  // Notification Functions
  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  // Login Component
  const LoginView = () => {
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    const attemptLogin = () => {
      const success = handleLogin(loginForm.username, loginForm.password);
      if (!success) {
        setLoginError('Invalid username or password');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={newJob.category}
              onChange={(e) => setNewJob({...newJob, category: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              <option value="Lawn Care">Lawn Care</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Childcare">Childcare</option>
              <option value="Pet Care">Pet Care</option>
              <option value="Snow Removal">Snow Removal</option>
              <option value="Home Repair">Home Repair</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Grocery Shopping">Grocery Shopping</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount *</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={newJob.payment}
                onChange={(e) => setNewJob({...newJob, payment: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="25"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
            <select
              value={newJob.paymentType}
              onChange={(e) => setNewJob({...newJob, paymentType: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="hourly">Per Hour</option>
              <option value="fixed">Fixed Price</option>
              <option value="daily">Per Day</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
            <div className="flex space-x-4">
              {['Flexible', 'Scheduled', 'ASAP'].map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value={option}
                    checked={newJob.urgency === option}
                    onChange={(e) => setNewJob({...newJob, urgency: e.target.value})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age Preferences</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum Age</label>
              <input
                type="number"
                value={newJob.ageFilter.min}
                onChange={(e) => setNewJob({...newJob, ageFilter: {...newJob.ageFilter, min: parseInt(e.target.value)}})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                min="13"
                max="100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum Age</label>
              <input
                type="number"
                value={newJob.ageFilter.max}
                onChange={(e) => setNewJob({...newJob, ageFilter: {...newJob.ageFilter, max: parseInt(e.target.value)}})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                min="13"
                max="100"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
          <textarea
            value={newJob.notes}
            onChange={(e) => setNewJob({...newJob, notes: e.target.value})}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Any special instructions, requirements, or preferences..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowModal(null)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateJob}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Post Job
          </button>
        </div>
      </div>
    </ModalWrapper>
  );

  const JobDetailsModal = () => {
    if (!selectedJob) return null;

    const isMyJob = selectedJob.posterId === currentUser?.id;
    const hasApplied = selectedJob.applicants.some(app => app.userId === currentUser?.id);
    const myApplication = selectedJob.applicants.find(app => app.userId === currentUser?.id);

    return (
      <ModalWrapper title={selectedJob.title} onClose={() => setSelectedJob(null)}>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                selectedJob.urgency === 'ASAP' ? 'bg-red-100 text-red-800' :
                selectedJob.urgency === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {selectedJob.urgency}
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ml-2 ${
                selectedJob.status === 'open' ? 'bg-green-100 text-green-800' :
                selectedJob.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {selectedJob.status}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">${selectedJob.payment}</div>
              <div className="text-sm text-gray-500">per {selectedJob.paymentType}</div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{selectedJob.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Category</h3>
              <p className="text-gray-600">{selectedJob.category}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Posted</h3>
              <p className="text-gray-600">{selectedJob.timePosted}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-1">Location</h3>
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2" />
              {selectedJob.location}
            </div>
          </div>

          {selectedJob.notes && (
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Additional Notes</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedJob.notes}</p>
            </div>
          )}

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Posted By</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {selectedJob.poster.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{selectedJob.poster}</span>
                  {users.find(u => u.id === selectedJob.posterId)?.verified && (
                    <Shield size={16} className="text-green-500" />
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="text-yellow-400 fill-current mr-1" size={14} />
                  {selectedJob.posterRating} rating
                  <button
                    onClick={() => {
                      setSelectedUser(users.find(u => u.id === selectedJob.posterId));
                      setShowModal('user-details');
                    }}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {selectedJob.applicants.length > 0 && (isMyJob || currentUser?.role === 'admin') && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Applicants ({selectedJob.applicants.length})</h3>
              <div className="space-y-3">
                {selectedJob.applicants.map((applicant, index) => {
                  const applicantUser = users.find(u => u.id === applicant.userId);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-gray-600 text-sm">
                            {applicant.userName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{applicant.userName}</div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="text-yellow-400 fill-current mr-1" size={12} />
                            {applicant.rating}
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                              applicant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              applicant.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {applicant.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      {applicant.status === 'pending' && isMyJob && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAcceptApplicant(selectedJob.id, applicant.userId)}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            {!isMyJob && !hasApplied && selectedJob.status === 'open' && (
              <button
                onClick={() => handleApplyForJob(selectedJob.id)}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Apply for Job
              </button>
            )}
            {hasApplied && (
              <div className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg text-center font-medium">
                Application {myApplication?.status}
              </div>
            )}
            {isMyJob && (
              <div className="flex space-x-2 flex-1">
                <button
                  onClick={() => setShowModal('edit-job')}
                  className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
                >
                  Edit Job
                </button>
                {selectedJob.status === 'assigned' && (
                  <button
                    onClick={() => handleCompleteJob(selectedJob.id)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            )}
            <button 
              onClick={() => setShowModal('contact-poster')}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <MessageCircle size={20} />
            </button>
            <button 
              onClick={() => handleFavoriteUser(selectedJob.posterId)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Heart 
                size={20} 
                className={currentUser?.favoriteUsers.includes(selectedJob.posterId) ? 'text-red-500 fill-current' : ''} 
              />
            </button>
            <button 
              onClick={() => setShowModal('report-job')}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-red-600"
            >
              <Flag size={20} />
            </button>
          </div>
        </div>
      </ModalWrapper>
    );
  };

  const NotificationsModal = () => (
    <ModalWrapper title="Notifications" onClose={() => setShowModal(null)}>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
            }`}
            onClick={() => markNotificationAsRead(notification.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
              <div className="flex-1">
                <p className="text-gray-900">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No notifications yet
          </div>
        )}
      </div>
    </ModalWrapper>
  );

  const UserMenuModal = () => (
    <ModalWrapper title="Account Menu" onClose={() => setShowModal(null)}>
      <div className="space-y-4">
        <button
          onClick={() => {
            setShowModal(null);
            setCurrentView('profile');
          }}
          className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg"
        >
          <User size={20} />
          <span>My Profile</span>
        </button>
        <button
          onClick={() => setShowModal('settings')}
          className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg"
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button
          onClick={() => setShowModal('help')}
          className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg"
        >
          <AlertTriangle size={20} />
          <span>Help & Support</span>
        </button>
        <hr />
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg text-red-600"
        >
          <span>Sign Out</span>
        </button>
      </div>
    </ModalWrapper>
  );

  const EditProfileModal = () => {
    const [editedProfile, setEditedProfile] = useState({
      name: currentUser?.name || '',
      bio: currentUser?.bio || '',
      phone: currentUser?.phone || '',
      skills: currentUser?.skills || []
    });

    const handleSaveProfile = () => {
      setUsers(users.map(user => 
        user.id === currentUser.id 
          ? { ...user, ...editedProfile }
          : user
      ));
      setCurrentUser(prev => ({ ...prev, ...editedProfile }));
      setShowModal(null);
    };

    return (
      <ModalWrapper title="Edit Profile" onClose={() => setShowModal(null)}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Tell others about yourself, your experience, and what services you offer..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={editedProfile.phone}
              onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(null)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </ModalWrapper>
    );
  };

  const ReviewModal = () => (
    <ModalWrapper title="Leave a Review" onClose={() => setShowModal(null)}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setNewReview({...newReview, rating: star})}
                className={`text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Share your experience working with this person..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowModal(null)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmitReview(selectedJob?.posterId, selectedJob?.id)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </ModalWrapper>
  );

  // Main App Render
  return (
    <div className="app">
      {currentView === 'login' && <LoginView />}
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'my-jobs' && <MyJobsView />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'admin' && currentUser?.role === 'admin' && <AdminView />}
      
      {/* Modals */}
      {showModal === 'create-job' && <CreateJobModal />}
      {showModal === 'job-details' && selectedJob && <JobDetailsModal />}
      {showModal === 'notifications' && <NotificationsModal />}
      {showModal === 'userMenu' && <UserMenuModal />}
      {showModal === 'edit-profile' && <EditProfileModal />}
      {showModal === 'review' && <ReviewModal />}
      
      {/* Additional modals can be added here */}
      {showModal === 'confirm-delete-job' && selectedJob && (
        <ModalWrapper title="Confirm Delete" onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            <p className="text-gray-700">Are you sure you want to delete "{selectedJob.title}"? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteJob(selectedJob.id)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Job
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

export default NeighborHub;bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NeighborHub</h1>
            <p className="text-gray-600">Connect with your community</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={loginForm.username}
              onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && attemptLogin()}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && attemptLogin()}
            />
            {loginError && (
              <div className="text-red-600 text-sm">{loginError}</div>
            )}
            <button
              onClick={attemptLogin}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowModal('register')}
              className="w-full border border-indigo-600 text-indigo-600 p-3 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
            >
              Create Account
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo accounts:</p>
            <div className="text-xs space-y-1">
              <div>User: <code className="bg-white px-1">sarah_j</code> | Admin: <code className="bg-white px-1">admin</code></div>
              <div>Password: <code className="bg-white px-1">password</code></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Navigation Header
  const HeaderComponent = () => (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <Home className="text-white text-sm" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 cursor-pointer" onClick={() => setCurrentView('dashboard')}>NeighborHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell 
                className={`cursor-pointer ${getUnreadNotificationCount() > 0 ? 'text-indigo-600' : 'text-gray-500'} hover:text-gray-700`} 
                onClick={() => setShowModal('notifications')}
              />
              {getUnreadNotificationCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getUnreadNotificationCount()}
                </span>
              )}
            </div>
            <button onClick={() => setShowModal('messages')} className="text-gray-500 hover:text-gray-700">
              <MessageCircle size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 text-sm font-medium">
                  {currentUser?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 text-gray-700 font-medium"
                  onClick={() => setShowModal('userMenu')}
                >
                  <span>{currentUser?.name}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // Navigation Tabs
  const NavigationTabs = () => (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'dashboard' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Browse Jobs
          </button>
          <button
            onClick={() => setCurrentView('my-jobs')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'my-jobs' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Jobs
          </button>
          <button
            onClick={() => setShowModal('create-job')}
            className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm"
          >
            Post Job
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'profile' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Profile
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setCurrentView('admin')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                currentView === 'admin' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Admin Panel
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  // Dashboard View
  const DashboardView = () => {
    const filteredJobs = getFilteredJobs();
    const [showFilters, setShowFilters] = useState(false);

    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderComponent />
        <NavigationTabs />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Jobs</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter size={20} />
                  <span>Filter</span>
                </button>
                <button
                  onClick={() => setShowModal('create-job')}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Plus size={20} />
                  <span>Post Job</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="p-2 border rounded-lg"
                  >
                    <option value="">All Categories</option>
                    <option value="Lawn Care">Lawn Care</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Childcare">Childcare</option>
                    <option value="Pet Care">Pet Care</option>
                    <option value="Snow Removal">Snow Removal</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Min Payment"
                    value={filters.minPayment}
                    onChange={(e) => setFilters({...filters, minPayment: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max Payment"
                    value={filters.maxPayment}
                    onChange={(e) => setFilters({...filters, maxPayment: e.target.value})}
                    className="p-2 border rounded-lg"
                  />
                  <select
                    value={filters.urgency}
                    onChange={(e) => setFilters({...filters, urgency: e.target.value})}
                    className="p-2 border rounded-lg"
                  >
                    <option value="">All Urgency</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="ASAP">ASAP</option>
                  </select>
                  <button
                    onClick={() => setFilters({ category: '', minPayment: '', maxPayment: '', urgency: '', location: '' })}
                    className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No jobs found matching your criteria</div>
                <button
                  onClick={() => setShowModal('create-job')}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Post the First Job
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  // Job Card Component
  const JobCard = ({ job }) => {
    const isMyJob = job.posterId === currentUser?.id;
    const hasApplied = job.applicants.some(app => app.userId === currentUser?.id);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              job.urgency === 'ASAP' ? 'bg-red-100 text-red-800' :
              job.urgency === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {job.urgency}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleFavoriteUser(job.posterId)}
              className="text-gray-300 hover:text-red-500 transition-colors"
            >
              <Heart 
                size={20} 
                className={currentUser?.favoriteUsers.includes(job.posterId) ? 'text-red-500 fill-current' : ''} 
              />
            </button>
            {isMyJob && (
              <div className="flex space-x-1">
                <button
                  onClick={() => setShowModal('edit-job', job)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setShowModal('confirm-delete-job', job)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign size={16} className="mr-2" />
            ${job.payment}/{job.paymentType}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-2" />
            Posted {job.timePosted}
          </div>
          {job.applicants.length > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <UserPlus size={16} className="mr-2" />
              {job.applicants.length} applicant{job.applicants.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700">{job.poster}</span>
            <div className="flex items-center ml-2">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{job.posterRating}</span>
            </div>
            {users.find(u => u.id === job.posterId)?.verified && (
              <Shield size={14} className="text-green-500 ml-1" />
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedJob(job);
                setShowModal('job-details');
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              {isMyJob ? 'Manage' : hasApplied ? 'Applied' : 'View Details'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // My Jobs View
  const MyJobsView = () => {
    const myPostedJobs = jobs.filter(job => job.posterId === currentUser?.id);
    const myAppliedJobs = jobs.filter(job => job.applicants.some(app => app.userId === currentUser?.id));

    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderComponent />
        <NavigationTabs />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Jobs I've Posted</h2>
                <div className="space-y-4">
                  {myPostedJobs.map(job => (
                    <div key={job.id} className="bg-white rounded-lg shadow-sm border p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                            job.status === 'open' ? 'bg-green-100 text-green-800' :
                            job.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedJob(job);
                              setShowModal('job-applicants');
                            }}
                            className="text-indigo-600 hover:text-indigo-800 text-sm"
                          >
                            View Applicants ({job.applicants.length})
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-green-600">${job.payment}/{job.paymentType}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedJob(job);
                              setShowModal('edit-job');
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                          >
                            Edit
                          </button>
                          {job.status === 'assigned' && (
                            <button
                              onClick={() => handleCompleteJob(job.id)}
                              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {myPostedJobs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      You haven't posted any jobs yet.
                      <button
                        onClick={() => setShowModal('create-job')}
                        className="block mt-2 text-indigo-600 hover:text-indigo-800"
                      >
                        Post your first job
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Jobs I've Applied For</h2>
                <div className="space-y-4">
                  {myAppliedJobs.map(job => {
                    const myApplication = job.applicants.find(app => app.userId === currentUser?.id);
                    return (
                      <div key={job.id} className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <p className="text-gray-600 text-sm">Posted by {job.poster}</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                              myApplication?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              myApplication?.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {myApplication?.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-green-600">${job.payment}/{job.paymentType}</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedJob(job);
                                setShowModal('job-details');
                              }}
                              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                            >
                              View Details
                            </button>
                            {myApplication?.status === 'accepted' && job.status === 'assigned' && (
                              <button
                                onClick={() => handleCompleteJob(job.id)}
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                              >
                                Mark Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {myAppliedJobs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      You haven't applied for any jobs yet.
                      <button
                        onClick={() => setCurrentView('dashboard')}
                        className="block mt-2 text-indigo-600 hover:text-indigo-800"
                      >
                        Browse available jobs
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Profile View
  const ProfileView = () => (
    <div className="min-h-screen bg-gray-50">
      <HeaderComponent />
      <NavigationTabs />

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-6">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-2xl font-bold">
                    {currentUser?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h2>
                    {currentUser?.verified && (
                      <Shield className="text-green-500" size={20} />
                    )}
                    {currentUser?.backgroundCheck && (
                      <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Background Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current mr-1" size={16} />
                      <span className="font-medium">{currentUser?.rating}</span>
                      <span className="text-gray-500 ml-1">({currentUser?.reviews} reviews)</span>
                    </div>
                    <span className="text-gray-500">@{currentUser?.username}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{currentUser?.bio}</p>
                </div>
                <button 
                  onClick={() => setShowModal('edit-profile')}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Settings size={16} />
                  <span>Edit Profile</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentUser?.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    <button 
                      onClick={() => setShowModal('add-skill')}
                      className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 text-sm rounded-full hover:border-indigo-300 hover:text-indigo-600"
                    >
                      + Add Skill
                    </button>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Reviews</h3>
                  <div className="space-y-4">
                    {reviews.filter(r => r.reviewedId === currentUser?.id).map(review => {
                      const reviewer = users.find(u => u.id === review.reviewerId);
                      return (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                              <span className="font-medium text-gray-900">{reviewer?.name}</span>
                            </div>
                            <div className="flex items-center">
                              {[1,2,3,4,5].map(star => (
                                <Star 
                                  key={star} 
                                  className={`${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  size={16} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                          <span className="text-gray-400 text-xs">{review.date}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-indigo-600">{currentUser?.completedJobs}</div>
                      <div className="text-sm text-gray-600">Jobs Completed</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">${currentUser?.totalEarned}</div>
                      <div className="text-sm text-gray-600">Total Earned</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">{currentUser?.completionRate}%</div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">{currentUser?.jobsPosted}</div>
                      <div className="text-sm text-gray-600">Jobs Posted</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Account Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      <span>{currentUser?.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      <span>{currentUser?.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      <span>Joined {new Date(currentUser?.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // Admin View
  const AdminView = () => (
    <div className="min-h-screen bg-gray-50">
      <HeaderComponent />
      <NavigationTabs />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="text-blue-600" size={24} />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{users.filter(u => u.role !== 'admin').length}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="text-green-600" size={24} />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{jobs.filter(j => j.status === 'open').length}</div>
                  <div className="text-sm text-gray-600">Active Jobs</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="text-yellow-600" size={24} />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {(users.filter(u => u.role !== 'admin').reduce((sum, u) => sum + u.rating, 0) / users.filter(u => u.role !== 'admin').length).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'suspended').length}</div>
                  <div className="text-sm text-gray-600">Suspended</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Community Members</h3>
                <button
                  onClick={() => setShowModal('add-user')}
                  className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                >
                  <UserPlus size={16} />
                  <span>Add User</span>
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {users.filter(u => u.role !== 'admin').map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-gray-600 text-sm font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{user.name}</span>
                            {user.verified && <Shield size={14} className="text-green-500" />}
                            {user.status === 'suspended' && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                Suspended
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Star className="text-yellow-400 fill-current mr-1" size={14} />
                            {user.rating} ({user.reviews} reviews)
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal('user-details');
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleVerifyUser(user.id)}
                          className={`text-sm ${user.verified ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                        >
                          <Shield size={16} />
                        </button>
                        <button
                          onClick={() => handleSuspendUser(user.id)}
                          className={`text-sm ${user.status === 'suspended' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'}`}
                        >
                          <Ban size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">New job posted: "Lawn Care & Yard Work"</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">User Mike Chen completed a job</div>
                      <div className="text-xs text-gray-500">4 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">New review submitted (5 stars)</div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">New user registration pending</div>
                      <div className="text-xs text-gray-500">2 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Job Management</h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posted By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map(job => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {job.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.poster}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${job.payment}/{job.paymentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            job.status === 'open' ? 'bg-green-100 text-green-800' :
                            job.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              setSelectedJob(job);
                              setShowModal('job-details');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // Modal Components
  const ModalWrapper = ({ children, title, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  const CreateJobModal = () => (
    <ModalWrapper title="Post a New Job" onClose={() => setShowModal(null)}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
          <input
            type="text"
            value={newJob.title}
            onChange={(e) => setNewJob({...newJob, title: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Lawn Care & Yard Work"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={newJob.description}
            onChange={(e) => setNewJob({...newJob, description: e.target.value})}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Describe what needs to be done, any requirements, tools needed, etc."
            required
          />
        </div>

        <div className=" text-gray-500">
            <MapPin size={16} className="mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm