import request from 'superagent';
import {fromJS} from 'immutable';

function doRequest(req) {
    return new Promise(ok => {
        req.withCredentials().end(ok);
    }).then(finishJsonRequest);
}

// Unwraps the response object, and throws an error with the appropriate message if there was a
// request error. The response body is parsed as JSON.
function finishJsonRequest(res) {
    if (res.error) {
        if (res.body && res.body.message) {
            throw new Error(res.body.message);
        } else if (res.error instanceof Error) {
            throw res.error;
        } else {
            throw new Error(res.error);
        }
    }
    if (!res.body && res.text) {
        throw new Error('Response was not parsed as JSON; was Content-Type set to application/json?');
    }
    return fromJS(res.body);
}

export function get(url) {
    return doRequest(request.get(url));
}

export function post(url, data) {
    let r = request.post(url);
    if (data) {
        r = r.send(data);
    }
    return doRequest(r);
}

export function postForm(url, data) {
    return doRequest(request.post(url).type('form').send(data));
}

export function patch(url, data) {
    return doRequest(request.patch(url).send(data));
}

export function del(url) {
    return doRequest(request.del(url));
}

export default {get: get, post, postForm, patch, del};
