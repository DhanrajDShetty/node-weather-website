const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const public = path.join(__dirname)
const vpaths = path.join(__dirname,'templates/views')
const ppaths = path.join(__dirname,'templates/partials')

app.set('view engine','hbs')
app.set('views', vpaths)
hbs.registerPartials(ppaths)

app.use(express.static(public))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Dhanraj'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is the help page thank you',
        title:'Help',
        name:'Dhanraj'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'404 page not found',
        name:'Dhanraj'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Dhanraj'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forcast(latitude,longitude,(error,locdata)=>{
            if(error)
            {
                res.send({error})
            }
            res.send({
                forecast:locdata,
                location,
                address:req.query.address
            })
        })
    })
   
})
app.get('/products',(req,res)=>{
    
})
app.get('*',(req,res)=>{
    res.render('404',{
        error:'404 page not found',
        name:'Dhanraj'
    })
})

app.listen(port,()=>{
    console.log('Server is running')
})