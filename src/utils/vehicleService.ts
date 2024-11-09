import { searchVehicles, getAvailableModels } from './algoliaService';
import { dealershipModels } from './vehicleData';
import type { ModelData } from './types';

export async function fetchModels(brand: 'chevrolet' | 'honda' | 'toyota'): Promise<ModelData[]> {
  try {
    const modelCounts = await getAvailableModels(brand);
    
    return dealershipModels[brand]
      .map(model => ({
        ...model,
        inventory: modelCounts[model.name] || 0
      }))
      .filter(model => model.inventory > 0)
      .sort((a, b) => b.inventory - a.inventory);
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}

export async function fetchVehiclesByModel(brand: 'chevrolet' | 'honda' | 'toyota', model: string) {
  return searchVehicles(brand, model);
}