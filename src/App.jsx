import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Cart from "./components/Cart";

function App() {
  // cartItems — единый стейт корзины
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // persist
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  // Добавить товар (если есть — увеличить quantity)
  const handleAddToCart = (product) => {
    console.log("ADD", product);

    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // Копируем продукт и добавляем поле quantity = 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Уменьшить на 1 (если quantity -> 0, удалить элемент)
  const handleRemoveFromCart = (product) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  // Удалить все экземпляры товара
  const handleRemoveAll = (product) => {
    setCartItems((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Очистить корзину
  const handleClearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  return (
    <>
      <Header cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onRemoveAll={handleRemoveAll}
              onClearCart={handleClearCart}
            />
          }
        />
      </Routes>
    </>
  );
}


export default App;
