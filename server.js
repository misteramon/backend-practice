const express = require('express')
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
const fetch = require('cross-fetch');
const { response } = require('express');

const username = 'B06930994'
const password = 'lWil38!f66fS%26'
const cups = ''
const measurementType = ''
const distributorCode = ''
const pointType = ''



/**
 * This endpoint returns user cups from user data (NIF)
 * @returns cups 
 */
app.get('/supplies', async (req, res) => {

    

     
    const {nif, startDate, endDate} = req.query

    const passwordQueryURL = encodeURIComponent(password)
    const fetchTokenURL = `https://datadis.es/nikola-auth/tokens/login?username=${username}&password=${passwordQueryURL}`
    const response = await fetch(fetchTokenURL, "POST")
    if(!response.ok){
        return res.status(400).send({error: response.error})
    }

    const token = await response.text()

    const fetchSupplyURL = `https://datadis.es/api-private/api/get-supplies?authorizedNif=${nif}`
    const supplyResponse = await fetch(fetchSupplyURL, "GET", {
        headers: {
            "Authorization": `Bearer ${token}`
        }

    })

    if(!supplyResponse.ok){
        return res.status(400).send({error: response.error})
    }

    const supplySupplies = await supplyResponse.json()
    console.log(supplySupplies);





    const fetchContractURL = `https://datadis.es/api-private/api/get-contract-detail?cups=${cups}&distributorCode=${distributorCode}&authorizedNif=${nif}`
    const contractResponse = await fetch(fetchContractURL, "GET", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    
    if(!contractResponse.ok){
    return res.status(400).send({error: response.error})
    }
    const contractSupplies = await contractResponse.json()  
    

    const fetchConsumptionURL = `https://datadis.es/api-private/api/get-consumption-data?cups=${cups}&distributorCode=${distributorCode}&startDate=${startDate}&endDate=${endDate}&measurementType=${measurementType}&pointType=${pointType}&authorizedNif=${nif}`
    const consumptionResponse = await fetch(fetchConsumptionURL, "GET", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    
    if(!consumptionResponse.ok){
    return res.status(400).send({error: response.error})
    }
    const consumptionSupplies = await consumptionResponse.json() 
    

    const fetchMaxURL = `https://datadis.es/api-private/api/get-max-power?cups=${cups}&distributorCode=${distributorCode}&startDate=${startDate}&endDate=${endDate}&authorizedNif=${nif}`
    const maxResponse = await fetch(fetchMaxURL, "GET", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(!maxResponse.ok){
    return res.status(400).send({error: response.error})
    }
    const maxSupplies = await maxResponse.json()

    
 
   

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


app.listen(7000, () => {
    console.log('Port 7000')
});










