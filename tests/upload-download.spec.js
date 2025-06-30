const ExcelJS = require('exceljs');
const {test,expect} = require('@playwright/test');

async function writeExcel(searchText,replaceText,changeObj,filePath) {
const workbook = new ExcelJS.Workbook();

// read the file path
await workbook.xlsx.readFile(filePath);
const worksheet = workbook.getWorksheet('Sheet1');
const output = await readExcel(worksheet,searchText);
// update the cell value to new value
const cell = worksheet.getCell(output.row,output.col+changeObj.colChange);
cell.value = replaceText;

// write to file
await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet,searchText) {
    let output = {row:-1, col:-1};
    worksheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell,colNumber)=>{
            if(cell.value === searchText){
                output.row = rowNumber;
                output.col = colNumber;
            }
        });
    });
return output;
}
// Update the price of mango to 350
// writeExcel(searchText,replaceText,changeObj,filePath);
//writeExcel("Mango",350,{rowChange:0,colChange:2},"./ExcelDownloadTest.xlsx");

test("Download and upload test - Update the price of mango to 350", async ({page})=>{

    const searchText = 'Mango';
    const updateValue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    // we need till dowload is finished
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button",{name:"Download"}).click();
    const download = await downloadPromise;
   
    // need to explicitly save the file in downloads section - DON'T SKIP THIS STEP
    await download.saveAs("/Users/uthra/Downloads/" + download.suggestedFilename());
    // update the excel file value
    writeExcel(searchText,updateValue,{rowChange:0,colChange:2},"/Users/uthra/Downloads/download.xlsx");
   
    // upload the file
    await page.locator("#fileinput").click();
    // to select the input file to be uploaded
    await page.locator("#fileinput").setInputFiles("/Users/uthra/Downloads/download.xlsx");

    // ASSERT, the value is updated
    //get the locator, of the value containg mango
    const textLoc = page.getByText(searchText);
    // from the child we will try to loacte the parent row
    const rowLoc = await page.getByRole('row').filter({has:textLoc});
    // since we got the row, we can identify the price column through it

    await expect(rowLoc.locator("#cell-4-undefined")).toContainText(updateValue);
    console.log(await rowLoc.locator("#cell-4-undefined").textContent() );
});