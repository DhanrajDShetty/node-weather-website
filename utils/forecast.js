const request = require('request')
const loc = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=b7988976a52af854956869a230cd46a0&query=' + lat + ',' + long 
    request({url,json:true},(error,{body})=>{
      if(error)
      {
        callback('Unable to connect to weather service!',undefined)
      }else if(body.error){
         callback('Unable to find the location')
      }else{
        callback(undefined, body.current.weather_descriptions[0]+' starting in the evening. It is currently '+body.current.temperature+' degress out. But it feelslike '+body.current.feelslike+'.')
      }
    })
  }

  module.exports = loc
