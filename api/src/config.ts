import {join} from 'path';

export let dbPath = join(__dirname, './db/db.sqlite');
export let backOfficeUrl = 'http://localhost:9999/';
export let appUrl = 'http://localhost:3000/';

export function setConfig(c: {dbPath?: string, backOfficeUrl?: string, appUrl?: string}) {
    dbPath = c.dbPath;
    backOfficeUrl = c.backOfficeUrl;
    appUrl = c.appUrl;
}
