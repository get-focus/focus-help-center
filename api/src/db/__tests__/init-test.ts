import {sequelize} from '../index';
import mochaAsync from '../../../test/mocha-async';

describe('db', () => {
    it('should be able to connect', mochaAsync(async () => {
        await sequelize.authenticate();
    }));

    it('should be able to sync', mochaAsync(async () => {
        await sequelize.sync({force: false});
    }));
});
