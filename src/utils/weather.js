const request=require('request')

const weatherdata=({latitude,longitude},callback)=>{
    const url='http://api.weatherstack.com/current?access_key=abf8396720fd6c1d115a032c4bb55d8e&query='+latitude+','+longitude
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect",undefined)
        }
        else if(response.body.error){
            callback('Invalid Request',undefined)
        }
        else{
            const data=response.body.current
            // console.log(data)
            
            const weather={
                curr_temp:data.temperature,
                wd:data.weather_descriptions
            }
             callback(undefined,weather)
        }
    
    })



}

module.exports=weatherdata;