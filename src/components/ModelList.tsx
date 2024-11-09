import React, { useEffect } from 'react';
import { Car, Package, Loader2, ShieldCheck, Zap, Truck, Gauge } from 'lucide-react';
import type { ModelData } from '../utils/types';

interface ModelListProps {
  models: ModelData[];
  onSelectModel: (model: ModelData) => void;
  selectedModel?: ModelData | null;
  isLoading?: boolean;
}

export const ModelList: React.FC<ModelListProps> = ({ 
  models, 
  onSelectModel, 
  selectedModel,
  isLoading = false
}) => {
  const [stats, setStats] = React.useState({
    totalModels: 0,
    totalVehicles: 0,
    categories: {} as Record<string, { models: ModelData[], total: number }>
  });

  useEffect(() => {
    const totalVehicles = models.reduce((sum, model) => sum + model.inventory, 0);
    const categories = models.reduce((acc, model) => {
      const category = model.category || 'Other';
      if (!acc[category]) acc[category] = { models: [], total: 0 };
      acc[category].models.push(model);
      acc[category].total += model.inventory;
      return acc;
    }, {} as Record<string, { models: ModelData[], total: number }>);

    setStats({
      totalModels: models.length,
      totalVehicles,
      categories
    });
  }, [models]);

  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('electric')) return Zap;
    if (categoryLower.includes('truck')) return Truck;
    if (categoryLower.includes('commercial')) return Package;
    if (categoryLower.includes('performance')) return Gauge;
    if (categoryLower.includes('luxury')) return ShieldCheck;
    return Car;
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-600">Loading available models...</p>
        </div>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">No models currently available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-blue-900">Available Models</h2>
          <span className="text-blue-700 font-medium">{stats.totalModels} Models</span>
        </div>
        <p className="text-sm text-blue-700">
          {stats.totalVehicles} {stats.totalVehicles === 1 ? 'vehicle' : 'vehicles'} in stock
        </p>
      </div>

      {Object.entries(stats.categories).map(([category, { models: categoryModels, total }]) => (
        <div key={category} className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              {React.createElement(getCategoryIcon(category), {
                className: 'w-5 h-5 text-gray-600'
              })}
              <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
            </div>
            <span className="text-sm text-gray-500 font-medium">
              {total} {total === 1 ? 'Vehicle' : 'Vehicles'}
            </span>
          </div>

          <div className="space-y-2">
            {categoryModels.map((model) => (
              <button
                key={model.name}
                onClick={() => onSelectModel(model)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  selectedModel?.name === model.name
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 shadow-md border border-blue-200'
                    : 'hover:bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedModel?.name === model.name 
                        ? 'bg-blue-200/50' 
                        : 'bg-gray-100'
                    }`}>
                      <Car className={`w-5 h-5 ${
                        selectedModel?.name === model.name 
                          ? 'text-blue-700' 
                          : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        selectedModel?.name === model.name 
                          ? 'text-blue-700' 
                          : 'text-gray-800'
                      }`}>
                        {model.name}
                      </h3>
                      <div className="flex items-center text-sm mt-1">
                        <Package className={`w-4 h-4 mr-1 ${
                          selectedModel?.name === model.name
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`} />
                        <span className={selectedModel?.name === model.name
                          ? 'text-blue-600'
                          : 'text-gray-500'
                        }>
                          {model.inventory} {model.inventory === 1 ? 'Vehicle' : 'Vehicles'} Available
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedModel?.name === model.name && (
                    <div className="w-1.5 h-8 rounded-full bg-blue-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};