/*
    This file contains the boilerplate required to launch mocha tests.
    It sets up chai and a process that allows typescript + babel compilation on the fly to run the tests.
 */

'use strict';

global.chai = require('chai');

const babel = require('babel-core');

const babelOpts = {
    presets: [require('babel-preset-node6')],
    ast: false
};

var tsLoader = require.extensions['.ts'];

Object.defineProperty(require.extensions, '.ts', {
    enumerable: true,
    set: newTSLoader => tsLoader = newTSLoader,
    get: () => loadPipeline
});

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
