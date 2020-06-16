import { getHTML } from './scrape';


const fs = require('fs');
const urls = fs.readFileSync('proxyurl.txt').toString();

const request = require('request');
const url = require('url');
const http = require('http');
const express = require('express');
const app = express();

async function getProxy(urls) {
  console.log(urls);
  var html = await getHTML(urls);
  
  while(1){
    if(html == undefined){
      //console.log('hello')
      await sleep(5000);
      html = await getHTML(urls);
    }
    else if(html.status == 200){
      //console.log(html.data);
    
      var proxyList = html.data.split('\n');
      //console.log(proxyList.length);

      for(var i=0; i< proxyList.length; i++){
        var address = proxyList[i].split(':');
        
        var item = {
          index : i+1,
          ip : address[0],
          port : address[1],
          date : new Date()
        }
        

        if(address[0] !== "" && address[1] !== ""){
          //console.log(item);
          try {
            var dbURL = 'http://localhost:3000/api/proxylist/update'
            //var dbURL = 'http://localhost:3000/api/proxylist'
            let options = {
              uri: dbURL,
              method: 'POST',
              body: item,
              json:true 
            };
            //console.log(dbURL);
            request.post(options, function(err, res, body) {
              //console.log('---------------------------------------');
              //console.log(res.statusCode);
              if(err) console.err(err);
              if (res && (res.statusCode === 200 || res.statusCode === 201)) {
                //console.log('insert success '+i);
                //console.log(body);
              }
            })
          }catch(error){
            console.log('insert failed '+ i);
            console.log(error);
          }
        }
      }
/*      
*/
/*      
*/    
      break;
    }else if(html.status == 404){
      console.log('[404 error] invalid url');
      break;
    }else{
        console.log('[unknown eror] ' +html.data);
    }
    
  }
}

const init = async () => {    
  var time = new Date();
  console.log("[Update] "+ time);
    getProxy(urls); 
}

const sleep = (ms) => {
   return new Promise(resolve=>{
       setTimeout(resolve,ms)
   })
}

//var interval = setInterval(init, 3600000);


function startInterval(seconds, callback) { callback(); return setInterval(callback, seconds * 1000); }

startInterval(1800, init);
//startInterval(60, init);

