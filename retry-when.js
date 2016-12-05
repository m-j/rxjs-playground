var Rx = require('rx');


function retryWhen() {
    let callIndex = 0;

    let observable = Rx.Observable.create(function (observer) {
        let handler = setTimeout(()=> {
            console.log(`Index is ${callIndex}`);

            if(callIndex < 5) {
                observer.onError(`Error with index ${callIndex}`);
            }
            else {
                observer.onNext(`Response with index ${callIndex}`);
                observer.onCompleted();
            }

            callIndex++;
        }, 1000);

        return function () {
            clearTimeout(handler);
        };
    });

    observable.retryWhen(errors => {
        return errors.delay(5000).scan((errorCount, err) => {
            if(errorCount >= 2) {
                throw err;
            }
            return errorCount + 1;
        }, 0);
    }).subscribe(resp => {
        console.log(resp);
    }, err => {
        console.log(err);
    });
}

module.exports = retryWhen;