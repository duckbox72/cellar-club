export function getBottleSizesOptions() {
    const bottleSizes = [];
    fetch(`/api/get_bottle_sizes`)
        .then((response) => response.json())
        .then(results => {
            results.forEach(element => {
                bottleSizes.push(element.size);
            });
        });
    return bottleSizes;
}