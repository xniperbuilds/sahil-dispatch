var CACHE='san-company-v1';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./','./index.html','./icon-192.png','./icon-512.png']).catch(function(){});}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=e.request.url;
  if(u.indexOf('googleapis')>=0||u.indexOf('gstatic')>=0||u.indexOf('firebase')>=0||u.indexOf('firebaseio')>=0)return;
  e.respondWith(fetch(e.request).then(function(resp){var copy=resp.clone();caches.open(CACHE).then(function(c){c.put(e.request,copy);});return resp;}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('./');});}));
});
