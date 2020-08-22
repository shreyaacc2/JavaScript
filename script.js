function Upload() {
        var options = document.querySelectorAll('#market option');
        options.forEach(o => o.remove());
        var markets = document.getElementById('market');
            markets.innerHTML = markets.innerHTML +
                '<option value="-1">--Market--</option>';
        var options = document.querySelectorAll('#error option');
        options.forEach(o => o.remove());
        var error = document.getElementById('error');
        error.innerHTML = error.innerHTML +
            '<option value="-1">--Errors--</option>';
        var options = document.querySelectorAll('#No_Of_Error option');
        options.forEach(o => o.remove());
        var no_of_errors = document.getElementById('No_Of_Error');
            no_of_errors.innerHTML = no_of_errors.innerHTML +
                '<option value="-1">--No Of Errors--</option>';
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
    var excelRows;
    function ProcessExcel(data) {

        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        console.log(excelRows);
        
        var markets = document.getElementById('market');
        for (var i = 0; i < excelRows.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            markets.innerHTML = markets.innerHTML +
                '<option value="' + i + '">' + excelRows[i].Market + '</option>';
        }
        var errors = document.getElementById('error');
        for (var i = 0; i < excelRows.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            errors.innerHTML = errors.innerHTML +
                '<option value="' + i + '">' + excelRows[i].Error + '</option>';
    
        }

        var opt = document.createElement('option');
        opt.value = 0;
        opt.text = excelRows.length;
        No_Of_Error.options.add(opt);
        
}    

function populate(){

    var market = document.getElementById('market').selectedIndex;
    const index = document.getElementsByTagName("option")[market].value;

}

function errorDetails() {
    console.log("hover");
    let error = document.getElementById('error').selectedIndex;
    const error_index = document.getElementsByTagName("option")[error].value;
    const data = excelRows;
    const count = excelRows[error_index].Count;
    changeCount(No_Of_Error,count,error_index);
    console.log(error_index)
    console.log(count);
}

function changeCount(No_Of_Error,text, value) {
    
var sel = document.getElementById('No_Of_Error');

	sel.remove(1);
    

    var opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    No_Of_Error.options.add(opt);
}
