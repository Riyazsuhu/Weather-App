const request=require('request')
const geocode=(address,callback)=>{
    let url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicml5YXoxOTk5IiwiYSI6ImNrOHN1bW9tYzAwMmczaXFrYzloNzlnYWoifQ.KAUJkm5WYkiL24-McUunig'
    request({url,json:true},(err,res)=>{
        console.log(res.body.features)
        if(err){
            callback('Check your network conectivity',undefined)
        }else if(res.body.features.length==0){
            callback('Unable to find your query Try More specific or check your query!!!',undefined)
        }else{
            callback(undefined,{
                latitude:res.body.features[0].center[1],
                langitude:res.body.features[0].center[0],
                location:res.body.features[0].place_name
            })
        }
    })
}
module.exports=geocode 