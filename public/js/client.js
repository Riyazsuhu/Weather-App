const weatherForm=document.querySelector('form')
const input=document.querySelector('input')
const data1=document.querySelector('#data1')
const data2=document.querySelector('#data2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let location=input.value
    data1.textContent='Loading...'
    data2.textContent=''
    fetch('/weather?address='+location).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            data1.textContent=data.error
        }else{
        data1.textContent=data.location
        data2.textContent="Currently "+data.forecast.summary+' Now temperature is '+data.forecast.temperature+' celsius'+' and '+data.forecast.rain_possibility+'% Rain Possibility.'
    }
})
})
})