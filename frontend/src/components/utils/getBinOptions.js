export function getBinOptions(cellarname) {
    const binOptions = []
    
    fetch(`/api/bin_options/${cellarname}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(option => {
            binOptions.push(option.binname)
        })
    })
    
    return binOptions
}
