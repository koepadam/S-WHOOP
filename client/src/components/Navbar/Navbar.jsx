import whoopLogo from '../../assets/whoop-logo.png'

export default function Navbar() {
  return (
    <nav className="h-screen w-40 fixed top-0 left-0 z-50 flex flex-col border-r border-gray-700 shadow-lg">
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <img src={whoopLogo} alt="WHOOP logo" className="h-8" />
        </div>
        <ul className="space-y-2 text-sm font-medium">
          <li><a href="#dashboard" className="hover:text-indigo-500">Dashboard</a></li>
          <li><a href="#import" className="hover:text-indigo-500">Import</a></li>
          <li><a href="#about" className="hover:text-indigo-500">About</a></li>
        </ul>
      </div>

      <div className="mt-auto p-4 text-xs text-gray-400 text-center">
        <p>© Adam Koep 2025</p>
      </div>
    </nav>
  );
}




