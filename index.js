#!/usr/bin/env node

const fs = require('fs')
const Controller = require("./controller")
if(process.argv[6]){
  Controller.convert(process.argv[4], process.argv[6])
}
if(process.argv[2]===undefined){
  Controller.help()
} else {
  switch (process.argv[3]) {
    case undefined:
    Controller.readFile()
      break;
    case "-t":
      if (process.argv[4]===undefined || process.argv[4]==="text") {
        Controller.convert('.txt')
      } else if(process.argv[4]==="json"){
        Controller.convert('.json')
      }
      break
      case "-o":
        if (process.argv[4]===undefined) {
          console.log("please fill the new directorty!");
        } else {
          Controller.convert('.json', process.argv[4])
        }
        break
  
    default:
      Controller.help()
      break;
  }
}