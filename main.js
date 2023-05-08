const {crawlPage} = require('./crawl.js')
const {printReport} = require('./report.js')


async function main(){
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

     const pages =  await crawlPage(baseURL,baseURL,{});
     // for(const page of Object.entries(pages)){
     //      console.log(page);
     // }
     printReport(pages);
}
main();