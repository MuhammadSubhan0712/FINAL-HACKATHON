import { Input } from "@components/ui/input"; 

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      {/* Logo Section */}
      <div className="text-2xl font-bold cursor-pointer">
        <a href="/">MyLogo</a>
      </div>

      {/* Search Bar Section */}
      <div className="flex-1 mx-6">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md bg-gray-700 text-white placeholder-gray-400 border-gray-600"
        />
      </div>

      {/* Right Section (Optional) */}
      <div>
        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;