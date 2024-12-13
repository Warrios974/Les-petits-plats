import { search } from "../search/search.js";

let searchCache = [];

export function proxySearchReceipts() {

    function proxySearch(theFilter) {

        const theFilterJSON = JSON.stringify(theFilter);

        const test = searchCache.filter((cache) => cache.filter === theFilterJSON )

        if ( test.length > 0 ) {

            search(theFilter,test[0].data)

            //Retourne les données du cache pour les autre composant de formFilter
            return test[0].data;
        }

        const data = search(theFilter);

        searchCache.push({
            "filter" : JSON.stringify(theFilter),
            "data" : data
        });
        

        //Retourne les données du cache pour les autre composant de formFilter
        return data;
        
    }


    return {
        searchCache,
        proxySearch
    }
}