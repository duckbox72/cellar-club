export function getVintageOptions() {
    const initialYear = 1950; // <------ TO DO
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array((currentYear+1)-initialYear), (x,i) => i + (currentYear - (currentYear-initialYear)));   
    
    const vintages = years.reverse().map(String);
    vintages.splice(0, 0, 'N/V')
    console.log(vintages);
    
    return vintages;
}