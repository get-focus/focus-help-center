import {IArticle} from '../../db/article';

export async function saveCall(article: IArticle) {
    return await fetch('http://localhost:3000/api/article', {
        method: 'POST',
        body: JSON.stringify(article),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
