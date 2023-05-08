const {JSDOM} = require('jsdom');

function getURLsFromHTML(htmlBody,baseURL){
     const urls = [];
     const dom = new JSDOM(htmlBody);
     const linkElements = dom.window.document.querySelectorAll('a');
     for(const linkElement of linkElements){
          // console.log(linkElement.href)
          if(linkElement.href.slice(0,1) === '/'){
               //relative url
               //if url construtor is give a invalid url the throw a error
               try{
                    const urlObj = new URL(`${baseURL}${linkElement.href}`);
                    urls.push(urlObj.href);
               } catch(err){
                    console.log(`error with relative url: ${err.message}`);
               }
               

               // urls.push(`${baseURL}${linkElement.href}`);
          }
          else{
               //absolute url
               try{
                    const urlObj = new URL(linkElement.href);
                    urls.push(urlObj.href);
               } catch(err){
                    console.log(`error with absolute url: ${err.message}`);
               }
          }
          
     }
     return urls;
}
function normalizerURL(urlString){
     const urlObj = new URL(urlString)
     const hostPath = `${urlObj.hostname}${urlObj.pathname}`
     if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
          return hostPath.slice(0,-1);
     }
     return hostPath;
     
     // return urlString;
}
module.exports = {
     normalizerURL,
     getURLsFromHTML
}