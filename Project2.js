// JavaScript source code
$(document).ready(function () {
    console.log("Get About Data");
    //function for the fadeIn effect on page load
    $('#AboutContainer').fadeIn(2000);

    //function for the navigation bar effect on page scroll
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 10
        }
    })

    getAbout();
    getFooter();
});

//function to get the about page content
function getAbout() {
    console.log("getAbout called");
    dataService.getAboutData().done(function (data) {
        console.log(data);
        //Got data do stuff...
        var aboutHtml = document.createElement("h3");
        $(aboutHtml).attr("id", "homeh3");
        $(aboutHtml).append(document.createTextNode(data.title));
        $("#AboutContainer").append(aboutHtml);
        var p = document.createElement('p');
        $(p).attr("id", "homep");
        $(p).append(data.description);
        $("#AboutContainer").append(p);
        $("#quote").append('"' + data.quote + '"');
        $("#quoteAuthor").append('-'+data.quoteAuthor);
    })
    .fail(function (jqXHR, textStatus, err) {
        alert("can't get data");
    });
}

//function to get the Undergreaduate Degree content
function getUDegree() {
    console.log("getUDegree called");
    dataService.getUDegreeData().done(function (allDegree) {
        console.log(allDegree);
        //functions for the fadeIn effect on page load
        $('#UDegreeContainer1').fadeIn(1500);
        $('#UDegreeContainer2').fadeIn(1500);
        $('#UDegreeContainer3').fadeIn(1500);
        //Got data do stuff...
        $.each(allDegree.undergraduate, function (i, n) {
            console.log(i);
            console.log(n);
            var degreeHtml = document.createElement("h3");
            $(degreeHtml).attr("id", n.degreeName).append(document.createTextNode(n.title));
            if (n.degreeName == "wmc") {
                $("#UDegreeContainer1 h3").append(degreeHtml);
                $("#ugradp1").append(n.description);
            }
            if (n.degreeName == "hcc") {
                $("#UDegreeContainer2 h3").append(degreeHtml);
                $("#ugradp2").append(n.description);
            }
            if (n.degreeName == "cit") {
                $("#UDegreeContainer3 h3").append(degreeHtml);
                $("#ugradp3").append(n.description);
            }

            //function for the dialog box plug-in
            $("#dialog").dialog({
                maxWidth: 400,
                maxHeight: 200,
                width: 400,
                height: 200,
                    autoOpen: false, modal: true, show: "blind", hide: "blind"
                });
                $("#" + n.degreeName).click(function () {
                    $("#UDegreeContent").text(n.concentrations);
                    $("#dialog").attr("title", n.title);
                    $("#dialog").dialog("open");
                });
        })
    })
    .fail(function (jqXHR, textStatus, err) {
        alert("can't get data");
    });
}

//function to get the Graduate Degree content
function getGDegree() {
    console.log("getGDegree called");
    dataService.getGDegreeData().done(function (allDegree) {
        console.log(allDegree);
        //functions for the fadeIn effect on page load
        $('#GDegreeContainer1').fadeIn(1500);
        $('#GDegreeContainer2').fadeIn(1500);
        $('#GDegreeContainer3').fadeIn(1500);
        $('#GACContainer1').fadeIn(3000);
        $('#GACContainer2').fadeIn(3000);
        //Got data do stuff...
        $.each(allDegree.graduate, function (i, n) {
            if (n.degreeName == "graduate advanced certificates") {
                $.each(n.availableCertificates, function (index, certificate) {
                    console.log(index);
                    console.log(certificate);
                    var degreeHtml = document.createElement("h3");
                    $(degreeHtml).append(document.createTextNode(certificate));
                    if (certificate == "Web Development Advanced certificate") {
                        $("#GACContainer1 h3").append(degreeHtml);
                    }
                    else {
                        $("#GACContainer2 h3").append(degreeHtml);
                    }
                })
            }
            else {
                var degreeHtml = document.createElement("h3");
                $(degreeHtml).attr("id", n.degreeName).append(document.createTextNode(n.title));
                if(n.degreeName == "ist"){
                    $("#GDegreeContainer1 h3").append(degreeHtml);
                    $("#ggradp1").append(n.description);
                }
                if (n.degreeName == "hci") {
                    $("#GDegreeContainer2 h3").append(degreeHtml);
                    $("#ggradp2").append(n.description);
                }
                if (n.degreeName == "nsa") {
                    $("#GDegreeContainer3 h3").append(degreeHtml);
                    $("#ggradp3").append(n.description);
                }

                //function for the dialog box plug-in
                $("#dialog").dialog({
                    autoOpen: false, modal: true, show: "blind", hide: "blind"
                });
                $("#" + n.degreeName).click(function () {
                    $("#GDegreeContent").text(n.concentrations);
                    $("#dialog").attr("title", n.title);
                    $("#dialog").dialog("open");
                });
            }
        })
    })
    .fail(function (jqXHR, textStatus, err) {
        alert("can't get data");
    });
}

//function to get the Undergraduate minors content
function getUMinors() {
    console.log("getUMinors called");
    dataService.getUMinorsData().done(function (data) {
        console.log(data);
        //function for the fadeIn effect on page load
        $('#UMinorsContainer').fadeIn(1000);
        //Got data do stuff...
        $.each(data, function (i, n) {
            console.log(i);
            console.log(n);
            var div = document.createElement("div");
            var p = document.createElement("p");
            var p1 = document.createElement("p");
            div.appendChild(p);
            var uMinorsHtml = document.createElement("h5");
            $(uMinorsHtml).append(document.createTextNode(n.title));
            $(p).append(document.createTextNode(n.description));
            if(!(n.note == "" || n.note == null)){
                $(p1).append(document.createTextNode(n.note));
            }
                    var ul = document.createElement("ul");
                    for (var k = 0; k < n.courses.length; k++) {
                        console.log(n.courses.length);
                        var li = document.createElement("li");
                        $(li).append(document.createTextNode(n.courses[k]));
                        ul.appendChild(li);
                    }
                    div.appendChild(ul);
                    div.appendChild(p1);
                    $("#UMinorsContainer").append(uMinorsHtml);
                    $("#UMinorsContainer").append(div);
        });

        //function for the accordion plug-in
        $("#UMinorsContainer").accordion({
            header: 'h5',
            //event: "click",
            active: false,
            collapsible: true,
            autoHeight: false
        });
                })
    .fail(function (jqXHR, textStatus, err) {
        alert("can't get data");
    });
}

