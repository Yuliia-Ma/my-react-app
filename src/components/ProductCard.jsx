function ProductCard({ product, onAddToCart }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
      <img
        src={product.image || product.thumbnail}
        alt={product.title}
        className="w-36 h-36 object-cover mb-4 rounded"
      />

      <h3 className="text-lg font-bold text-gray-800 text-center">
        {product.title}
      </h3>

      <p className="text-gray-600">${(product.price || 0).toFixed(2)}</p>

      <button
        onClick={() => onAddToCart && onAddToCart(product)}
        className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
