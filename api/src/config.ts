import {join} from 'path';

export let dbPath = join(__dirname, './db/db.sqlite');
export let backOfficeUrl = 'http://localhost:9999/';
export let appUrl = 'http://localhost:3000/';
export let primaryColor = '';
export let primaryColorLight = '';
export let primaryColorDark = '';
export let accentColor = '';

export function setConfig(c: {
    dbPath?: string,
    backOfficeUrl?: string,
    appUrl?: string,
    primaryColor?: string,
    primaryColorLight?: string,
    primaryColorDark?: string,
    accentColor?: string
}) {
    dbPath = c.dbPath;
    backOfficeUrl = c.backOfficeUrl;
    appUrl = c.appUrl;
    primaryColor = c.primaryColor;
    primaryColorLight = c.primaryColorLight;
    primaryColorDark = c.primaryColorDark;
    accentColor = c.accentColor;
}
