// Types for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string): void => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
};

// Track vehicle view
export const trackVehicleView = (vehicle: {
  id: string;
  title: string;
  price: string;
  stockNumber: string;
}): void => {
  window.gtag?.('event', 'view_item', {
    event_category: 'Vehicle View',
    event_label: vehicle.title,
    vehicle_id: vehicle.id,
    vehicle_price: vehicle.price,
    vehicle_stock: vehicle.stockNumber
  });
};

// Track vehicle interest (e.g., clicking "Check Availability")
export const trackVehicleInterest = (vehicle: {
  id: string;
  title: string;
  price: string;
  stockNumber: string;
}): void => {
  window.gtag?.('event', 'generate_lead', {
    event_category: 'Vehicle Interest',
    event_label: vehicle.title,
    vehicle_id: vehicle.id,
    vehicle_price: vehicle.price,
    vehicle_stock: vehicle.stockNumber
  });
};

// Track search
export const trackSearch = (searchTerm: string): void => {
  window.gtag?.('event', 'search', {
    event_category: 'Vehicle Search',
    search_term: searchTerm
  });
};

// Track filter usage
export const trackFilter = (filterType: string, filterValue: string): void => {
  window.gtag?.('event', 'filter_selection', {
    event_category: 'Vehicle Filter',
    filter_type: filterType,
    filter_value: filterValue
  });
};