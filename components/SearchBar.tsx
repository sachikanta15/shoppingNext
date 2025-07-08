
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, country: string, sort?: 'asc' | 'desc') => void;
  onClear?: () => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, onClear, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc' | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && country.trim() && !loading) {
      onSearch(query.trim(), country.trim(), sort);
    }
  };

  const handleClear = () => {
    setQuery('');
    setCountry('');
    setSort(undefined);
    if (onClear) onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products (e.g., iPhone, laptop, headphones...)"
          className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          disabled={loading}
        />
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country (e.g., US, IN, UK)"
          className="block w-full pl-4 pr-4 py-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          disabled={loading}
        />
      </div>

      <div className="flex items-center mb-4 gap-4">
        <label className="text-lg font-medium" htmlFor="sort-select">Sort:</label>
        <select
          id="sort-select"
          value={sort === undefined ? '' : sort}
          onChange={e => setSort(e.target.value === '' ? undefined : e.target.value as 'asc' | 'desc')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          disabled={loading}
        >
          <option value="">None</option>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
        <button
          type="button"
          onClick={handleClear}
          className="ml-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
          disabled={loading}
        >
          Clear
        </button>
      </div>

      <button
        type="submit"
        disabled={!query.trim() || !country.trim() || loading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
