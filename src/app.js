const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geodata')
const weathercode=require('./utils/weather')

const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,'../templates/partials')
const viewspath=path.join(__dirname,'../templates/views')

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Rajvi Jain'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Rajvi Jain'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Rajvi Jain'
    })
})
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({err:"No address Enter"})
    }

    geocode(req.query.address,(error,data={})=>{
           if(error){
            res.send({error:error})
           }
           else{
              weathercode(data,(error,result={})=>{
                if(error){
                    res.send(error)
                }
                else{
                    
                    res.send([{
                        forecast:result.curr_temp,
                        description:result.wd,
                        location:data.place_name,
                        address:req.query.address
                    }])
                }
                    
          
              })
           }
    })
 
   
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name:'Rajvi',
        msg:'Could not find Article'
    })

})
app.get('/*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name:'Rajvi',
        msg:'404 Page'
    })

})
app.listen(3000,()=>{
    console.log("Server is running")
})