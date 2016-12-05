var Rx = require('rx');

function getUserId(token) {
    return Rx.Observable.create(observer => {
        let handler = setTimeout(()=> {
            if(token == 'valid'){
                observer.onNext(123);
            }
            else {
                observer.onError(`Token: ${token} is invalid`);
            }
        },1000);

        return function () {
            clearTimeout(handler);
        }
    });
}

let validRequestObservable = Rx.Observable.just('valid').delay(500);
let invalidRequestObservable = Rx.Observable.just('invalid').delay(500);

invalidRequestObservable.flatMap(request => getUserId(request)).subscribe(userId => {
    console.log(`User id is ${userId}`)
}, err => {
   console.error(err);
});

