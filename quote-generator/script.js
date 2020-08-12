const quoteContainer = document.getElementById('quote-container');
const quoteAuthor = document.getElementById('author');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quote from API
async function getQuote(){
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{
        const response = await fetch(proxyURL + quoteURL);
        const data = await response.json();
        
        //If author is blank, add 'Unknown'
        if (data.quoteAuthor === ''){
            quoteAuthor.innerText = 'Unknown';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }

        quoteText.innerText = data.quoteText;
    
    }
    catch(error){
        console.log('whoops ' + error)
        getQuote();
    }
}

getQuote();