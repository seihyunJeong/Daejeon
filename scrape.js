import axios from 'axios';
import cheerio from 'cheerio';

const getHTML = async (productURL, proxyURL) => {
  try {
    return await axios.get(productURL, proxyURL)
    //return await axios.get(productURL)
  } catch (error) {
    //console.error(error.response.status)
    //console.log(proxyURL);
  }
}



export { getHTML };

