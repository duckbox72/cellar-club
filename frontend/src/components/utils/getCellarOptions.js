export function getCellarOptions() {
    const cellarOptions = []
    
    fetch('/api/cellar_options')
    .then(response => response.json())
    .then(data => {
        data.forEach(option => {
            cellarOptions.push(option.cellarname)
        })
    })
    return cellarOptions
}