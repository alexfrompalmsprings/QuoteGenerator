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
  } catch (err) {
    console.log('Dude you have an error man', err);
  }

}

// On load
getQuote()