import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="bg-red-50 text-red-800 rounded-lg p-4 flex items-center">
      <AlertCircle className="w-5 h-5 mr-2" />
      <span>{message}</span>
    </div>
  </div>
);