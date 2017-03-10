var app = angular.module("dtrap", ["firebase", "ui.bootstrap"]);
//Print to PDF functionality
defaults = {
    debug: false
    , importCSS: true
    , printContainer: false
    , operaSupport: false
};

function outer(this2) {
    return $($('<div></div>').html(this2.clone())).html();
}

function jqprint(this2, options) {
    opt = $.extend({}, defaults, options);
    var $element = (this2 instanceof jQuery) ? this2 : $(this2);
    if (opt.operaSupport) {
        var tab = window.open("", "jqPrint-preview");
        tab.document.open();
        var doc = tab.document;
    }
    else {
        var $iframe = $("<iframe  />");
        if (!opt.debug) {
            $iframe.css({
                position: "absolute"
                , width: "0px"
                , height: "0px"
                , left: "-600px"
                , top: "-600px"
            });
        }
        $iframe.appendTo("body");
        var doc = $iframe[0].contentWindow.document;
    }
    if (opt.importCSS) {
        if ($("link[media=print]").length > 0) {
            $("link[media=print]").each(function () {
                doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
            });
        }
        else {
            $("link").each(function () {
                doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
            });
        }
    }
    if (opt.printContainer) {
        doc.write(outer($element));
    }
    else {
        $element.each(function () {
            doc.write($(this).html());
        });
    }
    doc.close();
    (opt.operaSupport ? tab : $iframe[0].contentWindow).focus();
    setTimeout(function () {
        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print();
        if (tab) {
            tab.close();
        }
    }, 1000);
}
//Print to PDF functionality END
var DEFINITE = "Definite";
var PROBABLE = "Probable";
var POSSIBLE = "Possible";
var DOUBTFUL = "Doubtful";
var naranjoResultMatrix = {
    q1Ans: {
        Yes: 1
        , No: 0
        , NA: 0
    }
    , q2Ans: {
        Yes: 2
        , No: -1
        , NA: 0
    }
    , q3Ans: {
        Yes: 1
        , No: 0
        , NA: 0
    }
    , q4Ans: {
        Yes: 2
        , No: -1
        , NA: 0
    }
    , q5Ans: {
        Yes: -1
        , No: 2
        , NA: 0
    }
    , q6Ans: {
        Yes: -1
        , No: 1
        , NA: 0
    }
    , q7Ans: {
        Yes: 1
        , No: 0
        , NA: 0
    }
    , q8Ans: {
        Yes: 1
        , No: 0
        , NA: 0
    }
    , q9Ans: {
        Yes: 1
        , No: 0
        , NA: 0
    }
    , q10Ans: {
        Yes: 1
        , No: 0
        , NA: 0
    }
};
app.controller('mainctrl', function ($scope, $window) {
    $scope.logout = function () {
        localStorage.clear();
        window.location.href = './index.html';
    };
});
app.controller("sample", function ($window, $scope, $firebaseAuth) {
    console.log("You lost? Probably something went wrong..");
    /*var ref = new Firebase("https://dazzling-fire-4.firebaseio.com/");*/
    $scope.login = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {}
            else {
                var uiConfig = {
                    signInSuccessUrl: './main.html'
                    , signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ], // Terms of service url.
                    tosUrl: '<your-tos-url>'
                };
                // Initialize the FirebaseUI Widget using Firebase.
                var ui = new firebaseui.auth.AuthUI(firebase.auth());
                // The start method will wait until the DOM is loaded.
                ui.start('#firebaseui-auth-container', uiConfig);
            }
        });
    }
    else {
        EpochToHuman();
        var currDate = new Date();
        if (datum < currDate) {
            ref.authWithOAuthPopup("google", function (error, authData) {
                localStorage.username = JSON.stringify(authData.google.displayName);
                localStorage.uid = JSON.stringify(authData.uid);
                localStorage.email = JSON.stringify(authData.google.email);
                localStorage.expires = JSON.stringify(authData.expires);
                var uid = JSON.parse(localStorage.uid);
                var email = JSON.parse(localStorage.email);
                ref.child("users").child(uid).update({
                    email: email
                });
                $window.location.href = './main.html';
            }, {
                remember: "sessionOnly"
                , scope: "email"
            });
        }
        else $window.location.href = './main.html';
    }
}
});
app.controller("adrctrl", function ($timeout, $scope, $window, $firebaseAuth, $firebaseObject) {
    var ref = new Firebase("https://dazzling-fire-4.firebaseio.com/");
    var sectionAData = {};
    var sectionBData = {};
    var sectionCData = {};
    var sectionDData = {};
    var sectionEData = {};
    var sectionHartwigData = {};
    var sectionNaranjoData = {};
    var adr = {
        sectionAData: {}
        , sectionBData: {}
        , sectionCData: {}
        , sectionDData: {}
        , sectionEData: {}
        , sectionHartwigData: {}
        , sectionNaranjoData: {}
    };

    function getVal(id) {
        return $('#' + id).val();
    }

    function getValForRadioGroup(name) {
        return $("input:radio[name=" + name + "]:checked").val();
    }

    function getValForCheckboxList(DivID) {
        var tempList = $('#' + DivID).find("input").filter(':checked');
        var returnString = "";
        for (i = 0; i < tempList.length; i++) {
            returnString = returnString + "\n" + $(tempList[i]).val();
        }
        return returnString;
    }
    $scope.submit = function () {
        sectionAData.ipno = getVal('adr_ipno');
        sectionAData.doa = getVal('adr_doa');
        sectionAData.dod = getVal('adr_dod');
        sectionAData.sex = getValForRadioGroup('genderRadio');
        sectionAData.pregnancyState = getValForRadioGroup('pregnancyRadio')
        sectionAData.age = getVal('adr_age');
        sectionAData.weight = getVal('adr_weight');
        sectionAData.prevadr = getVal('prevADR');
        sectionBData.dateStarted = getVal('adr_ds');
        sectionBData.dateStopped = getVal('adr_dss');
        sectionBData.drugDosage = getVal('dosageADR');
        sectionBData.drugName = getVal('brandName');
        sectionBData.drugPrescribedFor = getVal('presFor');
        sectionBData.drugRoute = getVal('adr_roa');
        sectionBData.ipno = sectionAData.ipno;
        sectionCData.dateRecovery = getVal('adr_dor');
        sectionCData.dateStart = getVal('adr_drs');
        sectionCData.descriptionOfEvent = getVal('evenDesc');
        sectionCData.ipno = sectionAData.ipno;
        sectionCData.labAbnormality = getVal('labAna');
        sectionCData.reactionAbated = getValForRadioGroup('reacRadio1'), getValForCheckboxList('adr_reacAbated');
        sectionCData.reactionReappearedAfterIntro = getValForRadioGroup('reacRadio2'), getValForCheckboxList('adr_reacReapp');
        sectionCData.seriousnessofEvent = getValForCheckboxList('seriousness'); //Test values. Ignore this part for now
        sectionDData.dateEnd = getVal('end');
        sectionDData.dateStart = getVal('adr_start');
        sectionDData.dosage = getVal('dosage11');
        sectionDData.ipno = sectionAData.ipno;
        sectionDData.medicationName = getVal('medName');
        sectionDData.reason = getVal('reason');
        sectionDData.route = getVal('roa11');
        var report = "";
        sectionHartwigData.IPNO = sectionAData.ipno;
        sectionHartwigData.level = getValForRadioGroup('radio13');
        switch (sectionHartwigData.level.split('-')[0].substr(sectionHartwigData.level.split('-')[0].length - 3, 1)) {
        case "1":
        case "2":
            report = "Mild";
            break;
        case "3":
        case "4":
            report = "Moderate";
            break;
        case "5":
        case "6":
        case "7":
            report = "Severe";
            break;
        }
        sectionHartwigData.level = sectionHartwigData.level.split('-')[0].substr(sectionHartwigData.level.split('-')[0].length - 3, 1);
        sectionHartwigData.report = report;
        sectionNaranjoData.ipno = sectionAData.ipno;
        sectionNaranjoData.q1Ans = getValForRadioGroup('optionsRadio1');
        sectionNaranjoData.q2Ans = getValForRadioGroup('optionsRadio2');
        sectionNaranjoData.q3Ans = getValForRadioGroup('optionsRadio3');
        sectionNaranjoData.q4Ans = getValForRadioGroup('optionsRadio4');
        sectionNaranjoData.q5Ans = getValForRadioGroup('optionsRadio5');
        sectionNaranjoData.q6Ans = getValForRadioGroup('optionsRadio6');
        sectionNaranjoData.q7Ans = getValForRadioGroup('optionsRadio7');
        sectionNaranjoData.q8Ans = getValForRadioGroup('optionsRadio8');
        sectionNaranjoData.q9Ans = getValForRadioGroup('optionsRadio9');
        sectionNaranjoData.q10Ans = getValForRadioGroup('optionsRadio10');
        var score = 0;
        for (var key in sectionNaranjoData) {
            var key2 = sectionNaranjoData[key] == "Don't Know / Unknown" ? 'NA' : sectionNaranjoData[key];
            if (key != 'ipno') score += naranjoResultMatrix[key][key2];
        }
        report = "";
        switch (score) {
        case 0:
            report = DOUBTFUL;
            break;
        case 1:
        case 2:
        case 3:
        case 4:
            report = POSSIBLE;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            report = PROBABLE;
            break;
        case 9:
        case 10:
        case 11:
            report = DEFINITE;
            break;
        default:
            if (score > 9) {
                report = DEFINITE;
            }
            break;
        }
        sectionNaranjoData.score = score;
        sectionNaranjoData.report = report;
        sectionEData.ipno = sectionAData.ipno;
        sectionEData.date = getVal('adr_dorep');
        sectionEData.reporterName = getVal('reporter');
        adr.sectionAData = sectionAData;
        adr.sectionBData = sectionBData;
        adr.sectionCData = sectionCData;
        adr.sectionDData = sectionDData;
        adr.sectionEData = sectionEData;
        adr.sectionHartwigData = sectionHartwigData;
        adr.sectionNaranjoData = sectionNaranjoData;
        ref.authWithOAuthToken("google", JSON.parse(localStorage.token), function (error, authData) {
            console.log(authData);
            console.log(error);
        });
        console.log(ref);
        var adrRef = ref.child("users").child(JSON.parse(localStorage.uid)).child("ADRs").push();
        adrRef.set(adr);
    }
});
app.controller("drpcntrl", function ($timeout, $scope, $window, $firebaseAuth, $firebaseObject) {
    var ref = new Firebase("https://dazzling-fire-4.firebaseio.com/");
    var drpAData = {};
    var drpBData = {};
    var drpCData = {};
    var drp = {
        drpAData: {}
        , drpBData: {}
        , drpCData: {}
    };

    function getVal(id) {
        return $('#' + id).val();
    }

    function getValForRadioGroup(name) {
        return $("input:radio[name=" + name + "]:checked").val();
    }

    function getValForCheckboxList(DivID) {
        var tempList = $('#' + DivID).find("input").filter(':checked');
        var returnString = "";
        for (i = 0; i < tempList.length; i++) {
            returnString = returnString + "\n" + $(tempList[i]).val();
        }
        return returnString;
    }
    $scope.submit = function () {
        drpAData.pharmacist = getVal('drp_phar');
        drpAData.consumer = getVal('drp_consumer');
        drpAData.age = getVal('drp_age');
        drpAData.doe = getVal('drp_doe');
        drpAData.gender = getValForRadioGroup('drp_genderRadio');
        drpAData.drug_involved = getVal('drp_drugInvolved');
        drpAData.diagnosis = getVal('diagnosis');
        drpBData.compliance = getValForCheckboxList('drp_compliance');
        drpBData.drugSelection = getValForCheckboxList('drp_drugSelection');
        drpBData.education = getValForCheckboxList('drp_education');
        drpBData.monitoring = getValForCheckboxList('drp_monitoring');
        drpBData.notClassifiable = getValForCheckboxList('drp_notClassifiable');
        drpBData.overOrUnderdose = getValForCheckboxList('drp_overUnderDose');
        drpBData.toxicity = getValForCheckboxList('drp_toxicity');
        drpBData.undertreated = getValForCheckboxList('drp_undertreated');
        drpCData.recommendation = getValForCheckboxList('drp_rec');
        drp.drpAData = drpAData;
        drp.drpBData = drpBData;
        drp.drpCData = drpCData;
        ref.authWithOAuthToken("google", JSON.parse(localStorage.token), function (error, authData) {
            console.log(authData);
            console.log(error);
        });
        console.log(ref);
        var drpRef = ref.child("users").child(JSON.parse(localStorage.uid)).child("DRPs").push();
        drpRef.set(drp);
        //TODO
        //        window.open("http://dtrap.in/main.html", _self);
    }
});
app.controller("medercntrl", function ($timeout, $scope, $window, $firebaseAuth, $firebaseObject) {
    var ref = new Firebase("https://dazzling-fire-4.firebaseio.com/");
    var medErAData = {};
    var medErBData = {};
    var medErCData = {};
    var medErDData = {};
    var meder = {
        medErAData: {}
        , medErBData: {}
        , medErCData: {}
        , medErDData: {}
    };

    function getVal(id) {
        return $('#' + id).val();
    }

    function getValForRadioGroup(name) {
        return $("input:radio[name=" + name + "]:checked").val();
    }

    function getValForCheckboxList(DivID) {
        var tempList = $('#' + DivID).find("input").filter(':checked');
        var returnString = "";
        for (i = 0; i < tempList.length; i++) {
            returnString = returnString + "\n" + $(tempList[i]).val();
        }
        return returnString;
    }
    $scope.submit = function () {
        medErAData.age = getVal('meder_age');
        medErAData.diagnosis = getVal('mederDiag');
        medErAData.doe = getVal('meder_doe');
        medErAData.ipno = getVal('meder_ipno');
        medErAData.location = getValForRadioGroup('locationRadio22');
        medErAData.sex = getValForRadioGroup('gender1');
        medErAData.toe = getVal('meder_toe');
        medErAData.type = getValForCheckboxList('meder_type');
        medErBData.error = getValForRadioGroup('reachpt');
        medErBData.event = getVal('mederEvent');
        medErBData.genericName = getVal('mederGeneric');
        medErBData.ipno = medErAData.ipno;
        medErCData.causes = getintCauseMaps(getValForCheckboxList('meder_causes'));
        medErCData.ipno = medErAData.ipno;
        medErCData.level = getValForRadioGroup('mederLevel');
        //                medErCData.report
        medErDData.designation = getVal('meder_desig');
        medErDData.intervention = getintInterventMaps(getValForCheckboxList('meder_intervention'));
        medErDData.ipno = medErAData.ipno;
        medErDData.name = getVal('meder_name');
        medErDData.number = getVal('meder_mob');
        meder.medErAData = medErAData;
        meder.medErBData = medErBData;
        meder.medErCData = medErCData;
        meder.medErDData = medErDData;
        ref.authWithOAuthToken("google", JSON.parse(localStorage.token), function (error, authData) {
            console.log(authData);
            console.log(error);
        });
        console.log(ref);
        var mederRef = ref.child("users").child(JSON.parse(localStorage.uid)).child("MedErs").push();
        mederRef.set(meder);
    }
});
/*app.controller("viewadrlistctrl", function ($scope, $window, $firebaseAuth, $firebaseObject, $firebaseArray, $modal) {
    var ref = new Firebase("https://dazzling-fire-4.firebaseio.com/");
    ref.authWithOAuthToken("google", JSON.parse(localStorage.token), function (error, authData) {
        console.log(authData);
        console.log(error);
    });
    var stringTemp = JSON.parse(localStorage.google).id;
    stringTemp = "google:" + stringTemp;
    var refArray = new Firebase("https://dazzling-fire-4.firebaseio.com/users/" + stringTemp + "/ADRs");
    $scope.ADRS = $firebaseArray(refArray);
    $scope.openModal = function (adr) {
        var modalInstance = $modal.open({
            templateUrl: 'adr_modal.html'
            , controller: 'AdrModalInstanceCtrl'
            , size: 'lg'
            , resolve: {
                adr: function () {
                    return adr;
                }
            }
        });
    }
});*/
app.controller("viewadrlistctrl", function ($scope, $window, $firebaseAuth, $firebaseObject, $firebaseArray, $modal) {
    var database = firebase.database();
    var userId = firebase.auth().currentUser.uid;
    $scope.ADRS = $firebaseArray(refArray);
    $scope.openModal = function (adr) {
        var modalInstance = $modal.open({
            templateUrl: 'adr_modal.html'
            , controller: 'AdrModalInstanceCtrl'
            , size: 'lg'
            , resolve: {
                adr: function () {
                    return adr;
                }
            }
        });
    }
});
app.controller('AdrModalInstanceCtrl', function ($scope, $modalInstance, adr) {
    $scope.adr = adr;
    delete adr.sectionBData['ipno'];
    delete adr.sectionCData['ipno'];
    delete adr.sectionDData['ipno'];
    delete adr.sectionEData['ipno'];
    delete adr.sectionHartwigData['IPNO'];
    delete adr.sectionNaranjoData['ipno'];
    var opt = {
        headers: true
    }
    var adrArray = flattenJSON(adr);
    for (var key in adr.sectionCData) {
        adr.sectionCData[key] = createCommmaData(adr.sectionCData[key]);
    }
    var name = 'adr' + Date.now();
    // adrArray.push(adr.sectionAData)
    $scope.toExcel = function () {
        alasql.promise('SELECT * INTO XLS("' + name + '.xls",?) FROM ?', [opt, adrArray]).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log('Error:', err);
        });
    }
    $scope.toPdf = function () {
        jqprint($('#modalToPrint'));
    }
});
app.controller("viewDrpListCntrl", function ($scope, $window, $firebaseAuth, $firebaseObject, $firebaseArray, $modal) {
    var ref = new Firebase("https://dazzling-fire-4.firebaseio.com/");
    ref.authWithOAuthToken("google", JSON.parse(localStorage.token), function (error, authData) {
        console.log(authData);
        console.log(error);
    });
    var stringTemp = JSON.parse(localStorage.google).id;
    stringTemp = "google:" + stringTemp;
    var refArray = new Firebase("https://dazzling-fire-4.firebaseio.com/users/" + stringTemp + "/DRPs");
    $scope.DRPS = $firebaseArray(refArray);
    $scope.openModal = function (drp) {
        var modalInstance = $modal.open({
            templateUrl: 'drp_modal.html'
            , controller: 'DrpModalInstanceCtrl'
            , size: 'lg'
            , resolve: {
                drp: function () {
                    return drp;
                }
            }
        });
    }
});
app.controller('DrpModalInstanceCtrl', function ($scope, $modalInstance, drp) {
    $scope.drp = drp;
    var drpArray = flattenJSON(drp);
    for (var key in drp.drpBData) {
        drp.drpBData[key] = createCommmaData(drp.drpBData[key]);
    }
    for (var key in drp.drpCData) {
        drp.drpCData[key] = createCommmaData(drp.drpCData[key]);
    }
    var name = 'drp' + Date.now();
    $scope.toExcel = function () {
        alasql.promise('SELECT * INTO XLSXML("' + drp + '.xls",?) FROM ?', [opt, drpArray]).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log('Error:', err);
        });
    }
    $scope.toPdf = function () {
        jqprint($('#modalToPrint'));
    }
});
app.controller("viewMederListCntrl", function ($scope, $window, $firebaseAuth, $firebaseObject, $firebaseArray, $modal) {
    var ref = new Firebase("https://dazzling-fire-4.firebaseio.com/");
    ref.authWithOAuthToken("google", JSON.parse(localStorage.token), function (error, authData) {
        console.log(authData);
        console.log(error);
    });
    var stringTemp = JSON.parse(localStorage.google).id;
    stringTemp = "google:" + stringTemp;
    var refArray = new Firebase("https://dazzling-fire-4.firebaseio.com/users/" + stringTemp + "/MedErs");
    $scope.MEDERS = $firebaseArray(refArray);
    $scope.openModal = function (meder) {
        var modalInstance = $modal.open({
            templateUrl: 'meder_modal.html'
            , controller: 'MederModalInstanceCtrl'
            , size: 'lg'
            , resolve: {
                meder: function () {
                    return meder;
                }
            }
        });
    }
});
app.controller('MederModalInstanceCtrl', function ($scope, $modalInstance, meder) {
    var mederArray = flattenJSON(meder);
    for (var key in meder.medErBData) meder.medErBData[key] = createCommmaData(meder.medErBData[key]);
    for (var key in meder.medErCData) meder.medErCData[key] = createCommmaData(meder.medErCData[key]);
    for (var key in meder.medErDData) meder.medErDData[key] = createCommmaData(meder.medErDData[key]);
    meder.medErCData.causess = getCause(meder.medErCData.causes);
    meder.medErDData.interventions = getIntervene(meder.medErDData.intervention);
    $scope.meder = meder;
    var mederArray = flattenJSON(meder);
    var name = 'meder' + Date.now();
    $scope.toExcel = function () {
        alasql.promise('SELECT * INTO XLSXML("' + name + '.xls",?) FROM ?', [opt, mederArray]).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log('Error:', err);
        });
    }
    $scope.toPdf = function () {
        jqprint($('#modalToPrint'));
    }
});
// GLOBAL FUNCTIONS
function getKeys(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function flattenJSON(obj) {
    var returnobj = [{}];
    for (var key in obj) {
        if (typeof obj[key] == "object")
            for (var innerKey in obj[key]) {
                returnobj[0][innerKey] = obj[key][innerKey];
            }
    }
    return returnobj;
}

function getStrings(obj) {
    var returnString = "";
    for (var key in obj) {
        returnString += key + ': ' + obj[key] + '\n';
    }
    return returnString;
}

function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';
    if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        }
        else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    for (var i = 0; i < array.length; i++) {
        var line = '';
        if (true) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        }
        else {
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}

