/* export const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }; */

  
  export const capitalize = (name) => {
  // Split the name into parts separated by space
  const parts = name.split(" ");
  
  // Capitalize each part of the name
  const capitalizedParts = parts.map(part => {
    // Capitalize the first character of each part
    return part.charAt(0).toUpperCase() + part.slice(1);
  });

  // Join the capitalized parts back together with a space
  return capitalizedParts.join(" ");
};
