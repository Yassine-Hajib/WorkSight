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
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/70 backdrop-blur-xl border-r border-slate-800 p-6 shadow-2xl">
                <img src={logo} alt="WorkSight" className="w-80 h-30" />
        

        <nav className="space-y-4">
          {["Dashboard", "Employees", "Tasks", "Reports", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-3 rounded-xl text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
  <h2 className="text-4xl font-bold text-blue-100 tracking-wide">
    Manager Dashboard
  </h2>

  <div className="bg-slate-800/70 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-slate-700">
    <span className="text-slate-300">Welcome, </span>
    <span className="text-blue-400 font-semibold">Manager</span>
  </div>
</div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-700 hover:scale-105 transition-transform">
            <h3 className="text-slate-400 text-lg">Employees</h3>
            <p className="text-4xl font-bold text-blue-400 mt-3">24</p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-700 hover:scale-105 transition-transform">
            <h3 className="text-slate-400 text-lg">Active Tasks</h3>
            <p className="text-4xl font-bold text-green-400 mt-3">18</p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-700 hover:scale-105 transition-transform">
            <h3 className="text-slate-400 text-lg">Completed</h3>
            <p className="text-4xl font-bold text-purple-400 mt-3">52</p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-700 hover:scale-105 transition-transform">
            <h3 className="text-slate-400 text-lg">Productivity</h3>
            <p className="text-4xl font-bold text-yellow-400 mt-3">84%</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Employees Table */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-700 p-6">
            <h3 className="text-2xl font-bold mb-6 text-white">Employees Status</h3>

            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Tasks</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                    <td className="py-4">{emp.name}</td>
                    <td className="py-4">{emp.status}</td>
                    <td className="py-4">{emp.tasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Tasks */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-700 p-6">
            <h3 className="text-2xl font-bold mb-6 text-white">Recent Tasks</h3>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-700/40 border border-slate-600 rounded-xl p-4 hover:bg-slate-700/60 transition"
                >
                  <h4 className="font-semibold text-lg">{task.title}</h4>
                  <p className="text-slate-400">{task.status}</p>
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