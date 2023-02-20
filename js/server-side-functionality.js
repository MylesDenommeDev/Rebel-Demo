const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const app = express()

const url = 'http://143.110.220.37:3000/'
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
    origin: '*'
}))
 

  let runner01 = require("child_process")
  let runner01B = require("child_process")
  let runner02 = require("child_process")
  
  let phpScriptPath01 = "/var/www/html/php/resetDB.php"
  let phpScriptPath02 = "/var/www/html/php/dbInsert.php"
  let phpScriptPath03 = "/var/www/html/php/dbUpdate.php"

  
  app.get('/', (req, res) => {
    

  })
   
  app.post('/', (req, res) => {
      let data = req.body
      let dataAsString = JSON.parse(JSON.stringify(data))
      //respond to frontend with the message that it sent here
      res.send(JSON.stringify(data))

    if ((dataAsString.artist === 'this') && (dataAsString.rate === 'is') && (dataAsString.streams === 'the') && (dataAsString.overdue === 'password')) {    
    //open/execute a php scrtip that restores the db to the values in the original json file (roster_init.json)
    runner01.exec("php " + phpScriptPath01, function(err, phpResponse, stderr) {
      if(err) console.log(err)
      //This is an array containing all the echo statements, concatinated together, after the php script finishes executing (successfully)
     console.log(phpResponse)
     })
     //Now an exec runs a linux command, to copy the original json file over
     // run the `ls` command using exec
     runner01B.exec('cp inc/roster_init.json inc/current_roster.json', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
      // log and return if we encounter an error
      console.error("could not execute command: ", err)
      return
    }

    // log the output received from the command
    //console.log("Output: \n", output)
    })
    } else { 
      //must add leading and trailing quotation marks, as there can be spaces in the artist name, which will not work, because it
      //splits up the argv[1] into multiple arsgs. The argv[1] will be read in as a PHP variable when the file is opened and executed.
    let sepByDots = "\"" + dataAsString.artist + '.' + dataAsString.rate + '.' + dataAsString.streams + '.' + dataAsString.overdue + "\""

    if (dataAsString.type == 'add'){
      //append new artist entry to a the current_roster.json file, for consumption by the frontend
      const fileData = fs.readFileSync('inc/current_roster.json',
            {encoding:'utf8', flag:'r'})
            
            const json = JSON.parse(String(fileData))
            delete data.type
            json.data.push(data)
            let writeString = JSON.stringify(json)
            const fileWrite = fs.writeFileSync('inc/current_roster.json', writeString,
            {encoding:'utf8', flag:'w'})
      /*Create child process, which performs Ubuntu system call, that opens a php file (passing in the JSON as argv[1])
      **This file then submits the neccessary data to the database */
      runner02.exec("php " + phpScriptPath02 + " " + sepByDots, function(err, phpResponse, stderr) {
        if(err) console.log(err) /* log error */
       console.log(phpResponse)
       })
    } else if (dataAsString.type == 'upd'){
      //Update the existing roster (current_roster__json)
      const fileData = fs.readFileSync('inc/current_roster.json',
            {encoding:'utf8', flag:'r'})
            
            const json = JSON.parse(String(fileData))
            delete data.type

            Object.keys(json.data).forEach(key => {
              if(json.data[key].artist == dataAsString.artist){
                let fixedRate = '0.'
                fixedRate += dataAsString.rate
                json.data[key].rate = fixedRate
                json.data[key].streams = dataAsString.streams
                json.data[key].overdue = dataAsString.overdue
                //console.log("New Object is:  "+String(json.data[key]))
              }
              
            })

            let writeString = JSON.stringify(json)
            const fileWrite = fs.writeFileSync('inc/current_roster.json', writeString,
            {encoding:'utf8', flag:'w'})
      runner02.exec("php " + phpScriptPath03 + " " + sepByDots, function(err, phpResponse, stderr) {
        if(err) console.log(err) /* log error */
       console.log(phpResponse)
       })
    }
      


      }//end of main if_else structure
  })
  
  app.listen(3000, () => {
      console.log('Backend API ready, listening on port 3000.')
    })