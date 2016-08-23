import Sequelize from 'sequelize';

/** Represents an article. */
interface ISection {
    id?: number;
    name: string;
}

/** Represents the article instance for the ORM (ie the object returned by queries) */
interface ISectionInstance extends Sequelize.Instance<ISection> {}
