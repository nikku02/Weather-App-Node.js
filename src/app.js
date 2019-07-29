const express = require('express')
const path = require('path')

const app = express()
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Abhishek Singh'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Abhishek Singh',
        message:'Display Message'
    })
})
app.get('/about',(req, res)=>{
     res.render('about',{
         title:"About Page",
         name:"Abhishek Singh"
     })
})

app.get('/weather',(req, res)=>{
    // res.send('Weather Page!')
    if (!req.query.address) {
        return res.send({
            error:"You must provide Address"
        })
    }
    else{
        geocode(req.query.address,(error, { latitude, longitude, location } = {})=>{
            if(error){
                return res.send({
                    error:error
                })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    location:location,
                    forecast:forecastData.data,
                    address:req.query.address
                })
              })
        })    
    }
    // res.send({
    //     forecast: 'It is Snowing!',
    //     address: req.query.address
    // })
})

app.get('/products',(req, res)=>{
    
    if(!req.query.search){
        return res.send({
            error:"You must provide Search Item"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: "404",
        name: "Abhishek Singh",
        message:"Help article not found"
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: "404",
        name: "Abhishek Singh",
        message:"This is an Error Message!"
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000!')
})