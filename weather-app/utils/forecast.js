const request = require('request');

const forecast = (longitude,latitude,callback)=>{
   const url='http://api.weatherstack.com/current?access_key=2bb90850b2098c72bf3398523880a2d3&query='+ longitude + ','+ latitude +'units=f';

    request({ url: url, json: true },(error,response) =>{
    if(error){
        callback('Unable to connect to weather service',undefined);
    }else if (response.body.error){
        callback('Unable to find location',undefined);
    }else{ 
        callback(undefined,response.body.current.weather_descriptions[0] +'.It is currently ' + response.body.current.temperature + ' degrees out. It feels like '+ response.body.current.feelslike + ' degrees out.')
    }
})

}




module.exports = forecast;







