var Rx = require('rx');

function refCountHotObservable() {
    var observable = Rx.Observable.create(function (observer) {
        var i = 0;

        var handler = setInterval(()=> {
            console.log(`Observable tick ${i}`);
            observer.onNext(i);
            i++;
        },1000);


        if(i > 20){
            observer.onCompleted();
        }

        return function () {
            clearInterval(handler);
        };
    }).publish().refCount();

    var sub1, sub2;

    setTimeout(()=> {
        sub1 = observable.subscribe((i) => console.log(`sub1 tick: ${i}`));
        console.log('sub1 subscribe');
    },3000);

    setTimeout(()=> {
        sub2 = observable.subscribe((i) => console.log(`sub2 tick: ${i}`));
        console.log('sub2 subscribe');
    },6000);


    setTimeout(()=> {
        sub1.dispose();
        console.log('sub1 unsubscribe');
    },10000);

    setTimeout(()=> {
        sub2.dispose();
        console.log('sub2 unsubscribe');
    },15000);
}

module.exports = refCountHotObservable;