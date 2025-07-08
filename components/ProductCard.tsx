'use client';

import { Star, ExternalLink, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface Product {
  pos: number;
  url: string;
  type: string;
  price: number;
  title: string;
  rating: number;
  currency: string;
  merchant: {
    url: string;
    name: string;
  };
  price_str: string;
  thumbnail: string;
  product_id: string;
  pos_overall: number;
  reviews_count: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleProductClick = () => {
    window.open(product.url, '_blank', 'noopener,noreferrer');
  };

  const handleMerchantClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(product.merchant.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            #{product.pos_overall}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews_count} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {product.price_str}
          </span>
        </div>

        {/* Merchant */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleMerchantClick}
            className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            {product.merchant.name}
          </button>
          
          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none" />
    </div>
  );
}