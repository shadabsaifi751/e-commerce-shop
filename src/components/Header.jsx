import {
  Bars3BottomRightIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setNavSidebarOpen } from "../redux/sidebarSlice";

const Header = () => {
  const badgeCount = 0;

  const dispatch = useDispatch();
  const sideNav = useSelector((state) => state.sidebar.isNavSidebarOpen);

  const toggleNavSidebar = () => {
    dispatch(setNavSidebarOpen(!sideNav));
  };
  return (
    <>
      <header className="bg-white shadow-md p-4 px-5 md:px-10 flex justify-between items-center">
        <div className="text-2xl font-bold text-black">Flone.</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Shop
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Collections
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Pages
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Blog
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Contact Us
          </a>
        </nav>
        <div className="flex space-x-2">
          <button className="text-gray-500 cursor-pointer hover:text-gray-700 mr-5">
            <MagnifyingGlassIcon className="size-6 text-black" />
          </button>
          <button className="text-gray-500 cursor-pointer hover:text-gray-700 relative">
            <UserCircleIcon className="size-6 text-black" />
          </button>
          <button className="text-gray-500 cursor-pointer hover:text-gray-700 relative">
            <ShoppingBagIcon className="size-6 text-black" />
            <span className="absolute -top-1 -right-1 bg-black rounded-full text-white text-xs h-4 w-4 flex items-center justify-center">
              {badgeCount}
            </span>
          </button>
          <button className="text-gray-500 cursor-pointer hover:text-gray-700 relative">
            <HeartIcon className="size-6 text-black" />
            <span className="absolute -top-1 -right-2 bg-black rounded-full text-white text-xs h-4 w-4 flex items-center justify-center">
              {badgeCount}
            </span>
          </button>
          <button onClick={toggleNavSidebar} className="text-gray-500 ms-2 block md:hidden cursor-pointer hover:text-gray-700 relative">
            <Bars3BottomRightIcon className="size-8 text-black" />
          </button>
        </div>
      </header>

      <Sidebar />
    </>
  );
};

export default Header;
