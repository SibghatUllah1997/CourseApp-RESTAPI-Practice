const EventEmitter = require("events")
const emitter = new EventEmitter();


emitter.on("messagedlogged", (arg)=>{

    console.log("messaged" , arg)

});

emitter.emit("messagedlogged" , { id:1 , url : "./https.jdahad"})