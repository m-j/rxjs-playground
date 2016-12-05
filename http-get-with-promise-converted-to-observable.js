var Rx = require('rx');

function httpGet(address) {
    var responseTime = Math.random() * 3;

    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            console.log('Response from server arrived');
            resolve(`Http response for address ${address}`);
        }, responseTime);
    });
}

function httpGetObservable(address) {
    return Rx.Observable.fromPromise(httpGet(address));
}

var observable = httpGetObservable('/api/dupa');
console.log('Subscribed');

var sub1 = observable.subscribe(
    (response)=> console.log(`sub1 resp ${response}`),
    err => {},
    () => console.log('sub1 completed')
);

setTimeout(()=> {
    var sub2 = observable.subscribe(
        (response)=> console.log(`sub2 resp ${response}`),
        err => {},
        () => console.log('sub2 completed')
    );
}, 2000);


