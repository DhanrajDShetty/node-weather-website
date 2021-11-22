const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=b7988976a52af854956869a230cd46a0&query=45,-75&units=f'

const request = http.request(url,(response) => {

    let data  = ''
    
    response.on('data',(chunk)=>{
    data = data + chunk.toString()

    })
    response.on('end',()=>{
      const body = JSON.parse(data)
      console.log(body)
    })
    response.on('error',(error)=>{
     console.log(error)
    })
    })
    request.end()