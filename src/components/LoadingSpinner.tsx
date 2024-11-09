import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
  </div>
);