/*
    This file contains the boilerplate required to launch mocha tests.
    It sets up chai and a process that allows typescript + babel compilation on the fly to run the tests.
 */

'use strict';

const babel = require('babel-core');

const babelOpts = {
    presets: [require('babel-preset-node6')],
    ast: false
};

var tsLoader = require.extensions['.ts', '.tsx'];

var property = {
    enumerable: true,
    set: newTSLoader => tsLoader = newTSLoader,
    get: () => loadPipeline
};

Object.defineProperty(require.extensions, '.ts', property);
Object.defineProperty(require.extensions, '.tsx', property);

require('ts-node/register');

function loadPipeline(m, filename) {
    m._compile(compile(filename), filename);
}

function compile(filename) {
    var tsOutput = mockLoad(tsLoader, filename);
    var babelOutput = babel.transform(tsOutput, babelOpts);
    return babelOutput.code;
}

function mockLoad(loader, filename) {
    let content;
    const module = {_compile: _content => content = _content};
    loader(module, filename);
    return content;
}

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiSubset = require('chai-subset');
const {registerAssertions} = require('redux-actions-assertions/chai');

// Redux-actions-assertions setup.
const {registerMiddlewares} = require('redux-actions-assertions');
const thunk = require('redux-thunk');
const {registerInitialStoreState} = require('redux-actions-assertions');

registerMiddlewares([thunk]);
registerInitialStoreState();

// registration
chai.use(chaiSubset);
chai.use(sinonChai);
registerAssertions();

// Globals
global.React = require('react');
global.ReactDOM = require('react-dom');
global.chai = chai;
global.sinon = sinon;
global.componentHandler = {upgradeElement: function(){}};

// Js dom
const jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

// take all properties of the window object and also attach it to the
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
    for (const key in window) {
        if (!window.hasOwnProperty(key)) { continue; }
        if (key in global) { continue; }
        global[key] = window[key];
    }
}

// mocha global object
propagateToGlobal(window);
