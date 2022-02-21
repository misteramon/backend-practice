const express = require('express')
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.json()); 
const fetch = require('cross-fetch')



/**
 * This endpoint returns user cups from user data (NIF)
 * @returns cups 
 */
app.get('/supplies', async (req, res) => {

    const {username, password, nif} = req.query

    const passwordQueryURL = encodeURIComponent(password)
    const fetchURL = `https://datadis.es/nikola-auth/tokens/login?username=${username}&password=${passwordQueryURL}`
    const response = await fetchFromDatadis(fetchURL, "POST")
    if(!response.ok){
        return res.status(400).send({error: response.error})
    }

    const token = await response.text()

    const fetchSupplyURL = `https://datadis.es/api-private/api/get-supplies?authorizedNif=${nif}`

    const supplyResponse = await fetch(fetchSupplyURL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }

    })


    if(!supplyResponse.ok){
        return res.status(400).send({error: response.error})
    }


    const supplies = await supplyResponse.json()



    //obtain consumption from DATADIS given supplies

    return res.status(200).json(supplies)


    

});

async function fetchFromDatadis(url, method){
    return fetch(url, {method})
}

app.listen(8000, () => {
    console.log('Port 8000')
});



