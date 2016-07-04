import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {IArticle} from '../../db/article';
import {ISection} from '../../db/section';
import {IArticleSection} from '../../db/article-section';
import {article1, article2, article3} from '../../db/init-test-data';
import {fetchWithLogin} from './login';

describe('Article', () => {
    describe('GET /article/:id', () => {
        it('should return the correct published article when not connected', mochaAsync(async () => {
            const article = await (await fetch('http://localhost:1337/api/article/2')).json<IArticle>();
            chai.expect(article.content).to.equal(article2.content);
        }));
        it('should return an error when the requested article is unpublished and not connected', mochaAsync(async () => {
            const response = await (await fetch('http://localhost:1337/api/article/3')).json();
            chai.expect(response).to.deep.equal({ error: 'This article isn\'t published' });
        }));
        it('should return the correct unpublished article when connected', mochaAsync(async () => {
            const article = await (await fetchWithLogin('http://localhost:1337/api/article/1')).json<IArticle>();
            chai.expect(article.description).to.equal(article1.description);
        }));
        it('should return an error when the requested article doesn\'t exist', mochaAsync(async () => {
            const response = await (await fetch('http://localhost:1337/api/article/5')).json();
            chai.expect(response).to.deep.equal({ error: 'No article found' });
        }));
    });

    describe('GET /article', () => {
        it('should return only published articles when not connected', mochaAsync(async () => {
            const articles = await (await fetch('http://localhost:1337/api/article')).json<IArticle[]>();
            chai.expect(articles).to.be.a('array');
            chai.expect(articles).to.have.length(2);
            chai.expect(articles[0].title).to.equal(article1.title);
            chai.expect(articles[1].description).to.equal(article2.description);
        }));

        it('should return only published articles with matching title/desc when not connected with filter', mochaAsync(async () => {
            const articles = await (await fetch('http://localhost:1337/api/article?filter=first')).json<IArticle[]>();
            chai.expect(articles).to.have.length(1);
            chai.expect(articles[0].title).to.equal(article1.title);
        }));

        it('should return all articles when connected', mochaAsync(async () => {
            const articles = await (await fetchWithLogin('http://localhost:1337/api/article')).json<IArticle[]>();
            chai.expect(articles).to.be.a('array');
            chai.expect(articles).to.have.length(3);
            chai.expect(articles[0].title).to.equal(article1.title);
            chai.expect(articles[1].description).to.equal(article2.description);
            chai.expect(articles[2].content).to.equal(article3.content);
        }));

        it('should return all articles with matching title/desc when connected with filter', mochaAsync(async () => {
            const articles = await (await fetchWithLogin('http://localhost:1337/api/article?filter=first')).json<IArticle[]>();
            chai.expect(articles).to.have.length(2);
            chai.expect(articles[0].title).to.equal(article1.title);
            chai.expect(articles[1].description).to.equal(article3.description);
        }));
    });

    describe('POST /article', () => {
        it('should return an error when not connected', mochaAsync(async () => {
            const response = await (await fetch('http://localhost:1337/api/article', { method: 'POST', body: JSON.stringify(article1) })).json();
            chai.expect(response).to.deep.equal({ error: 'Cannot save an article when not connected' });
        }));

        it('should create a new article', mochaAsync(async () => {
            const article = {
                title: 'Hello',
                description: 'description',
                content: 'Hey, the content will be there, you know ?',
                published: false
            };
            const response = await fetchWithLogin('http://localhost:1337/api/article', {
                method: 'POST',
                body: JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const returnedObject = await response.json<IArticle>();
            chai.expect(returnedObject.title).to.equal('Hello');
            chai.expect(returnedObject.description).to.equal('description');
            chai.expect(returnedObject.content).to.equal('Hey, the content will be there, you know ?');
            chai.expect(returnedObject.published).to.equal(false);
            chai.expect(returnedObject.publishedAt).to.be.undefined;
        }));

        it('should update an existing article and publish it', mochaAsync(async () => {
            const article = {
                id: 3,
                title: 'Hello',
                description: 'description',
                content: 'Hey, the content will be there, you know ?',
                published: true
            };
            const response = await fetchWithLogin('http://localhost:1337/api/article', {
                method: 'POST',
                body: JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const returnedObject = await response.json<IArticle>();
            chai.expect(returnedObject.id).to.equal(3);
            chai.expect(returnedObject.title).to.equal('Hello');
            chai.expect(returnedObject.description).to.equal('description');
            chai.expect(returnedObject.content).to.equal('Hey, the content will be there, you know ?');
            chai.expect(returnedObject.published).to.equal(true);
            chai.expect(returnedObject.publishedAt).not.to.be.undefined;
        }));

        it('should update an existing article and unpublish it', mochaAsync(async () => {
            const article = {
                id: 1,
                title: 'Hello',
                description: 'description',
                content: 'Hey, the content will be there, you know ?',
                published: false
            };
            const response = await fetchWithLogin('http://localhost:1337/api/article', {
                method: 'POST',
                body: JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const returnedObject = await response.json<IArticle>();
            chai.expect(returnedObject.id).to.equal(1);
            chai.expect(returnedObject.title).to.equal('Hello');
            chai.expect(returnedObject.description).to.equal('description');
            chai.expect(returnedObject.content).to.equal('Hey, the content will be there, you know ?');
            chai.expect(returnedObject.published).to.equal(false);
            chai.expect(returnedObject.publishedAt).to.be.undefined;
        }));

        it('should update an existing article and dont modify the publish date', mochaAsync(async () => {
            const article = Object.assign({}, article1, { content: 'yolo test' });
            const response = await fetchWithLogin('http://localhost:1337/api/article', {
                method: 'POST',
                body: JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const savedArticle = await response.json<IArticle>();
            chai.expect(savedArticle.publishedAt).to.equal(article.publishedAt);
        }));

        describe('When getting sections', () => {
            let returnedObject, returnedSection;
            const sections = {
                List: [
                    { name: 'Marketing' },
                    { name: 'Social' },
                    { id: 1, name: 'Tutorial' }
                ]
            };

            it('should returns the article\'s ID and its sections', mochaAsync(async () => {
                const response = await fetchWithLogin('http://localhost:1337/api/article/2/sections', {
                    method: 'POST',
                    body: JSON.stringify(sections),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                returnedObject = await response.json<{ articleId: number, sections: ISection[] }>();
                chai.expect(returnedObject.articleId).to.equal(2);
                chai.expect(returnedObject.sections[2]).to.deep.equal(sections.List[2]);
                chai.expect(returnedObject.sections.length).to.equal(3);
            }));

            it('should update the section length', mochaAsync(async () => {
                // Check the sections
                const sectionsResponse = await fetchWithLogin('http://localhost:1337/api/section');
                const returnedSections = await sectionsResponse.json<ISection[]>();
                chai.expect(returnedSections.length).to.equal(3);

                // Check if the section length is different from the basic one
                // Maybe we gotta update it
                chai.expect(returnedSections.length).to.not.equal(2);
            }));

            it('should have the right sections', mochaAsync(async () => {
                const unitSectionResponse = await fetchWithLogin('http://localhost:1337/api/section/1');
                returnedSection = await unitSectionResponse.json<ISection>();
                chai.expect(returnedSection).to.deep.equal(sections.List[2]);

            }));

            it('should update the associations', mochaAsync(async () => {
                const associationsResponse = await fetchWithLogin('http://localhost:1337/api/association');
                const returnedAssociations = await associationsResponse.json<IArticleSection[]>();
                chai.expect(returnedAssociations.length).to.equal(3);
            }));

            it('should have the right associations', mochaAsync(async () => {
                const unitAssociationResponse = await fetchWithLogin('http://localhost:1337/api/association/2/1');
                const returnedAssociation = await unitAssociationResponse.json<IArticleSection>();
                chai.expect(returnedAssociation.ArticleId).to.equal(returnedObject.articleId);
                chai.expect(returnedAssociation.SectionId).to.equal(returnedSection.id);
            }));
        });

        describe('When giving an non existing section', () => {
            it('should returns a sql error', mochaAsync(async () => {
                const sections = {
                    List: [
                        { name: 'Marketing' },
                        { id: 15, name: 'Tutorial' }
                    ]
                };
                const response = await fetchWithLogin('http://localhost:1337/api/article/2/sections', {
                    method: 'POST',
                    body: JSON.stringify(sections),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const returnedObject = await response.json<{ error: string }>();
                chai.expect(returnedObject.error).to.equal('Bad request : SequelizeForeignKeyConstraintError: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed');
            }));
        });
    });

    describe('DELETE /article/:id', () => {
        it('should delete the correct article when connected', mochaAsync(async () => {
            const response = await (await fetchWithLogin('http://localhost:1337/api/article/3', { method: 'DELETE' })).json();
            chai.expect(response).to.deep.equal({ success: true });
        }));
        it('should return an error when trying to delete when not connected', mochaAsync(async () => {
            const response = await (await fetch('http://localhost:1337/api/article/3', { method: 'DELETE' })).json();
            chai.expect(response).to.deep.equal({ error: 'Cannot delete an article when not connected' });
        }));
        it('should return an error when the requested article doesn\'t exist', mochaAsync(async () => {
            const response = await (await fetchWithLogin('http://localhost:1337/api/article/5', { method: 'DELETE' })).json();
            chai.expect(response).to.deep.equal({ error: 'No article deleted' });
        }));
    });
});
