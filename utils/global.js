export const transformDateForBackend = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
  
      return `${year}-${month}-${day}`;
    }
    return null; 
  };
  


  