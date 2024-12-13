//Import des fonction et variable nécesaire puis d'autres fichiers
import { recipes } from "../data/recipes.js";

//Fonction qui va retourner les datas filtré en fonction de la recherche
export function search(theFilter,data) {

    let receiptsFilted = recipes;

    //Data qui viendrai du proxy
    if (data) {
        return data;
    }

    //Si le tableau des recherche est vide (comme au départ)
    if (theFilter["empty"] == true) {
        return recipes;
    }
    
    //Si le tableau des recherche n'est pas vide
    if (theFilter["empty"] == false) {

        //Tri en fonction du mot clé
        if (theFilter["keyword"]) {
            
            let newTab = [];
            
            for (let index = 0; index < receiptsFilted.length; index++) {
                const receipt = receiptsFilted[index];
                
                const keyword = theFilter["keyword"].toLowerCase();
                const name = receipt["name"].toLowerCase();
                const description = receipt["description"].toLowerCase();
                //Vérifie si le mot clé est inclu dans le nom, la description
                if(name.includes(keyword) || description.includes(keyword)){
                    newTab.push(receipt);
                //et dans les ingredients de la recette
                }else{
                    for (let index = 0; index < receipt["ingredients"].length; index++) {
                        const ingredient = receipt["ingredients"][index];
                        
                        const ingredientName = ingredient["ingredient"].toLowerCase();
                        ingredientName.includes(keyword) ? newTab.push(receipt) : "";
                    }
                }
            }

            receiptsFilted = newTab;
        }

        //Tri par Ingredients
        if (theFilter["ingredients"].length != 0) {
            
            let newTab = [];
            let isReceiptValid;
            let isReceiptValidTab = [];
            
            //Vérifie que si la recette contient chaque ingredients de la recherche
            for (let index = 0; index < receiptsFilted.length; index++) {
                const receipt = receiptsFilted[index];

                for (let index = 0; index < theFilter["ingredients"].length; index++) {
                    const ingredientFilter = theFilter["ingredients"][index];
                    
                    //Vérifie si l'ingredient ce trouve dans la recette
                    let test;
                    for (let index = 0; index < receipt["ingredients"].length; index++) {
                        const ingredient = receipt["ingredients"][index].ingredient.toLowerCase();
                        
                        if (ingredient == ingredientFilter.ingredient.toLowerCase()) {
                            test = true;
                            break;
                        }

                        test = false;
                    }
                    //Ajout le resultat test dans un tableau
                    isReceiptValidTab.push(test);  
                }  
                //Quand chaque ingredients de la recherche et vérifié, on vérifie si le tableaux 
                //de vérification des recette est TOTALEMENT "true"
                for (let index = 0; index < isReceiptValidTab.length; index++) {
                    const elem = isReceiptValidTab[index];

                    if (elem === false) {
                        isReceiptValid = false
                        break;
                    }

                    isReceiptValid = true;
                }
                //Si oui la recette est ajouté
                if( isReceiptValid ) newTab.push(receipt);
                //Reset des variables
                isReceiptValid = false;
                isReceiptValidTab = [];
            }
            
            receiptsFilted = newTab;
        }
        
        //Tri par Appareils
        if (theFilter["appliances"] != "") {

            let newTab = [];

            //Vérifie si la recette contient chaque appareil de la recherche
            for (let index = 0; index < receiptsFilted.length; index++) {
                const receipt = receiptsFilted[index];
                
                theFilter["appliances"].toLowerCase() == receipt["appliance"].toLowerCase() ? newTab.push(receipt) : "";
            }

            receiptsFilted = newTab;
        }

        //Tri par Ustensiles
        if (theFilter["ustensils"].length != 0) {

            let newTab = [];
            let isReceiptValid;
            let isReceiptValidTab = [];
            
            //Vérifie que si la recette contient chaque ingredients de la recherche
            for (let index = 0; index < receiptsFilted.length; index++) {
                const receipt = receiptsFilted[index];

                for (let index = 0; index < theFilter["ustensils"].length; index++) {
                    const ustensilFilter = theFilter["ustensils"][index].toLowerCase();
                    
                    //Vérifie si l'ustensile ce trouve dans la recette
                    let test;
                    for (let index = 0; index < receipt["ustensils"].length; index++) {
                        const ustensil = receipt["ustensils"][index].toLowerCase();
                        
                        if (ustensil == ustensilFilter) {
                            test = true;
                            break;
                        }

                        test = false;
                    }
                    //Ajout le resultat test dans un tableau
                    isReceiptValidTab.push(test);  
                }  
                //Quand chaque ingredients de la recherche et vérifié, on vérifie si le tableaux 
                //de vérification des recette est TOTALEMENT "true"
                for (let index = 0; index < isReceiptValidTab.length; index++) {
                    const elem = isReceiptValidTab[index];

                    if (elem === false) {
                        isReceiptValid = false
                        break;
                    }

                    isReceiptValid = true;
                }
                //Si oui la recette est ajouté
                if( isReceiptValid ) newTab.push(receipt);
                //Reset des variables
                isReceiptValid = false;
                isReceiptValidTab = [];
            }

            receiptsFilted = newTab;
        }
    }

    return receiptsFilted;
}