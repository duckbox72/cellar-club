/*
import axios from 'axios';

export async function  getBinOptions(cellarname) {
    
    const response = await axios.get(`/api/bin_options/${cellarname}`)
    
    const data = response.data

    const bins = data.map(bin => bin.binname);

    console.log(data);
    console.log(bins)

    return data;
}

*/


export function getBinOptions(cellarname) {
    const binOptions = []
    
    fetch(`/api/bin_options/${cellarname}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(option => {
            binOptions.push(option.binname)
        })
    })
    console.log(binOptions)
    
    return binOptions
}
