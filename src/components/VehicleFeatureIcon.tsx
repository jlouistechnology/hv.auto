import React from 'react';
import {
  Bluetooth,
  Camera,
  Navigation2,
  Thermometer,
  Smartphone,
  Radio,
  Wifi,
  BatteryCharging,
  Gauge,
  AlertTriangle,
  ArrowLeftRight,
  Armchair,
  Car,
  Power,
  Satellite,
  Shield,
  Sun,
  Siren,
  Sparkles
} from 'lucide-react';

interface FeatureIconProps {
  feature: string;
}

export const VehicleFeatureIcon: React.FC<FeatureIconProps> = ({ feature }) => {
  const getIconComponent = () => {
    const normalizedFeature = feature.toLowerCase();
    
    if (normalizedFeature.includes('bluetooth')) return Bluetooth;
    if (normalizedFeature.includes('camera')) return Camera;
    if (normalizedFeature.includes('navigation')) return Navigation2;
    if (normalizedFeature.includes('heated') || normalizedFeature.includes('cooling')) return Thermometer;
    if (normalizedFeature.includes('carplay') || normalizedFeature.includes('android auto')) return Smartphone;
    if (normalizedFeature.includes('radio')) return Radio;
    if (normalizedFeature.includes('wifi')) return Wifi;
    if (normalizedFeature.includes('charging')) return BatteryCharging;
    if (normalizedFeature.includes('cruise') || normalizedFeature.includes('speed')) return Gauge;
    if (normalizedFeature.includes('warning') || normalizedFeature.includes('alert')) return AlertTriangle;
    if (normalizedFeature.includes('lane')) return ArrowLeftRight;
    if (normalizedFeature.includes('seat')) return Armchair;
    if (normalizedFeature.includes('parking')) return Car;
    if (normalizedFeature.includes('remote') || normalizedFeature.includes('start')) return Power;
    if (normalizedFeature.includes('satellite')) return Satellite;
    if (normalizedFeature.includes('safety') || normalizedFeature.includes('airbag')) return Shield;
    if (normalizedFeature.includes('sunroof') || normalizedFeature.includes('moonroof')) return Sun;
    if (normalizedFeature.includes('emergency')) return Siren;
    return Sparkles;
  };

  const IconComponent = getIconComponent();

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
      <IconComponent className="w-3.5 h-3.5 text-blue-600" strokeWidth={2.5} />
      <span className="truncate">{feature}</span>
    </div>
  );
};