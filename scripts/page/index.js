//Import de la "Factory Photographer" (fonction)
import { recipes } from "../data/recipes.js";
import { filters, theFilter } from "../search/filter.js";
import { receiptsGalery } from "../components/receiptsGalery.js";
import { proxySearchReceipts } from "../proxy/proxySearchReceipts.js";

const receipts = await getRecettes();
export const filtersDOM = filters(receipts);

export const receiptsSection = document.querySelector("#receiptsGalery");

//Récupérer les infos des photographers dans le JSON
async function getRecettes() {
	return recipes;
}

//Fonction pour afficher les photographers
async function displayData() {
	
	const receiptsGaleryData = proxySearchReceipts().proxySearch(theFilter);
	receiptsGalery(receiptsGaleryData);
}

async function init() {
	// Récupère les datas des photographes
	displayData();
	filtersDOM.initFiltersForDOM("all");
}
    
init();
    