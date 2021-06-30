import { BehaviorSubject } from "rxjs";

const observables = {
    code: new BehaviorSubject("<div>hello</div>"),
    time: new BehaviorSubject(0),
    challenge: new BehaviorSubject(null),
};

export { observables };
