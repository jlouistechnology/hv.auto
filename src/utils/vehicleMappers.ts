import type { BaseVehicleData } from './types';
import { PLACEHOLDER_IMAGE } from './config';

export function mapChevroletData(data: any): BaseVehicleData {
  // Extract base model name (e.g., "Silverado" from "Silverado 1500")
  const baseModel = data.model?.split(' ')[0] || '';
  
  return {
    id: data.objectID,
    make: data.make,
    model: baseModel,
    year: parseInt(data.year),
    trim: data.trim,
    price: parseInt(data.our_price) || parseInt(data.msrp),
    msrp: parseInt(data.msrp),
    image: data.thumbnail || PLACEHOLDER_IMAGE,
    exteriorColor: data.ext_color,
    interiorColor: data.int_color,
    mileage: parseInt(data.miles) || 0,
    vin: data.vin,
    stock: data.stock,
    features: data.features || [],
    engine: data.engine_description,
    transmission: data.transmission_description,
    drivetrain: data.drivetrain,
    fuelType: data.fueltype,
    mpgCity: parseInt(data.city_mpg),
    mpgHighway: parseInt(data.hw_mpg),
    link: data.link,
    dealerDiscount: data.lightning?.pricing?.savings?.value,
    status: data.lightning?.status || data.in_transit_sort || 'In Stock'
  };
}

export function mapHondaData(data: any): BaseVehicleData {
  return {
    id: data.objectID,
    make: data.make,
    model: data.model?.split(' ')[0] || '',
    year: parseInt(data.year),
    trim: data.trim,
    price: parseInt(data.our_price) || parseInt(data.msrp),
    msrp: parseInt(data.msrp),
    image: data.thumbnail || PLACEHOLDER_IMAGE,
    exteriorColor: data.ext_color,
    interiorColor: data.int_color,
    mileage: parseInt(data.miles) || 0,
    vin: data.vin,
    stock: data.stock,
    features: data.features || [],
    engine: data.engine_description,
    transmission: data.transmission_description,
    drivetrain: data.drivetrain,
    fuelType: data.fueltype,
    mpgCity: parseInt(data.city_mpg),
    mpgHighway: parseInt(data.hw_mpg),
    link: data.link,
    dealerDiscount: data.lightning?.pricing?.savings?.value,
    status: data.lightning?.status || data.in_transit_sort || 'In Stock'
  };
}

export function mapToyotaData(data: any): BaseVehicleData {
  return {
    id: data.objectID,
    make: data.make,
    model: data.model?.split(' ')[0] || '',
    year: parseInt(data.year),
    trim: data.trim,
    price: parseInt(data.our_price) || parseInt(data.msrp),
    msrp: parseInt(data.msrp),
    image: data.thumbnail || PLACEHOLDER_IMAGE,
    exteriorColor: data.ext_color,
    interiorColor: data.int_color,
    mileage: parseInt(data.miles) || 0,
    vin: data.vin,
    stock: data.stock,
    features: data.features || [],
    engine: data.engine_description,
    transmission: data.transmission_description,
    drivetrain: data.drivetrain,
    fuelType: data.fueltype,
    mpgCity: parseInt(data.city_mpg),
    mpgHighway: parseInt(data.hw_mpg),
    link: data.link,
    dealerDiscount: data.lightning?.pricing?.savings?.value,
    status: data.lightning?.status || data.in_transit_sort || 'In Stock'
  };
}