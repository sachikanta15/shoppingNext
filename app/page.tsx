'use client';

import { useState } from 'react';
import { Search, Star, ExternalLink, ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import axios from 'axios';

// Mock API function - replace with your actual API endpoint
const searchProducts = async (query: string, country: string, sort: 'asc' | 'desc') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  // Mock data - replace with actual API call
  const mockData = await axios.post('https://shopping-olive-two.vercel.app/api/v1/search/', { query, country, sort });

  return mockData.data;
};

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string, country: string, sort: 'asc' | 'desc') => {
    if (!query.trim() || !country.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchProducts(query, country, sort);
      setProducts(results);
    } catch (error) {
      console.error('Search failed:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setProducts([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ShopFind</h1>
            </div>
            <div className="text-sm text-gray-500">
              Search for products across multiple stores
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find the Best Deals Online
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Search for any product and compare prices from top retailers. Get the best deals delivered to your doorstep.
          </p>
          
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} loading={loading} />
        </div>

        {/* Results Section */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Searching for products...</span>
          </div>
        )}

        {!loading && hasSearched && products.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Found {products.length} products
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-600">Enter a product name to find the best deals</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 ShopFind. Find the best deals across the web.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}