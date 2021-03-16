class Rover {
   // Write code here!
   constructor (position, mode = "NORMAL", generatorWatts = 110) {
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }

   receiveMessage(incomingMessage) {
     let returnMessage = {
       message: incomingMessage.name,
       results: []
     }

    /*let roverStatus = {
       mode: this.mode,
       generatorWatts: this.generatorWatts,
       position: this.position
    }*/
     
     for (let i=0; i < incomingMessage.commands.length; i++) {
       let currentCommand = incomingMessage.commands[i]
       let response = {completed:true,roverStatus:""}
       if (currentCommand.commandType === `MOVE`) {
         if(this.mode === `NORMAL`) {
          response.completed = true
          returnMessage.results.push(response)
          this.position = currentCommand.value
         } else if (this.mode === `LOW_POWER`) {
           response.completed = false
           returnMessage.results.push(response)
         }
       } else if (currentCommand.commandType === `STATUS_CHECK`) {
         response.completed = true
         response.roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
        returnMessage.results.push(response)
       } else if (currentCommand.commandType === `MODE_CHANGE`) {
         if (currentCommand.value === `LOW_POWER` || currentCommand.value === `NORMAL`) {
          this.mode = currentCommand.value
         }
         response.completed = true
         returnMessage.results.push(response)
       } else {
         response.completed = false
         returnMessage.results.push(response)
       }
//console.log(roverStatus)
       

    
     }

     return returnMessage
   }
}

module.exports = Rover;