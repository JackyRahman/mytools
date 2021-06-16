const fs = require('fs')

class Controller {

  static help(){
    console.log(`
-----------------------------------------------HELP-----------------------------------------------
$mytools -h: Check all command on this tools

READ:
$mytools <directory file> : read with output text

CONVERT:
$mytools <current directory file> -t < flag (json / text) > : convert your log file to json file or plaintext
  example: cli-tools /var/log/nginx/error.log -t json

CREATE NEW FILE:
$mytools <current directory file> -o <your destination folder>: copy your log to new directory as new txt file
  example: cli-tools /var/log/nginx/error.log -o /User/jacky/Desktop/nginxlog.txt
    OR
$mytools <current directory file> -t json -o < you new destination folder > :convert and copy
your current log file to new directory as new json file
  example: cli-tools /var/log/nginx/error.log -t json -o /User/jacky/Desktop/nginxlog.json
`);
  }

  static readFile(){
    try {
      const data = fs.readFileSync(process.argv[2], 'utf8')
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
  static convert(extention, newDirectory) {
    try {
      let data = fs.readFileSync(process.argv[2], 'utf8')

      if(extention===".json"){
        data = data.split("\n");
        let temp = [];
        let temp2 = []
        data.forEach((each) => {
          temp.push(each.split(" "));
        });
        let obj = {};
        temp.forEach((each) => {
          each.forEach((el,i)=>{
            
            if(i % 2===1){
              obj[each[i-1]] = each[i];
            }
            temp2.push(obj)
          })
        });
        data = JSON.stringify(temp2,null,2)
        // console.log(JSON.stringify(temp2,null,2));
      }

      fs.writeFile(newDirectory || process.argv[2].replace(".log",extention), data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("file converted to "+ process.argv[4] || "text" +" and saved with directory --> "+ newDirectory || process.argv[2].replace(".log",".txt"));
        console.log("data will appear in 3 seconds");
    }); 
      setTimeout(() => {
        console.log(data);
      }, 3000);
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = Controller