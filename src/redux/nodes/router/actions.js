import Router from 'next/router';
import { toQueryString } from '../../../utils/query';

export const PAGES = {
    DEFAULT: '/',
    SEARCH: '/search',
}


const routeTo = (url, isExternalUrl = false, query = null) => {
    if (isExternalUrl) {
        window.location.href = `${url}${toQueryString(query)}`;
    } else {
        Router.push({
            pathname: url,
            query
        })
    }
}

export const routeToDefault = () => {
    routeTo(`${PAGES.DEFAULT}`);
}

export const routeToSearch = () => {
    routeTo(`${PAGES.SEARCH}`);
}
export default {
    routeTo,
    routeToSearch,
    routeToDefault,
}