import { Link } from 'react-router-dom';
import whoopLogo from '../../assets/whoop-logo.png';

export default function Navbar() {
  const navItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Import', to: '/' },
    { label: 'About', to: '/about' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={whoopLogo}
            alt="WHOOP logo"
            className="h-8 w-auto transition-transform duration-300 hover:scale-105"
          />
          <span className="text-xl font-orbitron font-bold bg-indigo-400 bg-clip-text text-transparent tracking-wide drop-shadow-md">
            S-WHOOP
          </span>
        </Link>

        <ul className="flex items-center space-x-8 text-sm font-medium">
          {navItems.map(({ label, to }) => (
            <li key={label} className="relative group">
              <Link
                to={to}
                className="text-gray-300 hover:text-indigo-400 transition-colors"
              >
                {label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
