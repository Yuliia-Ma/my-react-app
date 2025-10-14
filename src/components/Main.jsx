import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Filters from "./Filters";

function Main({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onAddToCart,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("fetch error", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      ? product.title.toLowerCase().includes((searchTerm || "").toLowerCase())
      : false;
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {loading ? (
          <p className="text-center col-span-full">Loading products...</p>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))
        )}
      </section>
    </main>
  );
}

export default Main;
