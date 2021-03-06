!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.OccludedMediaList=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var m = window ? window.m : require('mithril');
if (!m && require) m = require('mithril');

var OccludedMediaList = module.exports = {};

OccludedMediaList.controller = function(items, options){
  var ctrl = this;
  ctrl.items = items;
  ctrl.options = options;
  ctrl.options.onclick = ctrl.options.onclick || function(){};
  var pageSize = Math.ceil(window.innerHeight/215);
  var offset = 0;

  ctrl.begin = 0;
  ctrl.end = pageSize*2;

  window.addEventListener('scroll', function(ev){
    ctrl.begin = Math.floor((window.pageYOffset+offset)/215)-pageSize;
    if (ctrl.begin < 0){
      ctrl.begin = 0;
    }
    ctrl.end = ctrl.begin + (pageSize*2);
    m.redraw();
  });

  window.addEventListener('resize', function(ev){
    pageSize = Math.ceil(window.innerHeight/215);
  });

  ctrl.adjustOffset = function( el, init, ctxt ){
    if( !init ){
      offset = el.offsetTop;
    }
  };
};

OccludedMediaList.view = function(ctrl){
  return m('ul.media-list', {config: ctrl.adjustOffset, style: {
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
},{"mithril":"mithril"}]},{},[1])(1)
});