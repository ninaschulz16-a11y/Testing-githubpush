const jokeDisplaySection = document.getElementById('app')

//Get all the jokes from our express API and display

// how do we fetch data??
//fetch () function
//create a function to fetch data

async function fetchJokes() {
    //fetch() by default send a GET request 
    const response = await fetch ('https://testing-githubpush.onrender.com/jokes')
    const jokes = await response.json()
    createJokes(jokes)
}
function createJokes (jokesArray) {
    jokesArray.forEach((singleJoke)=>{
        const div = document.createElement('div')

        console.log(singleJoke)
        
        const jokeElement = document.createElement('p')
        const punchlineElement = document.createElement('p')
    //set the p element we made to have text of the joke
    jokeElement.innerText =singleJoke.joke;
    punchlineElement.innerText = singleJoke.punchline;

        div.setAttribute('class','joke-container')
        div.append(jokeElement, punchlineElement)
        jokeDisplaySection.append(div)

    })
}

/*
{
"id": 1,
"joke": "Why did the scarecrow win an award?",
"punchline": "Because he was outstanding in his field."
}
<div>
    <p>joke</p>
</div>
*/

fetchJokes()

//Lets work on a form so users can create new jokes

const form = document.getElementById('form')

form.addEventListener('submit', async (event)=>{
    event.preventDefault()

    const data = new FormData(form)
    const userJoke = Object.fromEntries(data)
    console.log(userJoke)

    //Now I need to send a POST request to my server
    const response = await fetch('https://testing-githubpush.onrender.com/jokes',{
        headers:{
                "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userJoke)
    })
})