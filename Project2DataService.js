// JavaScript source code
var dataService = function () {
    var aboutUri = "https://people.rit.edu/~sarics/web_proxy.php?path=about";
    var uDegreeUri = "https://people.rit.edu/~sarics/web_proxy.php?path=degrees";
    var gDegreeUri = "https://people.rit.edu/~sarics/web_proxy.php?path=degrees";
    var uMinorsUri = "https://people.rit.edu/~sarics/web_proxy.php?path=minors";
    var employmentUri = "https://people.rit.edu/~sarics/web_proxy.php?path=employment";
    var mapUri = "https://people.rit.edu/~sarics/web_proxy.php?path=map";
    var peopleUri = "https://people.rit.edu/~sarics/web_proxy.php?path=people";
    var researchUri = "https://people.rit.edu/~sarics/web_proxy.php?path=research";
    var resourcesUri = "https://people.rit.edu/~sarics/web_proxy.php?path=resources";
    var footerUri = "https://people.rit.edu/~sarics/web_proxy.php?path=footer";

    function getAboutData() {
        return $.getJSON(aboutUri);
    }

    function getUDegreeData() {
        return $.getJSON(uDegreeUri);
    }

    function getGDegreeData() {
        return $.getJSON(gDegreeUri);
    }

    function getUMinorsData() {
        return $.getJSON(uMinorsUri);
    }

    function getEmploymentData() {
        return $.getJSON(employmentUri);
    }

    function getPeopleData() {
        return $.getJSON(peopleUri);
    }

    function getResearchData() {
        return $.getJSON(researchUri);
    }

    function getResourcesData() {
        return $.getJSON(resourcesUri);
    }

    function getFooterData() {
        return $.getJSON(footerUri);
    }

    return {
        getAboutData: getAboutData,
        getUDegreeData: getUDegreeData,
        getGDegreeData: getGDegreeData,
        getUMinorsData: getUMinorsData,
        getEmploymentData: getEmploymentData,
        getPeopleData: getPeopleData,
        getResearchData: getResearchData,
        getResourcesData: getResourcesData,
        getFooterData: getFooterData
    }
}();