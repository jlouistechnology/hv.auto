export interface AlgoliaSearchParams {
  facetFilters?: Array<string[]>;
  facets?: string[];
  hitsPerPage?: number;
  maxValuesPerFacet?: number;
  analytics?: boolean;
  clickAnalytics?: boolean;
  page?: number;
}

export interface AlgoliaRequest {
  indexName: string;
  params: AlgoliaSearchParams;
}

export interface BaseVehicleData {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  msrp: number;
  image: string;
  exteriorColor: string;
  interiorColor: string;
  mileage: number;
  vin: string;
  stock: string;
  features: string[];
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  mpgCity: number;
  mpgHighway: number;
  link: string;
  dealerDiscount?: number;
  status: string;
}

export interface VehicleModel {
  name: string;
  category: string;
}

export interface ModelData extends VehicleModel {
  inventory: number;
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  year?: number;
  maxPrice?: number;
  minPrice?: number;
}