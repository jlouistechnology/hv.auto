import React from 'react';
import { X, Car, Calendar, Hash, DollarSign, MapPin, Gauge, Info } from 'lucide-react';
import type { VehicleData } from '../utils/types';

interface VehicleDetailProps {
  vehicle: VehicleData;
  onClose: () => void;
}

export const VehicleDetail: React.FC<VehicleDetailProps> = ({ vehicle, onClose }) => {
  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors z-10"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      {/* Image Section */}
      <div className="aspect-video relative">
        <img
          src={vehicle.imageUrl || `https://source.unsplash.com/1200x800/?${vehicle.title.toLowerCase()}`}
          alt={vehicle.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{vehicle.title}</h2>

        {/* Price Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Price:</span>
            <span className="text-2xl font-bold text-green-600">{vehicle.price}</span>
          </div>
          {vehicle.msrp && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">MSRP:</span>
              <span className="text-gray-500 line-through">${vehicle.msrp.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <DetailItem icon={Car} label="Type" value={vehicle.type || 'New'} />
          <DetailItem icon={Calendar} label="Year" value={vehicle.year || '2024'} />
          <DetailItem icon={Hash} label="Stock" value={vehicle.stock || 'Available'} />
          <DetailItem icon={MapPin} label="Location" value="Wilson, NC" />
          {vehicle.mpg && (
            <DetailItem 
              icon={Gauge} 
              label="MPG" 
              value={`${vehicle.mpg.city || '-'}/${vehicle.mpg.highway || '-'}`} 
            />
          )}
        </div>

        {/* Features Section */}
        {vehicle.features && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Key Features
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {vehicle.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <a
          href={vehicle.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
        >
          <DollarSign className="w-5 h-5" />
          <span className="font-medium">View Special Offer</span>
        </a>
      </div>
    </div>
  );
};

const DetailItem: React.FC<{
  icon: React.FC<any>;
  label: string;
  value: string;
}> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <Icon className="w-5 h-5 text-gray-400" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);