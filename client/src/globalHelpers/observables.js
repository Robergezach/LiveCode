import { BehaviorSubject } from "rxjs";

const observables = {
    code: new BehaviorSubject("<div>hello</div>"),
    timer: new BehaviorSubject(0),
};

export { observables };
