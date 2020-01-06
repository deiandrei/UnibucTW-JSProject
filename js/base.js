function addSpacer(idName, count = 1) {
    for(i=0;i<count;i++) {
        document.getElementById(idName).appendChild(document.createElement("br"));
    }
}

function getInputByType(type, className, placeholder) {
    var input = document.createElement("input");
    input.className = className;
    input.placeholder = placeholder;
    input.type = type;
    
    return input;
}

function populateForm(idName) {
    document.getElementById(idName).appendChild(getInputByType("text", "input", "Nume si Prenume")); addSpacer(idName, 1);
    document.getElementById(idName).appendChild(getInputByType("text", "input", "Email")); addSpacer(idName, 1);
    document.getElementById(idName).appendChild(getInputByType("password", "input", "Parola")); addSpacer(idName, 1);
    
    var checkbox = getInputByType("checkbox", "", "");
    checbox.setAttribute("id", "test");
    var checboxrow = document.createElement("div");
    var checboxlabel = document.createElement("label");
    checboxlabel.for = "test";
    checboxlabel.appendChild(document.createTextNode("LOL"));
    checboxrow.appendChild(checboxlabel);
    checboxrow.appendChild(checkbox);
    
    document.getElementById(idName).appendChild(checboxrow); addSpacer(idName, 1);
    
    addSpacer(idName, 2);
}


populateForm("thisForm");