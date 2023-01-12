//Déclaration du tableau de recherche
export let theFilter = {
    "keyword" : "",
    "ingredients" : [],
    "appliances" : [],
    "ustensils" : [],
    "empty" : true
};

//Fonction du va gérer tout les filtres
export function filters(data) {

    //Déclaration des élément du DOM necesaire pour les filtres
    const filterFormDOM = document.querySelector("#formFilter fieldset");
    const tagsFiltersDOM = document.querySelector("#tagsFilters");

    //Déclaration des tableaux de filtres
    let filterIngredients = [];
    let filterAppliances = [];
    let filterUstensils = [];

    //Initialisation des tableax de filtres
    initFilters(data,theFilter);

    //Fonction qui va mettre a jour le tableau de recherche
    function updateTheFilter(element,value,incORdesc) {
        
        //Si on doit ajouter un élément au tableau
        if (incORdesc == "INC") {
            //En fonction du filtre le tableau est ajusté
            element == "ingredients" ? theFilter[element].push({"ingredient" : value}) : "";
            element == "ustensils" ? theFilter[element].push(value) : "";
            element == "keyword" || element == "appliances" ? theFilter[element] = value : "";
            //Vérifie sur le tableau est vide
            ifEmpty();
        }
        //Si on doit enlever un élément au tableau
        if (incORdesc == "DESC" ) {
            //En fonction du filtre le tableau est ajusté
            let newtabIngredient = [];
            if( element == "ingredients"){
                for (let index = 0; index < theFilter[element].length; index++) {
                    const elem = theFilter[element][index]["ingredient"];
                    elem != value ? newtabIngredient.push({"ingredient": elem}) : "";
                }
                theFilter[element] = newtabIngredient;
            };

            let newtabUstensils = [];
            if( element == "ustensils"){
                for (let index = 0; index < theFilter[element].length; index++) {
                    const elem = theFilter[element][index];
                    elem != value ? newtabUstensils.push(elem) : "";
                }
                theFilter[element] = newtabUstensils;
            };


            element == "keyword" || element == "appliances" ? theFilter[element] = "" : "";
            ifEmpty();
        }

        //Fonction qui va vérifier si le tableau de recherche est vide
        function ifEmpty() {
            if (value.length < 3 && theFilter["ingredients"].length == 0 && theFilter["appliances"] == "" && theFilter["ustensils"].length == 0 && theFilter["empty"] == false) {
                theFilter["empty"] = true;
                return true;
            }

            if (value.length < 3 && theFilter["ingredients"].length == 0 && theFilter["appliances"] == "" && theFilter["ustensils"].length == 0 && theFilter["empty"] == true) {
                theFilter["empty"] = true;
                return true;
            }

            if (value.length >= 3 || theFilter["ingredients"].length > 0 || theFilter["appliances"] || theFilter["ustensils"].length > 0 && theFilter["empty"] == true) {
                theFilter["empty"] = false;
                return true;
            }
        }

        return theFilter;
    }

    //Fonction qui va mettre a jour les filtre sur le DOM
    function updateAfilterDOM(elem,idFilter,action) {

        //Si l'action est de modifier la liste
        //comme quand on recherche dans un filtre
        if (action == "UP") {

            //En fonction de l'ID du filtre le tableau du filtre et mise a jour
            switch (idFilter) {
                case "searchIngredient":{
                    
                    let newIngredientTab = [];
                    const keywordIngredient = elem.toLowerCase();
                    
                    //Parcours chaque ingredient et compare avec ce qu'on a ecrit
                    for (let index = 0; index < filterIngredients.length; index++) {
                        const ingredient = filterIngredients[index];

                        const nameIngredient = ingredient.toLowerCase();
                        nameIngredient.includes(keywordIngredient) ? newIngredientTab.push(ingredient) : "";
                    }

                    initFiltersForDOM("ingredient",newIngredientTab);
                }
                break;
                case "searchAppliance":{
                    
                    let newApplianceTab = [];
                    const keywordAppliance = elem.toLowerCase();
                    
                    //Parcours chaque ingredient et compare avec ce qu'on a ecrit
                    for (let index = 0; index < filterAppliances.length; index++) {
                        const appliance = filterAppliances[index];
                        
                        const nameAppliance = appliance.toLowerCase();
                        nameAppliance.includes(keywordAppliance) ? newApplianceTab.push(appliance) : "";
                    }

                    initFiltersForDOM("appliance",newApplianceTab);
                }
                break;
                case "searchUstensil":{
                    
                    let newUstensilsTab = [];
                    const keywordUstensils = elem.toLowerCase();
                    
                    //Parcours chaque ingredient et compare avec ce qu'on a ecrit
                    for (let index = 0; index < filterUstensils.length; index++) {
                        const ustensil = filterUstensils[index];
                        
                        const nameUstensils = ustensil.toLowerCase();
                        nameUstensils.includes(keywordUstensils) ? newUstensilsTab.push(ustensil) : "";
                    }

                    initFiltersForDOM("ustensil",newUstensilsTab);

                }
                break;
            
                default:
                break;
            }

            return true;
        }

        //Si l'action est d'enlever un élément
        if (action == "DESC") {
            switch (idFilter) {
                case "filterIngredients":
                    let newfilterIngredient = [];
                    for (let index = 0; index < filterIngredients.length; index++) {
                        const element = filterIngredients[index];
                        element != elem ? newfilterIngredient.push(element) : "";
                    }
                    filterIngredients = newfilterIngredient;
                break;
                case "filterAppliances":
                    let newfilterAppliances = [];
                    for (let index = 0; index < filterAppliances.length; index++) {
                        const element = filterAppliances[index];
                        element != elem ? newfilterIngredient.push(element) : "";
                    }
                    filterAppliances = newfilterAppliances;
                break;
                case "filterUstensils":
                    filterUstensils = filterUstensils.filter(item => item !== elem);
                    let newfilterUstensils = [];
                    for (let index = 0; index < filterUstensils.length; index++) {
                        const element = filterUstensils[index];
                        element != elem ? newfilterUstensils.push(element) : "";
                    }
                    filterUstensils = newfilterUstensils;
                break;
            
                default:
                break;
            }

            initFiltersForDOM("ingredient",filterIngredients);
            initFiltersForDOM("appliance",filterAppliances);
            initFiltersForDOM("ustensil",filterUstensils);

            return true;
        }
        
        //Si l'action est d'ajouter un élément
        if (action == "INC") {

            initFiltersForDOM("ingredient",filterIngredients);
            initFiltersForDOM("appliance",filterAppliances);
            initFiltersForDOM("ustensil",filterUstensils);

            return true;
        }
    }

    //Fonction qui va mettre a jour les filtre sur le DOM
    function initFiltersForDOM(elements,data) {
        
        //En fonction du filtre le menu est mise a jour
        switch (elements) {
            case "ingredient":
                iniIngredientFilter(data);
            break;
            case "appliance":
                initApplianceFilter(data);
            break;
            case "ustensil":
                initUstensilFilter(data);
            break;
            case "all":
                iniIngredientFilter(filterIngredients);
                initApplianceFilter(filterAppliances);
                initUstensilFilter(filterUstensils);
            break;
        
            default:
            break;
        }

        /*Fonctions qui va changer le DOM des menu des filtres*/
        function iniIngredientFilter(data) {
            
            const filterIngredientDOM = filterFormDOM.querySelector("#formFilter #filterIngredients");
            const List = filterIngredientDOM.querySelector(".select__choises");
            List.innerHTML = "";

            for (let index = 0; index < data.length; index++) {
                const ingredient = data[index];
                
                const li = document.createElement( "li" );
                li.setAttribute("class", "col-4 p-2");
                li.textContent = ingredient;
                List.appendChild(li);
            }
        }

        function initApplianceFilter(data) {

            const filterApplianceDOM = filterFormDOM.querySelector("#formFilter #filterAppliances");
            const List = filterApplianceDOM.querySelector(".select__choises");
            List.innerHTML = "";

            for (let index = 0; index < data.length; index++) {
                const appliance = data[index];
                
                const li = document.createElement( "li" );
                li.setAttribute("class", "col-4 p-2");
                li.textContent = appliance;
                List.appendChild(li);
            }
        }

        function initUstensilFilter(data) {

            const filterUstensilDOM = filterFormDOM.querySelector("#formFilter #filterUstensils");
            const List = filterUstensilDOM.querySelector(".select__choises");
            List.innerHTML = "";

            for (let index = 0; index < data.length; index++) {
                const ustensil = data[index];
                
                const li = document.createElement( "li" );
                li.setAttribute("class", "col-4 p-2");
                li.textContent = ustensil;
                List.appendChild(li);
            }
        }
        /*********** */
    }

    //Fonction qui va ajouter le tag dans le DOM
    function addTagsFiltersInDOM(nameTag,type) {
        const span = document.createElement( "span" );
        const img = document.createElement( "img" );
        span.setAttribute("class","tag col-4 p-2 m-2")
        const className = "tag--" + type;
        span.classList.add(className);
        span.setAttribute("type", type);
        img.setAttribute("src","./assets/medias/icons/x-circle.svg");
        img.setAttribute("alt","");
        span.textContent = nameTag;
        span.appendChild(img);
        tagsFiltersDOM.appendChild(span);
    }

    //Fonction qui va enlever le tag dans le DOM
    function deleteTagsFiltersInDOM(nameTag) {
        nameTag.remove();
    }

    //Fonction qui initialise et met a jour les tableaux ingredient, appareil et ustensil
    function initFilters(receiptsFilted,theFilter){

        //Filtre ingredient
            let tabFilterIngredients = [];
            for (let index = 0; index < receiptsFilted.length; index++) {
                const receipt = receiptsFilted[index];

                for (let index = 0; index < receipt['ingredients'].length; index++) {
                    const ingredient = receipt['ingredients'][index];
                    
                    tabFilterIngredients.push(ingredient['ingredient'])
                }
            }
            filterIngredients = [...new Set(tabFilterIngredients)];
            filterIngredients = filterIngredients.sort();

            //Enleve les éléments qui sont en tag
            for (let index = 0; index < theFilter["ingredients"].length; index++) {
                const ingredientFilter = theFilter["ingredients"][index].ingredient;

                let newfilterIngredient = [];
                for (let index = 0; index < filterIngredients.length; index++) {
                    const elem = filterIngredients[index];
                    elem != ingredientFilter ? newfilterIngredient.push(elem) : "";
                }
                filterIngredients = newfilterIngredient;
            }
        // End filtre ingredient

        //Filtre appareil
            let tabFilterAppliance = [];
            for (let index = 0; index < receiptsFilted.length; index++) {
                const receipt = receiptsFilted[index];
                    
                tabFilterAppliance.push(receipt['appliance'])
            }
            filterAppliances = [...new Set(tabFilterAppliance)];
            filterAppliances = filterAppliances.sort();

            //Enleve les éléments qui sont en tag
            // A AJOUTER !!!!!!!!!!!!!!!!!!
            //filterAppliances = filterAppliances.filter(app => app !== theFilter["appliance"]);
            let newfilterAppliances = [];
            for (let index = 0; index < filterAppliances.length; index++) {
                const elem = filterAppliances[index];
                elem != theFilter["appliance"] ? newfilterAppliances.push(elem) : "";
            }
            filterAppliances = newfilterAppliances;
        // End filtre appareil

        // filtre ustensil
            let tabFilterUstensils = [];
            for (let index = 0; index < receiptsFilted.length; index++) {
                const receipt = receiptsFilted[index];

                for (let index = 0; index < receipt['ustensils'].length; index++) {
                    const ustensil = receipt['ustensils'][index];
                    
                    tabFilterUstensils.push(ustensil)
                }
            }
            filterUstensils = [...new Set(tabFilterUstensils)];
            filterUstensils = filterUstensils.sort();

            //Enleve les éléments qui sont en tag
            for (let index = 0; index < theFilter["ustensils"].length; index++) {
                const ustensilFilter = theFilter["ustensils"][index];

                let newfilterUstensils = [];
                for (let index = 0; index < filterUstensils.length; index++) {
                    const elem = filterUstensils[index];
                    elem != ustensilFilter ? newfilterUstensils.push(elem) : "";
                }
                filterUstensils = newfilterUstensils;
            }
        // End filtre ustensil
    }

    return { 
        initFilters,
        initFiltersForDOM,
        updateAfilterDOM,
        addTagsFiltersInDOM,
        deleteTagsFiltersInDOM,
        updateTheFilter
   }
}