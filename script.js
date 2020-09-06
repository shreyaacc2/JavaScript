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
        var SessionId = document.getElementById('SessionId');
             SessionId.innerHTML = SessionId.innerHTML +
                '<option value="-1">--Session ID--</option>';

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

        
        populateMarketDropdown(excelRows);
        populateErrorsDropdown(excelRows);
        populatesSessioIdDropdown(excelRows);
        populateErrorMessage(excelRows);
}

function populateMarketDropdown(excelRows){
    const data = excelRows;
    var market = document.getElementById('market').selectedIndex;
    const index = document.getElementsByTagName("option")[market].value;
    const Market = _.countBy(data, function(data) { return data.Market; });
    let MarketValue = Object.keys(Market);
    
    var markets = document.getElementById('market');
        for (var i = 0; i < MarketValue.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            markets.innerHTML = markets.innerHTML +
                '<option value="' + MarketValue[i] + '">' + MarketValue[i] + '</option>';
        }
 

}
function populateErrorsDropdown(excelRows){
    const data = excelRows;
    var error = document.getElementById('error').selectedIndex;
    const index = document.getElementsByTagName("option")[error].value;
    const Error = _.countBy(data, function(data) { return data.Error; });
    let ErrorValue = Object.keys(Error);
    
    var errors = document.getElementById('error');
        for (var i = 0; i < ErrorValue.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
        errors.innerHTML = errors.innerHTML +
                '<option value="' + ErrorValue[i]+ '">' + ErrorValue[i] + '</option>';
        }
           
    // populate count dropdown            
    var noOferrors = document.getElementById('No_Of_Error');
        noOferrors.innerHTML = noOferrors.innerHTML +
                    '<option value="' + 0 + '">' + ErrorValue.length + '</option>';            
    
 
}

function populatesSessioIdDropdown(excelRows){
    
    const data = excelRows;
    var sessionId = document.getElementById('SessionId').selectedIndex;
    const index = document.getElementsByTagName("option")[sessionId].value;
    const SessionId = _.countBy(data, function(data) { return data.Session_ID; });
    let SessionIdValue = Object.keys(SessionId);
    
    var SessionIdElement = document.getElementById('SessionId');
        for (var i = 0; i < SessionIdValue.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            SessionIdElement.innerHTML = SessionIdElement.innerHTML +
                '<option value="' + SessionIdValue[i]+ '">' + SessionIdValue[i] + '</option>';
    
        }
}

function populateErrorMessage(excelRows){

    const data = excelRows;
    var errorMessage = document.getElementById('errorMessage').selectedIndex;
    const index = document.getElementsByTagName("option")[errorMessage].value;
    const UniqueErrorMessage= _.countBy(data, function(data) { return data.Error_Message; });
    let ErrorMessageValue = Object.keys(UniqueErrorMessage);
    
    var errors = document.getElementById('errorMessage');
        for (var i = 0; i < ErrorMessageValue.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            errors.innerHTML = errors.innerHTML +
                '<option value="' + ErrorMessageValue[i]+ '">' + ErrorMessageValue[i] + '</option>';
    
        }
}
/**function ClearOptions(id) to clear the dropdown
{
	document.getElementById(id).options.length = 0;
}
 */

var SelectedMarket;
function SetMarketValue(Market)
{    SelectedMarket = Market;
    MarketRowsreturn(SelectedMarket);
    const MarketRows =  excelRows.filter(item => item.Market === Market)
    rePopulateDropdowns(MarketRows);
    return MarketRows;

}

function MarketRowsreturn(SelectedMarket){
    console.log(SelectedMarket);
    const MarketRows =  excelRows.filter(item => item.Market === SelectedMarket);
    console.log(MarketRows);
    return MarketRows;
}

function rePopulateDropdowns(MarketValue){
    //reset all drop downs to zero
  //  document.getElementById('No_Of_Error').options.length = 0;
    document.getElementById('SessionId').options.length = 0
    document.getElementById('errorMessage').options.length = 0;

    
    //repopulate the data according to market
    const data = MarketValue;
    // repopulate error and number of error
    const Error = _.countBy(data, function(data) { return data.Error; });
    
    let ErrorValue = Object.keys(Error);
    document.getElementById('error').options.length = 0;
    var errors = document.getElementById('error');
        for (var i = 0; i < ErrorValue.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            errors.innerHTML = errors.innerHTML +
                '<option value="' + ErrorValue[i]+ '">' + ErrorValue[i] + '</option>';
        }
           
    // populate number of error dropdown    
    document.getElementById('No_Of_Error').options.length = 0;        
    var noOferrors = document.getElementById('No_Of_Error');
        noOferrors.innerHTML = noOferrors.innerHTML +
                    '<option value="' + 0 + '">' + ErrorValue.length + '</option>';  

    // populate session ID dropdown
    document.getElementById('SessionId').options.length = 0
    var sessionIdelement = document.getElementById('SessionId');
        for (var i = 0; i < data.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            sessionIdelement.innerHTML = sessionIdelement.innerHTML +
                '<option value="' + data[i].Session_ID+ '">' + data[i].Session_ID + '</option>';
    
        }
    
     // populate error Message
     const UniqueErrorMessage= _.countBy(data, function(data) { return data.Error_Message; });
    let ErrorMessageValue = Object.keys(UniqueErrorMessage);

    var errors = document.getElementById('errorMessage');
        for (var i = 0; i < ErrorMessageValue.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            errors.innerHTML = errors.innerHTML +
                '<option value="' + ErrorMessageValue[i]+ '">' + ErrorMessageValue[i] + '</option>';
    
        }   

    
                    
}


function SetErrorValue(error)
{
    
    populateCountMappedWithError(error);
}

function populateCountMappedWithError(ErrorValue){  
  const MarketRows = MarketRowsreturn(SelectedMarket);
 
  const getMarketErrors = MarketRows.filter(item => item.Error == ErrorValue);
  console.log(getMarketErrors);
  console.log(getMarketErrors.length);
  document.getElementById('No_Of_Error').options.length = 0;
  var noOferrors = document.getElementById('No_Of_Error');
        noOferrors.innerHTML = noOferrors.innerHTML +
                    '<option value="' + 0 + '">' + getMarketErrors.length + '</option>';
}


let SessionId;
function setSessionId(sessionId)
{
    SessionId = sessionId;
    populateErrorMessageMappedWithSession(SessionId);

}

function populateErrorMessageMappedWithSession(SessionId) 
{
  const MarketRows = MarketRowsreturn(SelectedMarket);
 
  const getSessionIdRow = MarketRows.filter(item => item.Session_ID == SessionId);
  console.log(getSessionIdRow);

  document.getElementById('errorMessage').options.length = 0;
  var errorsMessage = document.getElementById('errorMessage');
        for (var i = 0; i < getSessionIdRow.length; i++) {
            // POPULATE SELECT ELEMENT WITH JSON.
            errorsMessage.innerHTML = errorsMessage.innerHTML +
                '<option value="' + getSessionIdRow[i].Error_Message+ '">' + getSessionIdRow[i].Error_Message + '</option>';
    
        } 


  
}