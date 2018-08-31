import idb from 'idb';
console.log('sw.js-')
const rURL = 'http://localhost:1337/restaurants';

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

// self.addEventListener('fetch', function(event) {
// 	const rURL = 'http://localhost:1337/restaurants' //new URL(event.request.url);
// 	/*fetch(rURL, {method: 'GET'})
//     	.then(function(response){
//       		response.json();
//       		let resp = JSON.parse(response);
//       		console.log(resp);
//       		console.log(response.json());
//       	*/
//       	event.respondWith

// dbPromise.then(db => {
// 	const tx = db.transaction('restaurants', 'readwrite');
// 	const keyValStore = tx.objectStore('restaurants');
// 	keyValStore.put(resp);
// 	return tx.complete;
// 	}).then(() => {
// 	console.log('added foo bar')
// 	});


// return caches.open(restaurantCaches).then(cache => {
// 		return cache.match(rURL).then(response => {
// 			let networkFetch = fetch(request).then(networkResponse => {
// 				cache.put(rURL, networkResponse.clone());
// 				return networkResponse;
// 			});
// 		});
// 	});
// });



/*if (requestUrl.origin === location.origin) {
	if (request.Url.pathname === '/'){
		event.respondWith(caches.match('....'));
		return;
	}
}*/


self.addEventListener('install', function(event) {
	let cachedURLs = [
		'/',
		'index.html',
		'restaurant.html',
/*		'restaurant.html?id=1',
		'restaurant.html?id=2',
		'restaurant.html?id=3',
		'restaurant.html?id=4',
		'restaurant.html?id=5',
		'restaurant.html?id=6',
		'restaurant.html?id=7',
		'restaurant.html?id=8',
		'restaurant.html?id=9',
		'restaurant.html?id=10',*/
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
			return cache.addAll(cachedURLs);
		})
	);
});
/*
//function createDB() {
//};
self.addEventListener('activate', event => {
	event.waitUntil(
		createDB()
		);
	});*/


/*
//original
self.addEventListener('fetch', function(event) {
	event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    	})
	);
});*/

const dbPromise = idb.open('restaurants', 1, upgradeDB => {
		const store = upgradeDB.createObjectStore('restaurants-cache', {
			keyPath: 'id'
		});
});

const addRestaurants = () => {
	fetch(rURL)
	.then(response => {
    	return response.json();
    })
    .then(restaurants => {
    	//return
    	dbPromise.then(db => {
    		const tx = db.transaction('restaurants-cache', 'readwrite');
    		const store = tx.objectStore('restaurants-cache');
    		restaurants.forEach(res => {
    			store.put(res)
    		})
    	})
    });
};

const getRestaurants = () => {
	return dbPromise.then(db => {
		const tx = db.transaction('restaurants-cache', 'readonly');
		const store = tx.objectStore('restaurants-cache');
		return store.getAll();
	})
};

// return caches.open(restaurantCaches).then(cache => {
// 		return cache.match(rURL).then(response => {
// 			let networkFetch = fetch(request).then(networkResponse => {
// 				cache.put(rURL, networkResponse.clone());
// 				return networkResponse;
// 			});
// 		});
// 	});
// });

//addRestaurants();

// if request NOT equals /restaurants/ look in sw caches and return, if not in caches then fetch, else serve from IDB

addEventListener('fetch', event => {


if (!event.request.url.includes('id')) {
			return getRestaurants()
		} else {
			console.log('olje');
		}
/*	caches.match(event.request).then(response => {
      if (!response)
      else if (response) return response;
      else addRestaurants();
    	})*/


	event.respondWith(
	);
});
//if (event.request.url.endsWith('.jpg'))


/*self.addEventListener('fetch', function(event) {
	if (event.request.url.startsWith('/restaurants/')) {
		console.log('caching restaurants');
		event.respondWith(console.log('caching restaurants'));
		return;
	}

	event.respondWith(
		console.log('fetching restaurants'),
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    	})
	);
});
*/