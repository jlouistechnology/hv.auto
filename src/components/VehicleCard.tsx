import React from 'react';
import { Car, Gauge, Calendar, MapPin, Tag, Package } from 'lucide-react';
import { VehicleFeatureIcon } from './VehicleFeatureIcon';
import { PLACEHOLDER_IMAGE } from '../utils/config';

export const VehicleCard = ({ vehicle }: any) => {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('in stock')) return 'bg-emerald-100 text-emerald-800';
    if (statusLower.includes('transit')) return 'bg-amber-100 text-amber-800';
    if (statusLower.includes('order')) return 'bg-purple-100 text-purple-800';
    return 'bg-blue-100 text-blue-800';
  };

  // Ensure we have a valid image URL
  const imageUrl = vehicle.thumbnail || vehicle.image || PLACEHOLDER_IMAGE;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative">
      {/* Dealer Discount Label positioned at the top of the card */}
      {vehicle.dealerDiscount && (
        <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
          Save ${vehicle.dealerDiscount.toLocaleString()}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 rounded-t-xl">
        <img
          src={imageUrl}
          alt={vehicle.title_vrp}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
        {/* Savings Label within the image */}
        {vehicle.lightning?.pricing?.savings?.value > 0 && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md z-10">
            Save ${vehicle.lightning.pricing.savings.value.toLocaleString()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {vehicle.title_vrp || `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            getStatusColor(vehicle.lightning?.status || vehicle.in_transit_sort || 'In Stock')
          }`}>
            {vehicle.lightning?.status || vehicle.in_transit_sort || 'In Stock'}
          </span>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            <span>Wilson, NC</span>
          </div>
          {vehicle.mpgCity && vehicle.mpgHighway && (
            <div className="flex items-center text-sm text-gray-600">
              <Gauge className="w-4 h-4 mr-2 text-blue-600" />
              <span>{vehicle.mpgCity}/{vehicle.mpgHighway} MPG</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Package className="w-4 h-4 mr-2 text-blue-600" />
            <span>Stock #{vehicle.stock}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4 flex flex-wrap gap-2">
          {vehicle.features?.slice(0, 4).map((feature: string, index: number) => (
            <VehicleFeatureIcon key={index} feature={feature} />
          ))}
        </div>

        {/* Price Section */}
        <div className="flex items-end justify-between mb-4 border-t border-gray-100 pt-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ${vehicle.price?.toLocaleString()}
            </p>
            {vehicle.msrp && vehicle.msrp !== vehicle.price && (
              <p className="text-sm text-gray-500 line-through">
                MSRP ${vehicle.msrp.toLocaleString()}
              </p>
            )}
          </div>
          <Tag className="w-5 h-5 text-blue-600" />
        </div>

        {/* Action Button */}
        <a
          href={vehicle.link + '?utm_source=hv_auto&utm_medium=referral&utm_campaign=exclusive-vehicle-specials'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg group"
        >
          <Car className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
          <span className="font-semibold">View Special Offer</span>
        </a>
      </div>
    </div>
  );
};
