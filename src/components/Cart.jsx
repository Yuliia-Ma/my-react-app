import { Link } from "react-router-dom";

function Cart({
  cartItems = [],
  onAddToCart,
  onRemoveFromCart,
  onRemoveAll,
  onClearCart,
}) {
  const total = cartItems.reduce(
    (s, item) => s + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 mb-6">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image || item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">
                    ${(item.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  −
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveAll(item)}
                  className="ml-4 px-3 py-1 bg-gray-300 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
          </div>

          <div className="flex justify-between mt-6">
            <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
              ← Back to Shop
            </Link>
            <button
              onClick={onClearCart}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;
