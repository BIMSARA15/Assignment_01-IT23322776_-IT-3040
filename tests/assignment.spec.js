const { test, expect } = require('@playwright/test');

// --- 1. CONFIGURATION & SELECTORS ---
// Using the robust selectors we identified earlier
const INPUT_SELECTOR = 'textarea[placeholder*="Input Your Singlish"]';
const OUTPUT_SELECTOR = 'div.w-full.h-80.p-3.rounded-lg';

// --- 2. DATA DRIVEN TEST CASES (35 Functional Cases) ---
// Extracted from your "Assignment 1 - Test cases.xlsx" file
const testCases = [
  {
    "id": "Pos_Fun_0001",
    "name": "Convert a short daily greeting phrase",
    "lengthType": "S",
    "input": "oyaata dhaen hoDHAyi dha?",
    "expected": "ඔයාට දැන් හොඳයි ද?",
    "coverage": "Greeting / request / response",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0002",
    "name": "Convert a short  greeting phrase",
    "lengthType": "S",
    "input": "suba upandhinayak veevaa!",
    "expected": "සුබ උපන්දිනයක් වේවා!",
    "coverage": "Greeting / request / response",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0003",
    "name": "Convert a medium compound text",
    "lengthType": "M",
    "input": "api heta saththu vaththata yamu, iita passe ayiyalaage gedhara yamu",
    "expected": "අපි හෙට සත්තු වත්තට යමු, ඊට පස්සෙ අයියලාගෙ ගෙදර යමු",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0004",
    "name": " Convert a medium compound sentence",
    "lengthType": "M",
    "input": "heta gedhara vahaLe hadhanavaa,eth vassoth vaedee karanna venne naee",
    "expected": "හෙට ගෙදර වහළෙ හදනවා,එත් වස්සොත් වැඩේ කරන්න වෙන්නෙ නෑ",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0005",
    "name": "Convert a short daily phrase",
    "lengthType": "S",
    "input": "mata pissu vagee",
    "expected": "මට පිස්සු වගේ",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0006",
    "name": "Convert a medium Imperative phrase",
    "lengthType": "M",
    "input": "haeki ikmanin vahaama ivath vanna",
    "expected": "හැකි ඉක්මනින් වහාම ඉවත් වන්න",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0007",
    "name": "Convert a short positive phrase",
    "lengthType": "S",
    "input": "api anivaaren meeka dhinanavaa",
    "expected": "අපි අනිවාරෙන් මේක දිනනවා",
    "coverage": "Greeting / request / response",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0008",
    "name": "Convert a short negative phrase",
    "lengthType": "S",
    "input": "api meeka dhinanne naee",
    "expected": "අපි මේක දිනන්නෙ නෑ",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0009",
    "name": "Convert a medium  request phrase",
    "lengthType": "M",
    "input": "mata vathura boothalayak dhenna puluvan dha?",
    "expected": "මට වතුර බෝතලයක් දෙන්න පුලුවන් ද?",
    "coverage": "Greeting / request / response",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0010",
    "name": "Convert a short response phrase",
    "lengthType": "S",
    "input": "mama ee vidhihatama karannam",
    "expected": "මම ඒ විදිහටම කරන්නම්",
    "coverage": "Greeting / request / response",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0011",
    "name": "Convert a medium polite phrase",
    "lengthType": "M",
    "input": "mata samaavenna, mata amathaka unaa dhora vahanna",
    "expected": "මට සමාවෙන්න, මට අමතක උනා දොර වහන්න",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0012",
    "name": "Convert a short Informal phrase",
    "lengthType": "S",
    "input": "ooka dhiila methanin palayan",
    "expected": "ඕක දීල මෙතනින් පලයන්",
    "coverage": "Slang / informal language",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0013",
    "name": "Convert a short Frequently used day-to-day expression ",
    "lengthType": "M",
    "input": "mata kammaeLiyi",
    "expected": "මට කම්මැළියි",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0014",
    "name": "Convert a short Multi-word expressions and frequent collocation ",
    "lengthType": "S",
    "input": "hariyata hitaganna",
    "expected": "හරියට හිටගන්න",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0015",
    "name": "Convert a small Missing spaces / joined word  phrase ",
    "lengthType": "S",
    "input": "matadhaenhodhatamapissuvagee",
    "expected": "මටදැන්හොදටමපිස්සුවගේ",
    "coverage": "Formatting (spaces / line breaks / paragraph)",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0016",
    "name": "Convert a small Repeated word expression ",
    "lengthType": "S",
    "input": "ayiyoo ayiyoo",
    "expected": "අයියෝ අයියෝ",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0017",
    "name": "Convert a medium past tense phrase ",
    "lengthType": "M",
    "input": "mata iiyee hodhatama nindha giyaa",
    "expected": "මට ඊයේ හොදටම නින්ද ගියා",
    "coverage": "Present tense / Past tense / Future tense",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0018",
    "name": "Convert a small present tense phrase ",
    "lengthType": "S",
    "input": "mama gedhara enavaa",
    "expected": "මම ගෙදර එනවා",
    "coverage": "Present tense / Past tense / Future tense",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0019",
    "name": "Convert a small future tense phrase",
    "lengthType": "S",
    "input": "mama heta balala kiyannam",
    "expected": "මම හෙට බලල කියන්නම්",
    "coverage": "Present tense / Past tense / Future tense",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0020",
    "name": "Convert a small negation phrase",
    "lengthType": "S",
    "input": "ehema karanna dhenna baee",
    "expected": "එහෙම කරන්න දෙන්න බෑ",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0021",
    "name": "Convert a medium plural compound phrases",
    "lengthType": "M",
    "input": "api heta udhee paandharama naegitimu , udhen giyoth apita kalin enna puLuvan",
    "expected": "අපි හෙට උදේ පාන්දරම නැගිටිමු , උදෙන් ගියොත් අපිට කලින් එන්න පුළුවන්",
    "coverage": "Daily language usage",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0022",
    "name": "Medium mixed-language input with english technical word+ ",
    "lengthType": "M",
    "input": "brother heta havasa 5 ta hariyatama zoom meeting ekata enna. haemooma ee velaavatama join venavaa.",
    "expected": "brother හෙට හවස 5 ට හරියටම zoom meeting එකට එන්න. හැමෝම ඒ වෙලාවටම join වෙනවා.",
    "coverage": "Mixed Singlish + English",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0023",
    "name": " Medium currency, time formats, dates with mixed-language input ",
    "lengthType": "M",
    "input": "movie ekee nama : Avengers Endgame 2023 \nsThaanaya : Majestic Cinema\ndhinaya :2023-05-05\nmovie eka thiragatha vana veelaava : 10.00 A.M\nticket ekaka mila : Rs. 500",
    "expected": "movie එකේ නම : Avengers Endgame 2023 \nස්ථානය : Majestic Cinema\nදිනය :2023-05-05\nmovie එක තිරගත වන වේලාව : 10.00 A.M\nticket එකක මිල : Rs. 500",
    "coverage": "Names / places / common English words",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0024",
    "name": "Long mixed-language input with line breaks spaces",
    "lengthType": "L",
    "input": "1996 maarthu 17 vana dhina laahooru nuvara gadaafi kriidaaQQgaNayee dhii paevathi looka kusalaana cricket avasaana mahaa tharagayen shrii lQQkaava aithihaasika jayagrahaNayak athkara gaththaa. mehi dhii arjuna raNathuQQga mahathaagee naayakathvayen yuth shrii lQQkaa kaNdaayama visin oostreeliyaanu kaNdaayama paraajaya karana ladhii.\n\ntharagayee vaedhagathma sidhuviima vuuyee aravindha dha silvaa mahathaa visin lakuNu 107 k labaaganimin dhaekvuu vishiShta pithikaraNayayi. emenma asQQka gurusiQQha mahathaa dha aravindha mahathaa samaga ekvii vatinaa sambanDhathaavak godanaeguvaa.\n\nmema jayagrahaNaya nisaa shrii lQQkaava looka shuurayan bavata path vuu athara, eya shrii laaQQkika kriidaa ithihaasayee ran akurin liyaevii aethi vaedhagathma parichCheedhayaki",
    "expected": "1996 මාර්තු 17 වන දින ලාහෝරු නුවර ගඩාෆි ක්‍රීඩාංගණයේ දී පැවති ලෝක කුසලාන cricket අවසාන මහා තරගයෙන් ශ්‍රී ලංකාව ඓතිහාසික ජයග්‍රහණයක් අත්කර ගත්තා. මෙහි දී අර්ජුන රණතුංග මහතාගේ නායකත්වයෙන් යුත් ශ්‍රී ලංකා කණ්ඩායම විසින් ඕස්ට්‍රේලියානු කණ්ඩායම පරාජය කරන ලදී.\n\nතරගයේ වැදගත්ම සිදුවීම වූයේ අරවින්ද ද සිල්වා මහතා විසින් ලකුණු 107 ක් ලබාගනිමින් දැක්වූ විශිෂ්ට පිතිකරණයයි. එමෙන්ම අසංක ගුරුසිංහ මහතා ද අරවින්ද මහතා සමග එක්වී වටිනා සම්බන්ධතාවක් ගොඩනැගුවා.\n\nමෙම ජයග්‍රහණය නිසා ශ්‍රී ලංකාව ලෝක ශූරයන් බවට පත් වූ අතර, එය ශ්‍රී ලාංකික ක්‍රීඩා ඉතිහාසයේ රන් අකුරින් ලියැවී ඇති වැදගත්ම පරිච්ඡේදයකි",
    "coverage": "Formatting (spaces / line breaks / paragraph)",
    "focus": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0025",
    "name": "Preservation of irregular whitespace",
    "lengthType": "M",
    "input": "machQQ oyaagee  vaedee nam su      piri !",
    "expected": "මචං ඔයාගේ  වැඩේ නම් සු      පිරි !",
    "coverage": "Formatting (spaces / line breaks / paragraph)",
    "focus": "Accuracy validation"
  },
  {
    "id": "Neg_Fun_0001",
    "name": "Handling of long mixed-language financial news with proper nouns",
    "lengthType": "L",
    "input": "shrilQQkaavee praDhaanathama vYaapaarayak vana harischandhra vYaapaarayee vishaala kotas pramaaNayaka himikaarithvaya labaagaeniimata shrilQQkaavee prakata vYaapaarikayeku vana Dhammika pereeraa mahathaa samath vii thibenavaa. mee saDHAhaaya. eethumaa Hayleys PLC harahaa Rs. 2.57B ka mudhalak invest kara thibenavaa.\n\nmeema ganudhenuva sidhu kara aeththee Dr. T. Senthilverl mahathaata ayath Senthilverl Holdings (Pvt) Ltd samaga vana athara, mee yathathee kotas 40.58% k Dhammika pereeraa mahathaa sathu vii thibenavaa. idhiriyata ithiri kotas saDhahaa dha mandatory offer ekak idhiripath kiRiimata Hayleys samaagama balaaporoththu veyi.\n\nharischandhra vYaapaaraya dhashaka gaNanaavak puraavata shrilQQkaavee janathaava thuLa menma vidheeshiiya janayaa athara dha janapriya vii aeththee kuLubadu piti, saban saha koopi aasanna niShpaadhana saDHAhaaya.",
    "expected": "ශ්‍රී ලංකාවේ ප්‍රධානතම ව්‍යාපාරයක් වන හරිස්චන්ද්‍ර ව්‍යාපාරයේ විශාල කොටස් ප්‍රමාණයක හිමිකාරිත්වය ලබාගැනීමට ශ්‍රී ලංකාවේ ප්‍රකට ව්‍යාපාරිකයෙකු වන ධම්මික පෙරේරා මහතා සමත් වී තිබෙනවා. මේ සඳහා එතුමා Hayleys PLC හරහා Rs. 2.57B ක මුදලක් invest කර තිබෙනවා.\n\nමෙම ගනුදෙනුව සිදු කර ඇත්තේ Dr. T. Senthilverl මහතාට අයත් Senthilverl Holdings (Pvt) Ltd සමග වන අතර, මේ යටතේ කොටස් 40.58% ක් ධම්මික පෙරේරා මහතා සතු වී තිබෙනවා. ඉදිරියට ඉතිරි කොටස් සඳහා ද mandatory offer එකක් ඉදිරිපත් කිරීමට Hayleys සමාගම බලාපොරොත්තු වෙයි.\n\nහරිස්චන්ද්‍ර ව්‍යාපාරය දශක ගණනාවක් පුරාවට ශ්‍රී ලංකාවේ ජනතාව තුළ මෙන්ම විදේශීය ජනයා අතර ද ජනප්‍රිය වී ඇත්තේ කුළුබඩු පිටි, සබන් සහ කෝපි ආසන්න නිෂ්පාදන සඳහාය",
    "coverage": "Mixed Singlish + English",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0002",
    "name": "Handling small specific consonant mappings in place names",
    "lengthType": "S",
    "input": "mahanuwara",
    "expected": "මහනුවර",
    "coverage": "Names / places / common English words",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0003",
    "name": "Small Segment of English phrases within joined text",
    "lengthType": "S",
    "input": "supirikollokeepitup",
    "expected": "සුපිරිකොල්ලොkeepitup",
    "coverage": "Names / places / common English words",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0004",
    "name": "Handling of  Medium English brand names in mixed sentences",
    "lengthType": "M",
    "input": "cargills food city eka lankave loku super market chain ekak",
    "expected": "cargills food city එක ලංකාවේ ලොකු super market chain එකක්",
    "coverage": "Mixed Singlish + English",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0005",
    "name": "Handling of complex consonant clusters",
    "lengthType": "M",
    "input": "kavru kohoma kivvath oyaata ehema karanna baee",
    "expected": "කව්රු කොහොම කිව්වත් ඔයාට එහෙම කරන්න බෑ",
    "coverage": "Daily language usage",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0006",
    "name": "Handling of quoted English entity names",
    "lengthType": "M",
    "input": "shri lankavata BYD vaahana official genvannee \"john keells\" samuuhaya magini",
    "expected": "ශ්‍රි ලන්කවට BYD වාහන official ගෙන්වන්නේ \"john keells\" සමූහය මගිනි",
    "coverage": "Names / places / common English words",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0007",
    "name": "Handling of common English prepositions inside quoted strings",
    "lengthType": "M",
    "input": "\"united states of America\" pihitaa aththee koheedha?",
    "expected": "\"united states of America\" පිහිටා අත්තේ කොහේද?",
    "coverage": "Names / places / common English words",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0008",
    "name": "Inconsistent transliteration of common daily usage terms",
    "lengthType": "M",
    "input": "velaavata bus eke naeggoth kalin yanna puluvan",
    "expected": "වෙලාවට බස් එකේ නැග්ගොත් කලින් යන්න පුලුවන්",
    "coverage": "Mixed Singlish + English",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0009",
    "name": "Handling of vowel nuances and dental consonants",
    "lengthType": "S",
    "input": "mehema barida?",
    "expected": "මෙහෙම බැරිද?",
    "coverage": "Daily language usage",
    "focus": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0010",
    "name": "Inconsistent preservation of English terms",
    "lengthType": "M",
    "input": "sinhalese people",
    "expected": "sinhalese people",
    "coverage": "Names / places / common English words",
    "focus": "Robustness validation"
  }
];

