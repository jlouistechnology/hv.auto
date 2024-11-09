import React from 'react';
import { Car, ChevronRight } from 'lucide-react';

interface DealershipNavProps {
  onSelectDealership: (dealership: string) => void;
}

export const DealershipNav: React.FC<DealershipNavProps> = ({ onSelectDealership }) => {
  const dealerships = [
    { id: 'honda', name: 'Honda', color: 'red' },
    { id: 'chevrolet', name: 'Chevrolet', color: 'blue' },
    { id: 'toyota', name: 'Toyota', color: 'green' }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dealerships.map(({ id, name, color }) => (
        <button
          key={id}
          onClick={() => onSelectDealership(id)}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between group"
        >
          <div className="flex items-center">
            <Car className={`w-8 h-8 text-${color}-500 mr-3`} />
            <span className="text-lg font-semibold text-gray-800">{name}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
      ))}
    </div>
  );
};