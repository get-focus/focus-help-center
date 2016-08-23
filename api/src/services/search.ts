import express from 'express';
import {Article} from '../db';
import {IArticle} from '../db/article';

/** Formats an url by replacing numbers by points. */
function formatUrl(url: string) {
    let urlF = url;
    if (url && url[0] === '/') {
        urlF = url.substring(1);
    }
    return urlF && urlF.replace(/[0-9]+/g, '.');
}

export function searchService(prefix: string, app: express.Application) {

    /**
     * Loads the published article that matches the best the requested url and block.
     * If no match is found, returns {success: false}.
     */
    app.get(`${prefix}/api/search`, async (req, res) => {
        let {url, block}: {url: string, block: string} = req.query;
        url = url && formatUrl(url);
        const articles = (await Article.findAll({where: {published: true}})).map(article => article.get());

        // 1. Search for a unique match on the block.
        if (block) {
            const matches = articles.filter(article => article.informations && article.informations.includes(block));

            // An empty URL means we can't be any more precise in our search, so we arbitrarily choose the first article when we have matches.
            if (matches.length === 1 || !url && matches.length > 0) {
                res.json(matches[0]);
                return;
            }

            // Else, if we have no match we have to discard the block content for further search.
            block = matches.length ? block : undefined;
        }

        // 2. Search for matches with both url and block (or only the URL if the block is empty).
        if (searchForUrl(article => formatUrl(article.url) === url && (!block || article.informations && article.informations.includes(block)))) {
            return;
        }

        // 3. If we still do not have a match but we still have both and url and a block, we start examining the URL again with no regard to the block.
        if (block && url) {
            url = req.query.url;
            if (searchForUrl(article => formatUrl(article.url) === url)) {
                return;
            }
        }

        // 4. Finally, if we still haven't found an article, it is possible that the URL could be incorrect with a correct block.
        if (block) {
            const matches = articles.filter(article => article.informations && article.informations.includes(block));

            // Once again, we can't know which article it is with multiple matches.
            if (matches.length > 1) {
                res.json(matches[0]);
                return;
            }
        }

        // Or else, failure.
        res.json({success: false});

        /**
         * Searches in the list an article that matches the predicate for any subset of its URL.
         * @param predicate The predicate to filter the articles.
         */
        function searchForUrl(predicate: (article: IArticle) => boolean) {
            let sub = req.query.url.length;
            while (sub && sub !== -1) {
                const matches = articles.filter(predicate);

                // Single result.
                if (matches.length === 1) {
                    res.json(matches[0]);
                    return true;
                }

                // If there are more than one match, we'll filter the matches again to remove articles that have a block.
                if (matches.length > 1) {
                    const matchesWithoutBlock = matches.filter(article => !article.informations);

                    // Once again, we can't know which article it is with multiple matches.
                    if (matchesWithoutBlock.length > 0) {
                        res.json(matchesWithoutBlock[0]);
                        return true;
                    }
                }

                // Shortening the URL by removing its last element to try again.
                sub = url.lastIndexOf('/');
                if (sub && sub !== -1) {
                    url = url.substring(0, sub);
                }
            }

            return false;
        }
    });
}
