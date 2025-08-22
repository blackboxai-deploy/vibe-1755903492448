// Problematic utility functions with various build issues

import { NonExistentModule } from 'fake-package';
import * as fs from 'fs';
import { SomeType } from './missing-types';

// Type error - using Node.js API in browser context
export const readFileSync = (path: string) => {
  return fs.readFileSync(path, 'utf8');
};

// Missing return type annotation
export function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  // Missing return statement
}

// Unused variable
export const processData = (data: any[]) => {
  const unusedVariable = "This will cause a warning";
  const result = data.map(item => item.value);
  return result;
};

// Type mismatch
export const formatCurrency = (amount: string): number => {
  return `$${amount.toFixed(2)}`;
};

// Accessing undefined property
export const getUserInfo = (user: { name: string }) => {
  return {
    name: user.name,
    email: user.email,
    age: user.profile.age
  };
};

// Infinite recursion
export const factorial = (n: number): number => {
  if (n <= 1) return factorial(n - 1);
  return n * factorial(n - 1);
};

// Using deprecated API
export const deprecatedFunction = () => {
  // @ts-ignore
  return Buffer(1024);
};

// Missing dependency
export const useExternalLib = () => {
  return NonExistentModule.doSomething();
};

// Async/await issue
export const fetchData = async (url: string) => {
  const response = fetch(url);
  return response.json();
};

// Memory leak potential
export const createEventListener = () => {
  const handler = () => console.log('clicked');
  document.addEventListener('click', handler);
  // Missing cleanup
};