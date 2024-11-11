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

const vehiclesPerPage = 6;

export const VehicleGrid: React.FC<VehicleGridProps> = ({ brand, model }) => {
  const [vehicles, setVehicles] = useState<BaseVehicleData[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<BaseVehicleData[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Define filters
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null);
  const [selectedExteriorColor, setSelectedExteriorColor] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Available filter options
  const filterOptions = {
    years: Array.from(new Set(vehicles.map(vehicle => vehicle.year))).sort((a, b) => b - a),
    priceRanges: [[0, 20000], [20000, 40000], [40000, 60000], [60000, 100000]],
    exteriorColors: Array.from(new Set(vehicles.map(vehicle => vehicle.exteriorColor))),
  };

  // Reset filters when the model changes
  useEffect(() => {
    resetFilters();
  }, [model]);

  const resetFilters = () => {
    setSelectedYear(null);
    setSelectedPriceRange(null);
    setSelectedExteriorColor(null);
    setSearchTerm('');
    setCurrentPage(1);
  };

  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true);
      try {
        const { vehicles, total } = await fetchVehiclesByModel(brand, model);
        setVehicles(vehicles);
        setFilteredVehicles(vehicles);
        setTotal(total);
      } catch (error) {
        console.error('Error loading vehicles:', error);
        setVehicles([]);
        setFilteredVehicles([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, [brand, model]);

  useEffect(() => {
    applyFilters();
  }, [selectedYear, selectedPriceRange, selectedExteriorColor, searchTerm, vehicles]);

  const applyFilters = () => {
    let filtered = vehicles;

    if (selectedYear) {
      filtered = filtered.filter(vehicle => vehicle.year === selectedYear);
    }

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange;
      filtered = filtered.filter(vehicle => vehicle.price >= minPrice && vehicle.price <= maxPrice);
    }

    if (selectedExteriorColor) {
      filtered = filtered.filter(vehicle => vehicle.exteriorColor === selectedExteriorColor);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(vehicle =>
        vehicle.model.toLowerCase().includes(lowerSearchTerm) ||
        vehicle.features.some(feature => feature.toLowerCase().includes(lowerSearchTerm))
      );
    }

    setFilteredVehicles(filtered);
    setCurrentPage(1);
  };

  const maxPage = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * vehiclesPerPage,
    currentPage * vehiclesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

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
    <div>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by model or feature"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <select
          value={selectedYear || ''}
          onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
          className="px-4 py-2 border rounded"
        >
          <option value="">Year</option>
          {filterOptions.years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={selectedPriceRange ? `${selectedPriceRange[0]}-${selectedPriceRange[1]}` : ''}
          onChange={(e) => setSelectedPriceRange(e.target.value ? e.target.value.split('-').map(Number) as [number, number] : null)}
          className="px-4 py-2 border rounded"
        >
          <option value="">Price Range</option>
          {filterOptions.priceRanges.map(([min, max]) => (
            <option key={min} value={`${min}-${max}`}>{`$${min} - $${max}`}</option>
          ))}
        </select>
        <select
          value={selectedExteriorColor || ''}
          onChange={(e) => setSelectedExteriorColor(e.target.value || null)}
          className="px-4 py-2 border rounded"
        >
          <option value="">Exterior Color</option>
          {filterOptions.exteriorColors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${maxPage}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxPage}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};
