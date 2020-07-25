// all the elements neeed to manipulate the DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading
function complete(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// GET QUOTE FORM API
async function getQuote() {

  // add the loading function
  loading()

  // This Proxy URL is here to make our API call in order to avoid a CORS error
  //##########################################################
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  //##########################################################
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';


  try {

    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // data & author
    console.log(data);
    console.log(data.quoteAuthor);

    // logic for an unknown author
    if(data.quoteAuthor === ''){
      authorText = 'Unknown'
    } else{
      authorText.innerText = data.quoteAuthor;
    }

    //logic for longer quote
    if(data.quoteText.length > 80){
      quoteText.classList.add('long-quote')
    } else{
      quoteText.classList.remove('long-quote')
    }

    quoteText.innerText = data.quoteText;

    //fetching quote should be done by now; lets stop the loading
    complete();


  } catch (err) {
    getQuote()
    console.log('Dude you have an error man', err);
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}.`;

  //will open a new window for the tweet.
  window.open(twitterUrl, '_blank');
  console.log('creating a tweet')
}

// on click event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);


// On load
getQuote()
loading()
