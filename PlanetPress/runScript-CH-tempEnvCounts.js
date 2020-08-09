var pgcnt = 0;
var myPDF = Watch.GetPDFEditObject();
myPDF.Open(Watch.GetJobFileName(), false);

pgcnt=myPDF.Pages().Count();

var localPPvarName = '';
localPPvarName =`_${pgcnt / 2}page`;

Watch.SetVariable(localPPvarName, parseInt(Watch.GetVariable(localPPvarName)) + 1);
myPDF.Close();
