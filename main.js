const {crawlPage} = require('./crawl.js')
function main(){
     if(process.argv.length < 3){
          console.log("no website provied");
          process.exit(1);
     }
     if(process.argv.length > 3){
          console.log("two many command line arg");
          process.exit(1);
     }
     const baseURL = process.argv[2];

     // for(const arg of process.argv){
     //      console.log(arg);
     // }
     console.log(`starting crawl ${baseURL}`);
     crawlPage(baseURL)
}
main();