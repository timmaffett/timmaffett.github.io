'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "91a75f4b4662062f21e147625b0ddd16",
"assets/AssetManifest.json": "4a46e86cee7e038361e87fc44bf3ae68",
"assets/assets/cursors/1.5x/startrek_mousepointer.png": "07485656308a31635bc239232fc161bf",
"assets/assets/cursors/2.0x/startrek_mousepointer.png": "6192f3f50a21c636b0f8f68cb668a329",
"assets/assets/cursors/2.5x/startrek_mousepointer.png": "75ff0b8e21e6ad9b6e7081cf241b78a2",
"assets/assets/cursors/2.5x/startrek_mousepointer25Only.png": "75ff0b8e21e6ad9b6e7081cf241b78a2",
"assets/assets/cursors/3.0x/startrek_mousepointer.png": "84ea9a82470f5a7b8c5a1a8c84d5cc16",
"assets/assets/cursors/3.5x/startrek_mousepointer.png": "42ab8aa8298cb535e8e97b47bd640f35",
"assets/assets/cursors/4.0x/startrek_mousepointer.png": "6527734fa1ff61aa17a900eca2608844",
"assets/assets/cursors/8.0x/startrek_mousepointer.png": "208815f8187d47aa6cdd4054b132d26e",
"assets/assets/cursors/cat_cursor.png": "ca61bc3befd5072be58e06a9f80f25e0",
"assets/assets/cursors/cat_cursor2xWithBlueShadow.png": "7a04326f254b210e7603af3f7919043c",
"assets/assets/cursors/cat_cursor4xWithPinkShadow.png": "9f83334d2459c587954cfee0c88b6b80",
"assets/assets/cursors/example_game_cursor_64x64.png": "b9864e16a164fe2afa273b1441a5b33d",
"assets/assets/cursors/hello_kitty_camera_cursor_8x.png": "c6065c880ef4bdc52d9403787417d259",
"assets/assets/cursors/hello_kitty_cursor_8x.png": "4021410bc87617d1d9d4b7e8b21dfb8e",
"assets/assets/cursors/star-trek-mouse-pointer-cursor292x512.png": "af145fa7e61f9ae80899b5b8613902c3",
"assets/assets/cursors/startrek_mousepointer.png": "0ae42b5cc82773a9c5de51dc55af7f78",
"assets/assets/cursors/startrek_mousepointer25Only.png": "0ae42b5cc82773a9c5de51dc55af7f78",
"assets/FontManifest.json": "7c9b73b967957434d9db5d975c290b1c",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "5f706449f5deaa23a8af0f88f1dfb55a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsOutlined%255BFILL,GRAD,opsz,wght%255D.ttf": "1e1e4937bcd2f211626192fd0b7fb6d7",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsRounded%255BFILL,GRAD,opsz,wght%255D.ttf": "fb45000ac037781f6f67ba0ab0181dc9",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsSharp%255BFILL,GRAD,opsz,wght%255D.ttf": "6bcbebc50830ce2df887370ac8cb15bc",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f3b1f0f3dd697dd532801b2bba968184",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "b5645b71fb26674473c05090ade8de2b",
"canvaskit/skwasm.js": "571d2051157ab8aa8af36796cc56720e",
"canvaskit/skwasm.wasm": "a0f94140b200e4370543c22594e0a2e3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "5e9d18954bc17be9e36d60f93347a0d6",
"/": "5e9d18954bc17be9e36d60f93347a0d6",
"main.dart.js": "4c431274e1e78b0fc0b48225cb5e9bee",
"manifest.json": "9a0de1ff26661cd281cb9deb3db33b02",
"version.json": "87566a2baf6bccb66deaa054654e642d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
