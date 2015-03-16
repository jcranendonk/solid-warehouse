import nextTick from 'next-tick';

export default function action(fn) {
    let listeners = [];

    function listen(cb, ctx) {
        listeners.push([cb, ctx]);
        return unlisten.bind(null, cb, ctx);
    }

    function unlisten(cb, ctx) {
        for (let i = 0; i < listeners.length; i++) {
            let [_cb, _ctx] = listeners[i];
            if (cb === _cb && ctx === _ctx) {
                listeners.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function emit() {
        let result = fn.apply(null, arguments);

        if (listeners.length === 0) {
            return;
        }

        let doCallbacks = () => {
            for (let [cb, ctx] of listeners) cb.call(ctx, result);
        };

        if (result instanceof Promise) {
            result.then(doCallbacks);
        } else {
            nextTick(doCallbacks);
        }
    }

    emit.listen = listen;
    emit.unlisten = unlisten;
    return emit;
}
