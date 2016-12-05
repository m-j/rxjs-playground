var Rx = require('rx');

let index = 0;

let sharedSource = Rx.Observable.create(observer => {
    console.log('Source created');

    let handler = setInterval(()=> {
        console.log(`Interval with index: ${index}`);
        observer.onNext(index++);
    }, 1000);

    return ()=> {
        clearInterval(handler);
    }
}).take(15)
    .publish();

let source = sharedSource.replay(null, 3);
sharedSource.connect();

setTimeout(()=> source.connect(), 2000);


source.subscribe(element => {
    console.log('Sub1: ' + element);
}, err => {

}, ()=> console.log('Sub1 completed'));


setTimeout(()=> {
    source.subscribe(element => {
        console.log('Sub2: ' + element);
    }, err => {

    }, ()=> console.log('Sub2 completed'));
}, 8000);