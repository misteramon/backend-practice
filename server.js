const express = require('express')
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
const axios = require('axios').default;



const username = 'B06930994'
const password = 'lWil38!f66fS&'
const cups = ''
const measurementType = ''
const distributorCode = ''
const pointType = ''



/**
 * This endpoint returns user cups from user data (NIF)
 * @returns cups 
 */
app.get('/supplies', async (req, res) => {

    
    try{

     
    const {nif, startDate, endDate} = req.query

    const passwordQueryURL = encodeURIComponent(password)
    const fetchTokenURL = `https://datadis.es/nikola-auth/tokens/login?username=${username}&password=${passwordQueryURL}`
    const response = await axios.post(fetchTokenURL)
    if(response.error){
        return res.status(400).send({error: response.error})
    }

    const token = response.data


    const fetchSupplyURL = `https://datadis.es/api-private/api/get-supplies?authorizedNif=${nif}`
    const supplyResponse = await axios.get(fetchSupplyURL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }

    })


    if(supplyResponse.error){
        return res.status(400).send({error: response.error})
    }

    const supplySupplies = supplyResponse.data

    console.log(supplySupplies)





    // const fetchContractURL = `https://datadis.es/api-private/api/get-contract-detail?cups=${cups}&distributorCode=${distributorCode}&authorizedNif=${nif}`
    // const contractResponse = await axios.get(fetchContractURL, {
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // })

    
    // if(!contractResponse.ok){
    // return res.status(400).send({error: response.error})
    // }
    // const contractSupplies = await contractResponse.json()  
    

    // const fetchConsumptionURL = `https://datadis.es/api-private/api/get-consumption-data?cups=${cups}&distributorCode=${distributorCode}&startDate=${startDate}&endDate=${endDate}&measurementType=${measurementType}&pointType=${pointType}&authorizedNif=${nif}`
    // const consumptionResponse = await axios.get(fetchConsumptionURL, {
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // })
    
    // if(!consumptionResponse.ok){
    // return res.status(400).send({error: response.error})
    // }
    // const consumptionSupplies = await consumptionResponse.json() 
    

    // const fetchMaxURL = `https://datadis.es/api-private/api/get-max-power?cups=${cups}&distributorCode=${distributorCode}&startDate=${startDate}&endDate=${endDate}&authorizedNif=${nif}`
    // const maxResponse = await axios.get(fetchMaxURL, {
    //     headers: {
    //         "Authorization": `Bearer ${token}`
    //     }
    // })

    // if(!maxResponse.ok){
    // return res.status(400).send({error: response.error})
    // }
    // const maxSupplies = await maxResponse.json()

    
 
   

    // /**
    //  * GET CONSUMPTION
    //  * @param nif
    //  * @param startDate
    //  * @param endDate
    //  * @param cups
    //  * @param measurementType
    // */

   
    // //fetch consumption from DATADIS given supplies



    //     return res.status(200).json(supplies)


}catch(e){
    res.sendStatus(500)
    console.log(e)
}

});


app.listen(7000, () => {
    console.log('Port 7000')
});










