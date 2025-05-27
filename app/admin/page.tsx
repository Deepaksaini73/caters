"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaComments,
  FaEnvelope,
  FaQuoteRight,
  FaSignOutAlt,
  FaCog,
  FaImages,
  FaUsers // Added for services icon
} from 'react-icons/fa';
export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (res.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const adminRoutes = [
    {
      title: "Services Management",
      description: "Manage services, galleries and features",
      icon: <FaCog className="text-4xl mb-4" />,
      path: "/admin/services",
      color: "bg-orange-50 hover:bg-orange-100"
    },
    {
    title: "Gallery Management",
    description: "Manage gallery images and videos",
    icon: <FaImages className="text-4xl mb-4" />,
    path: "/admin/gallery",
    color: "bg-pink-50 hover:bg-pink-100"
  },
    {
    title: "Team Management",
    description: "Manage team members",
    icon: <FaUsers className="text-4xl mb-4" />,
    path: "/admin/team",
    color: "bg-indigo-50 hover:bg-indigo-100"
  },
    {
      title: "Feedback Management",
      description: "View and manage customer feedback",
      icon: <FaComments className="text-4xl mb-4" />,
      path: "/admin/feedback",
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      title: "Contact Messages",
      description: "Handle customer inquiries",
      icon: <FaEnvelope className="text-4xl mb-4" />,
      path: "/admin/contact-messages",
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Quotes Requests",
      description: "Manage catering quotes",
      icon: <FaQuoteRight className="text-4xl mb-4" />,
      path: "/admin/quotes",
      color: "bg-purple-50 hover:bg-purple-100"
    }
  ];

  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminRoutes.map((route, index) => (
          <Link href={route.path} key={index}>
            <div
              className={`${route.color} p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer
                bg-white dark:bg-gray-800 
                text-gray-800 dark:text-gray-100 
                hover:shadow-lg`}
            >
              <div className="flex flex-col items-center text-center">
                {route.icon}
                <h2 className="text-xl font-semibold mb-2">
                  {route.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {route.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

}