//function to get the employment content
function getEmployment() {
    console.log("getEmployment called");
    dataService.getEmploymentData().done(function (data) {
        console.log(data);
        //functions for the fadeIn effect on page load
        $('#EmploymentContainer1').fadeIn(1000);
        $('#EmploymentContainer2').fadeIn(2000);
        //Got data do stuff...
        $.each(data, function (i, n) {
            console.log("first loop index: " + i);
            $.each(n, function (index, value) {
                console.log("index: " + index);
                console.log(value);
                if (index == "content") {
                    var employmentHtml = document.createElement("h3");
                    $(employmentHtml).attr("id", n.title.substring(0, 3));
                    $(employmentHtml).append(document.createTextNode(n.title));
                    $("#EmploymentContainer1").append(employmentHtml);
                    for (var i = 0; i < value.length; i++) {
                        console.log("the VALUE is: " + value[i].title);
                        var headings = document.createElement("h4");
                        $(headings).append(document.createTextNode(value[i].title));
                        $("#EmploymentContainer1").append(headings);
                        var p = document.createElement("p");
                        $(p).append(value[i].description);
                        $("#EmploymentContainer1").append(p);
                    }
                }
                else if (index == "statistics") {
                    var employmentHtml = document.createElement("h3");
                    $(employmentHtml).attr("id", n.title.substring(0, 3));
                    $(employmentHtml).attr("class", "section-heading");
                    $(employmentHtml).append(document.createTextNode(n.title));
                    var br = document.createElement("br");
                    $("#EmploymentContainer2").append(employmentHtml);
                    $("#EmploymentContainer2").append(br);
                    for (var i = 0; i < value.length; i++) {
                        var headings = document.createElement("h4");
                        $(headings).append(document.createTextNode(value[i].value));
                        $("#EmploymentContainer2").append(headings);
                        var p = document.createElement("p");
                        $(p).attr("class", "text-faded");
                        $(p).append(value[i].description);
                        $("#EmploymentContainer2").append(p);
                    }
                }
                else if (index == "employerNames") {
                    var employmentHtml = document.createElement("h3");
                    $(employmentHtml).attr("id", n.title.substring(0, 3));
                    $(employmentHtml).attr("class", "section-heading");
                    $(employmentHtml).append(document.createTextNode(n.title));
                    var br = document.createElement("br");
                    $("#EmploymentContainer3").append(employmentHtml);
                    $("#EmploymentContainer3").append(br);
                    var ul = document.createElement("ul");
                    $(ul).attr("id", "employerul")
                    for (var i = 0; i < value.length; i++) {
                        $(ul).attr("style", "list-style: none");
                        var li = document.createElement("li");
                        ul.appendChild(li);
                        $(li).append(document.createTextNode(value[i]));
                        $("#EmploymentContainer3").append(ul);
                    }
                }
                else if (index == "careerNames") {
                    var employmentHtml = document.createElement("h3");
                    $(employmentHtml).attr("id", n.title.substring(0, 3));
                    $(employmentHtml).attr("class", "section-heading");
                    $(employmentHtml).append(document.createTextNode(n.title));
                    var br = document.createElement("br");
                    $("#EmploymentContainer4").append(employmentHtml);
                    $("#EmploymentContainer4").append(br);
                    var ul = document.createElement("ul");
                    $(ul).attr("id", "careerul")
                    for (var i = 0; i < value.length; i++) {
                        $(ul).attr("style", "list-style: none");
                        var li = document.createElement("li");
                        ul.appendChild(li);
                        $(li).append(document.createTextNode(value[i]));
                        $("#EmploymentContainer4").append(ul);
                    }
                }

                //else if (index == "coopInformation") {
                //    for (var i = 0; i < value.length; i++) {
                //        console.log("employer is  " +value[i].employer);
                //    }
                //}

                //Data table implementation for coopTable
                $('#coopTable').DataTable({
                    bRetrieve: true,
                    ajax: {
                        url: "https://people.rit.edu/~sarics/web_proxy.php?path=employment/coopTable/coopInformation",
                        dataSrc: "coopInformation"
                    },
                    columns: [
                        { data: "employer" },
                        { data: "degree" },
                        { data: "city" },
                        { data: "term" }
                    ]
                })

                //Data table implementation for employmentTable
                $('#employmentTable').DataTable({
                    bRetrieve: true,
                    ajax: {
                        url: "https://people.rit.edu/~sarics/web_proxy.php?path=employment/employmentTable/professionalEmploymentInformation",
                        dataSrc: "professionalEmploymentInformation"
                    },
                    columns: [
                        { data: "employer" },
                        { data: "degree" },
                        { data: "city" },
                        { data: "title" },
                        { data: "startDate" }
                    ]
                })
            })
        })
    })
    .fail(function (jqXHR, textStatus, err) {
        alert("can't get data");
    });

    var employmentHtml = document.createElement("h3");
    $(employmentHtml).attr("class", "section-heading");
    $(employmentHtml).attr("style", "font-weight:bold");
    $(employmentHtml).append(document.createTextNode("Where Our Students Work"));
    var br = document.createElement("br");
    $("#EmploymentContainer5").append(employmentHtml);
    $("#EmploymentContainer5").append(br);

    //Map data content. Hard-coded
    var locations = { "AHMEDABAD, ": { "lat": "23.022505", "long": "72.5713621" }, "ALBANY, NY": { "lat": "42.6525793", "long": "-73.7562317" }, "ALBUQUERQUE, NM": { "lat": "35.110703", "long": "-106.609991" }, "ALEXANDRIA, VA": { "lat": "38.8048355", "long": "-77.0469214" }, "ALLENTOWN, PA": { "lat": "40.6084305", "long": "-75.4901833" }, "ALMATY, KAZAKHSTAN, ": { "lat": "43.2775", "long": "76.895833" }, "ALMATY, XX": { "lat": "51.1166967", "long": "71.4239732" }, "AMHERST, NY": { "lat": "42.9756133", "long": "-78.7914222" }, "AMITYVILLE, NY": { "lat": "40.6789893", "long": "-73.4170673" }, "ANDOVER, MA": { "lat": "42.6583356", "long": "-71.1367953" }, "ANGOLA, ": { "lat": "-11.202692", "long": "17.873887" }, "ARDMORE, PA": { "lat": "40.0067785", "long": "-75.2854622" }, "ARLINGTON, VA": { "lat": "38.8799697", "long": "-77.1067698" }, "ASHBURN, VA": { "lat": "39.0437567", "long": "-77.4874416" }, "ASTANA, KAZAKHSTAN, ": { "lat": "51.180556", "long": "71.461111" }, "ASTANA, XX": { "lat": "52.0400292", "long": "76.9317626" }, "ATLANTA, GA": { "lat": "33.7489954", "long": "-84.3879824" }, "AUBURN, NY": { "lat": "42.9317335", "long": "-76.5660529" }, "AUSTIN, NY": { "lat": "40.7131767", "long": "-73.8336389" }, "AUSTIN, TX": { "lat": "30.267153", "long": "-97.7430608" }, "AVON, CT": { "lat": "41.8096201", "long": "-72.8305154" }, "AVON, NY": { "lat": "42.9120072", "long": "-77.7455583" }, "BALA CYNWYD, PA": { "lat": "40.0131418", "long": "-75.2304038" }, "BALTIMORE, MD": { "lat": "39.2903848", "long": "-76.6121893" }, "BANGKOK, ": { "lat": "13.7563309", "long": "100.5017651" }, "BANGKOK, AL": { "lat": "13.7130918", "long": "100.4104445" }, "BANGKOK, THAILAND, ": { "lat": "13.7563309", "long": "100.5017651" }, "BASKING RIDGE, NJ": { "lat": "40.7066174", "long": "-74.5493284" }, "BATAVIA, NY": { "lat": "42.9981156", "long": "-78.1875167" }, "BEDFORD, MA": { "lat": "42.4906231", "long": "-71.2760089" }, "BEIGING, CHINA, ": { "lat": "39.904211", "long": "116.407395" }, "BEIGING, XX": { "lat": "40.0033859", "long": "116.3493427" }, "BEIJING, CHINA, ": { "lat": "39.90403", "long": "116.407526" }, "BEIJING, XX": { "lat": "24.260957", "long": "106.782166" }, "BELGRADE, ME": { "lat": "44.4466514", "long": "-69.8321004" }, "BELLEVILLE, IL": { "lat": "38.5200504", "long": "-89.9839935" }, "BELMONT, MA": { "lat": "42.3956405", "long": "-71.1776114" }, "BETHESDA, MD": { "lat": "38.984652", "long": "-77.0947092" }, "BILLERICA, MA": { "lat": "42.5584218", "long": "-71.2689461" }, "BLUE BELL, PA": { "lat": "40.1523309", "long": "-75.266289" }, "BOSTON, MA": { "lat": "42.3584308", "long": "-71.0597732" }, "BOULDER, CO": { "lat": "40.0149856", "long": "-105.2705456" }, "BOXBOROUGH, MA": { "lat": "42.4834197", "long": "-71.5167139" }, "BRIARCLIFF MANOR, NY": { "lat": "41.1402322", "long": "-73.840231" }, "BRIDGEWATER, NJ": { "lat": "40.593138", "long": "-74.604731" }, "BRISTOL, CT": { "lat": "41.6717648", "long": "-72.9492703" }, "BROCKPORT, NY": { "lat": "43.2136713", "long": "-77.9391797" }, "BRONX, NY": { "lat": "40.8447819", "long": "-73.8648268" }, "BROOKFIELD, WI": { "lat": "43.0605671", "long": "-88.1064787" }, "BROOKLYN, NY": { "lat": "40.6781784", "long": "-73.9441579" }, "BUFFALO, NY": { "lat": "42.8864468", "long": "-78.8783689" }, "BURLINGTON, MA": { "lat": "42.5047161", "long": "-71.1956205" }, "CAMBRIDGE, MA": { "lat": "42.3736158", "long": "-71.1097335" }, "CAMPBELL, ": { "lat": "37.2871651", "long": "-121.9499568" }, "CAMPBELL, CA": { "lat": "37.2871651", "long": "-121.9499568" }, "CANADAIGUA, NY": { "lat": "42.887535", "long": "-77.2816984" }, "CANANDAIGUA, NY": { "lat": "42.887535", "long": "-77.2816984" }, "CANONSBURG, PA": { "lat": "40.2625702", "long": "-80.1872797" }, "CANTON, MI": { "lat": "42.3086444", "long": "-83.482116" }, "CAPITOL HEIGHTS, MD": { "lat": "38.8851122", "long": "-76.9158068" }, "CARLISLE, PA": { "lat": "40.2010241", "long": "-77.2002745" }, "CARY, NC": { "lat": "35.79154", "long": "-78.7811169" }, "CHARLOTTE, NC": { "lat": "35.2270869", "long": "-80.8431267" }, "CHATSWORTH, CA": { "lat": "34.2506356", "long": "-118.61481" }, "CHEEKTOWAGA, NY": { "lat": "42.9026136", "long": "-78.744572" }, "CHELMSFORD, MA": { "lat": "42.5998139", "long": "-71.3672838" }, "CHEVY CHASE, MD": { "lat": "38.9949153", "long": "-77.0772052" }, "CHICAGO, IL": { "lat": "41.8781136", "long": "-87.6297982" }, "CINCINNATI, OH": { "lat": "39.1031182", "long": "-84.5120196" }, "CLEVELAND, ": { "lat": "41.49932", "long": "-81.6943605" }, "CLEVELAND, OH": { "lat": "41.49932", "long": "-81.6943605" }, "CLEVELAND\/AKRON, OH": { "lat": "41.0700485", "long": "-81.4951621" }, "COLUMBIA, MD": { "lat": "39.2037144", "long": "-76.8610462" }, "COLUMBIA, SC": { "lat": "34.0007104", "long": "-81.0348144" }, "COLUMBUS, OH": { "lat": "39.9611755", "long": "-82.9987942" }, "CONCORD, OH": { "lat": "41.674491", "long": "-81.2245458" }, "CONSHOHOCKEN, PA": { "lat": "40.0792766", "long": "-75.3015714" }, "COS COB, CT": { "lat": "41.0340436", "long": "-73.5996472" }, "CUPERTINO, CA": { "lat": "37.3229978", "long": "-122.0321823" }, "DALLAS\/FT WORTH, TX": { "lat": "32.761422", "long": "-96.8580128" }, "DANBURY, CT": { "lat": "41.394817", "long": "-73.4540111" }, "DENVER, CO": { "lat": "39.737567", "long": "-104.9847179" }, "DEUTSCHLAND, GERMANY, ": { "lat": "51.165691", "long": "10.451526" }, "DEUTSCHLAND, XX": { "lat": "48.6963281", "long": "8.1292023" }, "DOVER, NH": { "lat": "43.1978624", "long": "-70.8736698" }, "DUBLIN, CA": { "lat": "37.7021521", "long": "-121.9357918" }, "DULLES, VA": { "lat": "38.9516235", "long": "-77.4480814" }, "DURHAM, NC": { "lat": "35.9940329", "long": "-78.898619" }, "E ROCHESTER, NY": { "lat": "43.1086741", "long": "-77.4874959" }, "EAST AURORA, NY": { "lat": "42.7678376", "long": "-78.6133589" }, "EAST ROCHESTER, NY": { "lat": "43.1086741", "long": "-77.4874959" }, "EDISON, NJ": { "lat": "40.5187154", "long": "-74.4120953" }, "EL SEGUNDO, CA": { "lat": "33.9191799", "long": "-118.4164652" }, "ELMIRA, NY": { "lat": "42.0897965", "long": "-76.8077338" }, "ELYRIA, OH": { "lat": "41.3683798", "long": "-82.1076486" }, "ERIE, PA": { "lat": "42.1292241", "long": "-80.085059" }, "ERIR, PA": { "lat": "42.1292241", "long": "-80.085059" }, "FAIRFIELD, CT": { "lat": "41.1408363", "long": "-73.2612615" }, "FAIRPORT, NY": { "lat": "43.0986742", "long": "-77.4419378" }, "FORT LAUDERDALE, FL": { "lat": "26.1224386", "long": "-80.1373174" }, "FORT MEADE, MD": { "lat": "39.1137602", "long": "-76.7267773" }, "FRAMINGHAM, MA": { "lat": "42.279286", "long": "-71.4161565" }, "FRANKLIN LAKES, NJ": { "lat": "41.0167639", "long": "-74.2057011" }, "FREMONT, CA": { "lat": "37.5482697", "long": "-121.9885719" }, "FRISCO, TX": { "lat": "33.1506744", "long": "-96.8236116" }, "GLENN MILLS, PA": { "lat": "39.9192772", "long": "-75.4915896" }, "GREENSBORO, NC": { "lat": "36.0726354", "long": "-79.7919754" }, "GROTON, CT": { "lat": "41.3497456", "long": "-72.0790717" }, "GUYANA, ": { "lat": "4.860416", "long": "-58.93018" }, "HARTFORD, CT": { "lat": "41.7637111", "long": "-72.6850932" }, "HENRIETTA, NY": { "lat": "43.0592452", "long": "-77.6128039" }, "HERNDON, VA": { "lat": "38.9695545", "long": "-77.3860976" }, "HERSHEY, PA": { "lat": "40.2859239", "long": "-76.6502468" }, "HOPKINTON, MA": { "lat": "42.2286954", "long": "-71.5225646" }, "HOUSTON, TX": { "lat": "29.7601927", "long": "-95.3693896" }, "HUBBARDSVILLE, NY": { "lat": "42.8178478", "long": "-75.4632312" }, "HYATTSVILLE, MD": { "lat": "38.9559442", "long": "-76.9455301" }, "INDIAN HEAD, MD": { "lat": "38.6001186", "long": "-77.1622016" }, "INDIANAPOLIS, IN": { "lat": "39.768403", "long": "-86.158068" }, "IRVING, TX": { "lat": "32.8140177", "long": "-96.9488945" }, "ITHACA, NY": { "lat": "42.4439614", "long": "-76.5018807" }, "JASPER, IN": { "lat": "38.3914418", "long": "-86.9311094" }, "JEDDAH, MAKKAH, ": { "lat": "21.543333", "long": "39.172778" }, "JERSEY CITY, NJ": { "lat": "40.7281575", "long": "-74.0776417" }, "JERSEY, NJ": { "lat": "40.0583238", "long": "-74.4056612" }, "JERSY CITY, NJ": { "lat": "40.7281575", "long": "-74.0776417" }, "JOHNSTON, RI": { "lat": "41.8205199", "long": "-71.512617" }, "KANSAS CITY, KS": { "lat": "39.114053", "long": "-94.6274636" }, "KANSAS CITY, MI": { "lat": "44.0140216", "long": "-86.4583104" }, "KANSAS CITY, MO": { "lat": "39.0997265", "long": "-94.5785667" }, "KEUKA PARK, NY": { "lat": "42.6151357", "long": "-77.0919056" }, "KING OF PRUSSIA, PA": { "lat": "40.1012856", "long": "-75.3835525" }, "LATHAM, NY": { "lat": "42.746944", "long": "-73.758889" }, "LAUREL, MD": { "lat": "39.0992752", "long": "-76.8483061" }, "LEHI, UT": { "lat": "40.3916172", "long": "-111.8507662" }, "LEXINGTON, MA": { "lat": "42.4430372", "long": "-71.2289641" }, "LIMA, NY": { "lat": "42.9047857", "long": "-77.6113869" }, "LINCOLN, NE": { "lat": "40.809722", "long": "-96.675278" }, "LIVERPOOL, NY": { "lat": "43.106456", "long": "-76.2177046" }, "LOCKPORT, NY": { "lat": "43.1706128", "long": "-78.6903098" }, "LONG BEACH, CA": { "lat": "33.7700504", "long": "-118.1937395" }, "LOS ALTOS, CA": { "lat": "37.3852183", "long": "-122.1141298" }, "LOS ANGELES, CA": { "lat": "34.0522342", "long": "-118.2436849" }, "LOUISVILLE, CO": { "lat": "39.977763", "long": "-105.1319296" }, "LUSBY, MD": { "lat": "38.3583413", "long": "-76.4389549" }, "LYNCHBURG, VA": { "lat": "37.4137536", "long": "-79.1422464" }, "MACEDON, NY": { "lat": "43.0692299", "long": "-77.2988746" }, "MADISON, WI": { "lat": "43.0730517", "long": "-89.4012302" }, "MAHWAH, NJ": { "lat": "41.0886216", "long": "-74.1435843" }, "MAJMMAH, RIYADH, XX": { "lat": "24.5428052", "long": "46.6445301" }, "MAJMMAH, SAUDI ARABIA, ": { "lat": "25.8903331", "long": "45.356251" }, "MALVERN, PA": { "lat": "40.0362184", "long": "-75.5138118" }, "MANCHESTER, NY": { "lat": "42.9697857", "long": "-77.2302586" }, "MANHASSET, NY": { "lat": "40.7978787", "long": "-73.6995749" }, "MANHATTAN, NY": { "lat": "40.790278", "long": "-73.959722" }, "MARLBOROUGH, MA": { "lat": "42.3459271", "long": "-71.5522874" }, "MCKINNEY, NY": { "lat": "33.1708474", "long": "-96.6989363" }, "MCLEAN, VA": { "lat": "38.9338676", "long": "-77.1772604" }, "MEDIACOM PARK, NY": { "lat": "40.7127837", "long": "-74.0059413" }, "MELBOURNE, FL": { "lat": "28.0836269", "long": "-80.6081089" }, "MELVILLE, NY": { "lat": "40.7934322", "long": "-73.4151214" }, "MEMPHIS, TN": { "lat": "35.1495343", "long": "-90.0489801" }, "MERRIMACK, NH": { "lat": "42.8678693", "long": "-71.4948322" }, "MIDDLETON, WI": { "lat": "43.0972174", "long": "-89.5042876" }, "MIDLAND, MI": { "lat": "43.6155825", "long": "-84.2472116" }, "MINNEAPOLIS, MN": { "lat": "44.983334", "long": "-93.26667" }, "MONTOURSVILLE, PA": { "lat": "41.2542459", "long": "-76.9205199" }, "MORRISVILE, NC": { "lat": "35.823483", "long": "-78.8255621" }, "MORRISVILLE, NC": { "lat": "35.823483", "long": "-78.8255621" }, "MOUNTAIN VIEW, CA": { "lat": "37.3860517", "long": "-122.0838511" }, "MT. VIEW, CA": { "lat": "37.3860517", "long": "-122.0838511" }, "MUMBAI, INDIA, ": { "lat": "19.0759837", "long": "72.8776559" }, "MUMBAI, XX": { "lat": "19.0020966", "long": "72.8187981" }, "MYSTIC, CT": { "lat": "41.3542656", "long": "-71.966462" }, "NAPERVILLE, IL": { "lat": "41.7508391", "long": "-88.1535352" }, "NAPLES, FL": { "lat": "26.1420358", "long": "-81.7948103" }, "NATICK, MA": { "lat": "42.283333", "long": "-71.35" }, "NEUSTADT(WIED), ": { "lat": "50.620833", "long": "7.428889" }, "NEUSTADT(WIED), GERMANY, ": { "lat": "50.620833", "long": "7.428889" }, "NEW HARTFORD, NY": { "lat": "43.073403", "long": "-75.2876661" }, "NEW PALTZ, NY": { "lat": "41.7475933", "long": "-74.0868095" }, "NEW YORK CITY, NY": { "lat": "40.7127837", "long": "-74.0059413" }, "NEW YORK, NY": { "lat": "40.7127837", "long": "-74.0059413" }, "NEWARK, DE": { "lat": "39.6837226", "long": "-75.7496572" }, "NEWARK, NJ": { "lat": "40.735657", "long": "-74.1723667" }, "NEWARK, NY": { "lat": "43.0467301", "long": "-77.0952516" }, "NEWBURGH, NY": { "lat": "41.5034271", "long": "-74.0104178" }, "NEWTON SQUARE, PA": { "lat": "39.9867772", "long": "-75.401028" }, "NORMAN, OK": { "lat": "35.2225668", "long": "-97.4394777" }, "NORTH BROOKFIELD, MA": { "lat": "42.2685574", "long": "-72.08504" }, "NORTH RIDGEVILLE, OH": { "lat": "41.3894905", "long": "-82.0190321" }, "NORTH SYRACUSE, NY": { "lat": "43.1347897", "long": "-76.1299238" }, "NORTH TONAWANDA, NY": { "lat": "43.038668", "long": "-78.8642033" }, "NORWALK, CT": { "lat": "41.117744", "long": "-73.4081575" }, "NORWALK, CT, CT": { "lat": "41.117744", "long": "-73.4081575" }, "NYC, NY": { "lat": "40.7127837", "long": "-74.0059413" }, "OAK LAWN, IL": { "lat": "41.719978", "long": "-87.7479528" }, "OCEANPORT, NJ": { "lat": "40.3181663", "long": "-74.0151382" }, "ONTARIO, ": { "lat": "51.253775", "long": "-85.3232139" }, "ONTARIO, CANADA, ": { "lat": "51.253775", "long": "-85.3232139" }, "ORANGEBURG, NY": { "lat": "41.0464858", "long": "-73.9495818" }, "ORLAND PARK, IL": { "lat": "41.6303103", "long": "-87.8539425" }, "ORLANDO, FL": { "lat": "28.5383355", "long": "-81.3792365" }, "OSTERVILLE, MA": { "lat": "41.6285902", "long": "-70.3870055" }, "OSWEGO, NY": { "lat": "43.4553461", "long": "-76.5104973" }, "OWEGO, NY": { "lat": "42.1034075", "long": "-76.2621549" }, "PALMYRA, NJ": { "lat": "40.0070565", "long": "-75.0282271" }, "PALMYRA, NY": { "lat": "43.0639521", "long": "-77.2333154" }, "PALO ALTO, CA": { "lat": "37.4418834", "long": "-122.1430195" }, "PARSIPPANY, NY": { "lat": "40.8802158", "long": "-74.4207009" }, "PEABODY, MA": { "lat": "42.5278731", "long": "-70.9286609" }, "PENN YAN, ": { "lat": "42.6609026", "long": "-77.0538577" }, "PENN YAN, NY": { "lat": "42.6609026", "long": "-77.0538577" }, "PENSACOLA, FL": { "lat": "30.421309", "long": "-87.2169149" }, "PHILADELPHIA, PA": { "lat": "39.952335", "long": "-75.163789" }, "PHOENIX, AZ": { "lat": "33.4483771", "long": "-112.0740373" }, "PISCATAWAY, NJ": { "lat": "40.554887", "long": "-74.4642861" }, "PITTSBURGH, PA": { "lat": "40.4406248", "long": "-79.9958864" }, "PITTSFIELD, MA": { "lat": "42.4500845", "long": "-73.2453824" }, "PITTSFORD, NY": { "lat": "43.0906186", "long": "-77.5149969" }, "PORTSMOUTH, NH": { "lat": "43.0717552", "long": "-70.7625532" }, "PORTSMOUTH, RI": { "lat": "41.6023245", "long": "-71.2503257" }, "POUGHKEEPSIE, NY": { "lat": "41.7003713", "long": "-73.9209701" }, "PRINCETON, NJ": { "lat": "40.3572976", "long": "-74.6672226" }, "PUERTO RICO, ": { "lat": "18.220833", "long": "-66.590149" }, "QUEENSBURY, NY": { "lat": "43.359444", "long": "-73.656944" }, "QUINCY, MA": { "lat": "42.2528772", "long": "-71.0022705" }, "RALEIGH - DURHAM, NC": { "lat": "35.7795897", "long": "-78.6381787" }, "RALEIGH, NC": { "lat": "35.7795897", "long": "-78.6381787" }, "RALEIGH-DURHAM, NC": { "lat": "35.7795897", "long": "-78.6381787" }, "RANDOLPH, MA": { "lat": "42.1619739", "long": "-71.042551" }, "REDLANDS, CA": { "lat": "34.0555693", "long": "-117.1825381" }, "REDMOND, WA": { "lat": "47.6739881", "long": "-122.121512" }, "RESEARCH TRIANGLE PARK, NC": { "lat": "35.8991678", "long": "-78.8636402" }, "RESTON, NY": { "lat": "43.187729", "long": "-76.290614" }, "RESTON, VA": { "lat": "38.9586307", "long": "-77.3570028" }, "RICHARDSON, ": { "lat": "32.9483335", "long": "-96.7298519" }, "RICHARDSON, TX": { "lat": "32.9483335", "long": "-96.7298519" }, "RICHLAND, WA": { "lat": "46.2856907", "long": "-119.2844621" }, "ROCHESTER, ": { "lat": "43.16103", "long": "-77.6109219" }, "ROCHESTER, NY": { "lat": "43.16103", "long": "-77.6109219" }, "ROCHESTER,NY": { "lat": "43.1656", "long": "-77.6114" }, "ROCHETER, NY": { "lat": "43.16103", "long": "-77.6109219" }, "ROCKLIN, CA": { "lat": "38.7907339", "long": "-121.2357828" }, "ROSWELL, GA": { "lat": "34.0232431", "long": "-84.3615555" }, "RTP, NC": { "lat": "35.8991678", "long": "-78.8636402" }, "RUSH, NY": { "lat": "42.9958962", "long": "-77.6455564" }, "SALEM, NH": { "lat": "42.7885553", "long": "-71.2008912" }, "SAN ANTONIO, TX": { "lat": "29.4241219", "long": "-98.4936282" }, "SAN DIEGO, CA": { "lat": "32.715738", "long": "-117.1610838" }, "SAN FRANCISCO, CA": { "lat": "37.7749295", "long": "-122.4194155" }, "SAN FRANSICSO, CA": { "lat": "37.7749295", "long": "-122.4194155" }, "SAN JOSE, CA": { "lat": "37.3393857", "long": "-121.8949555" }, "SAN MATEO, CA": { "lat": "37.5629917", "long": "-122.3255254" }, "SARATOGA SPRINGS, NY": { "lat": "43.0831301", "long": "-73.7845651" }, "SAUDI ARABIA, ": { "lat": "23.885942", "long": "45.079162" }, "SCOTTSVILLE, NY": { "lat": "43.0258957", "long": "-77.7452826" }, "SCRANTON, PA": { "lat": "41.408969", "long": "-75.6624122" }, "SEATTLE, WA": { "lat": "47.6062095", "long": "-122.3320708" }, "SENECA FALLS, NY": { "lat": "42.9106219", "long": "-76.7966215" }, "SHANGHAI, CHINA, ": { "lat": "31.230416", "long": "121.473701" }, "SHANGHAI, XX": { "lat": "31.2177544", "long": "121.4655694" }, "SHAUMBURG, IL": { "lat": "42.0333607", "long": "-88.0834059" }, "SHREWSBURY, NJ": { "lat": "40.3295547", "long": "-74.0615285" }, "SILVER SPRINGS, NY": { "lat": "42.6606177", "long": "-78.0855638" }, "SMITHFIELD, RI": { "lat": "41.9220496", "long": "-71.5495101" }, "SPENCERPORT, NY": { "lat": "43.1864501", "long": "-77.8038972" }, "SPOKANE, WA": { "lat": "47.6587802", "long": "-117.4260466" }, "SPRING VALLEY, CA": { "lat": "32.744774", "long": "-116.998916" }, "SPRINGFIELD, NJ": { "lat": "40.7016937", "long": "-74.3222146" }, "STAMFORD, CT": { "lat": "41.0534302", "long": "-73.5387341" }, "STATE COLLEGE PARK, PA": { "lat": "40.9484182", "long": "-76.8846886" }, "STATE COLLEGE, PA": { "lat": "40.7933949", "long": "-77.8600012" }, "SUCCESS, NY": { "lat": "43.2333806", "long": "-75.5039138" }, "SUNNYVALE, CA": { "lat": "37.36883", "long": "-122.0363496" }, "SYRACUSE, NY": { "lat": "43.0481221", "long": "-76.1474244" }, "TACOMA, WA": { "lat": "47.2528768", "long": "-122.4442906" }, "TAMP, FL": { "lat": "27.950575", "long": "-82.4571776" }, "TAMPA, FL": { "lat": "27.950575", "long": "-82.4571776" }, "TINTON FALLS, NJ": { "lat": "40.3042773", "long": "-74.1004185" }, "TOKYO, JAPAN, ": { "lat": "35.6894875", "long": "139.6917064" }, "TORONTO, CANADA, ": { "lat": "43.653226", "long": "-79.3831843" }, "TORONTO, XX": { "lat": "43.6540644", "long": "-79.3806966" }, "TOYKO, XX": { "lat": "39.1546865", "long": "26.8400647" }, "TUCSON, AZ": { "lat": "32.2217429", "long": "-110.926479" }, "UNKNOWN, CA": { "lat": "33.4607057", "long": "-117.6063509" }, "UNKNOWN, NY": { "lat": "40.5089712", "long": "-74.2126853" }, "UTICA, NY": { "lat": "43.100903", "long": "-75.232664" }, "VERNON, CA": { "lat": "34.003903", "long": "-118.230073" }, "VERONA, WI": { "lat": "42.990831", "long": "-89.5331773" }, "VICTOR, NY": { "lat": "42.9825633", "long": "-77.4088794" }, "VOORHEES, NJ": { "lat": "39.8519447", "long": "-74.961517" }, "WAKAYAMA, JAPAN, ": { "lat": "34.2305113", "long": "135.1708083" }, "WAKAYAMA, XX": { "lat": "33.4229027", "long": "132.4593009" }, "WAKEFIELD, MA": { "lat": "42.5039395", "long": "-71.0723391" }, "WALTHAM, ": { "lat": "42.3764852", "long": "-71.2356113" }, "WALTHAM, MA": { "lat": "42.3764852", "long": "-71.2356113" }, "WARWICK, NY": { "lat": "41.256483", "long": "-74.3598755" }, "WASHINGTON DC, DC": { "lat": "38.9071923", "long": "-77.0368707" }, "WASHINGTON, DC": { "lat": "38.9071923", "long": "-77.0368707" }, "WATERTOWN, MA": { "lat": "42.3709299", "long": "-71.1828321" }, "WEBSTER, NY": { "lat": "43.2122851", "long": "-77.4299939" }, "WEST HENRIETTA, NY": { "lat": "43.0400626", "long": "-77.6616685" }, "WESTBOROUGH, MA": { "lat": "42.2695216", "long": "-71.6161294" }, "WESTLAKE, TX": { "lat": "32.991235", "long": "-97.1950138" }, "WESTON, MA": { "lat": "42.3667625", "long": "-71.3031132" }, "WESTPORT, CT": { "lat": "41.1414717", "long": "-73.3579049" }, "WHITE PLAINS, NY": { "lat": "41.0339862", "long": "-73.7629097" }, "WILLIAMSON, NY": { "lat": "43.2239229", "long": "-77.1861277" }, "WILLIAMSPORT, PA": { "lat": "41.2411897", "long": "-77.0010786" }, "WILLIAMSVILLE, NY": { "lat": "42.963947", "long": "-78.7378091" }, "WILLOUGHBY, OH": { "lat": "41.6397696", "long": "-81.4065011" }, "WINDSOR, CT": { "lat": "41.8525984", "long": "-72.6437022" }, "WOONSOCKET, RI": { "lat": "42.0028761", "long": "-71.5147839" }, "YONKERS, NY": { "lat": "40.9312099", "long": "-73.8987469" }, "ZAGREB, CROATIA, ": { "lat": "45.8150108", "long": "15.981919" }, "ZAGREB, XX": { "lat": "-33.4251826", "long": "-70.7405676" } };
    var allStudents = { "ROCHESTER, NY": [["INFOTEC-BS", "Agrez Consulting Inc.", "Full Stack Developer", "2015-06-10"], ["ANSA-BS", "GreenLight Networks", "Network Engineer", "2015-06-10"], ["INFOTEC-BS", "Harris Corporation", "Systems Administrator", "2015-06-10"], ["NETSYS-MS", "Innovative Solutions", "Systems Administrator", "2015-06-10"], ["ANSA-BS", "Brighton Central School district", "Network Technician", "2015-06-10"], ["ANSA-BS", "RIT", "ITS Operations Priviate Cloud Developer \/ VMWare", "2015-06-10"], ["ANSA-BS", "Rochester Institute of Technology", "Service Desk Analyst", "2015-06-10"], ["INFOTEC-BS", "Rochester Software Associates", "Technical Analyst", "2015-06-10"], ["ANSA-BS", "Sutherland Global Services", "IT Specialist", "2015-06-10"], ["INFOTEC-BS", "University of Rochester", "", "2015-06-10"], ["ANSA-BS", "Wegmans", "Level 1 Help Desk", "2015-06-10"], ["ANSA-BS", "Kables Computer Services", "Network\/Server Technician", "2015-06-10"], ["INFOTEC-BS", "Labor International Local 435", "Web Master", "2015-06-10"], ["NETSYS-BS", "Offsite Data Systems", "System Engineer", "2015-06-10"], ["NETSYS-MS", "CEG GLOBAL SOLUTIONS", "System Administrator", "2015-01-10"], ["NETSYS-MS", "Bank", "Systems Analyst", "2015-01-10"], ["INFOTEC-BS", "Adventive", "Software Engineer", "2015-01-10"], ["INFOTEC-BS", "GEICO", "User Interface Designer \/ Developer", "2015-01-10"], ["INFOTEC-BS", "Tenet Partners", "Junior Programmer", "2015-01-10"], ["INFOTEC-BS", "Sorenson Communications", "", "2015-01-10"], ["INFOTEC-BS", "RIT", "", "2015-01-10"], ["INFOTEC-BS", "Mindex Technologies", "Software Tester", "2015-01-10"], ["NETSYS-MS", "MICROSOFT CORPORATION", "IT SERVICE ENGINEER", "2015-01-10"], ["INFOTEC-BS", "liberty pumps", "IT support specialist", "2015-01-10"], ["ANSA-BS", "iCardiac Technologies", "IT Associate", "2015-01-10"], ["INFOTEC-BS", "Classic Automation LLC", "Web Developer", "2014-08-28"], ["NETSYS-MS", "Rochester Regional Health System", "Systems Engineer", "2014-08-28"], ["INFOTEC-BS", "Datto", "", "2014-08-28"], ["ANSA-BS", "Frontrunner Network Systems", "Data Engineer", "2014-08-28"], ["ANSA-BS", "Paychex", "UNIX Systems Administrator", "2014-08-28"], ["INFOTEC-BS", "LPA Systems", "Associate Business Analytics Consultant", "2014-08-28"], ["INFOTEC-MS", "CentriLogic", "PeopleSoft Database Analyst", "2014-08-28"], ["ANSA-BS", "Rochester Software Associates", "Technical Analyst", "2014-08-28"], ["INFOTEC-BS", "Paychex", "", "2014-08-28"], ["INFOTEC-BS", "Unisys", "Tech Support Representative", "2014-08-28"], ["INFOTEC-MS", "Brand Integrity", "Web Application Developer", "2014-08-28"], ["INFOTEC-BS", "University of Rochester", "Analyst Programmer Trainee", "2014-08-28"], ["INFOTEC-BS", "Frontier Communications", "Programmer\/Analyst", "2013-08-23"], ["INFOTEC-BS", "ROC Brewing Co", "ROC Brewing Co Android App", "2013-08-23"], ["INFOTEC-BS", "Rochester Institute of Technology", "Web and Database Specialist", "2013-08-23"], ["INFOTEC-BS", "Thomson-Reuters", "Associate Software Engineer in Test", "2013-08-23"], ["INFOTEC-BS", "Wilmac Co", "Developer", "2013-08-23"], ["INFOTEC-BS", "NovaWorks", "IT Developer", "2013-08-23"], ["ANSA-BS", "Best Buy", "GeekSquad CIA", "2013-08-22"], ["ANSA-BS", "Fibertech Networks", "Lit Technician", "2013-08-22"], ["ANSA-BS", "Shoretel", "NOC Engineer", "2013-08-22"], ["ANSA-BS", "Rochester Institute of Technology", "Systems Administrator department of industrial and", "2013-08-22"], ["INFOTEC-MS", "Xerox", "Software Engineer", "2013-08-21"], ["INFOTEC-MS", "CypherWorx", "Senior Web Programmer", "2013-08-21"], ["ANSA-BS", "Harris RF Communications", "Network Engineer", "2013-07-30"], ["ANSA-BS", "Frontier Communications", "NOC Specialist III", "2013-07-09"], ["INFOTEC-BS", "Brand Logic", "Web Developer", "2013-06-20"], ["INFOTEC-BS", "Catalyst Inc.", "UX Developer", "2013-06-19"], ["INFOTEC-BS", "Time Warner Cable", "LAN Administrator", "2013-06-19"], ["INFOTEC-BS", "Brand Networks", "QA Analyst", "2013-06-19"], ["INFOTEC-BS", "Xerox", "IT Support", "2013-06-19"], ["INFOTEC-BS", "Phu Concepts", "Web Developer", "2013-06-19"], ["INFOTEC-BS", "Frontier Communications", "Programmer\/Analyst", "2013-06-19"], ["INFOTEC-BS", "Rochester Institute of Technology", "ITS support", "2013-06-19"], ["INFOTEC-BS", "Unisys", "Developer", "2013-06-19"], ["ANSA-BS", "5LINX Enterprises Inc", "Systems Engineer", "2013-06-19"], ["INFOTEC-BS", "Nanoark", "Software Engineer", "2013-06-19"], ["INFOTEC-BS", "Carestream Health Inc", "Patent legal IT", "2013-06-18"], ["ANSA-BS", "Monroe County Water Authority", "Microcomputer Maintenance Technician", "2013-06-17"], ["ANSA-BS", "VP Supply Corp", "Assistant System Administrator", "2013-06-17"], ["INFOTEC-MS", "Lenel Systems", "Technical Systems Application Manager", "2013-06-17"], ["INFOTEC-MS", "Johnson & Johnson", "Engineering Tech", "2013-06-17"], ["ANSA-BS", "Rochester Institute of Technology", "PC System Administrator", "2013-06-17"], ["NETSYS-MS", "Xerox Corporation", "IT Risk Analyst", "2013-06-17"], ["ANSA-BS", "Rochester Institute of Technology", "Collaboration Technologies Hardware Specialist", "2013-06-17"], ["INFOTEC-MS", "Rochester Institute of Technology", "Adjunct Faculty", "2013-06-17"], ["ANSA-BS", "Acquia", "Cloud Systems Engineer", "2013-06-17"], ["INFOTEC-BS", "Consilium 1", "Technical Consultant", "2013-06-11"], ["INFOTEC-BS", "Quality Vision International", "Web Developer", "2013-06-11"], ["MEDINFO-MS", "URMC", "developer", "2013-06-11"], ["INFOTEC-BS", "VoicePort", "Software Developer", "2013-03-18"], ["INFOTEC-BS", "Brand Networks", "Systems Architect", "2013-03-18"], ["INFOTEC-BS", "Modis", "Desktop Support Specialist", "2013-03-18"], ["INFOTEC-BS", "Nothnagle Realty", "Database Developer", "2013-03-18"], ["ANSA-BS", "Rochester Institute of Technology", "Systems Administrator \/ Assistant Engineer", "2013-03-18"], ["INFOTEC-BS", "Brinkman Intl", "IT Support", "2013-03-18"], ["NETSYS-MS", "DISA", "Knowledge Engineer", "2013-03-14"], ["INFOTEC-BS", "Innovative Solutions", "PC Technician", "2013-01-05"], ["INFOTEC-BS", "Rochester Institute of Technology", "Web Developer", "2012-12-19"], ["INFOTEC-MS", "Thomson-Reuters", "Quality Assurance Engineer", "2012-12-12"], ["NETSYS-MS", "Rochester Institute of Technology", "System Administrator", "2012-12-12"], ["INFOTEC-BS", "MySpiderweb", "Founder\/COO", "2012-12-10"], ["ANSA-BS", "Earthlink Cloud", "Networking Support Engineer", "2012-09-12"], ["ANSA-BS", "Zeller Corp", "Network Administrator and IT Support", "2012-09-11"], ["INFOTEC-BS", "TigerSafe", "Project Lead", "2012-09-10"], ["ANSA-BS", "Wilmorite Management Group", "Network Support Assistant", "2012-09-07"], ["ANSA-BS", "Xerox", "IT Service Delivery Manager", "2012-09-07"], ["ANSA-BS", "Integratouch", "Application Operation Technician", "2012-09-07"], ["INFOTEC-BS", "Rochester Institute of Technology", "Assistant", "2012-06-29"], ["INFOTEC-BS", "CM Productions LLC", "Front End Web Developer", "2012-06-21"], ["ANSA-BS", "EMSA Consulting", "Software\/IT Engineer", "2012-06-13"], ["ANSA-BS", "Innovative Solutions", "Desktop Support Technician", "2012-06-13"], ["ANSA-BS", "Brite Computers", "Desktop IMAC Technician", "2012-06-13"], ["INFOTEC-BS", "Frontier Communications", "Malware \/ Chat Online Support", "2012-06-13"], ["INFOTEC-BS", "Paychex", "Software Developer", "2012-06-13"], ["INFOTEC-BS", "iCardiac Technologies", "IT Associate", "2012-06-13"], ["INFOTEC-BS", "QuoJax Corp", "PHP Developer", "2012-06-13"], ["INFOTEC-BS", "NimbleUser", "Web Developer", "2012-06-13"], ["INFOTEC-BS", "Gripmedia", "Web Developer", "2012-06-13"], ["INFOTEC-BS", "PetSmart", "Pet Product Manager", "2012-06-13"], ["INFOTEC-MS", "Paychex", "Developer", "2012-06-12"], ["INFOTEC-MS", "Rochester Institute of Technology", "Information Technology Analyst", "2012-06-12"], ["ANSA-BS", "University of Rochester", "Desktop Administrator", "2012-06-12"], ["INFOTEC-MS", "Alstom Transport", "Solution Manager", "2012-06-12"], ["INFOTEC-BS", "Rochester Institute of Technology", "Application Developer\/ Researcher", "2012-06-08"], ["ANSA-BS", "Cisco Systems", "Customer Advocacy Lab Operator", "2012-04-16"], ["ANSA-BS", "City of Rochester, Information Technolog", "Client Support Analyst", "2012-04-16"], ["INFOTEC-BS", "Xerox", "IT Engineer", "2012-03-26"], ["INFOTEC-BS", "RIT Department of Alumni Relations", "Programmer Analyst", "2012-03-26"], ["INFOTEC-BS", "Windstream Communications", "Database Administrator", "2012-03-26"], ["NETSYS-MS", "Kriterium", "developer", "2012-03-26"], ["ANSA-BS", "Veramark", "Network Administrator", "2012-03-26"], ["INFOTEC-MS", "Computer Aid, Inc", "Technology Associate", "2012-03-26"], ["INFOTEC-BS", "VanGuard", "Software Eng", "2012-03-26"], ["ANSA-BS", "MAC Source Communications", "Systems Engineer", "2012-03-26"], ["INFOTEC-BS", "Northeast Sales Associates", "Website Designer and Developer", "2012-01-03"], ["ANSA-BS", "Phu Yum Yum Design and Development", "Owner", "2011-12-12"], ["ANSA-BS", "Best Buy", "Inventory Specialist", "2011-12-12"], ["INFOTEC-BS", "innovative solutions", "PC Technician", "2011-12-12"], ["INFOTEC-BS", "Atomic Design", "Web Developer", "2011-12-12"], ["INFOTEC-BS", "Spectracom", "Network Administrator", "2011-12-12"], ["INFOTEC-BS", "The Rochester Group", "Senior Web Developer", "2011-09-12"], ["INFOTEC-BS", "Kayex: a Division of SPX", "System Support Specialist", "2011-09-12"], ["INFOTEC-MS", "Carestream Health Inc", "SAP CRM Analyst", "2011-09-12"], ["INFOTEC-BS", "Sorenson Communications", "Technical Support Engineering I", "2011-09-08"], ["INFOTEC-BS", "Palladian Health", "ITS Help Desk", "2011-08-20"], ["INFOTEC-MS", "Rochester Institute of Technology", "Sr Manager Academic Tech and Media Services", "2011-06-13"], ["INFOTEC-MS", "SIGMA Marketing Group", "Sr Marketing Analyst", "2011-06-13"], ["INFOTEC-MS", "L3 Global Communications", "Database Administrator", "2011-06-13"], ["INFOTEC-MS", "Argus Information and Advisory Services", "Analyst", "2011-06-13"], ["INFOTEC-BS", "CMP Productions", "Web Developer", "2011-06-13"], ["INFOTEC-BS", "RIT Libraries", "Digital Assets", "2011-06-13"], ["INFOTEC-BS", "5LINX Enterprises Inc", "Tier 1 Technical Support", "2011-06-13"], ["INFOTEC-BS", "NanoArk", "Software Engineer", "2011-06-13"], ["INFOTEC-BS", "Unisys", "Level 1 Agent", "2011-06-13"], ["INFOTEC-BS", "D4 LLC", "Programmer", "2011-06-13"], ["ANSA-BS", "Aedis IT, LLC", "Information Security Analyst", "2011-06-10"], ["ANSA-BS", "University of Rochester Medical Center", "CAS Technician", "2011-06-10"], ["INFOTEC-BS", "DebtorWise Foundation", "Creative Director", "2011-03-23"], ["INFOTEC-BS", "Carestream Health Inc", "Software Developer", "2011-03-21"], ["INFOTEC-BS", "Innovative Solutions", "PC Technician", "2011-03-21"], ["NETSYS-MS", "Rochester City School District", "Distributed Processes Technician", "2011-03-21"], ["INFOTEC-BS", "Sungard Higher Education", "Help Desk Specialist", "2011-03-21"], ["ANSA-BS", "LMT Technology Solutions", "Support Engineer", "2011-03-21"], ["ANSA-BS", "Single Digits Inc", "Tier 1 Technician", "2011-03-21"], ["INFOTEC-MS", "University of Rochester Medical Center", "developer", "2011-03-21"], ["INFOTEC-MS", "Parlec Inc", "Software Engineer", "2011-03-21"], ["ANSA-BS", "Paychex", "Windows Server Engineer", "2011-03-21"], ["NETSYS-MS", "JK Findings Inc", "Network Administrator", "2011-02-28"], ["INFOTEC-BS", "Dorschel Automotive Group", "IT Specialist", "2010-12-13"], ["INFOTEC-BS", "Excellus Blue Cross\/Blue Shield", "IT Specialist", "2010-12-13"], ["INFOTEC-BS", "Sorenson Communications", "Technical Support", "2010-12-13"], ["ANSA-BS", "Innovative Solutions", "Network Technician", "2010-12-13"], ["INFOTEC-BS", "Total Systems Services Inc", "Programmer Analyst", "2010-12-13"], ["INFOTEC-BS", "Getinge USA Inc", "IT Help Desk Technician", "2010-12-13"], ["NETSYS-MS", "Paetec", "Engr Product Interoperability Test", "2010-12-13"], ["NETSYS-MS", "Finger Lakes DDSO-NYS OMRDD", "Information Technology Specialist 3", "2010-12-13"], ["INFOST-MS", "Paychex Inc", "", "20151"], ["INFOST-MS", "Paychex Inc", "", "20151"], ["INFOTEC-BS", "BlueTie Inc", "", "20151"], ["INFOTEC-BS", "CaterTrax", "", "20151"], ["INFOTEC-BS", "City of Rochester - Information Technology", "", "20151"], ["ANSA-BS", "Sigma Marketing", "", "20151"], ["ANSA-BS", "Wegmans Food Markets Inc", "", "20151"], ["INFOST-MS", "Bausch & Lomb, Valeant", "", "20151"], ["INFOTEC-BS", "ThirtySix Software", "", "20151"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20151"], ["INFOTEC-MS", "LPA Systems", "", "20151"], ["NETSYS-BS", "RIT - ITS\/Technical Support", "", "20151"], ["NETSYS-BS", "Wegmans Food Markets Inc", "", "20151"], ["NETSYS-BS", "Wegmans Food Markets Inc", "", "20151"], ["NETSYS-MS", "Kodak Alaris", "", "20151"], ["NETSYS-MS", "RIT - College of Applied Science & Technology", "", "20151"], ["NETSYS-MS", "RIT - Saunders College of Business", "", "20151"], ["INFOTEC-BS", "Paychex Inc", "", "20151"], ["INFOTEC-BS", "SPX Flow Technology", "", "20151"], ["INFOTEC-BS", "Skyvo", "", "20151"], ["INFOTEC-BS", "RIT-NTID - Technical Support Services", "", "20151"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20151"], ["INFOTEC-BS", "RIT - Information & Technology Services", "", "20151"], ["INFOTEC-BS", "Catalyst Direct Inc.", "", "20148"], ["INFOTEC-BS", "Beauty Supply Warehouse", "", "20148"], ["INFOTEC-BS", "Catalyst Direct Inc.", "", "20148"], ["INFOST-MS", "RIT - Research Computing", "", "20148"], ["INFOST-MS", "RIT - Saunders College of Business", "", "20148"], ["INFOST-MS", "University of Rochester - Info Technology", "", "20148"], ["INFOST-MS", "University of Rochester Medical Center - Information System Division", "", "20148"], ["INFOTEC-BS", "CaterTrax", "", "20148"], ["INFOTEC-BS", "City of Rochester - Information Technology", "", "20148"], ["INFOTEC-BS", "Excellus BlueCross BlueShield", "", "20148"], ["ANSA-BS", "Calero Software (formerly Veramark)", "", "20148"], ["ANSA-BS", "Paychex Inc", "", "20148"], ["INFOST-MS", "EarthLink", "", "20148"], ["INFOST-MS", "Emerge Partners", "", "20148"], ["INFOST-MS", "Frontier Corp\/A Citizens Comm. Co.", "", "20148"], ["ANSA-BS", "Wegmans Food Markets Inc", "", "20148"], ["ANSA-BS", "RIT - Center for Campus Life", "", "20148"], ["ANSA-BS", "RIT-NTID - Center On Access Technology", "", "20148"], ["ANSA-BS", "Sigma Marketing", "", "20148"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20148"], ["INFOTEC-MS", "LPA Systems", "", "20148"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20148"], ["INFOTEC-BS", "ThirtySix Software", "", "20148"], ["INFOTEC-BS", "University of Rochester - Lab for Laser Energetics", "", "20148"], ["INFOTEC-BS", "University of Rochester - Lab for Laser Energetics", "", "20148"], ["INFOTEC-BS", "University of Rochester Medical Center - Information System Division", "", "20148"], ["INFOTEC-BS", "University of Rochester Medical Center - Marketing Group", "", "20148"], ["NETSYS-BS", "ComTec Solutions", "", "20148"], ["NETSYS-MS", "Frontier Corp\/A Citizens Comm. Co.", "", "20148"], ["NETSYS-MS", "Frontier Corp\/A Citizens Comm. Co.", "", "20148"], ["NETSYS-MS", "Frontier Corp\/A Citizens Comm. Co.", "", "20148"], ["NETSYS-MS", "Genesee & Wyoming Inc", "", "20148"], ["NETSYS-BS", "RIT - Golisano College of Computing", "", "20148"], ["NETSYS-BS", "RIT - ITS\/Technical Support", "", "20148"], ["NETSYS-BS", "RIT - ITS\/Technical Support", "", "20148"], ["NETSYS-BS", "RIT - Research Computing", "", "20148"], ["NETSYS-BS", "Wegmans Food Markets Inc", "", "20148"], ["NETSYS-BS", "Wegmans Food Markets Inc", "", "20148"], ["INFOST-MS", "Paychex Inc", "", "20148"], ["INFOTEC-BS", "Paychex Inc", "", "20148"], ["INFOTEC-BS", "RIT-NTID - Center On Access Technology", "", "20148"], ["INFOTEC-BS", "Rochester Software Associates", "", "20148"], ["INFOTEC-BS", "SPX Flow Technology", "", "20148"], ["INFOTEC-BS", "RIT - Software Engineering", "", "20148"], ["INFOTEC-BS", "RIT - Software Engineering", "", "20148"], ["INFOTEC-BS", "RIT - Computing & Information Services", "", "20148"], ["INFOTEC-BS", "RIT - Computing & Information Services", "", "20148"], ["INFOTEC-BS", "RIT - Information & Technology Services", "", "20148"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20148"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20148"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20148"], ["INFOTEC-BS", "RIT - School of Interactive Games & Media", "", "20148"], ["INFOST-MS", "University of Rochester - Info Technology", "", "20145"], ["INFOST-MS", "University of Rochester", "", "20145"], ["INFOST-MS", "Paychex Inc", "", "20145"], ["INFOST-MS", "Paychex Inc", "", "20145"], ["INFOTEC-BS", "Brand Networks Inc", "", "20145"], ["INFOTEC-BS", "LaserMax Inc", "", "20145"], ["ANSA-BS", "Greenlight Networks", "", "20145"], ["ANSA-BS", "Paychex Inc", "", "20145"], ["ANSA-BS", "RIT - Center for Campus Life", "", "20145"], ["ANSA-BS", "RIT - College of Liberal Arts", "", "20145"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20145"], ["ANSA-BS", "Wegmans Food Markets Inc", "", "20145"], ["INFOST-MS", "Bausch & Lomb, Valeant", "", "20145"], ["INFOTEC-BS", "University of Rochester - Lab for Laser Energetics", "", "20145"], ["INFOTEC-BS", "University of Rochester Medical Center - Information System Division", "", "20145"], ["NETSYS-BS", "Wegmans Food Markets Inc", "", "20145"], ["NETSYS-MS", "EagleDream Technologies", "", "20145"], ["INFOTEC-BS", "RIT - College of Imaging Arts & Science", "", "20145"], ["INFOTEC-BS", "RIT - Information & Technology Services", "", "20145"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20145"], ["INFOTEC-BS", "Rochester Software Associates", "", "20145"], ["INFOTEC-BS", "RIT-NTID - Technical Support Services", "", "20145"], ["INFOTEC-BS", "RIT - Saunders Startup", "", "20145"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20145"], ["INFOTEC-BS", "Frontier Corp\/A Citizens Comm. Co.", "", "20141"], ["INFOTEC-BS", "Adventive Inc", "", "20141"], ["INFOST-MS", "Bausch & Lomb, Valeant", "", "20141"], ["ANSA-BS", "RIT - College of Liberal Arts", "", "20141"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20141"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20141"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20141"], ["ANSA-BS", "Systems Management Planning Inc", "", "20141"], ["INFOTEC-BS", "RIT - Information & Technology Services", "", "20141"], ["NETSYS-MS", "University of Rochester Medical Center - Information System Division", "", "20141"], ["NETSYS-MS", "Greenlight Networks", "", "20141"], ["INFOTEC-BS", "RIT - Distributed Support Svcs", "", "20141"], ["INFOTEC-BS", "RIT - Information & Technology Services", "", "20141"], ["INFOTEC-BS", "RIT-NTID - Marketing Communications", "", "20141"], ["INFOTEC-BS", "Rochester Software Associates", "", "20141"], ["INFOTEC-BS", "Skyvo", "", "20141"], ["INFOTEC-BS", "Sorenson Communication", "", "20141"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20141"], ["INFOTEC-BS", "University of Rochester Medical Center - Information System Division", "", "20141"], ["INFOTEC-BS", "RIT - Research Computing", "", "20138"], ["NETSYS-MS", "Greenlight Networks", "", "20138"], ["NETSYS-MS", "Genesee & Wyoming Inc", "", "20138"], ["INFOTEC-BS", "Xerox Corporation - Roch-S Clinton", "", "20138"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20138"], ["ANSA-BS", "RIT - Information & Technology Services", "", "20138"], ["INFOTEC-BS", "Envative", "", "20138"], ["INFOTEC-BS", "Skyvo", "", "20138"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20138"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20138"], ["ANSA-BS", "Greenlight Networks", "", "20138"], ["ANSA-BS", "Frontrunner Network Systems", "", "20138"], ["ANSA-BS", "RIT - Golisano College of Computing", "", "20138"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20138"], ["ANSA-BS", "RIT - Research Computing", "", "20138"], ["INFOTEC-BS", "RIT - Information & Technology Services", "", "20138"], ["INFOTEC-BS", "City of Rochester - Information Technology", "", "20138"], ["INFOTEC-BS", "University of Rochester Medical Center - School of Nursing", "", "20138"], ["INFOTEC-BS", "University of Rochester Medical Center - Marketing Group", "", "20138"], ["INFOTEC-BS", "Frontier Corp\/A Citizens Comm. Co.", "", "20138"], ["INFOTEC-BS", "RIT - Golisano College of Computing", "", "20138"], ["INFOTEC-BS", "RIT - Software Engineering", "", "20138"], ["INFOTEC-BS", "Adventive Inc", "", "20138"], ["INFOTEC-BS", "RIT - School of Mathematical Sciences", "", "20138"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20138"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20135"], ["INFOTEC-BS", "Superior Plus Energy", "", "20135"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20135"], ["INFOTEC-BS", "RIT - Saunders College of Business", "", "20135"], ["INFOTEC-BS", "RIT - The Wallace Center", "", "20135"], ["INFOTEC-BS", "CaterTrax", "", "20135"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20135"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20135"], ["INFOTEC-BS", "RIT-NTID - Technical Support Services", "", "20135"], ["ANSA-BS", "Paychex Inc", "", "20135"], ["ANSA-BS", "RIT - ITS Desktop Support", "", "20135"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20135"], ["ANSA-BS", "Wilmorite Management Group LLC", "", "20135"], ["ANSA-BS", "Passero Associates", "", "20135"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20135"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20135"], ["INFOTEC-BS", "GE Digital Energy &#226;&#128;&#147; MDS", "", "20135"], ["INFOTEC-BS", "City of Rochester - Information Technology", "", "20135"], ["INFOTEC-MS", "Causbuzz", "", "20135"], ["NETSYS-MS", "Wegmans Food Markets Inc", "", "20135"], ["INFOTEC-MS", "Causbuzz", "", "20135"], ["INFOTEC-MS", "BlueTie Inc", "", "20135"], ["ANSA-BS", "Zeller: A Kaman Company", "", "20135"], ["INFOTEC-BS", "Paychex Inc", "", "20135"], ["INFOTEC-BS", "Brand Networks Inc", "", "20135"], ["INFOTEC-BS", "RIT - Distributed Support Svcs", "", "20135"], ["INFOTEC-BS", "Monroe Community Hospital", "", "20135"], ["INFOTEC-MS", "BlueTie Inc", "", "20135"], ["INFOTEC-BS", "ShoreTel Sky (formerly M5 Networks)", "", "20131"], ["INFOTEC-BS", "City of Rochester - Information Technology", "", "20131"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20131"], ["INFOTEC-BS", "RIT - Saunders College of Business", "", "20131"], ["INFOTEC-BS", "Superior Plus Energy", "", "20131"], ["INFOTEC-BS", "University of Rochester - Lab for Laser Energetics", "", "20131"], ["INFOTEC-BS", "RIT - ITS\/Technical Support", "", "20131"], ["INFOTEC-BS", "RIT-NTID - Technical Support Services", "", "20131"], ["INFOTEC-BS", "RIT-NTID - Technical Support Services", "", "20131"], ["ANSA-BS", "Nazareth College", "", "20131"], ["ANSA-BS", "RIT - ITS\/Labs", "", "20131"], ["ANSA-BS", "Wilmorite Management Group LLC", "", "20131"], ["ANSA-BS", "Sigma Marketing", "", "20131"], ["ANSA-BS", "RIT - Saunders College of Business", "", "20131"], ["ANSA-BS", "RIT - Distributed Support Svcs", "", "20131"], ["ANSA-BS", "Iberdrola USA Management Corporation", "", "20131"], ["ANSA-BS", "Zeller: A Kaman Company", "", "20131"], ["INFOTEC-MS", "Omni-ID", "", "20131"], ["INFOTEC-MS", "Skillsoft Corp (formerly Element K)", "", "20131"], ["NETSYS-MS", "McCabe Associates Inc", "", "20131"], ["INFOTEC-MS", "RIT - Golisano College of Computing", "", "20131"], ["INFOTEC-MS", "Thomson Reuters", "", "20131"], ["INFOTEC-BS", "City of Rochester - Information Technology", "", "20131"], ["INFOTEC-BS", "RIT - Information & Technology Services", "", "20131"], ["INFOTEC-BS", "Paychex Inc", "", "20131"], ["INFOTEC-BS", "RIT - Distributed Support Svcs", "", "20131"], ["INFOTEC-MS", "Complemar Partners", "", "20131"], ["INFOTEC-BS", "Monroe County - Dept of Information Services", "", "20131"], ["ANSA-BS", "Nazareth College", "", "20124"], ["ANSA-BS", "RIT - Research Computing", "", "20124"], ["INFOTEC-BS", "Thomson Reuters", "", "20124"], ["INFOTEC-BS", "Rochester Software Associates", "", "20124"], ["ANSA-BS", "RIT - The Wallace Center", "", "20124"], ["ANSA-BS", "RIT - ITS\/Labs", "", "20124"], ["ANSA-BS", "Fibertech Networks Inc", "", "20124"], ["ANSA-BS", "ESL Federal Credit Union", "", "20124"], ["ANSA-BS", "RIT - Distributed Support Svcs", "", "20124"], ["ANSA-BS", "ESL Federal Credit Union", "", "20124"], ["INFOTEC-BS", "RIT - Research Computing", "", "20124"], ["INFOTEC-BS", "RDI Diamonds, Inc.", "", "20124"], ["INFOTEC-BS", "RIT - Saunders College of Business", "", "20124"], ["INFOTEC-BS", "Wegmans Food Markets Inc", "", "20124"], ["INFOTEC-BS", "ShoreTel Sky (formerly M5 Networks)", "", "20124"], ["INFOTEC-BS", "RIT - Center for Student Innovation", "", "20124"], ["ANSA-BS", "University of Rochester Medical Center - Information System Division", "", "20124"], ["ANSA-BS", "RIT - ITS\/Technical Support", "", "20124"], ["ANSA-BS", "Wilmorite Management Group LLC", "", "20124"], ["ANSA-BS", "Wilmorite Management Group LLC", "", "20124"], ["ANSA-BS", "EarthLink", "", "20124"], ["ANSA-BS", "RIT - Information Security Office", "", "20124"], ["ANSA-BS", "Iberdrola USA Management Corporation", "", "20124"], ["ANSA-BS", "Friendly Home", "", "20124"], ["ANSA-BS", "D4 LLC", "", "20124"], ["ANSA-BS", "Rochester Software Associates", "", "20124"], ["ANSA-BS", "RIT - Research Computing", "", "20124"], ["ANSA-BS", "Partners + Napier", "", "20124"], ["INFOTEC-MS", "CityWhisk", "", "20124"], ["INFOTEC-MS", "RIT - Saunders Startup", "", "20124"], ["INFOTEC-MS", "CypherWorx - NP Training Works", "", "20124"], ["INFOTEC-MS", "FUJIFILM NORTH AMERICA", "", "20124"], ["INFOTEC-BS", "RIT - Saunders Startup", "", "20124"], ["INFOTEC-BS", "Monroe County - Dept of Information Services", "", "20124"], ["INFOTEC-BS", "RIT - Information & Technology Services", "", "20124"], ["INFOTEC-MS", "Complemar Partners", "", "20124"], ["INFOTEC-MS", "Thomson Reuters", "", "20124"], ["INFOTEC-MS", "Omni-ID", "", "20124"], ["NETSYS-MS", "McCabe Associates Inc", "", "20124"], ["INFOTEC-MS", "RGRTA (Rochester Genesee Regional Transportation Authority)", "", "20124"], ["INFOTEC-MS", "Skillsoft Corp (formerly Element K)", "", "20124"], ["INFOTEC-MS", "Bio-Optronics", "", "20124"], ["INFOTEC-BS", "Trillium Health (formerly AIDS Care Rochester)", "", "20124"], ["INFOTEC-BS", "Frontier Corp\/A Citizens Comm. Co.", "", "20124"], ["INFOTEC-BS", "RIT-NTID - Technical Support Services", "", "20124"], ["INFOTEC-BS", "University of Rochester - Dept of Medicine", "", "20124"], ["INFOTEC-BS", "RIT - Computing & Information Services", "", "20124"], ["INFOTEC-BS", "University of Rochester - Info Technology", "", "20124"], ["INFOTEC-BS", "ESL Federal Credit Union", "", "20124"], ["INFOTEC-BS", "Thomson Reuters", "", "20124"], ["INFOTEC-BS", "Paychex Inc", "", "20124"], ["INFOTEC-BS", "ComTec Solutions", "", "20124"], ["INFOTEC-BS", "General Motors Components Holdings LLC", "", "20124"], ["INFOTEC-BS", "Paychex Inc", "", "20124"], ["INFOTEC-BS", "Bergmann Associates", "", "20124"], ["INFOTEC-BS", "Xerox Corporation - Roch-S Clinton", "", "20124"], ["INFOTEC-BS", "LaserMax Inc", "", "20124"], ["INFOTEC-BS", "Myspiderweb", "", "20124"], ["INFOTEC-BS", "Wilmac", "", "20124"], ["INFOTEC-BS", "Calero Software (formerly Veramark)", "", "20124"], ["INFOTEC-BS", "Excellus BlueCross BlueShield", "", "20124"], ["INFOTEC-BS", "RIT - Distributed Support Svcs", "", "20124"], ["INFOTEC-BS", "RIT - Saunders Startup", "", "20124"], ["INFOTEC-BS", "Novaworks Software", "", "20124"]], "VERONA, WI": [["INFOTEC-BS", "Epic Systems", "Business Developer", "2015-06-10"]], "NORWALK, CT": [["INFOTEC-BS", "FactSet", "Systems Engineer", "2015-06-10"], ["ANSA-BS", "FactSet Research Systems", "Windows System Engineer", "2015-01-10"], ["ANSA-BS", "Bridgewater Associates", "IT Critical Infrastructure Support Associate", "2012-12-10"], ["INFOTEC-BS", "Datto Inc.", "", "20148"], ["ANSA-BS", "FactSet Research Systems Inc.", "", "20148"], ["INFOTEC-BS", "Datto Inc.", "", "20138"], ["ANSA-BS", "Datto Inc.", "", "20135"], ["INFOTEC-BS", "Datto Inc.", "", "20135"], ["INFOTEC-MS", "FactSet Research Systems Inc.", "", "20135"], ["ANSA-BS", "Datto Inc.", "", "20131"], ["INFOTEC-BS", "Datto Inc.", "", "20131"], ["ANSA-BS", "Datto Inc.", "", "20124"]], "BOSTON, MA": [["INFOTEC-MS", "Fidelity Investments", "", "2015-06-10"], ["INFOTEC-BS", "Enernoc", "Software Engineer", "2015-06-10"], ["INFOTEC-MS", "Harvard School of Public Health", "Instructional Technologist", "2014-08-28"], ["INFOTEC-BS", "Veson Nautical", "Technical Solutions Engineer", "2013-06-19"], ["ANSA-BS", "RSA The Security Division of EMC", "System Administrator", "2013-06-17"], ["ANSA-BS", "Liberty Mutual", "IT Analyst", "2013-06-17"], ["ANSA-BS", "Next Jump", "Systems Administrator", "2013-06-10"], ["INFOTEC-BS", "Liberty Mutual", "IT Analyst", "2013-01-04"], ["INFOTEC-BS", "Arbella Insurance", "Developer", "2012-12-10"], ["ANSA-BS", "Box", "Site Reliability Engineer", "2012-06-13"], ["ANSA-BS", "Liberty Mutual", "FT IT Analyst-Software Development\/Information Sys", "2012-06-13"], ["INFOTEC-BS", "Fidelity Investments", "developer", "2012-06-13"], ["INFOTEC-BS", "TriTek Solutions", "Associate", "2012-06-13"], ["INFOTEC-BS", "Plexxi, Inc.", "Software Engineer", "2011-12-12"], ["INFOTEC-BS", "Fidelity Investments", "developer", "2011-06-13"], ["INFOTEC-BS", "Fidelity Investments", "Associate Software Engineer", "2011-06-13"], ["INFOTEC-BS", "Self-Employed", "Independent IT Services Consultant and Contractor", "2011-06-13"], ["ANSA-BS", "MFS Investment Company", "Security Engineer", "2010-12-13"], ["INFOTEC-BS", "NanoArk Corp", "COMPUTER PROGRAMMER", "2010-12-13"], ["NETSYS-MS", "Acquia", "Linux Systems Engineer", "2010-12-13"], ["ANSA-BS", "EnerNOC Inc", "", "20148"], ["ANSA-BS", "EnerNOC Inc", "", "20145"], ["INFOTEC-BS", "EnerNOC Inc", "", "20138"], ["INFOTEC-BS", "Pearson Education", "", "20138"], ["INFOTEC-BS", "SapientNitro", "", "20131"], ["INFOTEC-BS", "SapientNitro", "", "20131"], ["ANSA-BS", "MFS Investment Management", "", "20124"], ["INFOTEC-BS", "Arnold Worldwide", "", "20124"]], "GUYANA, ": [["ANSA-BS", "Grace Kennedy Remittance", "", "2015-06-10"]], "BROOKFIELD, WI": [["INFOTEC-BS", "Gross Automation", "Web Programmer", "2015-06-10"]], "RESEARCH TRIANGLE PARK, NC": [["INFOTEC-BS", "IBM", "Software Engineer", "2015-06-10"], ["ANSA-BS", "Cisco Systems", "Associate Network Consulting Engineer", "2012-06-13"], ["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2012-06-13"], ["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2012-06-13"], ["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2012-06-13"], ["NETSYS-BS", "Cisco Systems Inc", "", "20151"], ["NETSYS-BS", "Cisco Systems Inc", "", "20148"], ["NETSYS-BS", "Cisco Systems Inc", "", "20148"], ["ANSA-BS", "Cisco Systems Inc", "", "20141"], ["ANSA-BS", "Cisco Systems Inc", "", "20124"]], "SAUDI ARABIA, ": [["NETSYS-MS", "Institute of Public Administration", "Faculty member", "2015-06-10"], ["NETSYS-MS", "Saudi Arabian Govt", "", "2015-06-10"], ["NETSYS-MS", "Saudi Arabian Govt", "Project Director", "2014-08-28"], ["NETSYS-MS", "Bessel Arab", "General Manager", "2014-08-28"]], "SENECA FALLS, NY": [["NETSYS-MS", "ITT", "Senior Systems Administrator", "2015-06-10"]], "PEABODY, MA": [["ANSA-BS", "eClinicalWorks", "IT Operations \/ Service Delivery Technician", "2015-06-10"]], "AHMEDABAD, ": [["NETSYS-MS", "Azure Knowledge Group", "Business Alliance Executive", "2015-06-10"]], "AUSTIN, TX": [["ANSA-BS", "Box", "Operations Center Engineer", "2015-06-10"], ["NETSYS-MS", "IBM", "Managing Consultant", "2015-01-10"], ["ANSA-BS", "Indeed Inc.", "Junior System Administrator", "2013-06-17"], ["INFOTEC-MS", "Alcatel-Lucent", "QA Engineer", "2011-06-13"], ["INFOTEC-MS", "InsidersReferral.com", "", "20141"], ["INFOTEC-MS", "InsidersReferral.com", "", "20131"], ["INFOTEC-MS", "InsidersReferral.com", "", "20124"]], "LOS ALTOS, CA": [["NETSYS-MS", "Box", "Network Operations Engineer", "2015-06-10"], ["NETSYS-MS", "Box Inc", "", "20148"], ["NETSYS-MS", "Box Inc", "", "20138"], ["ANSA-BS", "Box Inc", "", "20124"], ["ANSA-BS", "Box Inc", "", "20124"]], "PITTSFORD, NY": [["INFOTEC-BS", "Bytronics Incorporated", "iOS mobile developer", "2015-06-10"], ["INFOTEC-BS", "Discover Financial Services", "", "2015-01-10"], ["INFOTEC-BS", "NimbleUser", "Technology Support Analyst", "2013-03-18"], ["INFOTEC-BS", "NimbleUser", "Developer", "2012-06-13"], ["INFOTEC-BS", "NimbleUser", "Developer", "2011-12-12"], ["INFOTEC-BS", "iVEDiX Inc.", "Solutions Architect", "2011-09-12"], ["INFOTEC-BS", "Electronic Access Solutions-Lenel", "", "20148"], ["ANSA-BS", "Annese & Associates", "", "20148"], ["NETSYS-BS", "Annese & Associates", "", "20148"], ["INFOTEC-BS", "Institute 4 Priority Thinking", "", "20148"], ["INFOTEC-BS", "Priority Thinking", "", "20145"], ["INFOTEC-BS", "Electronic Access Solutions-Lenel", "", "20141"], ["INFOTEC-BS", "Town of Pittsford", "", "20138"], ["INFOTEC-BS", "Discover Financial Services", "", "20138"], ["INFOTEC-BS", "Access & Video Solutions (formerly Lenel)", "", "20138"], ["INFOTEC-BS", "Alpine Software", "", "20135"], ["INFOTEC-BS", "Lenel Systems International", "", "20131"], ["INFOTEC-BS", "Alpine Software", "", "20131"], ["ANSA-BS", "TEKSystems", "", "20124"], ["INFOTEC-BS", "OnCell Systems Inc", "", "20124"]], "KANSAS CITY, MO": [["INFOTEC-MS", "Cerner Corporation", "Velocity Software Developer", "2015-06-10"], ["INFOTEC-MS", "Cerner Corporation", "Velocity Software Engineer", "2012-09-10"], ["INFOTEC-BS", "FAST Enterprises", "Software Implementation Consultant", "2012-09-10"], ["INFOTEC-BS", "Cerner Corporation", "", "20138"], ["INFOTEC-BS", "Cerner Corporation", "", "20124"]], "SAN FRANCISCO, CA": [["ANSA-BS", "CISCO", "Network Support Engineer", "2015-06-10"], ["ANSA-BS", "Cisco Meraki", "Technical Support Engineer", "2015-06-10"], ["ANSA-BS", "Cisco SF", "Network Support Engineer", "2015-06-10"], ["ANSA-BS", "LinkedIn", "NOC Engineer", "2015-01-10"], ["ANSA-BS", "Box", "Operations Technician", "2013-08-22"], ["ANSA-BS", "Meraki Inc", "Support Engineer", "2013-06-17"], ["INFOTEC-MS", "Google Inc", "IT Surgeon", "2013-06-17"], ["ANSA-BS", "CISCO MERAKI", "Technical Support Engineer CLOUD NETWORKING GROUP", "2013-06-17"], ["ANSA-BS", "Meraki", "Inside Technical Support Engineer", "2012-06-13"], ["ANSA-BS", "Meraki", "Technical Support Engineer", "2012-06-13"], ["INFOTEC-MS", "Pearl.com LLC", "Software Engineer", "2012-06-12"], ["INFOTEC-BS", "Ubisoft", "Webmaster", "2011-12-12"], ["INFOTEC-BS", "EMC Corp", "CLOUD COMPUTING", "2011-06-13"], ["ANSA-BS", "Google Inc", "IT Resident", "2011-03-21"], ["ANSA-BS", "Google Inc", "Internal Technology Resident", "2010-12-13"], ["ANSA-BS", "Cisco Meraki", "", "20151"], ["ANSA-BS", "Expensify", "", "20151"], ["INFOTEC-BS", "Xamarin", "", "20151"], ["ANSA-BS", "Expensify", "", "20148"], ["ANSA-BS", "Cisco Meraki", "", "20148"], ["ANSA-BS", "Cisco Meraki", "", "20148"], ["ANSA-BS", "Dropbox", "", "20148"], ["INFOTEC-BS", "Xamarin", "", "20148"], ["NETSYS-MS", "Cisco Meraki", "", "20148"], ["INFOTEC-BS", "Salesforce.com", "", "20148"], ["ANSA-BS", "Cisco Meraki", "", "20145"], ["ANSA-BS", "Cisco Meraki", "", "20141"], ["ANSA-BS", "Cisco Meraki", "", "20141"], ["NETSYS-BS", "Cisco Meraki", "", "20141"], ["NETSYS-BS", "Cisco Meraki", "", "20141"], ["NETSYS-MS", "Cisco Meraki", "", "20141"], ["ANSA-BS", "Cisco SF", "", "20135"], ["NETSYS-MS", "Cisco SF", "", "20135"], ["ANSA-BS", "Internet Archive", "", "20131"], ["ANSA-BS", "Cisco SF", "", "20124"], ["ANSA-BS", "Internet Archive", "", "20124"], ["ANSA-BS", "Cisco SF", "", "20124"], ["INFOTEC-BS", "Cisco SF", "", "20124"]], "NEW YORK CITY, NY": [["INFOTEC-BS", "Datto", "", "2015-06-10"], ["INFOTEC-BS", "SapientNitro", "Interactive Programmer", "2015-06-10"], ["INFOTEC-BS", "Construction Realty Safety Group", "IT Technician", "2015-01-10"], ["INFOTEC-BS", "LinkedIn", "Java Developer", "2013-06-19"], ["ANSA-BS", "JPMorgan Chase & Co.", "Technology Analyst", "2013-06-17"], ["NETSYS-MS", "Gemprint Corp.", "Software Engineer", "2012-12-12"], ["INFOTEC-BS", "Praxair", "It Intern", "2012-09-10"], ["INFOTEC-BS", "Behance Inc", "Developer", "2012-09-10"]], "WILLIAMSVILLE, NY": [["ANSA-BS", "Eagle IT Services, LLC", "Owner \/ Head Technician", "2015-06-10"], ["ANSA-BS", "Advance 2000", "developer", "2011-06-10"], ["NETSYS-MS", "Cognigen Corporation", "", "20151"], ["NETSYS-MS", "Cognigen Corporation", "", "20148"]], "SUNNYVALE, CA": [["NETSYS-MS", "Juniper Networks", "QA Engineer", "2015-06-10"], ["ANSA-BS", "Juniper Networks Inc", "", "20148"], ["NETSYS-MS", "Juniper Networks Inc", "", "20138"], ["ANSA-BS", "Exablox", "", "20138"], ["ANSA-BS", "Exablox", "", "20131"], ["ANSA-BS", "Exablox", "", "20124"]], "HERNDON, VA": [["INFOTEC-BS", "Gemini IT Labs", "IT Support", "2015-06-10"], ["INFOTEC-MS", "REI Systems Inc", "Applications Programmer", "2013-01-02"], ["NETSYS-MS", "Symantec Corporation", "", "20131"], ["NETSYS-MS", "Symantec Corporation", "", "20124"]], "PHILADELPHIA, PA": [["NETSYS-MS", "SIG", "Security Engineer", "2015-06-10"], ["INFOTEC-BS", "ING", "Associate Software Development Engineer", "2013-06-19"], ["ANSA-BS", "UniTek Global Services", "System Administrator", "2012-06-13"], ["INFOTEC-BS", "IBM", "Consultant", "2012-06-13"], ["INFOTEC-BS", "Drinker & Biddle", "Service Desk Analyst", "2012-06-13"], ["INFOTEC-MS", "De Lage Landen", "Service Delivery Consultant-Server and Storage", "2011-12-12"], ["INFOTEC-MS", "FREEDOM PAY", "VP TECHNOLOGY", "2010-12-13"], ["INFOTEC-BS", "Vascular Access Centers", "", "20124"]], "WILLOUGHBY, OH": [["INFOTEC-BS", "Winter Equipment Company", "IT Communications and Systems Manager", "2015-06-10"]], "HOUSTON, TX": [["INFOTEC-BS", "Wyman-Gordon Forgings", "IT", "2015-06-10"], ["INFOTEC-BS", "Wyman Gordon", "", "20145"], ["INFOTEC-BS", "Wyman Gordon", "", "20141"], ["INFOTEC-BS", "Wyman Gordon", "", "20138"], ["INFOTEC-BS", "Wyman Gordon", "", "20135"], ["INFOTEC-BS", "Wyman Gordon", "", "20131"], ["INFOTEC-BS", "Wyman Gordon", "", "20124"]], "BUFFALO, NY": [["INFOTEC-BS", "Rich Products", "Programmer Analyst", "2015-06-10"], ["INFOTEC-BS", "Campus Labs", "Software Developer", "2013-03-18"], ["INFOTEC-MS", "Energy Curtailment Specialists", "Software Engineer Developer", "2012-12-12"], ["INFOTEC-BS", "Univ at Buffalo", "Support", "2012-10-16"], ["INFOTEC-BS", "Studio LLC", "Web Developer", "2012-06-29"], ["ANSA-BS", "MAC Source Communications", "Systems Engineer", "2012-06-13"], ["INFOTEC-BS", "Algonquin Studios", "Associate Developer", "2012-06-13"], ["INFOTEC-BS", "Computer SOS", "Software Developer", "2012-06-13"], ["INFOTEC-MS", "T-Mark International", "Web Developer", "2012-06-12"], ["INFOTEC-MS", "Aurora Consulting Group", "Developer", "2012-06-12"], ["ANSA-BS", "Global Crossing", "Security Architect Intern", "2011-12-12"], ["NETSYS-MS", "Citi", "Quatitative Analyst (System Engineer)", "2011-09-12"], ["INFOTEC-BS", "Student Voice", "Developer", "2011-06-13"], ["INFOTEC-MS", "Aurora Consulting Group", "APPLICATION DEVELOPER", "2010-12-13"], ["INFOTEC-BS", "Energy Curtailment Specialists Inc.", "", "20138"], ["INFOTEC-BS", "Blue Cross Blue Shield of Western NY", "", "20138"], ["INFOTEC-BS", "HSBC", "", "20131"], ["INFOTEC-BS", "Rich Products", "", "20131"], ["INFOTEC-BS", "Rich Products", "", "20124"], ["INFOTEC-BS", "HSBC", "", "20124"]], "MANHASSET, NY": [["INFOTEC-BS", "PyroSignal & Suppression Inc.", "IT Assistant", "2015-06-10"]], "WEBSTER, NY": [["INFOTEC-BS", "Paychex", "Telecom Analyst I", "2015-06-10"], ["INFOTEC-BS", "Paychex", "Voice Engineer I", "2015-06-10"], ["INFOTEC-BS", "Xerox", "Technical Helpdesk Analyst", "2013-08-23"], ["ANSA-BS", "Wegmans Food Markets", "Store Systems Support Technician", "2013-06-17"], ["ANSA-BS", "Red Stapler Software", "C# Web Developer", "2011-06-10"], ["ANSA-BS", "Paychex Inc", "", "20151"], ["INFOTEC-BS", "Paychex Inc", "", "20151"], ["INFOTEC-BS", "Paychex Inc", "", "20151"], ["INFOST-MS", "Paychex Inc", "", "20148"], ["INFOST-MS", "Paychex Inc", "", "20148"], ["INFOTEC-BS", "Paychex Inc", "", "20148"], ["INFOTEC-BS", "Paychex Inc", "", "20148"], ["INFOTEC-BS", "Paychex Inc", "", "20148"], ["INFOTEC-BS", "The Bross Group", "", "20148"], ["INFOST-MS", "Paychex Inc", "", "20145"], ["INFOST-MS", "Paychex Inc", "", "20145"], ["INFOST-MS", "Paychex Inc", "", "20145"], ["INFOTEC-MS", "Paychex Inc", "", "20145"], ["INFOTEC-BS", "Paychex Inc", "", "20145"], ["INFOTEC-BS", "Paychex Inc", "", "20145"], ["INFOTEC-BS", "Paychex Inc", "", "20145"], ["INFOTEC-BS", "The Bross Group", "", "20145"], ["INFOTEC-BS", "Paychex Inc", "", "20141"], ["INFOTEC-BS", "Paychex Inc", "", "20141"], ["INFOTEC-BS", "Classic Automation LLC", "", "20135"], ["INFOTEC-BS", "Paychex Inc", "", "20135"], ["INFOTEC-BS", "Paychex Inc", "", "20135"], ["INFOTEC-MS", "HCL America", "", "20135"], ["ANSA-BS", "Paychex Inc", "", "20131"], ["INFOTEC-BS", "Classic Automation LLC", "", "20131"], ["INFOTEC-MS", "VI Manufacturing Inc", "", "20131"], ["INFOTEC-MS", "HCL America", "", "20131"], ["INFOTEC-MS", "HCL America", "", "20124"], ["INFOTEC-BS", "Classic Automation LLC", "", "20124"]], "PORTSMOUTH, NH": [["INFOTEC-BS", "Liberty Mutual", "IT Analyst", "2015-06-10"], ["INFOTEC-BS", "Liberty Mutual", "IT Analyst", "2013-07-01"], ["INFOTEC-BS", "Liberty Mutual", "IT Analyst", "2013-06-19"], ["INFOTEC-BS", "Liberty Mutual", "IT Analyst", "2013-06-19"], ["ANSA-BS", "Liberty Mutual", "IT Analyst", "2013-06-10"], ["NETSYS-MS", "Liberty Mutual", "IT Analyst", "2012-12-12"], ["ANSA-BS", "Liberty Mutual", "Network Engineer", "2012-06-13"], ["INFOTEC-BS", "Liberty Mutual", "", "20151"], ["INFOTEC-BS", "Liberty Mutual", "", "20148"], ["ANSA-BS", "Liberty Mutual", "", "20148"], ["INFOTEC-BS", "Liberty Mutual", "", "20148"], ["ANSA-BS", "Liberty Mutual", "", "20138"], ["INFOTEC-BS", "Liberty Mutual", "", "20131"], ["INFOTEC-BS", "Liberty Mutual", "", "20124"], ["INFOTEC-BS", "Liberty Mutual", "", "20124"], ["ANSA-BS", "Liberty Mutual", "", "20124"], ["INFOTEC-BS", "Liberty Mutual", "", "20124"], ["INFOTEC-BS", "Liberty Mutual", "", "20124"]], "PORTSMOUTH, RI": [["INFOTEC-BS", "Liberty Mutual", "", "2015-06-10"]], "BOULDER, CO": [["NETSYS-MS", "Lockheed Martin", "System Engineer Sr.", "2015-06-10"]], "LOS ANGELES, CA": [["INFOTEC-BS", "Los Angeles Agency on Deafness, Inc.", "IT Administrator and Web Developer", "2015-06-10"], ["INFOTEC-BS", "devianART Inc", "Product Manager", "2011-03-21"]], "PISCATAWAY, NJ": [["INFOTEC-BS", "Marlabs Inc", "LAMP stack developer", "2015-06-10"], ["INFOTEC-BS", "Marlabs Inc", "", "20145"]], "WASHINGTON DC, DC": [["ANSA-BS", "National Security Agency", "", "2015-06-10"]], "PALO ALTO, CA": [["ANSA-BS", "Palantir Technologies", "Mission Operations Systems Analyst", "2015-06-10"], ["ANSA-BS", "Box.net", "Technical Operations", "2014-08-28"], ["INFOTEC-BS", "Palantir Technologies", "Unix Systems Administrator", "2013-08-23"], ["ANSA-BS", "Box", "Network Operations Technician", "2013-08-22"], ["INFOTEC-MS", "Hewlett-Packard Company", "Mathematical\/Statistical Analyst", "2013-01-18"], ["ANSA-BS", "Box", "developer", "2012-06-13"], ["ANSA-BS", "Box", "Security Analyst", "2012-03-06"], ["ANSA-BS", "Box", "developer", "2011-06-10"], ["INFOST-MS", "MetaMind Inc", "", "20148"], ["ANSA-BS", "Palantir Technologies", "", "20138"]], "WALTHAM, MA": [["INFOTEC-MS", "Constant Contact", "Software Engineer", "2015-01-10"], ["INFOTEC-BS", "Constant Contact", "", "20148"], ["NETSYS-BS", "Dining Alliance", "", "20148"], ["ANSA-BS", "Hitachi Data Systems", "", "20138"], ["INFOTEC-BS", "Boston Engineering Corporation", "", "20138"], ["INFOTEC-MS", "Constant Contact", "", "20131"], ["INFOTEC-BS", "Boston Engineering Corporation", "", "20131"], ["INFOTEC-BS", "Hitachi Data Systems", "", "20124"], ["INFOTEC-MS", "Constant Contact", "", "20124"], ["INFOTEC-BS", "Boston Engineering Corporation", "", "20124"]], "NEW YORK, NY": [["NETSYS-MS", "Credit Suisse", "Technical Analyst", "2015-01-10"], ["INFOTEC-BS", "Turner Construction", "Technology Service Engineer", "2014-08-28"], ["INFOTEC-MS", "Morgan Stanley", "Software Developer\/Associate", "2013-09-16"], ["INFOTEC-BS", "Driver Digital", "Web Developer", "2013-06-19"], ["INFOTEC-BS", "JPMorgan Chase & Co.", "Business Systems Analyst", "2013-06-18"], ["INFOTEC-BS", "Yodle", "Front End Web Developer", "2013-03-18"], ["INFOTEC-BS", "Infobase Learning", ".NET Web Developer", "2012-12-10"], ["INFOTEC-BS", "Paperless Post", "Software Developer", "2012-12-10"], ["INFOTEC-BS", "JPMorgan Chase & Co.", "Technology Analyst", "2012-12-10"], ["INFOTEC-BS", "FactSet Research Systems", "Unix Systems Engineer", "2012-06-29"], ["ANSA-BS", "Next Jump", "System Administrator Network Operations Center", "2012-06-13"], ["ANSA-BS", "JPMorgan Chase & Co.", "Technology Analyst", "2012-06-13"], ["ANSA-BS", "Credit Suisse", "Technical Analyst", "2012-06-13"], ["INFOTEC-BS", "Credit Suisse", "Technical Analyst", "2012-06-13"], ["INFOTEC-BS", "KIPP NYC", "Help Desk Technician", "2012-06-13"], ["INFOTEC-MS", "Argus Information and Advisory Services", "developer", "2012-06-12"], ["INFOTEC-BS", "JPMorgan Chase & Co.", "Technology Analyst", "2012-04-13"], ["ANSA-BS", "JPMorgan Chase & Co.", "Technology Analyst: Infrastructure Engineer", "2012-03-26"], ["ANSA-BS", "Mycroft Inc.", "Systems Engineer", "2011-12-12"], ["INFOTEC-BS", "PetFlow", "UI Web Developer", "2011-12-12"], ["INFOTEC-BS", "Concept", "Technical Consultant", "2011-12-12"], ["INFOTEC-BS", "Dentsu", "Junior Systems Administrator", "2011-06-20"], ["INFOTEC-BS", "Distributed Support Service", "GMC Lab Manager", "2011-06-13"], ["ANSA-BS", "JPMorgan Chase & Co.", "developer", "2011-06-10"], ["ANSA-BS", "Mindspark Interactive Networks Inc", "Unix Operator", "2011-06-10"], ["INFOTEC-BS", "Time Inc", "Senior Web Developer", "2011-03-21"], ["INFOTEC-BS", "ANN Inc", "Information Systems Intern", "2010-12-13"], ["INFOTEC-BS", "1stdibs", "", "20148"], ["INFOST-MS", "The Barbarian Group", "", "20148"], ["NETSYS-MS", "Coalfire Systems", "", "20148"], ["INFOTEC-BS", "MCD Partners", "", "20148"], ["INFOTEC-BS", "mindSHIFT Technologies", "", "20148"], ["INFOTEC-BS", "Paperless Post", "", "20148"], ["INFOTEC-BS", "Maureen Data Systems", "", "20148"], ["INFOTEC-BS", "Sudler & Hennessey", "", "20148"], ["INFOTEC-BS", "MCD Partners", "", "20145"], ["INFOTEC-MS", "Yosi Samra Inc", "", "20145"], ["NETSYS-MS", "Next Jump, Inc.", "", "20145"], ["INFOTEC-MS", "Yosi Samra Inc", "", "20141"], ["NETSYS-MS", "Blackrock", "", "20141"], ["INFOTEC-MS", "Blackrock", "", "20138"], ["INFOTEC-BS", "JetBlue", "", "20138"], ["INFOTEC-BS", "Tory Burch LLC", "", "20138"], ["INFOTEC-BS", "1stdibs", "", "20138"], ["INFOTEC-BS", "UNICEF", "", "20138"], ["INFOTEC-BS", "Fancy Pants", "", "20138"], ["ANSA-BS", "WingTips Interactive LLC", "", "20135"], ["ANSA-BS", "WingTips Interactive LLC", "", "20131"], ["INFOTEC-BS", "Citigroup", "", "20131"], ["INFOTEC-BS", "Time Inc.", "", "20124"], ["INFOTEC-BS", "JPMorgan Chase", "", "20124"], ["INFOTEC-MS", "JPMorgan Chase", "", "20124"], ["INFOTEC-MS", "The Distinguished Programs Group", "", "20124"], ["INFOTEC-MS", "Credit Suisse", "", "20124"], ["INFOTEC-BS", "Citigroup", "", "20124"], ["NETSYS-MS", "Credit Suisse", "", "20124"], ["INFOTEC-BS", "Bank of America Merrill Lynch", "", "20124"], ["INFOTEC-BS", "JPMorgan Chase", "", "20124"], ["INFOTEC-BS", "The Distinguished Programs Group", "", "20124"]], "STATE COLLEGE, PA": [["INFOTEC-BS", "Datto Inc.", "Full Stack Web Developer", "2015-01-10"]], "BRISTOL, CT": [["NETSYS-MS", "ESPN", "Senior Cloud Architect", "2015-01-10"]], "FAIRPORT, NY": [["INFOTEC-MS", "ConServe", "Application Analyst", "2015-01-10"], ["ANSA-BS", "RailComm", "Systems Administrator", "2013-08-22"], ["ANSA-BS", "Soleo Communications", "IT Systems Administrator", "2013-02-11"], ["INFOTEC-BS", "MG Lomb Advertising Inc", "Web Developer\/Programmer", "2011-12-12"], ["INFOTEC-BS", "MG Lomb Advertising Inc", "Web Developer\/Programmer", "2011-09-12"], ["INFOTEC-MS", "Manning & Napier Advisors Inc", "Software Developer", "2010-12-13"], ["INFOTEC-BS", "CooperVision, Inc.", "", "20148"], ["INFOTEC-BS", "Soleo Communications Inc", "", "20148"], ["INFOTEC-BS", "Soleo Communications Inc", "", "20145"], ["INFOTEC-BS", "EMS eSchedule", "", "20141"], ["INFOTEC-BS", "EMS eSchedule", "", "20138"], ["INFOTEC-BS", "BrokenMyth Studios LLC", "", "20138"], ["INFOTEC-MS", "Railcomm Inc", "", "20131"], ["ANSA-BS", "Manning & Napier Advisors Inc", "", "20124"], ["ANSA-BS", "Railcomm Inc", "", "20124"]], "DURHAM, NC": [["ANSA-BS", "Cisco", "Customer Support Engineer", "2015-01-10"], ["INFOTEC-BS", "Fidelity Investments", "Associate Software Engineer", "2012-06-13"], ["INFOTEC-BS", "Relevance Inc", "Programmre", "2011-06-13"], ["INFOTEC-BS", "IBM Corp", "", "20148"], ["INFOTEC-MS", "Fidelity Investments", "", "20135"], ["INFOTEC-BS", "Fidelity Investments", "", "20131"], ["INFOTEC-BS", "Fidelity Investments", "", "20124"]], "RALEIGH, NC": [["INFOTEC-BS", "ChannelAdvisor", "System Administrator", "2015-01-10"], ["INFOTEC-BS", "RedHat", "Software Engineer", "2015-01-10"], ["ANSA-BS", "Cisco Systems", "Network Support Engineer", "2013-08-22"], ["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2013-06-17"], ["INFOTEC-BS", "Fidelity Investments", "Associate software developer", "2012-06-13"], ["INFOTEC-BS", "NetApp", "QA SAN Engineer", "2012-06-13"], ["INFOTEC-BS", "US Army", "2nd Lieutenant", "2012-05-25"], ["ANSA-BS", "Cisco Systems", "Network Engineer", "2012-03-26"], ["NETSYS-MS", "Experis", "", "20138"]], "VICTOR, NY": [["INFOTEC-BS", "Calero Software", "Product Consultant", "2015-01-10"], ["ANSA-BS", "Integrated Systems", "Network Infrastructure Specialist", "2013-08-10"], ["INFOTEC-BS", "Storm Frog", "Scriptzilla", "2012-12-10"], ["INFOTEC-BS", "Dixon Schwabl", "Interactive Developer", "2012-12-10"], ["ANSA-BS", "ICS Telecom", "IT Analyst", "2012-12-10"], ["INFOTEC-BS", "APD Engineering", "Jr. Developer", "2012-09-10"], ["ANSA-BS", "Finger Lakes Technologies Group", "Field Network Engineer", "2012-06-13"], ["INFOTEC-BS", "Brite Computers", "IT Desktop Services and Support", "2011-12-12"], ["INFOST-MS", "Solu Technology Partners", "", "20151"], ["INFOTEC-BS", "IDI Billing Solutions", "", "20151"], ["INFOTEC-BS", "IDI Billing Solutions", "", "20151"], ["NETSYS-MS", "Telog Instruments", "", "20151"], ["INFOTEC-BS", "REDCOM Laboratories Inc", "", "20151"], ["INFOTEC-BS", "elogic Group LLC", "", "20148"], ["ANSA-BS", "IDI Billing Solutions", "", "20148"], ["NETSYS-MS", "Telog Instruments", "", "20148"], ["INFOTEC-BS", "IDI Billing Solutions", "", "20148"], ["INFOTEC-BS", "REDCOM Laboratories Inc", "", "20148"], ["ANSA-BS", "IDI Billing Solutions", "", "20145"], ["INFOTEC-BS", "REDCOM Laboratories Inc", "", "20141"], ["INFOTEC-BS", "REDCOM Laboratories Inc", "", "20138"], ["INFOTEC-BS", "Calero", "", "20135"], ["NETSYS-MS", "Constellation Brands", "", "20135"], ["INFOTEC-BS", "Calero", "", "20135"], ["INFOTEC-MS", "Constellation Brands", "", "20135"], ["INFOTEC-MS", "Windstream", "", "20135"], ["INFOTEC-MS", "Windstream", "", "20131"], ["INFOTEC-MS", "Windstream", "", "20131"], ["INFOTEC-MS", "Windstream", "", "20131"], ["INFOTEC-BS", "Calero", "", "20131"], ["INFOTEC-MS", "Windstream", "", "20124"], ["INFOTEC-MS", "Windstream", "", "20124"], ["INFOTEC-BS", "Windstream", "", "20124"], ["INFOTEC-BS", "Calero", "", "20124"], ["INFOTEC-BS", "Brite Computers", "", "20124"]], "SEATTLE, WA": [["NETSYS-MS", "Amazon Web Services", "Cloud Support Engineer", "2015-01-10"], ["INFOTEC-MS", "Amazon", "Software Development Engineer", "2013-03-15"], ["INFOTEC-BS", "Microsoft", "Program Manager", "2012-12-10"]], "NEWBURGH, NY": [["INFOTEC-BS", "Hudson Valley IT Solutions", "System Administrator", "2015-01-10"]], "SAN ANTONIO, TX": [["ANSA-BS", "USAA", "Network Engineer", "2015-01-10"], ["ANSA-BS", "USAA", "Systems Engineer", "2015-01-10"], ["ANSA-BS", "USAA", "Computer Systems Engineer", "2013-06-17"], ["INFOTEC-BS", "Cisco Systems", "CALO Lab Technician", "2012-12-10"], ["ANSA-BS", "USAA", "Computer Systems Engineer III", "2012-06-13"], ["ANSA-BS", "Rackspace Managed Hosting", "Linux Systems Administrator I", "2011-06-10"], ["ANSA-BS", "USAA (United Services Automobile Association)", "", "20138"], ["ANSA-BS", "USAA (United Services Automobile Association)", "", "20124"]], "SHAUMBURG, IL": [["INFOTEC-BS", "Self Employed", "IT Sub-contractor", "2015-01-10"]], "LEXINGTON, MA": [["NETSYS-MS", "MIT Lincoln Laboratory", "Software Engineer", "2015-01-10"]], "TINTON FALLS, NJ": [["INFOTEC-MS", "CommVault", "Web Developer", "2014-08-28"]], "SYRACUSE, NY": [["INFOTEC-BS", "Cooper & Clement", "Web Developer & Social Media Mgr", "2014-08-28"], ["INFOTEC-BS", "2ndNature Studio", "PHP Developer", "2013-06-18"], ["INFOTEC-BS", "2ndNature LLC", "Web Developer", "2012-06-29"], ["ANSA-BS", "Progressive Expert Consulting", "Consultant", "2012-04-16"], ["ANSA-BS", "Onondaga County IT Department", "Systems Administrator", "2011-06-20"], ["INFOTEC-BS", "MCV Law", "", "20151"], ["ANSA-BS", "Loretto Health Care", "", "20148"], ["ANSA-BS", "Progressive Expert Consulting", "", "20148"], ["INFOTEC-BS", "MCV Law", "", "20148"], ["ANSA-BS", "Progressive Expert Consulting", "", "20145"], ["INFOTEC-BS", "C&S Engineers", "", "20135"], ["NETSYS-MS", "Syracuse University", "", "20135"], ["NETSYS-MS", "Syracuse University", "", "20131"], ["NETSYS-MS", "Progressive Expert Consulting", "", "20131"], ["INFOTEC-BS", "2ndnature::an interactive studio", "", "20131"], ["INFOTEC-BS", "Excellus BlueCross BlueShield", "", "20124"], ["NETSYS-MS", "Syracuse University", "", "20124"], ["NETSYS-MS", "Progressive Expert Consulting", "", "20124"], ["INFOTEC-BS", "2ndnature::an interactive studio", "", "20124"]], "SAN FRANSICSO, CA": [["ANSA-BS", "Cisco-Meraki", "Technical Support Engineer", "2014-08-28"]], "MORRISVILLE, NC": [["ANSA-BS", "Cisco", "Customer Support Engineer", "2014-08-28"], ["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2013-06-17"], ["ANSA-BS", "Cisco Systems", "Network Engineer", "2012-06-13"], ["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2012-06-13"], ["NETSYS-MS", "Cisco Systems", "Associate Network Consulting Engineer", "2011-06-13"], ["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2010-12-13"], ["ANSA-BS", "Cisco Systems Inc", "", "20124"]], "KANSAS CITY, KS": [["ANSA-BS", "Cerner Corporation", "System Engineer", "2014-08-28"], ["INFOTEC-BS", "Cerner", "System Engineer", "2014-08-28"]], "RESTON, VA": [["INFOTEC-BS", "Oracle", "Assistant Database Consultant", "2014-08-28"], ["INFOTEC-BS", "Oracle", "Database Consultant", "2013-06-19"], ["ANSA-BS", "Microsoft", "Associate Consultant", "2012-06-13"], ["INFOTEC-MS", "Siteworx Inc", "", "20124"]], "ANGOLA, ": [["NETSYS-MS", "Nellcorp", "CEO", "2014-08-28"]], "AMHERST, NY": [["ANSA-BS", "M&T Bank", "Data Security Analyst", "2014-08-28"], ["INFOTEC-BS", "EarthLink", "", "20148"], ["INFOTEC-BS", "EarthLink", "", "20148"], ["ANSA-BS", "M&T Bank", "", "20138"], ["ANSA-BS", "M&T Bank", "", "20135"], ["INFOTEC-BS", "M&T Bank", "", "20124"], ["ANSA-BS", "M&T Bank", "", "20124"]], "ORLANDO, FL": [["INFOTEC-BS", "Lockheed Martin", "Associate Systems Engineer", "2014-08-28"], ["INFOTEC-BS", "Walt Disney World", "", "20141"], ["INFOTEC-BS", "Lockheed Martin", "", "20138"]], "MOUNTAIN VIEW, CA": [["INFOTEC-BS", "Google", "Techstop Connect Technician", "2014-08-28"], ["ANSA-BS", "LinkedIn", "Systems Administrator", "2013-06-10"], ["ANSA-BS", "Google Inc", "Internal Technology Resident", "2012-03-26"], ["ANSA-BS", "Google Inc", "ITRP", "2011-09-12"], ["ANSA-BS", "Google Inc", "Internal Technology Residency Program", "2011-06-10"], ["ANSA-BS", "Google Inc", "Internal Technology Resident", "2010-12-13"], ["INFOTEC-BS", "Intuit", "", "20141"], ["INFOTEC-BS", "Intuit", "", "20138"], ["INFOTEC-MS", "Intuit", "", "20135"], ["INFOTEC-BS", "SmugMug", "", "20124"]], "NEWARK, NY": [["INFOTEC-BS", "Wayne-Finger Lakes BOCES", "Analyst", "2014-08-28"], ["ANSA-BS", "IEC Electronics", "", "20145"], ["INFOTEC-BS", "Wayne-Finger Lakes BOCES", "", "20141"], ["INFOTEC-BS", "Wayne-Finger Lakes BOCES", "", "20138"], ["INFOTEC-BS", "Wayne-Finger Lakes BOCES", "", "20138"], ["INFOTEC-BS", "Wayne-Finger Lakes BOCES", "", "20138"], ["INFOTEC-BS", "Wayne-Finger Lakes BOCES", "", "20138"]], "ATLANTA, GA": [["INFOTEC-MS", "AT&T Mobility", "Professional Technical Architect", "2014-08-28"], ["NETSYS-MS", "Dell SecureWorks", "Network Security Advisor", "2011-06-13"], ["INFOTEC-BS", "AT", "", "20148"], ["INFOTEC-BS", "Lindy Interactive", "", "20148"]], "POUGHKEEPSIE, NY": [["INFOTEC-BS", "Marist College", "ERP Applications Developer", "2013-08-23"], ["INFOTEC-BS", "IBM Corp", "", "20124"]], "MALVERN, PA": [["INFOTEC-BS", "Vanguard", "Technology Leadership Program", "2013-08-23"], ["INFOTEC-BS", "Vanguard", "Software Developer", "2012-06-13"], ["INFOTEC-BS", "Vanguard", "Java Developer", "2012-04-13"], ["INFOTEC-BS", "Vanguard", "developer", "2011-03-21"], ["INFOTEC-BS", "Johnson & Johnson-Janssen", "", "20148"], ["INFOTEC-BS", "Johnson & Johnson-Janssen", "", "20145"], ["INFOTEC-BS", "Vanguard", "", "20135"], ["INFOTEC-BS", "Vanguard", "", "20131"], ["INFOTEC-BS", "Vanguard", "", "20124"]], "DOVER, NH": [["INFOTEC-BS", "Liberty Mutual", "Associate Systems Analyst", "2013-08-23"], ["ANSA-BS", "Liberty Mutual", "IT Analyst", "2012-06-13"], ["INFOTEC-BS", "Liberty Mutual", "", "20148"], ["ANSA-BS", "Liberty Mutual", "", "20138"], ["INFOTEC-BS", "Liberty Mutual", "", "20124"]], "QUEENSBURY, NY": [["ANSA-BS", "SCI", "Systems Administrator", "2013-08-22"]], "WEST HENRIETTA, NY": [["NETSYS-MS", "Touchstream Solutions LLC", "Software Engineer", "2013-08-21"], ["ANSA-BS", "SMP", "", "20151"], ["INFOTEC-BS", "The Infini", "", "20151"], ["INFOTEC-BS", "Alstom Transport", "", "20148"], ["ANSA-BS", "SMP", "", "20148"], ["ANSA-BS", "SMP", "", "20148"], ["ANSA-BS", "SMP", "", "20148"], ["INFOTEC-BS", "The Infini", "", "20148"], ["INFOTEC-BS", "The Infini", "", "20148"], ["INFOTEC-BS", "Alstom Transport", "", "20145"], ["INFOTEC-BS", "The Infini", "", "20145"], ["INFOTEC-BS", "The Infini", "", "20145"]], "SPOKANE, WA": [["INFOTEC-MS", "Sterling Savings Bank", "ETL Developer", "2013-08-21"]], "MADISON, WI": [["ANSA-BS", "Epic Systems Corporation", "Systems Administrator", "2013-08-10"], ["INFOTEC-BS", "Epic Systems Corporation", "Technical Services", "2012-12-10"]], "WASHINGTON, DC": [["INFOTEC-BS", "Federal Reserve Board", "System Administrator", "2013-08-10"], ["INFOTEC-BS", "Defense Intelligence Agency", "IT Developer", "2013-06-10"], ["NETSYS-MS", "EMC Corp", "Cloud Service Reliability Engineer", "2012-12-12"], ["ANSA-BS", "APX Labs", "Associate Systems Engineer", "2012-12-10"], ["INFOTEC-BS", "U.S. Department of Homeland Security", "Enterprise Application Administrator", "2012-09-10"], ["INFOTEC-BS", "Federal Reserve Board", "Computer Application Developer", "2011-06-13"], ["ANSA-BS", "US Army Research Laboratory", "Network Engineer", "2011-06-10"], ["INFOTEC-BS", "iD Tech Camps (Internal Drive)", "", "20148"], ["INFOTEC-BS", "Federal Reserve Board", "", "20138"], ["ANSA-BS", "Intelsat", "", "20124"]], "MT. VIEW, CA": [["ANSA-BS", "Google Inc", "IT Resident in the IT Residency Program", "2013-08-10"]], "ALMATY, KAZAKHSTAN, ": [["INFOTEC-MS", "ZTE Kazakhstan", "Network Nngineer", "2013-07-31"], ["INFOTEC-MS", "Capital Pension Fund", "Senior IT", "2012-12-12"]], "COLUMBUS, OH": [["ANSA-BS", "JPMorgan Chase & Co.", "Infrastructure Engineer", "2013-07-09"], ["INFOTEC-BS", "CoverMyMeds", "", "20148"], ["INFOTEC-BS", "CoverMyMeds", "", "20145"]], "INDIANAPOLIS, IN": [["ANSA-BS", "Interactive Intelligence", "Functionality Testing Engineer", "2013-06-20"], ["INFOTEC-BS", "Interactive Intelligence", "Software Automation Test Engineer", "2013-06-11"], ["ANSA-BS", "Interactive Intelligence", "Functionality Test Engineer", "2013-04-01"], ["NETSYS-MS", "VA MEDICAL CENTER", "WAN ADMINISTRATOR", "2011-03-21"], ["ANSA-BS", "Interactive Intelligence Inc", "", "20148"], ["INFOTEC-BS", "Interactive Intelligence Inc", "", "20141"], ["INFOTEC-BS", "Interactive Intelligence Inc", "", "20138"], ["ANSA-BS", "Interactive Intelligence Inc", "", "20131"], ["ANSA-BS", "Interactive Intelligence Inc", "", "20131"], ["ANSA-BS", "Interactive Intelligence Inc", "", "20124"], ["ANSA-BS", "Interactive Intelligence Inc", "", "20124"]], "AMITYVILLE, NY": [["INFOTEC-BS", "MaxBurst", "Web Developer", "2013-06-19"]], "FRAMINGHAM, MA": [["INFOTEC-BS", "Bose Corporation", "PTS Wireless Specialist", "2013-06-19"], ["INFOTEC-BS", "Bose Corporation", "", "20151"], ["INFOTEC-BS", "Bose Corporation", "", "20148"], ["INFOTEC-BS", "Framingham Public Schools", "", "20148"]], "BROCKPORT, NY": [["INFOTEC-BS", "SUNY Brockport", "Specialized Computing Technician", "2013-06-18"]], "BANGKOK, ": [["INFOTEC-MS", "Bangkok University", "Instructor", "2013-06-17"]], "MELBOURNE, FL": [["ANSA-BS", "Harris Corporation", "Network Planning Engineer", "2013-06-17"], ["INFOTEC-MS", "Harris Corporation", "Engineer", "2012-06-12"], ["ANSA-BS", "Harris Corporation", "Network Planning Engineer", "2010-12-13"], ["NETSYS-BS", "Harris Corporation", "", "20148"], ["ANSA-BS", "Harris Corporation", "", "20138"]], "AUSTIN, NY": [["ANSA-BS", "Indeed Inc.", "Database Engineer", "2013-06-17"]], "BALA CYNWYD, PA": [["ANSA-BS", "Susquehanna International Group", "Network Associate", "2013-06-17"], ["ANSA-BS", "Susquehanna International Group", "Network Associate", "2013-06-17"], ["INFOST-MS", "Oracle", "", "20151"], ["INFOST-MS", "Oracle", "", "20148"], ["INFOTEC-BS", "Oracle", "", "20124"]], "ALEXANDRIA, VA": [["NETSYS-MS", "Symantec Corporation", "Firewall Engineer", "2013-06-17"], ["INFOTEC-BS", "Global Printing  (Global Thinking)", "", "20148"], ["INFOTEC-BS", "Global Printing  (Global Thinking)", "", "20145"], ["INFOTEC-BS", "Global Printing  (Global Thinking)", "", "20141"]], "ARLINGTON, VA": [["ANSA-BS", "Symplicity", "System Administrator", "2013-06-17"], ["INFOTEC-BS", "NGP Van", "System Administrator", "2011-06-13"], ["NETSYS-MS", "Symplicity Corporation", "", "20141"], ["NETSYS-MS", "Symplicity Corporation", "", "20138"], ["INFOTEC-BS", "Federal Deposit Insurance Corporation", "", "20124"]], "MCLEAN, VA": [["INFOTEC-BS", "Data Tactics Corporation", "Systems Engineer", "2013-06-11"], ["INFOTEC-BS", "Booz Allen Hamilton", "Consultant", "2012-04-13"], ["ANSA-BS", "Palantir", "", "20148"], ["ANSA-BS", "Palantir", "", "20145"], ["ANSA-BS", "Cheiron Inc", "", "20138"], ["ANSA-BS", "Mitre Corp", "", "20124"]], "HARTFORD, CT": [["INFOTEC-BS", "United Technologies Corp.", "IT Leadership Program Associate", "2013-06-11"], ["ANSA-BS", "", "Information Security Engineer", "2011-06-10"], ["INFOTEC-BS", "The Hartford Financial Services Group, Inc.", "", "20124"]], "LINCOLN, NE": [["ANSA-BS", "Hudl", "Student Systems Administrator", "2013-06-10"]], "MORRISVILE, NC": [["ANSA-BS", "Cisco Systems", "ENGINEER.II.CUSTOMER SUPPORT.CUSTOMER ADVOCACY", "2013-06-10"]], "NEWARK, DE": [["ANSA-BS", "SevOne", "product support engineer", "2013-06-10"]], "BELLEVILLE, IL": [["ANSA-BS", "US Air Force", "Officer", "2013-05-17"], ["INFOTEC-BS", "US Air Force - Scott AFB", "IT Specialist", "2010-12-13"]], "CONCORD, OH": [["INFOTEC-BS", "Lake Health", "IT Developer", "2013-03-18"]], "OAK LAWN, IL": [["INFOTEC-BS", "Stats LLC", "Software Developer", "2013-03-18"]], "RALEIGH-DURHAM, NC": [["ANSA-BS", "Fidelity Investments", "Associate Software Engineer", "2013-03-18"], ["ANSA-BS", "Cisco Systems", "CALO Networking Support", "2011-03-21"], ["INFOTEC-BS", "Cisco Systems", "Customer Service Engineer", "2010-12-13"]], "CAMBRIDGE, MA": [["INFOTEC-MS", "Connected Sports Ventures", "Software Developer", "2013-03-15"], ["INFOTEC-BS", "Spaulding Rehabilitation Hospital", "Information Services Technician", "2012-12-10"]], "VOORHEES, NJ": [["INFOTEC-MS", "Two95 International INC", "Developer", "2013-03-15"]], "DALLAS\/FT WORTH, TX": [["INFOTEC-MS", "Fidelity Investments", "Software Developer", "2013-03-15"]], "RICHLAND, WA": [["ANSA-BS", "Lockheed Martin", "Network Admin I", "2013-01-15"]], "SUCCESS, NY": [["ANSA-BS", "Garden City Group", "Data Control Administrator", "2012-12-19"]], "MAJMMAH, SAUDI ARABIA, ": [["NETSYS-MS", "Majmmah University", "Vice Dean of IT for E-services", "2012-12-12"]], "HYATTSVILLE, MD": [["INFOTEC-BS", "Self-Employed", "Computer Technician", "2012-12-10"]], "RANDOLPH, MA": [["INFOTEC-BS", "The May Institute", "Educational Technologist", "2012-12-10"]], "VERNON, CA": [["INFOTEC-BS", "Tadashi Shoji", "Software Engineer", "2012-12-10"]], "REDMOND, WA": [["INFOTEC-BS", "Microsoft", "Program Manager", "2012-12-10"], ["ANSA-BS", "Microsoft", "Service Engineer", "2012-09-07"], ["NETSYS-MS", "Microsoft Corporation", "", "20141"], ["NETSYS-MS", "Microsoft Corporation", "", "20135"], ["NETSYS-MS", "Microsoft Corporation", "", "20124"]], "WILLIAMSON, NY": [["ANSA-BS", "Rolls-Royce", "PC and User Support Specialist", "2012-12-10"]], "RTP, NC": [["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2012-12-10"]], "ITHACA, NY": [["INFOTEC-BS", "Cornell University", "Applications Programmer II", "2012-09-10"]], "GREENSBORO, NC": [["INFOTEC-MS", "Pace Communications", "Front End Developer", "2012-09-10"]], "ALBANY, NY": [["INFOTEC-MS", "Rational Retenation", "Software Developer", "2012-09-10"], ["INFOTEC-BS", "CSEA Employee Benefit Fund", "Systems Engineer", "2011-12-12"], ["INFOTEC-MS", "AutoTask", "SOFTWARE DESIGN ANALYST", "2010-12-13"], ["INFOTEC-BS", "Surpass Chemical. Co.", "", "20135"], ["INFOTEC-BS", "Surpass Chemical. Co.", "", "20124"]], "CHARLOTTE, NC": [["NETSYS-MS", "Wells Fargo", "Corporate Systems Integrator", "2012-09-10"], ["INFOTEC-BS", "Ernst & Young", "Technology Advisory Program", "2011-12-12"], ["INFOTEC-BS", "Microsoft Corporation", "Business Analyst", "2011-06-13"], ["INFOTEC-BS", "McGladrey", "Computer Security Auditor Associate", "2011-06-13"]], "UTICA, NY": [["INFOTEC-BS", "Special Metals", "Programmer", "2012-09-10"]], "SAN JOSE, CA": [["NETSYS-MS", "Cisco Systems Inc.", "Software Engineer Grade 3", "2012-09-07"], ["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2012-06-13"], ["ANSA-BS", "Cisco Systems Inc.", "Customer Support Engineer", "2012-06-13"], ["INFOTEC-MS", "100% Pure Cosmetics", "Web Application Developer", "2011-09-12"], ["ANSA-BS", "Cisco Systems Inc", "", "20151"], ["ANSA-BS", "Cisco Systems Inc", "", "20148"], ["ANSA-BS", "Cisco Systems Inc", "", "20141"], ["ANSA-BS", "Cisco Systems Inc", "", "20141"], ["INFOTEC-BS", "Calix", "", "20138"], ["ANSA-BS", "Cisco Systems Inc", "", "20135"], ["ANSA-BS", "Cisco Systems Inc", "", "20131"], ["INFOTEC-MS", "Samsung Information Systems America (SISA)", "", "20131"], ["ANSA-BS", "Cisco Systems Inc", "", "20124"], ["INFOTEC-MS", "Samsung Information Systems America (SISA)", "", "20124"]], "BOXBOROUGH, MA": [["ANSA-BS", "Cisco Systems", "Customer Support Engineer", "2012-06-13"], ["ANSA-BS", "Cisco Systems", "III Engineer, Customer Advocacy", "2011-03-21"], ["ANSA-BS", "Cisco Systems Inc", "", "20124"]], "SAN DIEGO, CA": [["ANSA-BS", "Meraki", "Technical Support", "2012-06-13"], ["INFOTEC-BS", "Petco", "", "20151"], ["INFOST-MS", "Intuit", "", "20148"], ["INFOTEC-BS", "Intuit", "", "20148"], ["INFOTEC-BS", "Intuit", "", "20148"], ["INFOTEC-BS", "Petco", "", "20148"], ["INFOTEC-BS", "Intuit", "", "20145"], ["INFOST-MS", "Intuit", "", "20145"], ["INFOST-MS", "Intuit", "", "20141"], ["INFOTEC-MS", "Intuit", "", "20135"], ["INFOTEC-MS", "Intuit", "", "20131"], ["INFOTEC-MS", "Intuit", "", "20124"]], "PALMYRA, NJ": [["ANSA-BS", "AAFES", "Computer Operator", "2012-06-13"]], "NORTH RIDGEVILLE, OH": [["ANSA-BS", "Bailey Communications", "Network Technician", "2012-06-13"], ["ANSA-BS", "Boutique IT Solutions", "", "20135"], ["ANSA-BS", "Boutique IT Solutions", "", "20135"]], "MANHATTAN, NY": [["ANSA-BS", "JPMorgan Chase & Co.", "Technology Analyst", "2012-06-13"]], "WESTLAKE, TX": [["ANSA-BS", "Fidelity Investments", "Associate Systems Engineer", "2012-06-13"]], "BELMONT, MA": [["ANSA-BS", "Hitachi Data Systems", "Software Engineer", "2012-06-13"]], "RESTON, NY": [["INFOTEC-BS", "Oracle", "Associate Consultant", "2012-06-13"]], "NYC, NY": [["INFOTEC-BS", "JPMorgan Chase & Co.", "Business Analyst", "2012-06-13"]], "E ROCHESTER, NY": [["INFOTEC-BS", "ABC Electronics", "developer", "2012-06-13"]], "CANADAIGUA, NY": [["INFOTEC-BS", "Leonard's Expree", "IT", "2012-06-13"]], "CARY, NC": [["INFOTEC-BS", "Promantus", "Software Engineer", "2012-06-13"]], "SMITHFIELD, RI": [["INFOTEC-BS", "Fidelity Investments", "Software Engineer", "2012-06-13"]], "NORTH TONAWANDA, NY": [["ANSA-BS", "Finger Lakes Technologies Group", "Field Network Engineer", "2012-06-13"]], "BROOKLYN, NY": [["INFOTEC-BS", "Achievement First", "Assistant Director", "2012-06-13"], ["INFOTEC-BS", "Cypress Hills Local Development Corporation", "", "20141"], ["INFOTEC-BS", "Wireless Generation", "", "20124"]], "CONSHOHOCKEN, PA": [["INFOTEC-MS", "Empathy Lab", "Information Architect", "2012-06-12"]], "KANSAS CITY, MI": [["INFOTEC-MS", "Cerner Corporation", "Engineer", "2012-06-12"]], "PENSACOLA, FL": [["INFOTEC-BS", "Justin W. Boldenow", "Combat Systems Officer", "2012-05-25"]], "BEDFORD, MA": [["INFOTEC-BS", "The MITRE Corporation", "Network Engineer", "2012-04-13"], ["NETSYS-MS", "EMC, RSA Security Inc", "", "20138"]], "BRONX, NY": [["INFOTEC-BS", "Patch.com", "QA Analyst", "2012-03-26"]], "SPRING VALLEY, CA": [["NETSYS-MS", "UnitedHealth Group (Optuminsight)", "Perl Developer", "2012-03-26"]], "CLEVELAND\/AKRON, OH": [["NETSYS-MS", "Progressive Insurance", "IT Operations Analyst Assoc.", "2012-03-26"]], "ASTANA, KAZAKHSTAN, ": [["INFOTEC-MS", "Alit", "Web Developer", "2012-03-26"], ["INFOTEC-MS", "JSC Bailanys-NAK", "Chief of Astana service-center", "2011-12-12"]], "NEWTON SQUARE, PA": [["INFOTEC-MS", "SAP", "Solution Developer", "2012-03-26"]], "MYSTIC, CT": [["INFOTEC-BS", "Emprise Corporation", "Web Developer", "2012-03-26"]], "RICHARDSON, TX": [["ANSA-BS", "Cisco Systems", "CALO Lab Advocate", "2012-03-26"], ["ANSA-BS", "Cisco Systems Inc", "", "20124"]], "NORWALK, CT, CT": [["ANSA-BS", "Datto, Inc", "Network and System Administrator", "2011-12-12"]], "FORT MEADE, MD": [["ANSA-BS", "Department of Defense", "Telecommunications Engineer", "2011-12-12"]], "BALTIMORE, MD": [["ANSA-BS", "Northrop Grumman Corporation", "Computer Systems Architect", "2011-12-12"]], "HOPKINTON, MA": [["ANSA-BS", "EMC Corp", "Network Engineer", "2011-12-12"], ["INFOTEC-BS", "EMC Corp", "Lab Engineer", "2011-03-21"], ["ANSA-BS", "EMC Corporation", "", "20148"], ["ANSA-BS", "EMC Corporation", "", "20148"]], "KING OF PRUSSIA, PA": [["NETSYS-MS", "Quadgen Wireless", "developer", "2011-12-12"], ["ANSA-BS", "Watson Communications", "", "20138"]], "PITTSBURGH, PA": [["INFOTEC-BS", "Pittsburgh Glassworks", "Web Developer", "2011-12-12"], ["INFOTEC-BS", "Mitre Corporation", "Information Security Engineer", "2011-06-13"], ["INFOTEC-BS", "Alcoa Inc", "", "20141"], ["INFOTEC-BS", "Alcoa Inc", "", "20138"]], "TAMP, FL": [["INFOTEC-MS", "Kforce Inc.", "SharePoint Developer", "2011-12-12"]], "FORT LAUDERDALE, FL": [["INFOTEC-MS", "Podio", "Developer", "2011-12-12"]], "TAMPA, FL": [["INFOTEC-MS", "Kforce Inc.", "Programmer", "2011-12-12"]], "DENVER, CO": [["INFOTEC-BS", "Aquent", "Web Developer", "2011-09-12"]], "COLUMBIA, MD": [["INFOTEC-BS", "Next Century Corporation", "System Administrator", "2011-09-12"]], "CHICAGO, IL": [["INFOTEC-MS", "Yaskawa America Inc", "Java Developer", "2011-09-12"], ["INFOTEC-BS", "University of Chicago", "", "20148"]], "ERIR, PA": [["INFOTEC-MS", "County of Erie PA", "developer", "2011-09-12"]], "JERSY CITY, NJ": [["INFOTEC-MS", "Goldman Sachs", "Technology Analyst", "2011-06-13"]], "TORONTO, CANADA, ": [["INFOTEC-BS", "AgileBits", "Positive Experience Architect", "2011-06-13"]], "CAPITOL HEIGHTS, MD": [["INFOTEC-BS", "Federal Reserve Board", "Communications Analyst", "2011-06-13"]], "MIDDLETON, WI": [["INFOTEC-BS", "Raven Software", "Level Design\/Builder", "2011-06-13"]], "LATHAM, NY": [["INFOTEC-BS", "Medical Liability Insurance Company", "Database Administrator 1", "2011-06-13"]], "CLEVELAND, OH": [["INFOTEC-BS", "NASA - Glenn Research Center", "Web App Developer", "2011-06-13"], ["ANSA-BS", "Sherwin-Williams", "", "20151"], ["INFOTEC-MS", "IBM Corp", "", "20151"], ["ANSA-BS", "Sherwin-Williams", "", "20148"], ["INFOTEC-BS", "American Greetings", "", "20138"], ["ANSA-BS", "Cleveland Clinic", "", "20124"]], "WILLIAMSPORT, PA": [["INFOTEC-BS", "AdTrak360", "UI Programmer", "2011-06-13"]], "NEWARK, NJ": [["INFOTEC-BS", "Prudential Financial", "developer", "2011-06-13"], ["INFOTEC-BS", "Prudential Financial", "Temporary Employment", "2011-06-13"]], "WINDSOR, CT": [["INFOTEC-BS", "Schaefer Systems International", "Software Support Engineer", "2011-06-13"]], "SHREWSBURY, NJ": [["INFOTEC-BS", "Z Two Technolgies", "ColdFusion programmer", "2011-06-13"]], "FRANKLIN LAKES, NJ": [["INFOTEC-BS", "Becton Dickinson (BD)", "ITLP Associate", "2011-06-13"]], "AVON, CT": [["INFOTEC-BS", "Avon Old Farms School", "Assistant to the Director of Information Tech", "2011-06-13"]], "EAST ROCHESTER, NY": [["ANSA-BS", "RSVP Business Systems Inc", "System Administrator", "2011-06-10"]], "HUBBARDSVILLE, NY": [["ANSA-BS", "McDonald's Corporation", "Swing Manager", "2011-06-10"]], "STAMFORD, CT": [["ANSA-BS", "Pitney Bowes, Inc.", "developer", "2011-06-10"], ["INFOTEC-BS", "Indeed.com", "", "20151"], ["INFOTEC-BS", "Indeed.com", "", "20148"]], "MIDLAND, MI": [["INFOTEC-BS", "The Dow Chemical Company", "Information System Specialist", "2011-06-10"]], "WESTPORT, CT": [["INFOTEC-BS", "Kyo Logic LLC", "Developer", "2011-03-21"]], "BRIARCLIFF MANOR, NY": [["INFOTEC-BS", "Digitech Computers", "Software Developer", "2011-03-21"]], "PUERTO RICO, ": [["INFOTEC-BS", "Pan American Grain", "Web Master", "2011-03-21"]], "PHOENIX, AZ": [["ANSA-BS", "Intel Corp", "developer", "2011-03-21"], ["INFOTEC-BS", "Apollo Education Group", "", "20138"]], "ELMIRA, NY": [["INFOTEC-BS", "Larson Design Group", "Web Designer", "2011-03-21"], ["INFOTEC-BS", "GST BOCES", "", "20148"]], "COLUMBIA, SC": [["ANSA-BS", "Glo", "developer", "2011-03-21"]], "ALBUQUERQUE, NM": [["INFOTEC-BS", "HSCB Bank", "IT Specialist", "2011-01-07"]], "EAST AURORA, NY": [["INFOTEC-BS", "MOOG Inc.", "Junior Programmer\/Analyst", "2011-01-03"], ["INFOTEC-BS", "MOOG Inc", "", "20148"], ["INFOTEC-BS", "MOOG Inc", "", "20145"], ["INFOTEC-BS", "MOOG Inc", "", "20141"]], "STATE COLLEGE PARK, PA": [["INFOTEC-BS", "Schoolwires", "Interactive Designer", "2010-12-17"]], "CHELMSFORD, MA": [["ANSA-BS", "Goodrich", "Software Engineer I", "2010-12-15"]], "GLENN MILLS, PA": [["ANSA-BS", "Deloitte", "Operations Engineer", "2010-12-13"]], "ROCHETER, NY": [["ANSA-BS", "Pro-Mold Inc", "Systems Administrator", "2010-12-13"]], "TOKYO, JAPAN, ": [["INFOTEC-BS", "Intelligent Wave", "developer", "2010-12-13"]], "TACOMA, WA": [["INFOTEC-BS", "Trinity Glass", "developer", "2010-12-13"]], "RALEIGH - DURHAM, NC": [["INFOTEC-BS", "IBM", "Software Engineer", "2010-12-13"]], "KEUKA PARK, NY": [["INFOTEC-BS", "Keuka College", "IT Support Technician", "2010-12-13"]], "OWEGO, NY": [["NETSYS-MS", "Lockheed Martin", "developer", "2010-12-13"]], "BLUE BELL, PA": [["NETSYS-MS", "Unisys", "", "20151"], ["NETSYS-MS", "Unisys", "", "20148"], ["NETSYS-MS", "Unisys", "", "20145"]], "NAPLES, FL": [["INFOST-MS", "RecordsOne", "", "20151"], ["INFOTEC-MS", "RecordsOne", "", "20145"], ["INFOTEC-MS", "RecordsOne", "", "20141"], ["INFOTEC-MS", "RecordsOne", "", "20138"]], "DEUTSCHLAND, GERMANY, ": [["INFOST-MS", "Xerox Corporation", "", "20151"], ["INFOST-MS", "Xerox Corporation", "", "20148"]], "DANBURY, CT": [["INFOTEC-BS", "Cierant", "", "20151"], ["INFOTEC-BS", "Cierant", "", "20148"]], "OSWEGO, NY": [["INFOTEC-BS", "Exelon Corp*", "", "20151"], ["INFOTEC-BS", "Exelon Corp*", "", "20141"]], "JOHNSTON, RI": [["INFOTEC-BS", "FM Global", "", "20151"], ["INFOTEC-BS", "FM Global", "", "20151"], ["INFOTEC-BS", "FM Global", "", "20148"], ["INFOTEC-BS", "FM Global", "", "20148"], ["INFOTEC-BS", "FM Global", "", "20145"]], "LEHI, UT": [["INFOST-MS", "Oracle", "", "20151"], ["INFOST-MS", "Oracle", "", "20148"]], "BURLINGTON, MA": [["INFOST-MS", "iRobot", "", "20151"], ["INFOST-MS", "iRobot", "", "20148"], ["ANSA-BS", "Acquia Inc", "", "20124"]], "SAN MATEO, CA": [["INFOST-MS", "HealthCrowd", "", "20151"]], "MERRIMACK, NH": [["ANSA-BS", "Fidelity Investments", "", "20151"], ["INFOTEC-BS", "Fidelity Investments", "", "20148"], ["ANSA-BS", "Fidelity Investments", "", "20148"], ["ANSA-BS", "Fidelity Investments", "", "20131"], ["ANSA-BS", "Fidelity Investments", "", "20124"], ["ANSA-BS", "Fidelity Investments", "", "20124"]], "PITTSFIELD, MA": [["ANSA-BS", "General Dynamics Mission Systems", "", "20151"], ["ANSA-BS", "General Dynamics Mission Systems", "", "20148"]], "QUINCY, MA": [["INFOST-MS", "Ahold Inc", "", "20151"], ["INFOST-MS", "Ahold Inc", "", "20148"], ["INFOST-MS", "Ahold Inc", "", "20148"]], "CARLISLE, PA": [["INFOST-MS", "Ahold USA", "", "20151"]], "MCKINNEY, NY": [["INFOST-MS", "Aim LLC", "", "20151"], ["INFOST-MS", "Aim LLC", "", "20148"]], "SCOTTSVILLE, NY": [["INFOST-MS", "Ethany Corporation", "", "20151"]], "DUBLIN, CA": [["NETSYS-MS", "Sapphire Software Solutions", "", "20151"]], "JERSEY, NJ": [["NETSYS-MS", "Spica Computers", "", "20151"], ["NETSYS-MS", "Spica Computers", "", "20148"]], "CANTON, MI": [["INFOTEC-BS", "The Whitestone Foundation", "", "20151"], ["INFOTEC-BS", "The Whitestone Foundation", "", "20148"]], "WATERTOWN, MA": [["INFOTEC-BS", "J.C. Cannistraro LLC", "", "20151"], ["ANSA-BS", "athenahealth, Inc.", "", "20148"], ["ANSA-BS", "athenahealth, Inc.", "", "20148"], ["INFOTEC-BS", "J.C. Cannistraro LLC", "", "20148"], ["ANSA-BS", "athenahealth, Inc.", "", "20141"], ["ANSA-BS", "athenahealth Inc.", "", "20138"]], "WOONSOCKET, RI": [["INFOTEC-BS", "Orkiv Retail Solutions", "", "20151"]], "ROCKLIN, CA": [["INFOTEC-BS", "Purple Communications Inc", "", "20151"], ["INFOTEC-BS", "Purple Communications Inc", "", "20148"], ["INFOTEC-BS", "Purple Communications Inc", "", "20145"]], "JASPER, IN": [["INFOTEC-BS", "Schnitzelbank", "", "20151"], ["INFOTEC-BS", "Schnitzelbank", "", "20148"]], "MONTOURSVILLE, PA": [["INFOTEC-BS", "Auto Trakk", "", "20148"]], "BEIGING, CHINA, ": [["INFOTEC-BS", "Beijing Qilin Hemao Keji Ltd.", "", "20148"], ["INFOTEC-BS", "Beijing Qilin Hemao Keji Ltd.", "", "20145"]], "BETHESDA, MD": [["INFOTEC-BS", "Bethesda North Marriott Hotel & Conference Center", "", "20148"], ["INFOTEC-MS", "Euclid Technology", "", "20138"]], "SPENCERPORT, NY": [["INFOTEC-BS", "BOCES Monroe #2", "", "20148"], ["INFOTEC-BS", "BOCES Monroe #2", "", "20141"], ["ANSA-BS", "BOCES Monroe #2", "", "20141"], ["NETSYS-BS", "BOCES Monroe #2", "", "20138"], ["INFOTEC-BS", "BOCES Monroe #2", "", "20135"], ["INFOTEC-BS", "BOCES Monroe #2", "", "20135"], ["INFOTEC-BS", "BOCES Monroe #2", "", "20135"], ["ANSA-BS", "BOCES Monroe #2", "", "20135"], ["ANSA-BS", "BOCES Monroe #2", "", "20124"], ["ANSA-BS", "BOCES Monroe #2", "", "20124"], ["ANSA-BS", "BOCES Monroe #2", "", "20124"]], "PARSIPPANY, NY": [["INFOTEC-BS", "ADP", "", "20148"]], "LUSBY, MD": [["INFOTEC-BS", "Exelon Corp", "", "20148"]], "BILLERICA, MA": [["INFOTEC-BS", "General Electric - Oil & Gas", "", "20148"]], "MELVILLE, NY": [["INFOTEC-BS", "Estee Lauder", "", "20148"], ["INFOTEC-BS", "Allscripts Healthcare", "", "20124"]], "SALEM, NH": [["INFOTEC-BS", "Emagination Computer Camps", "", "20148"]], "HENRIETTA, NY": [["ANSA-BS", "P3 Systems Inc", "", "20148"]], "COS COB, CT": [["ANSA-BS", "Cedar Gate Technologies", "", "20148"]], "MEMPHIS, TN": [["INFOST-MS", "FedEx", "", "20148"]], "MAHWAH, NJ": [["ANSA-BS", "UPS Information Services", "", "20148"], ["INFOTEC-MS", "UPS Information Services", "", "20131"], ["INFOTEC-MS", "UPS Information Services", "", "20124"]], "MINNEAPOLIS, MN": [["ANSA-BS", "Target Corp", "", "20148"], ["INFOTEC-BS", "Target Corp", "", "20148"], ["ANSA-BS", "Target Corp", "", "20138"]], "NAPERVILLE, IL": [["INFOTEC-MS", "Egen Solutions Inc", "", "20148"], ["INFOTEC-MS", "Egen Solutions Inc", "", "20145"], ["INFOTEC-MS", "Egen Solutions Inc", "", "20141"]], "ALLENTOWN, PA": [["NETSYS-BS", "Air Products and Chemicals Inc.", "", "20148"]], "WESTON, MA": [["NETSYS-BS", "Biogen Idec Inc", "", "20148"]], "BASKING RIDGE, NJ": [["INFOTEC-BS", "Verizon Wireless", "", "20148"]], "NEW HARTFORD, NY": [["INFOTEC-BS", "Utica National Insurance Group", "", "20148"]], "CHATSWORTH, CA": [["INFOTEC-BS", "United States of America Deaf Swimming", "", "20148"]], "CANONSBURG, PA": [["NETSYS-MS", "NRG Energy", "", "20148"]], "SHANGHAI, CHINA, ": [["NETSYS-BS", "Learning 7 (Shanghai) Education Technology Co., Ltd.", "", "20148"]], "SILVER SPRINGS, NY": [["NETSYS-BS", "Morton Salt", "", "20148"]], "INDIAN HEAD, MD": [["INFOTEC-BS", "Naval Surface Warfare Center", "", "20148"]], "LIMA, NY": [["INFOTEC-BS", "Manufacturer Rep Network, LLC", "", "20148"]], "MACEDON, NY": [["INFOTEC-BS", "Magnatag (WA Krapf)", "", "20148"], ["INFOTEC-BS", "Kane IT Solutions", "", "20145"], ["INFOTEC-BS", "Kane IT Solutions", "", "20141"], ["INFOTEC-BS", "W A Krapf Inc", "", "20138"], ["INFOTEC-BS", "W A Krapf Inc", "", "20124"]], "HERSHEY, PA": [["INFOTEC-BS", "The Hershey Company", "", "20148"], ["ANSA-BS", "The Hershey Company", "", "20124"], ["ANSA-BS", "The Hershey Company", "", "20124"]], "NORTH BROOKFIELD, MA": [["INFOTEC-BS", "Quabaug Corporation", "", "20148"], ["INFOTEC-BS", "Quabaug Corporation", "", "20124"]], "AUBURN, NY": [["ANSA-BS", "Nucor Steel Auburn", "", "20145"]], "WAKEFIELD, MA": [["ANSA-BS", "REI Building Services", "", "20145"], ["ANSA-BS", "REI Building Services", "", "20124"]], "WHITE PLAINS, NY": [["INFOTEC-MS", "ARGUS INFORMATION & ADVISORY SERVICES", "", "20145"]], "MARLBOROUGH, MA": [["INFOTEC-MS", "Boston Scientific", "", "20145"]], "EDISON, NJ": [["INFOTEC-MS", "Siri Info Solutions Inc.", "", "20145"]], "LOUISVILLE, CO": [["NETSYS-MS", "CableLabs", "", "20145"]], "ARDMORE, PA": [["NETSYS-MS", "CoVal Systems", "", "20145"], ["NETSYS-MS", "CoVal Systems", "", "20141"], ["NETSYS-MS", "CoVal Systems", "", "20138"]], "LONG BEACH, CA": [["INFOTEC-BS", "Twelve Strike", "", "20145"]], "WESTBOROUGH, MA": [["ANSA-BS", "EMC Corporation", "", "20141"], ["INFOTEC-MS", "eClinical Works", "", "20138"]], "GROTON, CT": [["NETSYS-BS", "PCC Structurals", "", "20141"], ["NETSYS-BS", "PCC Structurals", "", "20138"], ["INFOTEC-BS", "PCC Structurals", "", "20135"], ["INFOTEC-BS", "PCC Structurals", "", "20131"], ["INFOTEC-BS", "PCC Structurals", "", "20124"]], "FREMONT, CA": [["NETSYS-MS", "Ecalix Inc.", "", "20141"], ["NETSYS-MS", "Ecalix Inc.", "", "20138"]], "ELYRIA, OH": [["NETSYS-MS", "Knorr-Bremse Group (Bendix & New York Air Brake)", "", "20141"]], "EL SEGUNDO, CA": [["NETSYS-MS", "Thor Group", "", "20141"], ["NETSYS-MS", "Thor Group", "", "20138"]], "PENN YAN, NY": [["INFOTEC-BS", "Sensored Life, LLC", "", "20141"], ["INFOTEC-BS", "Sensored Life, LLC", "", "20138"]], "CUPERTINO, CA": [["INFOTEC-MS", "Apple", "", "20141"], ["INFOTEC-MS", "Apple, Inc.", "", "20138"]], "NORTH SYRACUSE, NY": [["NETSYS-BS", "Annese & Associates, Inc.", "", "20138"]], "REDLANDS, CA": [["INFOTEC-MS", "ESRI, Implementation Services", "", "20138"]], "PRINCETON, NJ": [["INFOTEC-MS", "ALK Technologies", "", "20138"]], "BEIJING, CHINA, ": [["INFOTEC-BS", "Jet Century Beijing Technology Ltd.", "", "20138"]], "TUCSON, AZ": [["NETSYS-MS", "IBM Corp", "", "20138"]], "CHEVY CHASE, MD": [["INFOTEC-BS", "GEICO", "", "20138"]], "BATAVIA, NY": [["ANSA-BS", "Muller Quaker Dairy LLC", "", "20138"]], "CAMPBELL, CA": [["INFOTEC-BS", "iD Tech Camps (Internal Drive)", "", "20138"]], "AVON, NY": [["ANSA-BS", "Barilla America Inc", "", "20138"]], "MANCHESTER, NY": [["ANSA-BS", "Advance Mold & Manufacturing Inc", "", "20138"]], "NEUSTADT(WIED), GERMANY, ": [["ANSA-BS", "SER GmbH", "", "20138"]], "OCEANPORT, NJ": [["ANSA-BS", "CommVault Systems, Inc.", "", "20138"]], "YONKERS, NY": [["ANSA-BS", "Consumer Reports", "", "20138"]], "ASHBURN, VA": [["ANSA-BS", "Datasol Inc.", "", "20138"]], "JEDDAH, MAKKAH, ": [["ANSA-BS", "Nyoozi", "", "20138"]], "RUSH, NY": [["INFOTEC-BS", "Agrez Consulting Inc", "", "20138"]], "SCRANTON, PA": [["INFOTEC-BS", "EDM Americas", "", "20138"]], "ORANGEBURG, NY": [["INFOTEC-BS", "Verizon Wireless", "", "20138"]], "WAKAYAMA, JAPAN, ": [["INFOTEC-BS", "BEE Co Ltd", "", "20138"]], "MUMBAI, INDIA, ": [["INFOTEC-BS", "OneLeap", "", "20138"]], "CHEEKTOWAGA, NY": [["INFOTEC-BS", "Computer SOS Inc.", "", "20138"], ["INFOTEC-BS", "Computer SOS Inc.", "", "20124"]], "CINCINNATI, OH": [["INFOTEC-BS", "Cincinnati Children's Hospital Medical Center", "", "20138"]], "CANANDAIGUA, NY": [["INFOTEC-BS", "Constellation Brands Inc", "", "20138"]], "FAIRFIELD, CT": [["INFOTEC-BS", "IPC Systems Inc", "", "20138"]], "SARATOGA SPRINGS, NY": [["INFOTEC-BS", "Saratoga Hospital", "", "20138"], ["INFOTEC-BS", "The Adirondack Trust Company", "", "20124"]], "ROSWELL, GA": [["INFOTEC-BS", "SA IT Services", "", "20138"]], "MEDIACOM PARK, NY": [["INFOTEC-BS", "Mediacom Communications Corp", "", "20138"]], "ZAGREB, CROATIA, ": [["INFOTEC-BS", "2e Systems", "", "20135"]], "LYNCHBURG, VA": [["INFOTEC-BS", "Harris Corporation", "", "20135"]], "NATICK, MA": [["INFOTEC-MS", "The MathWorks", "", "20135"]], "NORMAN, OK": [["INFOTEC-MS", "Power Costs Inc.", "", "20135"]], "IRVING, TX": [["INFOTEC-BS", "Fathom Ideaware", "", "20131"], ["INFOTEC-BS", "Fathom Ideaware", "", "20124"]], "OSTERVILLE, MA": [["ANSA-BS", "Savant Systems", "", "20131"], ["ANSA-BS", "Savant Systems", "", "20124"]], "JERSEY CITY, NJ": [["INFOTEC-MS", "Cavalier IT Inc", "", "20131"], ["INFOTEC-BS", "Eastern Millwork Inc.", "", "20124"]], "LIVERPOOL, NY": [["INFOTEC-BS", "JMA Wireless", "", "20131"]], "LOCKPORT, NY": [["ANSA-BS", "Niagara County", "", "20124"]], "NEW PALTZ, NY": [["INFOTEC-BS", "Hudson Valley IT Solutions", "", "20124"]], "WARWICK, NY": [["INFOTEC-BS", "Parse3", "", "20124"]], "BELGRADE, ME": [["INFOTEC-BS", "Hammond Lumber Co", "", "20124"]], "ORLAND PARK, IL": [["INFOTEC-BS", "Southwest Dermatology", "", "20124"]], "ERIE, PA": [["INFOTEC-BS", "Erie Insurance Group", "", "20124"]], "SPRINGFIELD, NJ": [["ANSA-BS", "PSE", "", "20124"]], "ANDOVER, MA": [["ANSA-BS", "Philips North America", "", "20124"]], "BRIDGEWATER, NJ": [["ANSA-BS", "Synchronos Technologies Inc", "", "20124"]], "LAUREL, MD": [["ANSA-BS", "CMA Systems", "", "20124"]], "FRISCO, TX": [["INFOTEC-MS", "HCL America", "", "20124"]], "PALMYRA, NY": [["INFOTEC-BS", "Garlock Sealing Technologies", "", "20124"]], "ONTARIO, CANADA, ": [["INFOTEC-BS", "Citizens Business Bank", "", "20124"]], "DULLES, VA": [["INFOTEC-BS", "America Online\/Huffington Post", "", "20124"]] };
    var studentsMap;
    var markers = [];
    var jobs;
    var startLat = 37.972753, startLng = -95.681656;
    var studentsMapOpts = {
        center: new google.maps.LatLng(startLat, startLng),
        scrollwheel: false,
        zoom: 4
    };
    studentsMap = new google.maps.Map(document.getElementById("StudentsMap"), studentsMapOpts);

    $.each(allStudents, function (location, students) {
        if (location != ",") {
            if (locations[location]) {
                addToMap(location, locations[location]['lat'], locations[location]['long'], students);
            } else {
                $.ajax({
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + formatLocation(location) + "&key=AIzaSyBNLVx0RXU8guYg21zTLZnZoXcrh4yPCSc"
                }).done(function (data) {
                    var newLat = data['results'][0]['geometry']['location']['lat'];
                    var newLong = data['results'][0]['geometry']['location']['lng'];
                    addToMap(location, newLat, newLong, students);
                    $.ajax({
                        url: "../assets/includes/yourFuture/addNewLoc.php",
                        type: "POST",
                        data: {
                            loc: location,
                            lat: newLat,
                            lng: newLong
                        }
                    });
                });
            }
        }
    });
    function addToMap(loc, lat, longi, students) {
        var markerLatLong = new google.maps.LatLng(lat, longi);
        var formattedLocation = formatLocation(loc);
        var marker = new google.maps.Marker({
            position: markerLatLong,
            map: studentsMap,
            title: formattedLocation
        });
        var content = "<h2>" + formattedLocation + "</h2><br/>";
        $.each(students, function (index, student) {
            content += "<div class='map-student' data-degree='" + student[1] + "'><hr/>";
            content += "<p>Employer: " + student[1] + "</p>";
            if (student[2] != "") {
                content += "<p>Job Title: " + student[2] + "<p>";
            } else {
                content += "<p>Coop<p>";
            }
            content += "<p>Degree: " + student[0] + "</p></div>";
            content += "<p>Date: " + student[3] + "</p>";
        });
        marker.IWContent = content;
        marker.infowindow = new google.maps.InfoWindow({});
        google.maps.event.addListener(marker, 'click', function () {
            $(markers).each(function (index, marker) {
                marker.infowindow.close();
            });
            marker.infowindow.setContent(marker.IWContent);
            marker.infowindow.open(studentsMap, marker);
        });
        markers.push(marker);
    }
    function formatLocation(loc) {
        var parts = loc.split(',');
        var formattedCity = "";
        $.each(parts[0].split(' '), function (index, value) {
            formattedCity += value.charAt(0) + value.slice(1).toLowerCase() + " ";
        });
        formattedCity = formattedCity.slice(0, -1);
        if (parts[1] != "") {
            formattedCity += ',' + parts[1];
        }
        return formattedCity;
    }
}

//function to get the people page content
function getPeople() {
    console.log("getPeople called");
    dataService.getPeopleData().done(function (data) {
        console.log(data);
        //function for the fadeIn effect on page load
        $('#PeopleContainer').fadeIn(1500);
        //Got data do stuff...
        $.each(data, function (index, n) {
            console.log("index is: "+index);
            console.log("value is: "+n);
            if (index == "faculty") {
                var heading = document.createElement("h3");
                $(heading).append(document.createTextNode("Faculty"));
                $("#PeopleContainer").append(heading);
                    $.each(data.faculty, function (i, v) {
                        console.log(data.faculty.length)
                        console.log("v:" + v);
                        var div = document.createElement("div");
                        var a = document.createElement("a");
                        $(a).attr("class", "thumbnail");
                        var h5 = document.createElement("h5");
                        $(h5).append(document.createTextNode(v.name));
                        $(div).append(h5);
                        $(div).attr("id",v.username);
                        $(div).attr("class", "col-md-2 col-xs-6")
                        $("#PeopleContainer").append(div);
                        $(div).append(a);
                    //var facultyName = document.createElement("h5");
                    //$(facultyName).attr("id", v.username);
                    //$(facultyName).append(document.createTextNode(v.name));
                        var img = document.createElement('img');
                        $(img).attr("style", "height:150px;width:100%;display:block;")
                        console.log(v.imagePath);
                        img.src = v.imagePath;

                        //$("#PeopleContainer").append(facultyName);
                        $(a).append(img);

                        //function for the dialog box plug-in
                        $("#dialog").dialog({
                            maxWidth: 400,
                            maxHeight: 300,
                            width: 400,
                            height: 300,
                        autoOpen: false, modal: true, show: "blind", hide: "blind"
                    });
                    var li;
                    var ul = document.createElement("ul");
                    $(ul).attr("style", "list-style: none");
                    $("#" + v.username).click(function () {
                        //if (!$("#PeopleContent").find('ul').length) {
                            $("#PeopleContent").find('ul').empty();
                            $("#PeopleContent").find('ul').remove();
                        $.each(v, function(l,m){
                            console.log("l is :" +l);
                            console.log("m is :" +m);
                            li = document.createElement("li");
                            if (!(m == "" || m == null || l == "imagePath")) {
                                $(li).append(document.createTextNode(l+": "+m));
                                $(ul).append(li);
                            }
                                $("#PeopleContent").append(ul);
                        })
                        $("#dialog").dialog("open");
                    });
                })
            }
            else if (index == "staff") {
                var heading = document.createElement("h3");
                $(heading).append(document.createTextNode("Staff"));
                $("#PeopleContainer1").append(heading);
                $.each(data.staff, function (i, v) {
                        var div = document.createElement("div");
                        var a = document.createElement("a");
                        $(a).attr("class", "thumbnail");
                        var h5 = document.createElement("h5");
                        $(h5).append(document.createTextNode(v.name));
                        $(div).append(h5);
                        $(div).attr("id", v.username);
                        $(div).attr("class", "col-md-2 col-xs-6")
                        $("#PeopleContainer1").append(div);
                        $(div).append(a);
                        //var facultyName = document.createElement("h5");
                        //$(facultyName).attr("id", v.username);
                        //$(facultyName).append(document.createTextNode(v.name));
                        var img = document.createElement('img');
                        $(img).attr("style", "height:150px;width:100%;display:block;")
                        img.src = v.imagePath;

                        //$("#PeopleContainer").append(facultyName);
                        $(a).append(img);

                    //    var staffName = document.createElement("h5");
                    //    $(staffName).attr("id", v.username);
                    //$(staffName).append(document.createTextNode(v.name));
                    //var img = document.createElement('img');
                    //img.src = v.imagePath;
                    //$("#PeopleContainer").append(staffName);
                    //$("#PeopleContainer").append(img);

                    //function for the dialog box plug-in
                    $("#dialog").dialog({
                        autoOpen: false, modal: true, show: "blind", hide: "blind"
                    });
                    var li;
                    var ul = document.createElement("ul");
                    $(ul).attr("style", "list-style: none");
                    $("#" + v.username).click(function () {
                        $("#PeopleContent").find('ul').empty();
                        $("#PeopleContent").find('ul').remove();
                        $.each(v, function (l, m) {
                            console.log("l is :" + l);
                            console.log("m is :" + m);
                            li = document.createElement("li");
                            if (!(m == "" || m == null || l == "imagePath")) {
                                $(li).append(document.createTextNode(l + ": " + m));
                                $(ul).append(li);
                            }
                            $("#PeopleContent").append(ul);
                        })
                        $("#dialog").dialog("open");
                    });
                })
            }
            else {
                var peopleHtml = document.createElement("h4");
                $(peopleHtml).append(document.createTextNode(n));
                $("#PeopleContainer").append(peopleHtml);
                $("#PeopleContainer").append(data.subtitle);
            }
        })
    })
    .fail(function (jqXHR, textStatus, err) {
        alert("can't get data");
    });
}

//function to get the research content
function getResearch() {
    console.log("getResearch called");
    dataService.getResearchData().done(function (data) {
        console.log(data);
        //functions for the fadeIn effect on page load
        $('#InterestAreaContainer').fadeIn(1000);
        $('#FacultyContainer').fadeIn(2000);
        //Got data do stuff...
        var heading = document.createElement("h3");
        $(heading).append(document.createTextNode("By Research Area"));
        $("#InterestAreaContainer").append(heading);

        var heading1 = document.createElement("h3");
        $(heading1).append(document.createTextNode("By Faculty"));
        $("#FacultyContainer").append(heading1);
        $.each(data, function (i, n) {
            console.log("i is: " +i);
            console.log("n is: " + n);
            $.each(n, function (index, value) {
                console.log("index is: "+index);
                console.log("value is: "+value);
                if (i == "byInterestArea") {
                var interestHtml = document.createElement("h5");
                $(interestHtml).attr("id",value.areaName.substring(0,3))
                $(interestHtml).append(document.createTextNode(value.areaName));
                $("#InterestAreaContainer").append(interestHtml);
                    //function for the dialog box plug-in
                $("#dialog").dialog({
                    maxWidth: 800,
                    maxHeight: 600,
                    width: 800,
                    height: 600,
                    autoOpen: false, modal: true, show: "blind", hide: "blind"
                });
                var li;
                var ul = document.createElement("ul");
                $("#" + value.areaName.substring(0, 3)).click(function () {
                    $("#ResearchContent1").find('ul').empty();
                    $("#ResearchContent1").find('ul').remove();
                    $.each(value.citations, function (l, m) {
                        console.log("l is :" + l);
                        console.log("m is :" + m);
                        li = document.createElement("li"); 
                        $(li).append(document.createTextNode(m));
                        $(ul).append(li);
                        $("#ResearchContent1").append(ul);
                    })
                    $("#dialog").dialog("open");
                });
                    }
            else if (i == "byFaculty") {
                var facultyHtml = document.createElement("h5");
                $(facultyHtml).attr("id", value.username);
                $(facultyHtml).append(document.createTextNode(value.facultyName));
                $("#FacultyContainer").append(facultyHtml);
                //function for the dialog box plug-in
                $("#dialog1").dialog({
                    maxWidth: 800,
                    maxHeight: 600,
                    width: 800,
                    height: 600,
                    autoOpen: false, modal: true, show: "blind", hide: "blind"
                });
                var li;
                var ul = document.createElement("ul");
                $("#" + value.username).click(function () {
                    $("#ResearchContent2").find('ul').empty();
                    $("#ResearchContent2").find('ul').remove();
                    $.each(value.citations, function (l, m) {
                        console.log("l is :" + l);
                        console.log("m is :" + m);
                        li = document.createElement("li");
                        $(li).append(document.createTextNode(m));
                        $(ul).append(li);
                        $("#ResearchContent2").append(ul);
                    })
                    $("#dialog1").dialog("open");
                });
            }
            })
        })
    })
    .fail(function (jqXHR, textStatus, err) {
        alert("can't get data");
    });
}

//function getResources() {
//    console.log("getResources called");
//    dataService.getResourcesData().done(function (data) {
//        console.log(data);
//        //Got data do stuff...
//        var resourcesHtml = document.createElement("h3");
//        $(resourcesHtml).append(document.createTextNode(data.title));
//        $("#ResourcesContainer").append(resourcesHtml);
//        $("#ResourcesContainer").append(data.subTitle);
//        $.each(data, function (i, n) {
//            console.log(i);
//            console.log(n);
//            if (i == "studyAbroad") {
//                console.log("hello: " + n.title);
//                var resourceHtml = document.createElement("h3");
//                $(resourceHtml).append(document.createTextNode(n.title));
//                $(resourceHtml).attr("id", i);
//                $("#ResourcesContainer").append(resourceHtml);
//                $("#dialog").dialog({
//                    autoOpen: false, modal: true, show: "blind", hide: "blind"
//                });
//                var li;
//                var ul = document.createElement("ul");
//                $("#" + i).click(function () {
//                    $(ul).empty();
//                    $('ul').remove();
//                    if ($("#ResourcesContent").has('p')) {
//                        $("#ResourcesContent").find('p').remove();
//                    }
//                    var p = document.createElement("p");
//                    $(p).append(document.createTextNode(n.description));
//                    $("#ResourcesContent").append(p);
//                    $.each(n, function (l, m) {
//                        console.log("l is :" + l);
//                        console.log("m is :" + m);
//                        li = document.createElement("li");
//                        $(li).append(document.createTextNode(m));
//                        $(ul).append(li);
//                        $("#ResearchContent2").append(ul);
//                    })
//                    $("#dialog").dialog("open");
//                });
//            }
//        })
//    })
//    .fail(function (jqXHR, textStatus, err) {
//        alert("can't get data");
//    });
//}


//function to get the footer content
function getFooter() {
    console.log("getFooter called");
    dataService.getFooterData().done(function (data) {
        console.log(data);
        //Got data do stuff...
        var footerHtml = document.createElement("h2");
        $(footerHtml).attr("id", "footerh3");
        $(footerHtml).append(document.createTextNode(data.social.title));
        $("#FooterContainer").append(footerHtml);
        var p = document.createElement('p');
        $(p).attr("id", "footerp");
        $(p).append(data.social.tweet);
        $("#FooterContainer").append(p);
        var by = document.createElement('p');
        $(by).attr("id", "footerby");
        $(by).append(data.social.by);
        $("#FooterContainer").append(by);
        $("#FooterContainer1").append(data.copyright.html);
    })
    .fail(function (jqXHR, textStatus, err) {
        alert("can't get data");
    });
    //function for the dialog box plug-in
    $("#dialog5").dialog({
        maxWidth: 550,
        maxHeight: 575,
        width: 550,
        height: 575,
        autoOpen: false, modal: true, show: "blind", hide: "blind"
    });
    $("#contactForm").click(function () {
        $("#dialog5").dialog("open");
    })
}