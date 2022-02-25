const express = require('express')
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded())
const fetch = require('cross-fetch')

const username = ''
const password = ''


/**
 * This endpoint returns user cups from user data (NIF)
 * @returns cups 
 */
app.get('/supplies', async (req, res) => {


    /**
     * GET AUTH TOKEN 
     */
    const {nif, startDate, endDate} = req.query

    const passwordQueryURL = encodeURIComponent(password)
    const fetchURL = `https://datadis.es/nikola-auth/tokens/login?username=${username}&password=${passwordQueryURL}`
    const response = await fetch(fetchURL, "POST")
    if(!response.ok){
        return res.status(400).send({error: response.error})
    }

    const token = await response.text()

    const fetchSupplyURL = `https://datadis.es/api-private/api/get-supplies?authorizedNif=${nif}`


    /**
     * GET USER SUPPLIES
     */
    const supplyResponse = await fetch(fetchSupplyURL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }

    })


    if(!supplyResponse.ok){
        return res.status(400).send({error: response.error})
    }


    const supplies = await supplyResponse.json()

    const {} = supplies // obtain params for next call

    /**
     * GET CONSUMPTION
     * @param nif
     * @param startDate
     * @param endDate
     * @param cups
     * @param measurementType
    */

    

    //fetch consumption from DATADIS given supplies

    

    return res.status(200).json(supplies)


    

});



app.listen(8000, () => {
    console.log('Port 8000')
});



