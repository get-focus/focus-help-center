import fetch from 'isomorphic-fetch';
import {apiRoot} from './api';

export let backOfficeUrl: string;
export let appUrl = apiRoot;
export let primaryColor: string;
export let primaryColorLight: string;
export let primaryColorDark: string;
export let accentColor: string;

export async function getConfig() {
    const response = await fetch(`${appUrl}/config`);
    const config = await response.json();
    backOfficeUrl = config.backOfficeUrl;
    appUrl = config.appUrl;
    primaryColor = config.primaryColor;
    primaryColorLight = config.primaryColorLight;
    primaryColorDark = config.primaryColorDark;
    accentColor = config.accentColor;
    return true;
}
