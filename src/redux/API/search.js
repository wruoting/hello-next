import { toQueryString } from '../../utils/query'
import fetch from 'isomorphic-fetch';

export const SPRING_BOOT_ROUTE = 'http://localhost:8080';

export const getRecipes = async (params) => {
    const options = {
        query: params,
    }
    const queryParams = toQueryString(options);
    const query = `${SPRING_BOOT_ROUTE}/v1/recipes${queryParams}`;
    const response = await fetch(query, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
        },
    })
    if (response.status >= 400) {
        throw new Error("Bad Response from server");
    }
    const json = await response.json();
    const arrayJson = json ? json['recipe_items'] : [];
    return arrayJson;
}

export const getRecipeByIDs = async (ids, amount) => {
    const query = `${SPRING_BOOT_ROUTE}/v1/recipes/ingredients?${amount}`;
    const response = await fetch(query, {
        method: "POST",
        body: JSON.stringify(eval(ids)),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
        },
    })
    if (response.status >= 400) {
        throw new Error("Bad Response from server");
    }
    const json = await response.json();
    return json;
}
