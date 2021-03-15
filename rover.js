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

    let roverStatus = {
       mode: this.mode,
       generatorWatts: this.generatorWatts,
       position: this.position
     }
     
     for (let i=0; i < incomingMessage.commands.length; i++) {
       let currentCommand = incomingMessage.commands[i]
       if (currentCommand.commandType === `MOVE`) {
         if(this.mode === `NORMAL`) {
          returnMessage.results.push(`completed: true`)
          this.position = currentCommand.value
          roverStatus.position = currentCommand.value
         } else if (this.mode === `LOW_POWER`) {
           returnMessage.results.push(`completed: false`)
         }
       } else if (currentCommand.commandType === `STATUS_CHECK`) {
        returnMessage.results.push(`completed: true, ${roverStatus}`)
       } else if (currentCommand.commandType === `MODE_CHANGE`) {
         if (currentCommand.value === `LOW_POWER` || currentCommand.value === `NORMAL`) {
          this.mode = currentCommand.value
          roverStatus.mode = this.mode
         }
         returnMessage.results.push(`completed: true`)
       } else {
         returnMessage.results.push(`completed: false`)
       }
//console.log(roverStatus)
       

    
     }

     return returnMessage
   }
}

module.exports = Rover;