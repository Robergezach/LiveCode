import { observables } from "./observables";

function catalogue(key) {
    return observables[key];
}

function update(key, overwriteData) {
    observables[key].next(overwriteData);
}

function subscribe(key, subscriptionFunction) {
    observables[key].subscribe(subscriptionFunction);
}

export { catalogue, update, subscribe };
