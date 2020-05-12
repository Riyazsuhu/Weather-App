//using library for our project
const path=require('path')
const hbs=require('hbs')
const express=require('express')
const app=express()
const log=console.log
const port = process.env.PORT || 3000
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//path setup for external services
const directory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//using a static files
app.use(express.static(directory))
//setup using hbs files
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//All use request
app.get("/",(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Riyaz ahmed'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'Weather is the state of the atmosphere, describing for example the degree to which it is hot or ... Studying how the weather works on other planets has been helpful in understanding how weather works on Earth. ... man-made objects) have differing physical characteristics such as reflectivity, roughness, or moisture content.',
        name:'Riyaz ahmed'
        
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Riyaz ahmed',
        location:'Portonovo Tamilnadu',
        profession: 'Software Engineer'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Give a query address'
        })
    }
    let address=req.query.address
    geocode(address,(error,{latitude,langitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, langitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({location,forecast:forecastdata})
          })
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        name:'Riyaz ahmed',
        errormessage:'Help arcticle not found.'
    })
})
app.get('*',(req, res)=>{
    res.render('error',{
        title:'404 Error',
        name:'Riyaz ahmed',
        errormessage:'Page not found.'
    })
})
app.listen(port,()=>{
    log('Weather app server is stated in port',port)
})
