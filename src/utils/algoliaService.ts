// vehicleService.ts
import algoliasearch from 'algoliasearch';
import { DEALER_CONFIGS } from './config';
import { mapChevroletData, mapHondaData, mapToyotaData } from './vehicleMappers';
import { dealershipModels } from './vehicleData';
import type { ModelData } from './types';

type Brand = 'chevrolet' | 'honda' | 'toyota';

const MODELS_REQUIRING_MAKE_FILTER: { [key in Brand]: string[] } = {
  chevrolet: ['Corvette', 'Silverado'],
  honda: ['Accord', 'Accord Hybrid', 'CR-V Hybrid'],
  toyota: [],
};

const MODEL_VARIATIONS: { [baseModel: string]: string[] } = {
  'Accord': ['Accord', 'Accord Sedan'],
  'Accord Hybrid': ['Accord Hybrid', 'Accord Sedan'],
  'CR-V Hybrid': ['CR-V'],
  'Silverado 1500': [
    'Silverado', 'Silverado 1500', 'Silverado 1500 LD', 'Silverado 2500HD',
    'Silverado 3500HD', 'Silverado 4500HD', 'Silverado 5500HD', 'Silverado 6500HD',
    'Silverado HD', 'Silverado LD', 'Silverado LTD',
  ],
  'Corvette': ['Corvette', 'Corvette Grand Sport', 'Corvette Stingray', 'Corvette Z06'],
};

const VARIATION_TO_BASE_MODEL = Object.entries(MODEL_VARIATIONS).reduce((acc, [base, variations]) => {
  variations.forEach(variation => acc[variation] = base);
  return acc;
}, {} as { [variation: string]: string });

const MODEL_FUEL_TYPES: { [key: string]: string[] } = {
  'CR-V Hybrid': ["fueltype:Gas/Electric Hybrid", "fueltype:Hybrid", "fueltype:Hybrid Fuel"],
  'Accord': ['fueltype:Gas', 'fueltype:Gasoline Fuel'],
  'Accord Hybrid': ['fueltype:Gas/Electric Hybrid', 'fueltype:Hybrid', 'fueltype:Hybrid Fuel'],
};

const buildFacetFilters = (brand: Brand, model: string): string[][] => {
  const filters: string[][] = [['type:CTP', 'type:Demo', 'type:New']];
  const baseModel = VARIATION_TO_BASE_MODEL[model] || model;

  if (MODEL_FUEL_TYPES[baseModel]) {
    filters.push(MODEL_FUEL_TYPES[baseModel]);
  }

  if (MODELS_REQUIRING_MAKE_FILTER[brand].includes(baseModel)) {
    filters.push([`make:${capitalize(brand)}`]);
  }

  const modelFilters = MODEL_VARIATIONS[baseModel]
    ? MODEL_VARIATIONS[baseModel].map(variation => `model:${variation}`)
    : [`model:${baseModel}`];
  filters.push(modelFilters);

  return filters;
};

const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

const initializeAlgoliaIndex = (brand: Brand) => {
  const config = DEALER_CONFIGS[brand].api;
  const client = algoliasearch(config.appId, config.apiKey);
  return client.initIndex(config.indexName);
};

export async function searchVehicles(brand: Brand, model: string) {
  try {
    const index = initializeAlgoliaIndex(brand);
    const facetFilters = buildFacetFilters(brand, model);

    const searchResponse = await index.search('', {
      facetFilters,
      hitsPerPage: 100,
    });

    const mapper = {
      chevrolet: mapChevroletData,
      honda: mapHondaData,
      toyota: mapToyotaData,
    }[brand];

    return {
      vehicles: searchResponse.hits.map(mapper),
      total: searchResponse.nbHits || 0,
    };
  } catch (error) {
    console.error('Algolia search error:', error);
    return { vehicles: [], total: 0 };
  }
}

export const aggregateVehiclesByBrand = async (brand: Brand) => {
  try {
    const client = algoliasearch(DEALER_CONFIGS[brand].api.appId, DEALER_CONFIGS[brand].api.apiKey);
    const models = dealershipModels[brand];

    const queries = models.map(model => {
      const facetFilters = buildFacetFilters(brand, model.name);

      return {
        indexName: DEALER_CONFIGS[brand].api.indexName,
        params: {
          facetFilters,
          facets: ['model'],
          maxValuesPerFacet: 250,
        },
      };
    });

    const response = await client.multipleQueries(queries, { strategy: 'none' });
    const aggregatedResults: ModelData[] = [];

    response.results.forEach((result, idx) => {
      const modelCounts = (result as any).facets?.model || {};
      const baseModel = models[idx].name;

      const totalInventory = MODEL_VARIATIONS[baseModel]?.reduce((acc, variant) => {
        return acc + (modelCounts[variant] || 0);
      }, 0) || modelCounts[baseModel] || 0;

      if (totalInventory > 0) {
        aggregatedResults.push({
          name: baseModel,
          category: models[idx].category,
          inventory: totalInventory,
        });
      }
    });

    return aggregatedResults;
  } catch (error) {
    console.error(`Error aggregating vehicles by brand for ${brand}:`, error);
    return [];
  }
};
