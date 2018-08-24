import idb from 'idb';

//IDB code goes here

/****Boilerplate IDB code***
	const dbPromise = idb.open('restaurants-db', 1, upgradeDB => {
	let keyValStore = upgradeDB.createObjectStore('keyval');
	keyValStore.put('world', 'hello');

});

dbPromise.then(db => {
	const tx = db.transaction('keyval');
	keyValStore = tx.objectStore('keyval');
	return keyValStore.get('hello');
}).then(val => {
	console.log('the value of hello is', val)
});

dbPromise.then(db => {
	const tx = db.transaction('keyval', 'readwrite');
	const keyValStore = tx.objectStore('keyval');
	keyValStore.put('bar', 'foo');
	return tx.complete;
}).then(() => {
	console.log('added foo bar')
});
*/


/*const dbPromise = idb.open('keyval-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('keyval');
});

const idbKeyval = {
  get(key) {
    return dbPromise.then(db => {
      return db.transaction('keyval')
        .objectStore('keyval').get(key);
    });
  },
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').put(val, key);
      return tx.complete;
    });
  },
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').delete(key);
      return tx.complete;
    });
  },
  clear() {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval', 'readwrite');
      tx.objectStore('keyval').clear();
      return tx.complete;
    });
  },
  keys() {
    return dbPromise.then(db => {
      const tx = db.transaction('keyval');
      const keys = [];
      const store = tx.objectStore('keyval');

      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.complete.then(() => keys);
    });
  }
};
*/
function createDB() {
const dbPromise = idb.open('restaurants', 1, upgradeDB =>{
		var store = upgradeDB.createObjectStore('restaurants-cache', {
			keyPath: 'id'
		})
	});
};

self.addEventListener('install', function(event) {
	let cachedUrls = [
		'/',
		'index.html',
		'restaurant.html',
		'restaurant.html?id=1',
		'restaurant.html?id=2',
		'restaurant.html?id=3',
		'restaurant.html?id=4',
		'restaurant.html?id=5',
		'restaurant.html?id=6',
		'restaurant.html?id=7',
		'restaurant.html?id=8',
		'restaurant.html?id=9',
		'restaurant.html?id=10',
		'css/styles.css',
		'js/dbhelper.js',
		'js/main.js',
		'img/1.jpg',
		'img/2.jpg',
		'img/3.jpg',
		'img/4.jpg',
		'img/5.jpg',
		'img/6.jpg',
		'img/7.jpg',
		'img/8.jpg',
		'img/9.jpg',
		'img/10.jpg'
	];

	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll(cachedUrls);
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		createDB()
		);
	});

self.addEventListener('fetch', function(event) {
	event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
	);
});
