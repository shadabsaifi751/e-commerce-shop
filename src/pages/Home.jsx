import { Suspense, lazy, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import SkeletonLoading from "../components/SkeletonLoading";
import Breadcrumb from "../components/Breadcrumb";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import FilterSidebar from "../components/FilterSidebar";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSidebarOpen } from "../redux/sidebarSlice";

// Lazy load components
const Header = lazy(() => import("../components/Header"));
const CategorySidebar = lazy(() => import("../components/CategorySidebar"));
const ProductGrid = lazy(() => import("../components/ProductGrid"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  const dispatch = useDispatch();
  const isFilterSidebarOpen = useSelector(
    (state) => state.sidebar.isFilterSidebarOpen
  );

  const {
    products,
    categories,
    loading,
    error,
    selectedCategories,
    loadData,
    filterProductsByCategories,
    setSidebarSearch,
  } = useProducts();

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const breadcrumbPath = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  const toggleNavSidebar = () => {
    dispatch(setFilterSidebarOpen(!isFilterSidebarOpen));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <Suspense fallback={<div className="p-4">Loading header...</div>}>
          <Header />
        </Suspense>
        <Suspense fallback={<div className="p-4">Loading breadcrumb...</div>}>
          <Breadcrumb path={breadcrumbPath} />
        </Suspense>
        <main className="flex-1 flex bg-white">
          <Suspense fallback={<div className="p-4">Loading categories...</div>}>
            <CategorySidebar
              categories={categories}
              onCategorySelect={filterProductsByCategories}
              selectedCategories={selectedCategories}
              loading={loading}
              setSidebarSearch={setSidebarSearch}
            />
          </Suspense>

          <div className="flex-1 h-[700px] overflow-y-auto no-scrollbar">
            <div className="p-4 sticky bg-white z-10 top-0 flex justify-between items-start gap-3 md:items-center">
              <div className="flex items-center gap-5 flex-wrap">
                <div className="relative  block md:hidden">
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => setSidebarSearch(e.target.value)}
                    className="w-full p-2 border text-black focus:outline-none pe-10 border-l border-black"
                  />
                  <MagnifyingGlassIcon className="size-6 text-black absolute top-1/2 -translate-y-1/2 right-2" />{" "}
                </div>
                <select className="p-2 border bg-white text-black focus:outline-none rounded border border-black w-48 hidden md:block">
                  <option>Default</option>
                </select>
                <span className="text-black">
                  Showing {products.length} of 144 results
                </span>
              </div>
              <div className="flex items-center gap-1 md:inline-flex hidden">
                <ViewColumnsIcon className="size-6 text-black" />{" "}
                <Squares2X2Icon className="size-6 text-black" />{" "}
              </div>
              <button onClick={toggleNavSidebar} className="block md:hidden">
                <AdjustmentsHorizontalIcon className="size-7 mt-1 text-black" />{" "}
              </button>
            </div>

            <Suspense fallback={<SkeletonLoading />}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </main>

        <Suspense fallback={<div className="p-4">Loading footer...</div>}>
          <Footer />
        </Suspense>

        <FilterSidebar />
      </div>
    </div>
  );
};

export default Home;
