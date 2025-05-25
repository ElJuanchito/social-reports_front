"use client";

import { CategoryDto } from './services/categories';
import { useState } from 'react';

interface CategorySelectorProps {
  categories: CategoryDto[];
  selectedCategories: string[];
  onSelect: (categories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories,
  onSelect,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    const newSelected = selectedCategories.includes(categoryName)
      ? selectedCategories.filter(cat => cat !== categoryName)
      : [...selectedCategories, categoryName];
    
    onSelect(newSelected);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Selecciona una o varias categorías:
      </label>
      
      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <div 
            key={category.id || category.name}
            className={`relative border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedCategories.includes(category.name) 
                ? 'bg-blue-50 border-blue-500 shadow-sm' 
                : 'bg-white border-gray-200'
            }`}
            onMouseEnter={() => setActiveCategory(category.name)}
            onMouseLeave={() => setActiveCategory(null)}
            onClick={() => toggleCategory(category.name)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-800">{category.name}</h3>
                <div className={`transition-all duration-300 overflow-hidden ${
                  activeCategory === category.name || selectedCategories.includes(category.name)
                    ? 'max-h-20 opacity-100 mt-1'
                    : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedCategories.includes(category.name)
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'border-gray-300'
              }`}>
                {selectedCategories.includes(category.name) && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>

            {/* Badge para indicar selección */}
            {selectedCategories.includes(category.name) && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                ✓
              </span>
            )}
          </div>
        ))}
      </div>
      
      {categories.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No hay categorías disponibles
        </div>
      )}
      
      {selectedCategories.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          Categorías seleccionadas: {selectedCategories.join(', ')}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
