import fetch from 'isomorphic-fetch';
import {apiRoot} from './api';

export let backOfficeUrl: string;
export let appUrl = apiRoot;

export async function getConfig() {
    const response = await fetch(`${appUrl}/config`);
    const config = await response.json();
    backOfficeUrl = config.backOfficeUrl;
    appUrl = config.appUrl;
    return true;
}
