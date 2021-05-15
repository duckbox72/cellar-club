export function getStoreOptions() {
    const storeOptions = []
    
    fetch('/api/store_options')
    .then(response => response.json())
    .then(data => {
        data.forEach(option => {
            storeOptions.push(option.store)
        })
    })
    return storeOptions
}