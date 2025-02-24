import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure this is imported once (already in SkeletonLoading.jsx)

const CategorySidebar = ({
  categories,
  onCategorySelect,
  selectedCategories,
  loading,
  setSidebarSearch,
}) => {
  return (
    <aside className="w-64 p-4 text-black bg-white shadow-md hidden md:block">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Search</h3>

        {loading ? (
          <Skeleton width="100%" height={40} />
        ) : (
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none pe-10 border-l border-black"
            />
            <MagnifyingGlassIcon className="size-6 text-black absolute top-1/2 -translate-y-1/2 right-2" />{" "}
          </div>
        )}
      </div>
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
                      onCategorySelect(category, e.target.checked)
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
    </aside>
  );
};

export default CategorySidebar;
