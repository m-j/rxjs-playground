var Rx = require('rx');

let messageCounter = 1;

function simulateNextServerMessage() {
    return messageCounter++;
}


let observableWithError = Rx.Observable.create(observer => {
    let handler = setInterval(()=> {
        let msg = simulateNextServerMessage();

        if(msg == 3){
            observer.onError(`Illegal value ${msg}`);
            clearInterval(handler);
        }
        else {
            observer.onNext(msg);
        }
    },500);
}).catch(err => {
    console.log(`Caught error: ${err}`);
    return Rx.Observable.throw(err);
}).retry();

observableWithError.subscribe(val => {
    console.log(`Got msg ${val}`);
}, err => {
    console.log(`Got err ${err}`);
});
