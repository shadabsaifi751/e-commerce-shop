import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSidebarOpen } from "../redux/sidebarSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useProducts } from "../hooks/useProducts";
import Skeleton from "react-loading-skeleton";

export default function FilterSidebar() {
  const isFilterSidebarOpen = useSelector(
    (state) => state.sidebar.isFilterSidebarOpen
  );
  const dispatch = useDispatch();

  const {
    categories,
    loading,
    error,
    selectedCategories,
    loadData,
    filterProductsByCategories,
    setSidebarSearch,
  } = useProducts(); 

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error: {error}.{" "}
        <button onClick={() => loadData()} className="text-blue-500 underline">
          Retry
        </button>
      </div>
    );
  }

  if (!isFilterSidebarOpen) return null;

  const closeSidebar = () => {
    dispatch(setFilterSidebarOpen(false));
  };

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
  };

  console.log("Categories in FilterSidebar:", categories);

  return (
    <>
      <AnimatePresence>
        {isFilterSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-30"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFilterSidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 right-0 h-screen w-w-5/6 bg-white text-black p-4 shadow-lg z-40 sidebar-motion"
          >
            <button onClick={closeSidebar} className="ml-auto mt-5 block">
              <XMarkIcon className="size-8 text-black" />
            </button>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              {loading ? (
                <ul className="space-y-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}>
                      <Skeleton width="100%" height={20} />{" "}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <label className="flex items-center cursor-pointer p-1 rounded transition">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) =>
                            filterProductsByCategories(category, e.target.checked)
                          }
                          className="mr-3 accent-purple-500 size-4 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 bg-transparent checked:bg-purple-500 checked:border-transparent" // Changed to purple
                        />
                        <span className="text-gray-800 text-sm font-medium">
                          {category}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
