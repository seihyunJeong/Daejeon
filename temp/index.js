import { getHTML, getAmazonTitle, getAmazonPrice, getAmazonCategory, getAmazonDescription, getAmazonRating , getAmazonReviewCount } from './scrape';

const fs = require('fs');
const file = fs.readFileSync('amazon-products-list.txt');
const urls = file.toString().split('\n');
const request = require('request');

async function scrapePage(product) {
    const html = await getHTML(product);
 
    console.log('----------------------------------------------------');
    const amazonTitle = await getAmazonTitle(html);
    //console.log(amazonTitle);

    const amazonPrice = await getAmazonPrice(html);
    //console.log(amazonPrice);

  
    const amazonDescription = await getAmazonDescription(html);
    //console.log(amazonDescription);


    const amazonRating = await getAmazonRating(html);
    //console.log(amazonRating);

    const amazonReviewCount = await getAmazonReviewCount(html);
    //console.log(amazonReviewCount);

    try {
      var item = {
        title : amazonTitle,
        price : amazonPrice,
        description : amazonDescription,
        rating : amazonRating,
        reviewCount : amazonReviewCount,
        date : new Date()
      }
      console.log(JSON.stringify(item));

      var dbURL = 'http://localhost:3000/products'
      let options = {
        uri: dbURL,
        method: 'POST',
        body: item,
        json:true 
      };

      request.post(options, function(err, res, body) {
        if(err) console.err(err);
        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
          console.log(body);
        }
      })

    } catch (error) {
      console.log(error); 
    }    
/*
    const amazonCategory = await getAmazonCategory(html);
    console.log(amazonCategory);


    */    
}


//scrapePage(urls[8]);

for(let i=0; i< urls.length; i++){
  scrapePage(urls[i]);
}



/*
getAmazonTitle, getAmazonPrice, getAmazonCategory, getAmazonDescription, getAmazonReviews

*/