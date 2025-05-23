"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaComments, FaEnvelope, FaQuoteRight, FaSignOutAlt } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminRoutes.map((route, index) => (
            <Link href={route.path} key={index}>
              <div className={`${route.color} p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
                <div className="flex flex-col items-center text-center">
                  {route.icon}
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {route.title}
                  </h2>
                  <p className="text-gray-600">
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