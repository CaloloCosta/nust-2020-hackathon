let calculate = document.getElementById('btn-calculating');

calculate.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("form").style.display = "none"
    document.getElementById("results").style.display = "block"
    pointsCalculator()
})

function pointsCalculator() {


    let student = document.querySelector(".student-name").value;
    let gender = document.querySelector(".gender").value.toUpperCase();


    english = document.getElementById("english-subject").value.toUpperCase();
    console.log(english)
    englishSymbol = document.getElementById('english-symbol').value.toUpperCase();

    let math = document.getElementById("math-subject").value.toUpperCase();
    let mathSymbol = document.getElementById("math-symbol").value.toUpperCase();


    let subject_3 = document.getElementById("subject-3").value.toUpperCase();
    let subject_3Symbol = document.getElementById("subject-3-symbol").value.toUpperCase();


    let subject_4 = document.getElementById("subject-4").value.toUpperCase();
    let subject_4Symbol = document.getElementById("subject-4-symbol").value.toUpperCase();


    let subject_5 = document.getElementById("subject-5").value.toUpperCase();
    let subject_5Symbol = document.getElementById("subject-5-symbol").value.toUpperCase();


    let subject_6 = document.getElementById("subject-6").value.toUpperCase();
    let subject_6Symbol = document.getElementById("subject-6-symbol").value.toUpperCase();

    let getOption1 = document.querySelector(".field-option1");
    let getOption2 = document.querySelector(".field-option2")

    let field_study1 = getOption1.options[getOption1.selectedIndex].value;

    let field_study2 = getOption2.options[getOption2.selectedIndex].value;


    fieldStudies = ['Management Sciences', 'Human Sciences', 'Computing and Informatics', 'Engineering', 'Health and Applied Sciences', 'Natural Resources and Spatial Sciences']


    subjectList = [english, math, subject_3, subject_4, subject_5, subject_6]

    symbolList = [englishSymbol, mathSymbol, subject_3Symbol, subject_4Symbol, subject_5Symbol, subject_6Symbol]
    let oldMarks = []
    let mainAnswer = ''
    let total = 0
    if (symbolList[0] == "U" || symbolList[0] == "F" || symbolList[0] == "U") {
        console.log("Failled!!")
    }
    else {
        let marks = []

        for (i = 0; i < symbolList.length; i++) {
            marks.push(getValue(symbolList[i]))
        }
        oldMarks = marks
        marks.sort(function (a, b) {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        });
        console.log(marks)
        total = 0
        for (i = 0; i < symbolList.length - 1; i++) {
            total += marks[i]
        }
        
        console.log('total: ', total)
        let title = gender == 'MALE' ? 'Mr.' : 'Ms.'
        if