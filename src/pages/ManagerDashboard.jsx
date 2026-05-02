import logo from "../assets/1f21ebc6-cb2f-4a06-b250-a41fef57f12d.png"

function ManagerDashboard() {
  const employees = [
    { id: 1, name: "Ahmed", status: "Online", tasks: 5 },
    { id: 2, name: "Sara", status: "Working", tasks: 3 },
    { id: 3, name: "Yassine", status: "Offline", tasks: 2 },
  ];

  const tasks = [
    { id: 1, title: "Design Dashboard UI", status: "In Progress" },
    { id: 2, title: "Fix Login API", status: "Completed" },
    { id: 3, title: "Create Reports Module", status: "Pending" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      
        
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg p-6 hidden md:block">
  <img src={logo} alt="WorkSight" className="w-80 h-30" />
  
        <nav className="space-y-4">
          <a href="#" className="block hover:text-blue-400">Dashboard</a>
          <a href="#" className="block hover:text-blue-400">Employees</a>
          <a href="#" className="block hover:text-blue-400">Tasks</a>
          <a href="#" className="block hover:text-blue-400">Reports</a>
          <a href="#" className="block hover:text-blue-400">Settings</a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Manager Dashboard</h2>
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            Welcome, Manager
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Employees</h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">24</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Active Tasks</h3>
            <p className="text-3xl font-bold text-green-400 mt-2">18</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Completed</h3>
            <p className="text-3xl font-bold text-purple-400 mt-2">52</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Productivity</h3>
            <p className="text-3xl font-bold text-yellow-400 mt-2">84%</p>
          </div>
        </div>

        {/* Employees Table + Tasks */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Employees */}
          <div className="bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Employees Status</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400">
                  <th>Name</th>
                  <th>Status</th>
                  <th>Tasks</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id} className="border-t border-gray-700">
                    <td className="py-3">{emp.name}</td>
                    <td className="py-3">{emp.status}</td>
                    <td className="py-3">{emp.tasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Tasks */}
          <div className="bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Tasks</h3>
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-gray-400">{task.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ManagerDashboard;