// --- 3. TEST SUITE EXECUTION ---
test.describe('Assignment 1 Automation Suite', () => {

  // Setup: Go to website before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  // A. LOOP THROUGH 35 FUNCTIONAL CASES
  for (const data of testCases) {
    test(`[${data.id}] ${data.name}`, async ({ page }) => {
      
      const inputField = page.locator(INPUT_SELECTOR);
      
      // Clear and Type Input
      await inputField.clear();
      await inputField.fill(data.input);
      await inputField.press('Enter'); // Trigger conversion
      
      // Wait for output (robustness for network lag)
      await page.waitForTimeout(2500); 

      // Get Output
      const outputElement = page.locator(OUTPUT_SELECTOR);
      const actualOutput = (await outputElement.innerText()).trim();

      // Check Match
      const isMatch = actualOutput === data.expected;
      const status = isMatch ? 'Pass' : 'Fail';
      const icon = isMatch ? '✅' : '❌';

      // PRINT ROW FOR EXCEL
      console.log(`\n--- EXCEL ROW DATA ---`);
      console.log(`${icon} ${data.id} | ${data.name} | ${data.lengthType} | ${data.input} | ${data.expected} | ${actualOutput} | ${status} | ${isMatch ? 'Success' : 'Mismatch'} | ${data.coverage} - ${data.focus}`);
      console.log(`----------------------\n`);

      // Assertion
      expect(actualOutput).toBe(data.expected);
    });
  }

  // B. SPECIAL UI CASE (The 36th Case from your Excel)
  // ID: Neg_UI_0001 - Enter key hijacking
  test('[Neg_UI_0001] Enter key hijacking by number suggestions', async ({ page }) => {
    const inputField = page.locator(INPUT_SELECTOR);
    
    // Step: Type "200" and immediately press Enter
    await inputField.clear();
    await inputField.fill('200');
    await inputField.press('Enter');
    
    await page.waitForTimeout(2000);

    // Get value (Use inputValue() for textarea content)
    const actualInput = await inputField.inputValue();
    
    // Validation: Ensure the text "200" is still there (not replaced/hijacked)
    const isSuccess = actualInput.includes('200');
    const status = isSuccess ? 'Pass' : 'Fail';
    const icon = isSuccess ? '✅' : '❌';

    console.log(`\n--- EXCEL ROW DATA ---`);
    console.log(`${icon} Neg_UI_0001 | Enter key hijacking | S | Type 200 + Enter | 200 remains | ${actualInput.trim()} | ${status} | ${isSuccess ? 'Success' : 'Failed'} | Punctuation/numbers - Robustness validation`);
    console.log(`----------------------\n`);

    expect(actualInput).toContain('200');
  });

});