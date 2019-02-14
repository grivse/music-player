import axios from 'axios';

export  function fetchData (url) {
    return axios.get(url).
        then(response => {
            if (response.status === 200) {
                return response.data
            }
        })
}

export const getLocal = key => JSON.parse(localStorage.getItem(key)) !== null ? JSON.parse(localStorage.getItem(key)) : []