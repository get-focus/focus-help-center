import {IArticle} from '../../db/article';

export async function updateCall(article: IArticle) {
    JSON.stringify(article);
    return await fetch('http://localhost:3000/save-article', {
        method: 'POST',
        body: JSON.stringify(article),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}