'use client';

import { useState, useMemo } from 'react';
import { IC_DATABASE, getAllCategories, searchICs } from '@/lib/ic-data';

interface ICSelectorProps {
  selectedIC: string | null;
  onSelectIC: (icId: string) => void;
}

export default function ICSelector({ selectedIC, onSelectIC }: ICSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...getAllCategories()];

  const filteredICs = useMemo(() => {
    let results = searchQuery ? searchICs(searchQuery) : IC_DATABASE;

    if (selectedCategory !== 'All') {
      results = results.filter((ic) => ic.category === selectedCategory);
    }

    return results;
  }, [searchQuery, selectedCategory]);

  const selectedICData = IC_DATABASE.find((ic) => ic.id === selectedIC);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">IC Selection</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search ICs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* IC List */}
      <div className="mb-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
        {filteredICs.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No ICs found</div>
        ) : (
          filteredICs.map((ic) => (
            <button
              key={ic.id}
              onClick={() => onSelectIC(ic.id)}
              className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition duration-150 ${
                selectedIC === ic.id ? 'bg-blue-100 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="font-semibold text-gray-900">{ic.name}</div>
              <div className="text-sm text-gray-600">{ic.description}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                  {ic.type}
                </span>
                <span className="text-xs text-gray-500">{ic.pins} pins</span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Selected IC Details */}
      {selectedICData && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Selected IC</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Name:</span> {selectedICData.name}</p>
            <p><span className="font-medium">Description:</span> {selectedICData.description}</p>
            <p><span className="font-medium">Type:</span> {selectedICData.type}</p>
            <p><span className="font-medium">Pins:</span> {selectedICData.pins}</p>
            <p><span className="font-medium">Category:</span> {selectedICData.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
