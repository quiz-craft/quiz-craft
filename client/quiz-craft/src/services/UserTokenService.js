// Function to set data in local storage
export const setLocalStorageItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in local storage: ${error}`);
    }
  };
  
  // Function to get data from local storage
  export const getLocalStorageItem = (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error(`Error getting ${key} from local storage: ${error}`);
      return null;
    }
  };
  
  // Function to remove data from local storage
  export const removeLocalStorageItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from local storage: ${error}`);
    }
  };
