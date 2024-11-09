import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { VehicleCard } from './VehicleCard';
import { LoadingSpinner } from './LoadingSpinner';
import { fetchVehiclesByModel } from '../utils/vehicleService';
import type { BaseVehicleData } from '../utils/types';

interface VehicleGridProps {
  brand: 'chevrolet' | 'honda' | 'toyota';
  model: string;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({ brand, model }) => {
  const [vehicles, setVehicles] = useState<BaseVehicleData[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      try {
        const { vehicles, total } = await fetchVehiclesByModel(brand, model);
        setVehicles(vehicles);
        setTotal(total);
      } catch (error) {
        console.error('Error loading vehicles:', error);
        setVehicles([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, [brand, model]);

  if (isLoading) return <LoadingSpinner />;

  if (!vehicles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="w-10 h-10 text-gray-400 mb-4" />
        <p className="text-gray-600">No vehicles available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};