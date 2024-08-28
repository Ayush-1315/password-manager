const generateRandomHexColors=(numColors=10)=> {
    const colors = [];
  
    for (let i = 0; i < numColors; i++) {
      // Generate a random color
      const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      colors.push(color);
    }
  
    return colors;
  }

  export const pickRandomColor=()=> {
    const colorsArray=generateRandomHexColors()
    if (colorsArray.length === 0) {
      return null; // Return null if the array is empty
    }
  
    const randomIndex = Math.floor(Math.random() * colorsArray.length);
    return colorsArray[randomIndex];
  }

 
  