// Get Quote from API
async function getQuote(){
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const quoteURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{
        const response = await fetch(proxyURL + quoteURL);
        const data = await response.json;
    }
    catch(error){
        getQuote();
    }
}