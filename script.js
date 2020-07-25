// all the elements neeed to manipulate the DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



// GET QUOTE FORM API
async function getQuote() {
  // This Proxy URL is here to make our API call in order to avoid a CORS error
  //##########################################################
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  //##########################################################
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';


  try {

    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);
    console.log(data.quoteAuthor);


    // logic for an unknown author
    if(data.quoteAuthor === ''){
      authorText = 'Unknown'
    } else{
      authorText.innerText = data.quoteAuthor;

    }
    quoteText.innerText = data.quoteText;

  } catch (err) {
    // getQuote()
    console.log('Dude you have an error man', err);
  }

}

// On load
getQuote()