function createCommmaData(val) {
    var r = ""
    if (Object.prototype.toString.call(val) === '[object Object]') {
        var x = val.split('\n');
        for (i = 1; i < x.length; i++) {
            r += x.length == 2 ? x[i] : x[i] + ', ';
        }
        return r == "" ? val : r;
    }
    return val;
}

function EpochToHuman() {
    var inputtext = localStorage.expires;
    if (inputtext.charAt(inputtext.length - 1) == "L") {
        inputtext = inputtext.slice(0, -1);
    }
    inputtext = inputtext * 1;
    var epoch = inputtext;
    var outputtext = "";
    var extraInfo = 0;
    if (inputtext >= 100000000000000) {
        epoch = Math.round(inputtext / 1000000);
        inputtext = Math.round(inputtext / 1000);
    }
    else if (inputtext >= 100000000000) {
        epoch = Math.round(inputtext / 1000);
    }
    else {
        if (inputtext > 10000000000) extraInfo = 1;
        inputtext = (inputtext * 1000);
    }
    datum = new Date(inputtext);
}

function getintCauseMaps(val) {
    r = [];
    s = val.split('\n');
    for (i = 0; i < s.length; i++) {
        if (s[i] !== "" && s[i] !== undefined) {
            if (mapCauses[s[i]] !== undefined) {
                r.push(mapCauses[s[i]] + 10);
            }
        }
    }
    return r;
}

