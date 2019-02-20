import firebase from 'firebase';
import 'firebase/database';

let config = {
    databaseURL: 'https://hacker-news.firebaseio.com'
};
firebase.initializeApp(config);
let version = '/v0';
let api = firebase.database().ref(version);

function fetchItem(id,) {
    return itemRef(id).once('value', (snapshot) => snapshot.val());
}

function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem(id)));
}

function storiesRef(path) {
    return api.child(path)
}

function itemRef(id) {
    return api.child('item/' + id)
}

export {
    fetchItem,
    fetchItems,
    storiesRef,
    itemRef
}