var Rx = require('rx');

function reverse(s) {
    var o = '';
    for (var i = s.length - 1; i >= 0; i--)
        o += s[i];
    return o;
}

function produceArray() {
    return Rx.Observable.of([
       'ania',
        'karol',
        'marian',
        'magda',
        'ewa',
        'jacek'
    ]);
}

function asyncFetchDetails(name) {
    return Rx.Observable.of({
        surname: reverse(name),
        age: name.length *50 % 30
    })
}

function asyncAddAvatar({name, details}){
    return Rx.Observable.of({
        name,
        details,
        avatar: `${name}.jpg`
    });
}

let resultObservable = produceArray()
    .flatMap(Rx.Observable.fromArray)
    .flatMap(name => asyncFetchDetails(name).map(details => ({name, details})))
    .flatMap(asyncAddAvatar);

resultObservable.subscribe(val => {
   console.log(val);
});

