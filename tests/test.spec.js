const {test, expect} = require('@playwright/test');

test('Example Test', async ({page})=>{


    await page.goto("https://news.ycombinator.com/newest");
    console.log(await page.title());

    const noOfArticles = 100;
    const articleDateAndTime = new Array();
    let i =0;

    while(i<noOfArticles){
        if(i!==0 && i%30 === 0){
            await page.locator('table a.morelink').click();
        }
        // get all the article dates
        articleDateAndTime.push((await page.locator('table span.age').nth(i%30).getAttribute('title')).split(" ")[0]);
        i++;
    }
    //console.log(articleDateAndTime.length);
    //console.log(articleDateAndTime);

    // check of validate if array is sorted in descending
    const isSorted = articleDateAndTime.every((val,i,arr) => {
        if(i===0) return true;
        const current = new Date(val).getTime();
        const previous = new Date(arr[i - 1]).getTime();
        //console.log(`Comparing: ${i}-${current} <= ${i-1}-${previous} : ${current <= previous}`);
        return current <= previous;

    });
    console.log(isSorted);
    expect(isSorted).toBeTruthy();

   
});

