const request = require('request')

const forecast = (lat, long, callback)=>{
    const url = 'https://api.darksky.net/forecast/8d59cfb4ccc1f4699318918555272e66/' + lat + ',' + long + '?lang=es'
    request({ url, json:true },(error, { body })=>{
        if (error) {
            callback('Unable to connect to network!', undefined)
        } 
        else if(body.error) {
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,{
                data:body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degrees and there is "+body.currently.precipProbability+"% chance of rain"
            })
        }
    })
}

module.exports = forecast