//Import des fonction et variable nécesaire puis d'autres fichiers
import { receiptsSection } from "../page/index.js";
import { cardReceipt } from "../components/cardReceipt.js";

export function receiptsGalery(data) {

    // Function qui va créer les carte
    //Pour chaque recette créer sa carte avec la fonction "cardReceipt"

    if (data.length === 0) {
        
        receiptsSection.innerHTML = "";
		const span = document.createElement( "span" );
        span.innerText = 'Aucune recette ne correspond à votre critère… vous pouvez chercher "tarte aux pommes","poisson", etc'
        receiptsSection.appendChild(span);

    }

    if (data.length > 0) {
        
        receiptsSection.innerHTML = "";
        data.forEach((receipt) => { createCardReceipt(receipt); });

    }

    function createCardReceipt(receipt) {
        const receiptModel = cardReceipt(receipt);
        const receiptCardDOM = receiptModel.createCardReceipt();
        receiptsSection.appendChild(receiptCardDOM);
    }
}