function getintInterventMaps(val) {
    r = [];
    s = val.split('\n');
    for (i = 0; i < s.length; i++) {
        if (s[i] !== "" && s[i] !== undefined) {
            if (mapIntervention[s[i]] !== undefined) {
                r.push(mapIntervention[s[i]]);
            }
        }
    }
    return r;
}

function getCause(val) {
    r = "";
    for (i = 0; i < val.length; i++) {
        for (var key in mapCauses) {
            if (mapCauses[key] == (val[i] - 10)) r += key + ', ';
        }
    }
    return r;
}

function getIntervene(val) {
    r = "";
    for (i = 0; i < val.length; i++) {
        for (var key in mapIntervention) {
            if (mapIntervention[key] == val[i]) r += key + ', ';
        }
    }
    return r;
}
mapCauses = {
    "Lack of Knowledge": 0
    , "Illeligible prescription": 1
    , "Look alike / sound alike medication": 2
    , "Wrong labelling / instructions": 3
    , "Use of Abbrevations": 4
    , "Unavailable patient information": 5
    , "Peak Hour": 6
    , "Miscommunication": 7
    , "Failure to adhere to work procedure": 8
    , "Others": 9
};
mapIntervention = {
    "Administered antidote": 0
    , "Education / Training provided": 1
    , "Informed staff who made error": 2
    , "Changed to correct Drug / Dose / Frequency": 3
    , "Communication process improved": 4
    , "Policy / procedure changed / instituted": 5
    , "No action needed": 6
    , "Others": 7
};