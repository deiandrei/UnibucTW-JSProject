var intervalArray = [];
var radiosArray = [];
var running = false;

function generateCheckbox(labelText) {
    var checkbox = getInputByType("checkbox", "", "");
    var checkboxlabel = document.createElement("label");
    checkboxlabel.className = "label";
    checkboxlabel.appendChild(checkbox);
    checkboxlabel.appendChild(document.createTextNode(" " + labelText));

    return checkboxlabel;
}

function generateRadio(labelText) {
    var radio = getInputByType("radio", "", "");
    radio.name = "radio";
    var radiolabel = document.createElement("label");
    radiolabel.className = "label";
    radiolabel.appendChild(radio);
    radiolabel.appendChild(document.createTextNode(" " + labelText));

    return radiolabel;
}

function generateSlider(labelText, min, max) {
    var slider = getInputByType("range", "", "");
    slider.name = "radio";
    slider.className = "slider";
    slider.min = min;
    slider.max = max;
    var sliderlabel = document.createElement("label");
    sliderlabel.className = "label label-slider";
    sliderlabel.appendChild(document.createTextNode(labelText));
    sliderlabel.appendChild(slider);

    return sliderlabel;
}

function generateSelectOption(name, value) {
    var option = document.createElement("option");
    option.innerText = name;
    option.value = value;
    return option;
}

function generateSelect(labelName, optionsArray) {
    var label = document.createElement("label");
    label.className = "label";

    var select = document.createElement("select");
    select.style = "float: right; width: 50%;"
    select.id = "selectDropdown";
    
    var emptyOption = document.createElement("option");
    emptyOption.style = "display:none;";
    select.appendChild(emptyOption);

    for(option of optionsArray) {
        select.appendChild(generateSelectOption(option.name, option.value));
    }

    label.appendChild(document.createTextNode(labelName));
    label.appendChild(select);

    return label;
}

function addRadioHelper(radioLabel, insertAfter) {
    var radio = generateRadio(radioLabel);
    var br = document.createElement("br");
    radiosArray.push(radio);
    radiosArray.push(br);
    insertAfter.parentNode.insertBefore(radio, insertAfter.nextSibling);
    radio.parentNode.insertBefore(br, radio.nextSibling);
}

function populateFormRadiosOnChoice() {
    var element = document.getElementById("jobselector");
    var choice = document.getElementById("selectDropdown").value;
    console.log(choice);

    for(radio of radiosArray) {
        radio.parentNode.removeChild(radio);
    }
    radiosArray = [];

    if(choice == 1) {
        addRadioHelper("Blabla 1", element);
        addRadioHelper("Blabla 2", radiosArray[radiosArray.length-1]);
        addRadioHelper("Blabla 3", radiosArray[radiosArray.length-1]);
    } else if(choice == 2) {
        addRadioHelper("SubJob 1", element);
        addRadioHelper("SubJob 2", radiosArray[radiosArray.length-1]);
    } else if(choice == 3) {
        addRadioHelper("Placeholder 1", element);
        addRadioHelper("Placeholder 2", radiosArray[radiosArray.length-1]);
        addRadioHelper("Placeholder 3", radiosArray[radiosArray.length-1]);
        addRadioHelper("Placeholder 4", radiosArray[radiosArray.length-1]);
        addRadioHelper("Placeholder 5", radiosArray[radiosArray.length-1]);
        addRadioHelper("Placeholder 6", radiosArray[radiosArray.length-1]);
    }
}

function populateForm(idName) {
    var element = document.getElementById(idName);

    element.appendChild(getInputByType("text", "input", "Nume si Prenume")); addSpacer(idName, 1);
    element.appendChild(getInputByType("text", "input", "Email")); addSpacer(idName, 1);
    element.appendChild(getInputByType("password", "input", "Parola")); addSpacer(idName, 1);
    
    var jobselect = generateSelect("Tipul jobului", [{name: "Cantaret", value: "1"}, {name: "Bucatar", value: 2}, {name: "Zugrav", value: 3}]);
    jobselect.id = "jobselector";
    element.appendChild(jobselect);

    jobselect.addEventListener('change', function() {
        populateFormRadiosOnChoice();
      });

    element.appendChild(generateSlider("Cat de multumit esti de produsul nostru", 0, 100)); addSpacer(idName, 1);
    
    element.appendChild(generateCheckbox("Esti de acord cu prelucrarea datelor?")); addSpacer(idName, 1);

    addSpacer(idName, 2);
}

function fade(element, attribute, colors) {
    var currentIndex = 0;
    var oldIndex = 0;

    var dT = 0.01;
    var accumulated_dT = 0.0;
    intervalPtr = setInterval(function() {
        if (accumulated_dT >= 1.0) {
            oldIndex = currentIndex++;
            
            if(currentIndex >= colors.length) currentIndex = 0;
            accumulated_dT -= 1.0;
        }
        
        var currentColor = getRGBfromHEXString(colors[currentIndex]);
        var oldColor = getRGBfromHEXString(colors[oldIndex]);
        
        var forwardLerp = lerpRGB(oldColor, currentColor, accumulated_dT);
        
        element.style = attribute + getStringfromRGB(forwardLerp);

        accumulated_dT += dT * 0.5;

    }, 10);

    return intervalPtr;
}

function fadeWithTimeout(element, attribute, colors, time) {
    setTimeout(function() { 
        var fader = fade(element, attribute, colors);

        intervalArray.push(fader);
    }, time);
}

function runMain() {
    if(running) return;

    var elements = ['SVGID_1_', 'SVGID_2_', 'SVGID_3_', 'SVGID_4_', 'SVGID_5_'];
    
    var colors = ['#ff5722', '#673ab7'];
    var colors2 = ['#673ab7', '#ff5722'];

    
    for(i=0;i<elements.length;i++) {
        var subElements = document.getElementById(elements[i]).getElementsByTagName("stop"); // array of <stop> elements inside this chosen elemen ( circle to be precise ) 
        
        fadeWithTimeout(subElements[0], "stop-color:", i % 2 == 1 ? colors : colors2, 0);
        fadeWithTimeout(subElements[1], "stop-color:", i % 2 == 1 ? colors2 : colors, 500 * (i+1));
    }

    running = true;
}

function stopMain() {
    if(!running) return;

    for(interval of intervalArray) {
        clearInterval(interval);
    }

    running = false;
}

runMain();
populateForm("thisForm");
document.addEventListener("keypress", function(e) {
    if(e.code == 'KeyP') {
        runMain();
    } else if(e.code == "KeyO") {
        stopMain();
    }
});