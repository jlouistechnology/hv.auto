// vehicleService.ts
import { aggregateVehiclesByBrand, searchVehicles } from './algoliaService';
import { dealershipModels } from './vehicleData';
import type { ModelData } from './types';

// Fetch available models with inventory count using aggregateVehiclesByBrand
export async function fetchModels(
  brand: 'chevrolet' | 'honda' | 'toyota'
): Promise<ModelData[]> {
  try {
    // Use aggregateVehiclesByBrand to get inventory counts directly for the specified brand
    const modelCounts = await aggregateVehiclesByBrand(brand);
    // Retrieve models associated with the selected brand
    const modelsData = dealershipModels[brand];

    // Map the inventory counts to each model and filter out those with zero inventory
    return modelsData
      .map(model => ({
        ...model,
        inventory: modelCounts.find(countData => countData.name === model.name)?.inventory || 0
      }))
      .filter(model => model.inventory > 0) // Exclude models with zero inventory
      .sort((a, b) => b.inventory - a.inventory); // Sort models by inventory count, descending
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}

// Fetch vehicles by specific model and brand
export async function fetchVehiclesByModel(brand: 'chevrolet' | 'honda' | 'toyota', model: string) {
  return searchVehicles(brand, model); // Directly fetch vehicles by brand and model
}
