import logo from "../assets/1f21ebc6-cb2f-4a06-b250-a41fef57f12d.png"

function EmployeeDashboard() {
  const tasks = [
    { id: 1, title: "Update client report", status: "In Progress", deadline: "2026-04-25" },
    { id: 2, title: "Fix login bug", status: "Completed", deadline: "2026-04-20" },
    { id: 3, title: "Prepare meeting notes", status: "Pending", deadline: "2026-04-28" },
  ];

  const notifications = [
    "Task 'Update client report' deadline in 2 days",
    "Manager assigned you a new task",
    "Your weekly productivity report is available",
  ];

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-lg p-6 hidden md:block">
        <img src={logo} alt="WorkSight" className="w-80 h-30" />
        <nav className="space-y-4">
          <a href="#" className="block hover:text-blue-400">Dashboard</a>
          <a href="#" className="block hover:text-blue-400">My Tasks</a>
          <a href="#" className="block hover:text-blue-400">Progress</a>
          <a href="#" className="block hover:text-blue-400">Notifications</a>
          <a href="#" className="block hover:text-blue-400">Settings</a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Employee Dashboard</h2>
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            Welcome, Employee
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Assigned Tasks</h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">8</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Completed Tasks</h3>
            <p className="text-3xl font-bold text-green-400 mt-2">5</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Productivity</h3>
            <p className="text-3xl font-bold text-yellow-400 mt-2">76%</p>
          </div>
        </div>

        {/* Tasks + Notifications */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Task List */}
          <div className="bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">My Tasks</h3>
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-gray-400">Status: {task.status}</p>
                  <p className="text-gray-400">Deadline: {task.deadline}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <ul className="space-y-4">
              {notifications.map((note, index) => (
                <li key={index} className="bg-gray-700 p-4 rounded-lg">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Weekly Progress</h3>
          <div className="w-full bg-gray-700 rounded-full h-6">
            <div className="bg-blue-500 h-6 rounded-full w-3/4 text-center text-sm">
              75%
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmployeeDashboard;