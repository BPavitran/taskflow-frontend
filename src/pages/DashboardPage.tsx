import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/tasks.service";

function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load dashboard
      </div>
    );
  }

  const tasks = data?.items || [];

  const total = tasks.length;
  const open = tasks.filter((t) => t.status === "OPEN").length;
  const completed = tasks.filter((t) => t.status === "DONE").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Open</h3>
          <p className="text-2xl font-bold text-blue-600">{open}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">In Progress</h3>
          <p className="text-2xl font-bold text-yellow-600">{inProgress}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">{completed}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
