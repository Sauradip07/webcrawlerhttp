const {JSDOM} = require('jsdom');

async function crawlPage(baseURL,currentURL,pages){
     console.log(`actively crawling: ${currentURL}`);
     const baseURLObj = new URL(baseURL);
     const currentURLObj = new URL(currentURL);

     if(baseURLObj.hostname !== currentURLObj.hostname){
          return pages;
     }

     const normalizerCurrentURL = normalizerURL(currentURL);
     if(pages[normalizerCurrentURL] > 0){
          pages[normalizerCurrentURL]++;
          return pages;
     }
     pages[normalizerCurrentURL] = 1;
     console.log(`actively crawling ${currentURL}`);
     try{
          const resp = await fetch(currentURL);
          if(resp.status > 399){
               console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`);
               return pages;
          }
          const contentType = resp.headers.get("content-type");
          if(!contentType.includes("text/html")){
               console.log(`non html response, content type : ${contentType}, on page :${currentURL}`);
               return pages;
          }
          const htmlBody = await resp.text();
          const nextURls = getURLsFromHTML(htmlBody,baseURL);

          for(const nextURl of nextURls){
               pages = await crawlPage(baseURL,nextURl,pages);
          }
     } catch(err){
          console.log(`error in fetch: ${err.message}, on page ${currentURL}`);
     }
     return pages;
}

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
     getURLsFromHTML,
     crawlPage
}