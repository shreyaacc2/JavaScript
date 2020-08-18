
let onHover , onMouseOut;
let MonHover1, MonOut1, MonOut2;

function Upload() {
        //Reference the FileUpload element.
        var fileUpload = document.getElementById("fileUpload");
 
        //Validate whether File is valid Excel file.

        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    };
    function ProcessExcel(data) {

        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        console.log(excelRows);
        
        var markets = document.getElementById('market');
        for (var i = 0; i < excelRows.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            markets.innerHTML = markets.innerHTML +
                '<option value="' + excelRows[i] + '">' + excelRows[i].Market + '</option>';
        }
        console.log(excelRows[0].Market)

  
       let noOfErrors = document.querySelectorAll('.dropdown-content')[3];
        let Errors =  noOfErrors.querySelectorAll('a');
        console.log(Errors);

        

        Errors[0].innerHTML = excelRows.length;
       // var n=document.getElementsByName("Market").value;
        // var p=document.getElementsByName("Error").value;
        // var q=document.getElementsByName("Error_Message").value;

        // for(var i = 0; i < n.length; i++) {
        //  alert("row 1: " + n[i].value + p[i].value + q[i].value);
        //      }
        let market = document.querySelectorAll('.dropdown-content')[1];
        let marketItems = market.querySelectorAll('a');
        MonOut1 = marketItems[0].innerHTML = excelRows[0].Market;
        MonOut1 = marketItems[1].innerHTML = excelRows[1].Market;
        MonOut1 = marketItems[2].innerHTML = excelRows[2].Market;
        MonOut1 = marketItems[3].innerHTML = excelRows[3].Market;
        MonOut1 = marketItems[4].innerHTML = excelRows[4].Market;
        MonOut1 = marketItems[5].innerHTML = excelRows[5].Market;
        MonOut1 = marketItems[6].innerHTML = excelRows[6].Market;
        MonOut1 = marketItems[7].innerHTML = excelRows[7].Market;
        MonOut1 = marketItems[8].innerHTML = excelRows[8].Market;


    

        // MonHover1 = excelRows[0].HeadEnd;

    
        let err = document.querySelectorAll('.dropdown-content')[2];
        let errItem = err.querySelectorAll('a');
        onMouseOut0 = errItem[0].innerHTML = excelRows[0].Error; 
        onMouseOut1 = errItem[1].innerHTML = excelRows[1].Error;
        onMouseOut2 = errItem[2].innerHTML = excelRows[2].Error; 
        onMouseOut3 = errItem[3].innerHTML = excelRows[3].Error;
        onMouseOut4 = errItem[4].innerHTML = excelRows[4].Error;
        onMouseOut5 = errItem[5].innerHTML = excelRows[5].Error; 
        onMouseOut6 = errItem[6].innerHTML = excelRows[6].Error;
        onMouseOut7 = errItem[7].innerHTML = excelRows[7].Error; 
        onMouseOut8 = errItem[8].innerHTML = excelRows[8].Error; 
        

        // console.log(onMouseOut)
        // onMouseOut = errItem[1].innerHTML = excelRows[1].Error;  
        
        onHover0 = excelRows[0]['Error_Message'];
        onHover1 = excelRows[1]['Error_Message'];
        onHover2 = excelRows[2]['Error_Message'];
        onHover3=  excelRows[3]['Error_Message'];
        onHover4 = excelRows[4]['Error_Message'];
        onHover5 = excelRows[5]['Error_Message'];
        onHover6 = excelRows[6]['Error_Message'];
        onHover7 = excelRows[7]['Error_Message'];
        onHover8 = excelRows[8]['Error_Message'];

        


        /*for( let i = 0 ; i < excelRows.length; i++){
            let valuesArray = Object.values(excelRows[i])
            for(value of valuesArray){
                console.log(value);
            }
        }*/
    };
    

  
function changeText(){
    let err = document.querySelectorAll('.dropdown-content')[2];
    let errItem = err.querySelectorAll('a');
    errItem[0].innerHTML = onHover0
    errItem[1].innerHTML = onHover1
    errItem[2].innerHTML = onHover2
    errItem[3].innerHTML = onHover3
    errItem[4].innerHTML = onHover4
    errItem[5].innerHTML = onHover5
    errItem[6].innerHTML = onHover6
    errItem[7].innerHTML = onHover7
}

function backText(){
    let err = document.querySelectorAll('.dropdown-content')[2];
    let errItem = err.querySelectorAll('a');
    errItem[0].innerHTML = onMouseOut0;
    errItem[1].innerHTML = onMouseOut1;
    errItem[2].innerHTML = onMouseOut2;
    errItem[3].innerHTML = onMouseOut3;
    errItem[4].innerHTML = onMouseOut4;
    errItem[5].innerHTML = onMouseOut5;
    errItem[6].innerHTML = onMouseOut6;
    errItem[7].innerHTML = onMouseOut7;

}

function MonHover() {

    let market = document.querySelectorAll('.dropdown-content')[1];
    let marketItems = market.querySelectorAll('a');
    // marketItems[0].innerHTML = MonHover1;
    // marketItems[1].innerHTML = MonHover1;
}

function MonOut(){
    let market = document.querySelectorAll('.dropdown-content')[1];
    let marketItems = market.querySelectorAll('a');
    // marketItems[0].innerHTML = MonOut1;
    // marketItems[1].innerHTML = MonOut2;
}

let currentDate = new Date();

date.innerHTML = currentDate;