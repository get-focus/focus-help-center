import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';

describe('Testing the services', () => {
   describe('When call an article with its ID', () => {
       it('should return the good Article', mochaAsync(async () => {
           var result = await fetch('http://localhost:3000/api/article/1');
           console.log('MyResult', result);
        }));
   });
});