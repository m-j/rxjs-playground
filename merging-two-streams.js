var Rx = require('rx');

let aObservable = Rx.Observable.return().delay(500).map(()=> 'A');
let bObservable = Rx.Observable.return().map(()=> 'B');

let merged = aObservable.merge(bObservable);

merged.subscribe(console.log);