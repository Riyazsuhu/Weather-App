const request=require('request')

const forecast=(lat,lan,clbk)=>{
    let url='https://api.darksky.net/forecast/562ef4e8472827ebf60e8b04116f6f4a/'+encodeURIComponent(lat+','+lan)+'?units=si'
    request({url,json:true},(err,res)=>{
        if(err){
            clbk("Check your internet connection",undefined)
        }else if(res.body.error){
            clbk('Check your search query and Try again!!!',undefined)
        }else{
            clbk(undefined,{
                summary:res.body.daily.data[0].summary,
                temperature:res.body.currently.temperature,
                rain_possibility:res.body.currently.precipProbability
            })
        }
    })
}
module.exports=forecast 