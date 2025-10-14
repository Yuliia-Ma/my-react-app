import { Link } from "react-router-dom";

function Header({ cartCount = 0 }) {
  return (
    <header className="flex justify-between items-center bg-blue-600 text-white p-4">
      <Link to="/" className="text-xl font-bold hover:underline">
        My Store
      </Link>

      <Link
        to="/cart"
        className="relative inline-flex items-center px-3 py-1 rounded hover:bg-white/10"
      >
        <span className="mr-2">🛒 Cart</span>
        {cartCount > 0 && (
          <span className="absolute -right-2 -top-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}

export default Header;
