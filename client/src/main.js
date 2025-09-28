const guestbookSection = document.getElementById('app')



async function fetchEntries() {
    
    const response = await fetch ('https://testing-githubpush.onrender.com/entries')
    const entries = await response.json()
    displayEntries(entries);
}
function displayEntries(entriesArray) {
   
    guestbookSection.innerHTML = '';
    
    entriesArray.forEach((entry)=>{
       
        const div = document.createElement('div')

        console.log(entry)
        
        const messengerElement = document.createElement('p')
        const messageElement = document.createElement('p')
    
    messengerElement.innerText = entry.messenger +  "wrote";
    messageElement.innerText = entry.message;

        div.setAttribute('class','entry-container')
        div.append(messengerElement, messageElement)
        guestbookSection.append(div)

    });
}

const form = document.getElementById('form')

form.addEventListener('submit', async (event)=>{
    event.preventDefault()

    const data = new FormData(form)
    const userEntry = Object.fromEntries(data)
    console.log(userEntry)
   
    const response = await fetch('https://testing-githubpush.onrender.com/entries',{
        headers:{
                "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userEntry)
    })

    form.reset();
    fetchEntries();
})
