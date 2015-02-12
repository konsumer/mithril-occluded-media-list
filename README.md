# mithril-occluded-media-list

A scroll-occluded bootstrap media-list

[![NPM](https://nodei.co/npm/mithril-occluded-media-list.png?compact=true)](https://nodei.co/npm/mithril-occluded-media-list/)

You can see a demo [here](http://konsumer.github.io/mithril-occluded-media-list).


## installation

You can get a copy with bower or npm or just download it from the `dist/` folder, here.

### webpack/browserify/etc

```js
var OccludedMediaList = require('mithril-occluded-media-list');
```

### requirejs

```js
define(['mithril','OccludedMediaList'], function(m,OccludedMediaList){
  
});
```

### plain browser globals
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/mithril/0.1.30/mithril.min.js"></script>
<script src="http://konsumer.github.io/mithril-occluded-media-list/dist/OccludedMediaList.min.js"></script>
```

## usage

Basically, there is a `m.prop([])` of items, and there are 3 fields that your items optionally can implement: `image`, `title`, & `text`, which each can be mapped. You can also add an `onclick` that will be called with the item as it's argument. All these options are optional.

```js
Demo.controller = function(){
  this.items = m.prop([]);
  m.request({method:'GET', url:'demo/shows.json'}).then(this.items);
  this.list = new OccludedMediaList.controller(this.items, {
    title:'name',
    image:'poster',
    text: 'description',
    onclick: function(item){
      console.log(item);
    }
  });
};

Demo.view = function(ctrl){
  return OccludedMediaList.view(ctrl.list);
};
```