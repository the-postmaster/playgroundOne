var pgcnt = 0;
var myPDF = Watch.GetPDFEditObject();
myPDF.Open(Watch.GetJobFileName(), false);

pgcnt=myPDF.Pages().Count();

var varName = '';
varName ="_" + (pgcnt/2) + "page";

Watch.SetVariable(varName, parseInt(Watch.GetVariable(varName)) + 1);
myPDF.Close();
