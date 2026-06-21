try{importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');firebase.initializeApp({apiKey:"AIzaSyACPluMqE03cRqaHtOwouogaWEqKgw4Zxw",authDomain:"sahil-dispatch.firebaseapp.com",projectId:"sahil-dispatch",storageBucket:"sahil-dispatch.firebasestorage.app",messagingSenderId:"508622975937",appId:"1:508622975937:web:3751db53e06d3c0d233540"});firebase.messaging().onBackgroundMessage(function(p){var n=p.notification||{};self.registration.showNotification(n.title||'Sahil Al Nojoom',{body:n.body||'',icon:'icon-192.png',badge:'icon-192.png'});});}catch(e){}
var CACHE='san-driver-v1';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./','./index.html','./icon-192.png','./icon-512.png']).catch(function(){});}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=e.request.url;
  if(u.indexOf('googleapis')>=0||u.indexOf('gstatic')>=0||u.indexOf('firebase')>=0||u.indexOf('firebaseio')>=0)return;
  e.respondWith(fetch(e.request).then(function(resp){var copy=resp.clone();caches.open(CACHE).then(function(c){c.put(e.request,copy);});return resp;}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('./');});}));
});
