let getIndex = 0;

function httpGet(address) {
    var responseTime = Math.random() * 3;
    getIndex++;

    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            let getIndexCopy = getIndex;
            console.log('Response from server arrived');
            // resolve(`Http response for address ${address} and index ${getIndexCopy}`);
            reject(`Error index ${getIndexCopy}`);
        }, responseTime);
    });
}

function httpGetObservable(address) {
    return Rx.Observable.create(observer => {
        httpGet(address).then(result => {
                observer.onNext(result);
                observer.onCompleted();
            },
            error => {
                observer.onError(error);
            });

        return function () {
            console.log('Observable closed');
        }
    });
}

var observable = httpGetObservable('/api/dupa').publishLast();
// var observable = httpGetObservable('/api/dupa').publishLast().refCount();

observable.connect();

// var sub1 = observable.subscribe(
//     (response)=> console.log(`sub1 resp ${response}`),
//     err => {},
//     () => console.log('sub1 completed')
// );
//
// sub1.dispose();

setTimeout(()=> {
    var sub2 = observable.subscribe(
        (response)=> console.log(`sub2 resp ${response}`)
        // err => { console.log('sub2 err')},
        // () => console.log('sub2 completed')
    );
}, 2000);

setTimeout(() => {
    var sub3 = observable.subscribe(
        (response)=> console.log(`sub3 resp ${response}`),
        err => {
            console.log('sub3 err')
        },
        () => console.log('sub3 completed')
    );
}, 3000);
