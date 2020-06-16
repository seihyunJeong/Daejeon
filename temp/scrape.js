import axios from 'axios';
import cherrio from 'cheerio';

async function getHTML(productURL) {
  const { data: html } = await  axios.get(productURL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  return html;
}

async function getAmazonTitle(html) {
  const $ = cherrio.load(html)
  
  const span = $('#productTitle')
  return span.text().trim();
}

async function getAmazonPrice(html) {
  const $ = cherrio.load(html)
  
  var span = $('#priceblock_ourprice')
  if(span.text() == ''){
    span = $('#priceblock_saleprice');
  }
  return span.html();
}

async function getAmazonDescription(html) {
  const $ = cherrio.load(html)
  
  var description= new Array();
  const descriptionList = $('#featurebullets_feature_div > div > ul > li').each(function(){
    var item = $(this).text().trim();
    description.push(item);
  });  

  return description;
}

async function getAmazonRating(html) {
  const $ = cherrio.load(html)
 
  var review_rating;
  const r_star = $('#reviewsMedley > div > div ').each(function(){
    var rating = $(this).children('div').children('div').children('div').children('div').children('div');
    if(rating.text() != ''){
      review_rating = rating.text();
    }
  });

  return review_rating;
}

async function getAmazonReviewCount(html) {
  const $ = cherrio.load(html)
 
  var review_count = new Array();
  const r_count = $('#reviewsMedley > div > div > div ').each(function(){
    var count = $(this).children('div').children('span')
    
    if(count.text() != ''){
      review_count.push(count.text());
      
    }
    
  });
  
  return review_count[0].trim();
}


async function getAmazonCategory(html) {
  const $ = cherrio.load(html)
  
  const span = $('#title')
  return span.html();
}

export { getHTML, getAmazonTitle, getAmazonPrice, getAmazonCategory, getAmazonDescription, getAmazonRating, getAmazonReviewCount };

