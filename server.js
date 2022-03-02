const express = require('express')
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded())
const fetch = require('cross-fetch');
const { response } = require('express');

const username = 'B06930994'
const password = 'lWil38!f66fS%26'
const startDate = 'any'
const endDate = 'any'
const cups = 'any'
const measurementType = 'any'
const distributorCode = 'any'

/**
 * This endpoint returns user cups from user data (NIF)
 * @returns cups 
 */
app.get('/supplies', async (req, res) => {


    /**
     * GET AUTH TOKEN 
     */
    const {nif} = req.query

    const passwordQueryURL = encodeURIComponent(password)
    const fetchTokenURL = `https://datadis.es/nikola-auth/tokens/login?username=${username}&password=${passwordQueryURL}`
    const response = await fetch(fetchTokenURL, "POST")
    if(!response.ok){
        return res.status(400).send({error: response.error})
    }

    const token = await response.text()

    const fetchSupplyURL = `https://datadis.es/api-private/api/get-supplies?authorizedNif=${nif}`

    /**
     * GET USER SUPPLIES
     */
    const supplyResponse = await fetch(fetchSupplyURL, "GET", {
        headers: {
            "Authorization": `Bearer ${token}`
        }

    })

    if(!supplyResponse.ok){
        return res.status(400).send({error: response.error})
    }

    const supplies = await supplyResponse.json()



    const fetchContractURL = 'https://datadis.es/api-private/api/get-contract-detail?cups=${cups}&distributorCode=2&authorizedNif=${nif}'
    const contractResponse = await fetch(fetchContractURL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    
    if(!contractResponse.ok){
    return res.status(400).send({error: response.error})
    }
    const supplies = await contractResponse.json()  
    

    const fetchConsumptionURL = "https://datadis.es/api-private/api/get-consumption-data?cups=ES0031405428005009LA0F&distributorCode=2&startDate=2022%2F01%2F01&endDate=2022%2F01%2F31&measurementType=0&pointType=5&authorizedNif=Y1366753S&"
    const fetchConsumptionURL = await fetch(fetchConsumptionURL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    
    if(!consumptionResponse.ok){
    return res.status(400).send({error: response.error})
    }
    const supplies = await consumptionResponse.json() 
    

    const fetchMaxURL = "https://datadis.es/api-private/api/get-max-power?cups=ES0031405428005009LA0F&distributorCode=5&startDate=2021%2F07&endDate=2021%2F08&authorizedNif=Y1366753S"
    const fetchMaxURL = await fetch(fetchMaxURL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(!maxResponse.ok){
    return res.status(400).send({error: response.error})
    }
    const supplies = await maxResponse.json()

    
 
    const 
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









