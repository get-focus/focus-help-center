import {sequelize, Article, Section} from './';

export const article1 = {
    id: 1,
    title: 'First',
    description: 'This is the third (is it?)',
    content: 'Blablabla is the base',
    published: true,
    publishedAt: new Date().toISOString(),
    url: '/projet',
    informations: 'info yolo'
};

export const article2 = {
    id: 2,
    title: 'Second',
    description: 'This is the second',
    content: 'Blablabla is the base : 2',
    published: true,
    publishedAt: new Date().toISOString(),
    url: '/operation',
    informations: 'info'
};

export const article3 = {
    id: 3,
    title: 'Third',
    description: 'This is the first (is it?)',
    content: 'Blablabla is the base : 3',
    published: false,
    url: '/operation/1',
    informations: 'yes'
};

export const article4 = {
    id: 4,
    title: 'Fourth',
    description: 'This is the fourth',
    content: 'Blablabla is the base : 4',
    published: true,
    publishedAt: new Date().toISOString(),
    url: '/line',
    informations: 'yo'
};

export const article5 = {
    id: 5,
    title: 'Third',
    description: 'This is the first (is it?)',
    content: 'Blablabla is the base : 3',
    published: true,
    publishedAt: new Date().toISOString(),
    url: '/operation/1',
    informations: 'yes'
};

export const article6 = {
    id: 6,
    title: 'Sixth',
    description: 'This is the first (is it?)',
    content: 'Blablabla is the base : 6',
    published: true,
    url: '/operation/1',
    publishedAt: new Date().toISOString(),
    informations: ''
};

export const article7 = {
    id: 7,
    title: 'Seventh',
    description: 'This is the seventh',
    content: 'Blablabla is the base : 7',
    published: true,
    publishedAt: new Date().toISOString(),
    url: '/line',
    informations: ''
};

export const section1 = { id: 1, name: 'Tutorial' };
export const section2 = { id: 2, name: 'Résumé' };

/** Create the database. */
export async function initDb() {

    await sequelize.sync({ force: true });

    // Populate the database with fake data.
    await Article.create(article1);
    await Article.create(article2);
    await Article.create(article3);
    await Article.create(article4);
    await Article.create(article5);
    await Article.create(article6);
    await Article.create(article7);
    await Section.create(section1);
    await Section.create(section2);
}
