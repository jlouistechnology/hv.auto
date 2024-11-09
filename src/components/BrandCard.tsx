import React from 'react';
import { Car, ChevronRight } from 'lucide-react';

interface BrandCardProps {
  brand: 'chevrolet' | 'honda' | 'toyota';
  active: boolean;
  onClick: () => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand, active, onClick }) => {
  const brandColors = {
    honda: 'text-red-500 bg-red-50',
    chevrolet: 'text-blue-500 bg-blue-50',
    toyota: 'text-green-500 bg-green-50'
  };

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-105' 
          : 'bg-white hover:shadow-md hover:scale-102'
      } p-6 group w-full`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${brandColors[brand]}`}>
            <Car className="w-6 h-6" />
          </div>
          
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-800 capitalize">{brand}</h3>
            <p className="text-sm text-gray-500">View Special Offers</p>
          </div>
        </div>

        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
          active ? 'transform rotate-90 text-blue-500' : 'text-gray-400 group-hover:text-gray-600'
        }`} />
      </div>

      {active && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Exclusive deals and special offers available
          </p>
        </div>
      )}
    </button>
  );
};