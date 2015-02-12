var m = window ? window.m : require('mithril');
if (!m && require) m = require('mithril');

var OccludedMediaList = module.exports = {};

OccludedMediaList.controller = function(items, options){
  var ctrl = this;
  ctrl.items = items;
  ctrl.options = options;
  ctrl.options.onclick = ctrl.options.onclick || function(){};
  ctrl.options.pageSize = ctrl.options.pageSize || 4;

  ctrl.begin = 0;
  ctrl.end = ctrl.options.pageSize;

  window.addEventListener('scroll', function(ev){
    ctrl.begin = Math.ceil(window.pageYOffset/215)-Math.ceil(ctrl.options.pageSize/2);
    if (ctrl.begin < 0){
      ctrl.begin = 0;
    }
    ctrl.end = ctrl.begin + ctrl.options.pageSize;
    m.redraw();
  });
};

OccludedMediaList.view = function(ctrl){
  return m('ul.media-list', {style: {
      position:'relative',
      height: (ctrl.items().length*215) + 'px',
    }}, ctrl.items().slice(ctrl.begin, ctrl.end).map(function(item,i){
    return m('li.media', {style: {
        position:'absolute',
        top: ((i+ctrl.begin)*215) + 'px',
        height:'200px',
        marginTop: '15px'
      }, onclick:function(){ ctrl.options.onclick(item); }}, [
      ctrl.options.image ? m('.media-left', m('.media-object', {style: {
        height:'200px',
        width:'150px',
        backgroundColor:'#333',
        backgroundPosition:'50% 50%',
        backgroundSize:'cover',
        backgroundImage: item[ctrl.options.image] ? 'url(' + item[ctrl.options.image] + ')' : ''
      }})) : '',
      m('.media-body', [
        ctrl.options.title ? m('h4.media-heading', item[ctrl.options.title]) : '',
        ctrl.options.text ? m('.media-text', item[ctrl.options.text]) : ''
      ])
    ]);
  }));
};