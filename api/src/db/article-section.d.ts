import Sequelize from 'sequelize';

/** Represents an article. */
interface IArticleSection {
    ArticleId: number;
    SectionId: number;
}

/** Represents the article instance for the ORM (ie the object returned by queries) */
interface IArticleSectionInstance extends Sequelize.Instance<{}, IArticleSection> { }
