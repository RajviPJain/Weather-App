console.log('Client Side')


const form=document.querySelector('form')
const l=document.querySelector('.location')
const message1=document.querySelector('#msg1')
const message2=document.querySelector('#msg2')

form.addEventListener('submit',(e)=>{
      e.preventDefault()
      console.log(l.value)
      message1.innerText="Loading..."
      message2.innerText=""

      fetch('/weather?address='+l.value)
.then((response)=>{
    response.json().then((data)=>{
       console.log(data)
        message1.innerText=data[0].forecast
        message2.innerText=data[0].location
    })
    .catch((error)=>{
        message1.innerText='Enter Valid Address'
        message2.innerText=''
    })
})
.catch((error)=>{
    message1.innerText='NO response'
})
     
})