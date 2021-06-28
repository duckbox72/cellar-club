export function getQuantityOptions() {
    const quantities = Array.from(Array(1).keys()).map(x => ++x).map(String)  

    return quantities;
}