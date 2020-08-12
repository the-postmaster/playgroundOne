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

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        
        quoteText.innerText = data.quoteText;
    
    }
    catch(error){
        console.log('whoops ' + error)
        getQuote();
    }
}

//Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterURL, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);