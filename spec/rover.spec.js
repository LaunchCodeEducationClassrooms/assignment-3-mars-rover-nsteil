const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  it(`constructor sets position and default values for mode and generatorWatts`, function () {
    let roverGuy = new Rover(64897)
    expect(roverGuy.generatorWatts).toEqual(110)
    expect(roverGuy.position).toEqual(64897)
    expect(roverGuy.mode).toEqual(`NORMAL`)
  })

  it(`response returned by receiveMessage contains name of message`, function() {
    let roverGuy = new Rover(12345)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('STATUS_CHECK')]
    let testMessage =  new Message(`test message for jasmine`, commands)
    let responseMessage = roverGuy.receiveMessage(testMessage)
    expect(responseMessage.message).toEqual(testMessage.name)
  })

  it(`response returned by receiveMessage includes two results if two commands are sent in the message`, function() {
    let roverGuy = new Rover(12345)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('STATUS_CHECK')]
    let testMessage =  new Message(`test message for jasmine`, commands)
    let responseMessage = roverGuy.receiveMessage(testMessage)
    expect(responseMessage.results.length).toEqual(2)
  })

  it(`responds correctly to status check command`, function() {
    let roverGuy = new Rover(12345)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('STATUS_CHECK')]
    let testMessage =  new Message(`test message for jasmine`, commands)
    let responseMessage = roverGuy.receiveMessage(testMessage)
    let statusUpdate = responseMessage.results[1]
    expect(roverGuy.mode).toEqual(`LOW_POWER`);
    expect(roverGuy.generatorWatts).toEqual(110)
    expect(roverGuy.position).toEqual(12345)
  })

  it(`responds correctly to mode change command`, function () {
    let roverGuy = new Rover(12345)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('STATUS_CHECK')]
    let testMessage =  new Message(`test message for jasmine`, commands)
    let responseMessage = roverGuy.receiveMessage(testMessage)
    expect(roverGuy.mode).toEqual(`LOW_POWER`)
  })

  it(`responds with false completed value when attempting to move in LOW_POWER mode`, function() {
    let roverGuy = new Rover(12345)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('MOVE',784951)]
    let testMessage =  new Message(`test message for jasmine`, commands)
    let responseMessage = roverGuy.receiveMessage(testMessage)
    expect(responseMessage.results[1]).toEqual(`completed: false`)
  })

  it (`responds with position for move command`, function() {
    let roverGuy = new Rover(12345)
    let commands = [new Command('MOVE',784951)]
    let testMessage =  new Message(`test message for jasmine`, commands)
    let responseMessage = roverGuy.receiveMessage(testMessage)
    expect(roverGuy.position).toEqual(784951)
  })

});
