var Rx = require('rx');

let observable = Rx.Observable.range(0, 10).delay(500).map(val => {
    if(val > 5){
        throw new Error('Val cannot be higher than 5');
    }
    else {
        return val;
    }
});

observable.subscribe(val => {
    console.log(val);
},err => {
    console.log('Error!');
    console.log(err);
});