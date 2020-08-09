/* 
VBScript code

dim filesys
dim hfileHome, newHome, manifestFile

hfile = "C:\Catholic Healthcare\Header FIles\top.lpf"
newfile = "C:\Catholic Healthcare\Print Output\"  & Replace(Watch.GetVariable("Manifest_Name"),"MANIFEST","LABEL") &".lpf"
manifestFile =  "C:\Catholic Healthcare\Print Output\" & Watch.GetVariable("Manifest_Name") &".txt"

set filesys=CreateObject("Scripting.FileSystemObject")
filesys.CopyFile hfile, newfile
Set filesys = Nothing

Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.OpenTextFile(manifestFile, 1)
Dim x
x = 1
d = CDate(Now())
Dim g()
Do While objFile.AtEndOfStream = False
    strLine = objFile.ReadLine
    If InStr(strLine, "Number") <> 0 then
       strLine = nextLine(2)
       addLine = "R,1,2" & Mid(strLine,43,2) & ",S," & Replace(Mid(strLine,57,12), " ", "") & "," & chr(34) & FormatDateTime(Now(),1) & chr(34)

       ReDim Preserve g(x)
       g(x) = addLine
       x=x+1
    End If
    IF InStr(strLine, "% Volume") <> 0 then
       strLine = nextLine(4)
       addLine = "R,2,4,S," & Replace(Mid(strLine,45,12), " ", "") & "," & chr(34) & FormatDateTime(Now(),1) & chr(34)
       ReDim Preserve g(x)
       g(x) = addLine
        x=x+1
       strLine = nextLine(3)
       addLine = "R,5,4,S," & Replace(Mid(strLine,45,12), " ", "") & "," & chr(34) & FormatDateTime(Now(),1) & chr(34)
       ReDim Preserve g(x)
       g(x) = addLine
       x=x+1
    end if

Loop
ReDim Preserve g(x)
addLine = "#End Of File"
g(x) = addLine
Set objFile = Nothing

Set objFile = objFSO.OpenTextFile(newfile, 8)
For y = 1 to x
    objFile.WriteLine(g(y))
Next

Set objFile = Nothing
Set objFSO = Nothing

Function nextLine (ll)
    For l = 1 to ll
        thisLine = objFile.ReadLine
    next
    nextLine = thisLine
end function
 */
let findStart = 'Sort Plan';
let findStop ='';
const manifest = Watch.GetVariable('Manifest_Name'); //"Watch" is PlanetPress Workflow's automation object
const hfile = 'C:\\Catholic Healthcare\\Header FIles\\top.lpf'; //Label header file
const newfile = `C:\\Catholic HealthcarePrint Output\\${manifest.replace('MANIFEST','LABEL')}.lpf`; //new label file
const manifestFile =  `C:\\Catholic HealthcarePrint Output\\${manifest}.txt`; //manifest file output location

//copy header file to output folder and rename
const filesys = new ActiveXObject('Scripting.FileSystemObject');
let copyHFile = filesys.CopyFile(hfile, newfile);
copyHFile= undefined;

//open manifest file and read contents
let objFile = filesys.OpenTextFile(manifestFile, 1);

skipLine(6); //get to the first state

let arrSortPlans = [];

while (!objFile.AtEndOfStream()) {
    let inside = false;
    let strLine = objFile.ReadLine();
    if (inside){
        arrSortPlans.push(strLine);
    } 
    if (strLine === '                                   Sort Plan') {
        inside = true;
        objFile.SkipLine();
        objFile.SkipLine();
    }
    
    if (strLine === '                                      ------      ------       -----') {
        inside = false;
    }
    

}

function skipLine (lines) {
    for (let i = 1; i <= lines; i++) {
        objFile.ReadLine();
    }
}

