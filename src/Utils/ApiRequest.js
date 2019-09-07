import axios from 'axios';

const getApiResponse = async(method, url, data='', headers)=>{
    const responseData = await axios({
        async: true,
        crossDomain: true,
        url,
        method,
        headers,
        data: JSON.stringify(data)
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        alert(err);
    });
    return responseData;
}


export default getApiResponse;