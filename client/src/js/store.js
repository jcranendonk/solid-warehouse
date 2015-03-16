import {Immstruct} from 'immstruct';
import createAction from './action';

let instanceMgr = new Immstruct();

let listenerKey = Symbol('Store listener');
function connectMixin(store, name) {
    function updateState(newData) {
        this.setState({[name]: newData});
    }

    return {
        getInitialState() {
            return {[name]: store.current};
        },
        componentDidMount() {
            this[listenerKey] = updateState.bind(this);
            store.on('swap', this[listenerKey]);
        },
        componentWillUnmount() {
            store.removeListener('swap', this[listenerKey]);
        }
    };
}

export default function createStore(initialValue = {}) {
    if (typeof initialValue !== 'object') {
        throw new Error('Initial value for store must be object or unspecified');
    }

    let store = instanceMgr.get(initialValue);
    let storeUpdate = createAction(() => store.current);
    store.on('swap', storeUpdate);

    return {
        cursor(keyOrPath) {
            return store.cursor(keyOrPath);
        },
        reference(keyOrPath) {
            return store.reference(keyOrPath);
        },
        public: {
            get current() {
                return store.current;
            },
            connectTo: connectMixin.bind(null, store),
            listen: storeUpdate.listen,
            unlisten: storeUpdate.unlisten
        }
    };
}
