import React, { useState, useEffect } from 'react';
import { fetchModels, fetchVehiclesByModel } from './utils/vehicleService';
import { BrandCard } from './components/BrandCard';
import { ModelList } from './components/ModelList';
import { VehicleGrid } from './components/VehicleGrid';
import type { ModelData } from './utils/types';

function App() {
  const [selectedBrand, setSelectedBrand] = useState<'chevrolet' | 'honda' | 'toyota'>('chevrolet');
  const [models, setModels] = useState<ModelData[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoadingModels(true);
      try {
        console.log(selectedBrand);
        const modelData = await fetchModels(selectedBrand);
        setModels(modelData);

        // Automatically select the first available model
        const firstAvailableModel = modelData.find(model => model.inventory > 0);
        if (firstAvailableModel) {
          setSelectedModel(firstAvailableModel);
        }
      } catch (error) {
        console.error('Error loading models:', error);
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, [selectedBrand]);

  const handleBrandSelection = (brand: 'chevrolet' | 'honda' | 'toyota') => {
    setSelectedBrand(brand);
    setIsMobileMenuOpen(true);
  };

  const handleModelSelection = (model: ModelData) => {
    setSelectedModel(model);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Exclusive Vehicle Specials</h1>
          <p className="mt-2 text-xl text-gray-600">Discover amazing deals on our newest vehicles</p>
        </header>

        {/* Brand Selection */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {['chevrolet', 'honda', 'toyota'].map((brand) => (
            <BrandCard
              key={brand}
              brand={brand as 'chevrolet' | 'honda' | 'toyota'}
              active={selectedBrand === brand}
              onClick={() => handleBrandSelection(brand as 'chevrolet' | 'honda' | 'toyota')}
            />
          ))}
        </div>

        {/* Mobile Toggle for Model List */}
        <div className="block lg:hidden mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-white p-4 rounded-lg shadow flex items-center justify-between"
          >
            <span className="font-medium">
              {isMobileMenuOpen ? 'Hide Models' : 'Show Models'}
            </span>
            <svg
              className={`w-5 h-5 transform transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="grid lg:grid-cols-[320px,1fr] gap-8">
          {/* Model List Sidebar */}
          <aside className={`bg-white p-6 rounded-xl shadow-md ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <ModelList
              models={models}
              selectedModel={selectedModel}
              onSelectModel={handleModelSelection}
              isLoading={isLoadingModels}
            />
          </aside>

          {/* Main Content - Vehicle Grid */}
          <main className="bg-white p-6 rounded-xl shadow-md">
            {selectedModel ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedModel.name} Special Offers
                </h2>
                <VehicleGrid
                  brand={selectedBrand}
                  model={selectedModel.name}
                />
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {isLoadingModels ? (
                  <p>Loading available models...</p>
                ) : (
                  <p>Select a model to view available vehicles</p>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
