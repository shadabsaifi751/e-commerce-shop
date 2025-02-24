import { StarIcon } from "@heroicons/react/24/outline";

const ProductGrid = ({ products }) => {
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text || "";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border relative p-4 bg-[#f5f5f5] rounded shadow relative"
        >
          <div className="grid gap-2 absolute top-2 right-2">
            {product.rating.count && (
              <span className="rounded px-2 py-1 text-xs bg-fuchsia-500 text-white text-center">
                -{product.rating.count / 4}%
              </span>
            )}
            {Math.random() < 0.5 && product.rating.rate && (
              <span className="rounded px-2 py-1 text-xs bg-purple-500 text-white text-center">
                New
              </span>
            )}
          </div>
          <div className="h-64 w-full mb-3">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain mb-2"
            />
          </div>
          <h3
            className="text-md text-black font-medium text-center mb-2"
            title={product.title}
          >
            {truncateText(product.title, 25)}
          </h3>
          <div className="flex items-center mb-2 justify-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>
                <StarIcon
                  className={`size-5 ${
                    index < Math.floor(product.rating.rate || 0)
                      ? "text-yellow-500"
                      : "text-gray-700"
                  }`}
                />
              </span>
            ))}
          </div>
          <p className="text-gray-700 text-center">
            &#8364;{product.price.toFixed(2)} - &#8364;
            <strike>{product.price.toFixed(2)}</strike>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
