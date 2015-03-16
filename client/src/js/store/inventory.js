import {fromJS} from 'immutable';
import uuid from 'tiny-uuid';
import createAction from '../action';
import createStore from '../store';

let store = createStore({
    items: {
        [uuid()]: {
            _id: 'd982214f-b3d2-493d-ae67-0b73d40783e0',
            image: '',
            description: 'Item 1',
            inStock: 1
        },
        [uuid()]: {
            _id: '9db9b839-9b78-403c-947f-a79882026759',
            image: '',
            description: 'Item 2',
            inStock: 1
        }
    }
});

export default store.public;

function createItem(item) {
    store.cursor('items').set(uuid(), fromJS(item));
}

function updateItem(id, item) {
    store.cursor(['items', id]).merge(item);
}

export let actions = {
    createItem: createAction(createItem),
    updateItem: createAction(updateItem)
};

// loading -> current
// loading -> failed[loading]
// current -> saving
// current -> deleting
// current -> updating
// saving -> current
// saving -> failed[saving]
// deleting -> failed[deleting]
// updating -> current
// updating -> failed[updating]
// creating -> current
// creating -> failed[creating]
// failed[x] -> x
