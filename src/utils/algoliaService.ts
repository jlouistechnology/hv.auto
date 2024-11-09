import algoliasearch from 'algoliasearch';
import { DEALER_CONFIGS } from './config';
import type { BaseVehicleData, AlgoliaRequest } from './types';
import {
  mapChevroletData,
  mapHondaData,
  mapToyotaData,
} from './vehicleMappers';

export async function searchVehicles(
  brand: 'chevrolet' | 'honda' | 'toyota',
  model: string
) {
  try {
    const config = DEALER_CONFIGS[brand].api;
    const client = algoliasearch(config.appId, config.apiKey);
    const index = client.initIndex(config.indexName);

    const searchResponse = await index.search('', {
      facetFilters: [
        [`make:${brand.charAt(0).toUpperCase() + brand.slice(1)}`],
        [`model:${model}`],
        ['type:New']
      ],
      hitsPerPage: 100,
    });

    const mappers = {
      chevrolet: mapChevroletData,
      honda: mapHondaData,
      toyota: mapToyotaData,
    };

    return {
      vehicles: searchResponse.hits.map(mappers[brand]),
      total: searchResponse.facets?.type?.New || 0
    };
  } catch (error) {
    console.error('Algolia search error:', error);
    return { vehicles: [], total: 0 };
  }
}

export async function getAvailableModels(
  brand: 'chevrolet' | 'honda' | 'toyota'
) {
  try {
    const config = DEALER_CONFIGS[brand].api;
    const client = algoliasearch(config.appId, config.apiKey);
    const index = client.initIndex(config.indexName);

    const { facets } = await index.search('', {
      facetFilters: [
        [`make:${brand.charAt(0).toUpperCase() + brand.slice(1)}`],
        ['type:New']
      ],
      facets: ['model'],
      hitsPerPage: 0,
      maxValuesPerFacet: 100
    });

    const models: Record<string, number> = {};
    Object.entries(facets?.model || {}).forEach(([model, count]) => {
      models[model] = count as number;
    });

    return models;
  } catch (error) {
    console.error('Error fetching models:', error);
    return {};
  }
}