var Rx = require('rx');

var subj = new Rx.BehaviorSubject();
var filteredSubj = subj.filter(v => typeof v != 'undefined');

var counter1 = 0;

function startEmitting(){
    setInterval(()=>{
        counter1++;
        subj.onNext(counter1);
    }, 2000);
}

startEmitting();
filteredSubj.subscribe(val => {
    console.log(val);
});

console.log('subscribed');