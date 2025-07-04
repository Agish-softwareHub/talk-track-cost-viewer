
import { sampleCustomers } from '@/data/sampleCustomers';
import { API_CONFIG, isDevelopment } from '@/config/apiConfig';

export const getCustomers = async () => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return sampleCustomers;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMERS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }
  
  return response.json();
};

export const getCustomerById = async (id: string) => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleCustomers.find(customer => customer.id === id);
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMERS}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch customer');
  }
  
  return response.json();
};

export const searchCustomers = async (searchTerm: string) => {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sampleCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUSTOMERS}?search=${encodeURIComponent(searchTerm)}`);
  if (!response.ok) {
    throw new Error('Failed to search customers');
  }
  
  return response.json();
};
