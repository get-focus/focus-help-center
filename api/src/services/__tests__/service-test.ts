import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {IArticle} from '../../db/article';
import {article1, article2, article6, article7} from '../../db/init-test-data';

async function getArticle(url: string, block: string) {
    return await (await fetch(`http://localhost:1337/api/search?url=${url}&block=${block}`)).json<IArticle>();
}

describe('Search', () => {
    describe('Standard cases', () => {
        it('"url=/projet, info=info" should return {url: "/projet", infos: "yolo info"} : request with exact URL and block gives exact article', mochaAsync(async () => {
            const article = await getArticle('/projet', 'info');
            chai.expect(article.content).to.equal(article1.content);
        }));

        it('"url=wrong, info=yolo" should return {url: "/projet", infos: "yolo info"} : request with wrong URL and exact unique block gives exact article', mochaAsync(async () => {
            const article = await getArticle('wrong', 'yolo');
            chai.expect(article.content).to.equal(article1.content);
        }));

        it('"url=operation/1" should return {url: "/operation/1", infos: ""} : request with exact URL and no block gives exact article', mochaAsync(async () => {
            const article = await getArticle('operation/1', '');
            chai.expect(article.content).to.equal(article6.content);
        }));

        it('"url=operation/1, info=no" should return {url: "/operation/1", infos: ""} : request with exact URL and unknown block gives exact article', mochaAsync(async () => {
            const article = await getArticle('operation/1', 'no');
            chai.expect(article.content).to.equal(article6.content);
        }));
    });

    describe('Edge cases', () => {
        it('"info=info" should return an article like {infos: "info"} : request with no URL and block with multiple articles gives an article', mochaAsync(async () => {
            const article = await getArticle('', 'info');
            chai.expect(article.content).not.to.equal(undefined);
        }));

        it('"url=wrong, info=info" should return an article like {infos: "info"} : request with wrong URL and block with multiple articles gives an article', mochaAsync(async () => {
            const article = await getArticle('wrong', 'info');
            chai.expect(article.content).not.to.equal(undefined);
        }));

        it('"url=/operation/1/2/1, info=info" should return {url: "/operation", infos: "info"} : request with an URL with excess properties and block with multiple articles gives exact article', mochaAsync(async () => {
            const article = await getArticle('/operation/1/2/1', 'info');
            chai.expect(article.content).to.equal(article2.content);
        }));

        it('"url=line, info=info" should return {url: "/line", infos: ""} : request with exact URL and block that exists but not with that URL gives exact article', mochaAsync(async () => {
            const article = await getArticle('line', 'info');
            chai.expect(article.content).to.equal(article7.content);
        }));
    });
});
