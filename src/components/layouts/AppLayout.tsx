import { Link, Outlet, useNavigate } from "react-router-dom";

function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6 text-blue-600">TaskFlow</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/dashboard" className="py-2 rounded hover:bg-gray-200">
            Dashboard
          </Link>

          <Link to="/tasks" className="py-2 rounded hover:bg-gray-200">
            Tasks
          </Link>

          <button
            onClick={handleLogout}
            className="py-2 text-left rounded hover:bg-red-100 text-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
