'use strict';

window.addEventListener('load', function () {
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', search_country);

    function search_country(e) {
        // let country_name = document.getElementById("country_name").value;
        e.preventDefault();
        const form = e.target;
        let formData = new FormData(form);
        let country_name = formData.get("country_name");
        if(country_name.length < 2){
            alert("Country name can not be less than 2 symbols")
        }
        else{
            search_and_add(country_name).then(r => console.log("done"));
            searchForm.reset();
            document.getElementById('country_name').focus();
        }
    }
});

function createCountryElement(country){
    let content = '<p> Name: ' + country.name + '</p>'
        + '<p> Capital: ' + country.capital + '</p>'
        + '<p> Region: ' + country.region + '</p>'
        + '<p> Languages: ' + country.languages + '</p>'
        + '<p> Currencies: ' + country.currencies + '</p>'
        + '<img src=' + '"' + country.flag + '"' + ' class="image"' + ' alt="none"' + '>'
        + '<br>'
        + '<a href="https://www.google.com/search?q=' + country.name  + '""' + ' target="_blank"> Learn more about this country </a>'
        + '<hr>';
    let element = document.createElement('div');
    element.innerHTML = content;
    return element;
}

async function search_and_add(country_name){
    let search_url = "https://restcountries.eu/rest/v2/name/" + country_name;
    let response = await fetch(search_url);
    if (response.ok) {
        let country_data = await response.json();
        let first_country_data = country_data[0];

        let country_languages_data = first_country_data["languages"];
        let country_currencies_data = first_country_data["currencies"];
        let languages = listToString(country_languages_data);
        let currencies = listToString(country_currencies_data);

        let added_country = new Country(
            first_country_data["name"],
            languages,
            currencies,
            first_country_data["capital"],
            first_country_data["region"],
            first_country_data["flag"]
        );
        document.getElementById("country_list").appendChild(createCountryElement(added_country));
    } else {
        alert("This country is not present!");
    }
}

function listToString(listOfNames){
    let names = "";
    if(listOfNames.length > 1){
        for(let i = 0; i < listOfNames.length; i++){
            if(i === listOfNames.length - 1){
                names += listOfNames[i]["name"] + ".";
            }
            else{
                names += listOfNames[i]["name"] + ", ";
            }
        }
    }
    else{
        names += listOfNames[0]["name"];
    }
    return names;
}

class Country{
    constructor(name, language, currencies, capital, region, flag) {
        this.name = name;
        this.languages = language;
        this.currencies = currencies;
        this.capital = capital;
        this.region = region;
        this.flag = flag;
    }
}