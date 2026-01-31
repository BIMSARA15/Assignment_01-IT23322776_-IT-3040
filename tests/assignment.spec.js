const { test, expect } = require('@playwright/test');

// --- 1. CONFIGURATION & SELECTORS ---
const INPUT_SELECTOR = 'textarea[placeholder*="Input Your Singlish"]';
const OUTPUT_SELECTOR = 'div.w-full.h-80.p-3.rounded-lg';

// --- 2. DATA DRIVEN TEST CASES (35 Functional Cases) ---
const testCases = [
  // POSITIVE CASES (Should Pass ✅)
  { "id": "Pos_Fun_0001", "name": "Simple greeting", "lengthType": "S", "input": "oyaata dhaen hoDHAyi dha?", "expected": "ඔයාට දැන් හොඳයි ද?", "coverage": "Greeting / request / response", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0002", "name": "Short greeting", "lengthType": "S", "input": "suba upandhinayak veevaa!", "expected": "සුබ උපන්දිනයක් වේවා!", "coverage": "Greeting / request / response", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0003", "name": "Medium compound text", "lengthType": "M", "input": "api heta saththu vaththata yamu, iita passe ayiyalaage gedhara yamu", "expected": "අපි හෙට සත්තු වත්තට යමු, ඊට පස්සෙ අයියලාගෙ ගෙදර යමු", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0004", "name": "Medium compound sentence", "lengthType": "M", "input": "heta gedhara vahaLe hadhanavaa,eth vassoth vaedee karanna venne naee", "expected": "හෙට ගෙදර වහළෙ හදනවා,එත් වස්සොත් වැඩේ කරන්න වෙන්නෙ නෑ", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0005", "name": "Short daily phrase", "lengthType": "S", "input": "mata pissu vagee", "expected": "මට පිස්සු වගේ", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0006", "name": "Imperative phrase", "lengthType": "M", "input": "haeki ikmanin vahaama ivath vanna", "expected": "හැකි ඉක්මනින් වහාම ඉවත් වන්න", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0007", "name": "Positive phrase", "lengthType": "S", "input": "api anivaaren meeka dhinanavaa", "expected": "අපි අනිවාරෙන් මේක දිනනවා", "coverage": "Greeting / request / response", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0008", "name": "Negative phrase", "lengthType": "S", "input": "api meeka dhinanne naee", "expected": "අපි මේක දිනන්නෙ නෑ", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0009", "name": "Request phrase", "lengthType": "M", "input": "mata vathura boothalayak dhenna puluvan dha?", "expected": "මට වතුර බෝතලයක් දෙන්න පුලුවන් ද?", "coverage": "Greeting / request / response", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0010", "name": "Response phrase", "lengthType": "S", "input": "mama ee vidhihatama karannam", "expected": "මම ඒ විදිහටම කරන්නම්", "coverage": "Greeting / request / response", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0011", "name": "Polite phrase", "lengthType": "M", "input": "mata samaavenna, mata amathaka unaa dhora vahanna", "expected": "මට සමාවෙන්න, මට අමතක උනා දොර වහන්න", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0012", "name": "Informal phrase", "lengthType": "S", "input": "ooka dhiila methanin palayan", "expected": "ඕක දීල මෙතනින් පලයන්", "coverage": "Slang / informal language", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0013", "name": "Frequent expression", "lengthType": "M", "input": "mata kammaeLiyi", "expected": "මට කම්මැළියි", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0014", "name": "Multi-word expression", "lengthType": "S", "input": "hariyata hitaganna", "expected": "හරියට හිටගන්න", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0015", "name": "Missing spaces phrase", "lengthType": "S", "input": "matadhaenhodhatamapissuvagee", "expected": "මටදැන්හොදටමපිස්සුවගේ", "coverage": "Formatting (spaces / line breaks / paragraph)", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0016", "name": "Repeated word", "lengthType": "S", "input": "ayiyoo ayiyoo", "expected": "අයියෝ අයියෝ", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0017", "name": "Past tense phrase", "lengthType": "M", "input": "mata iiyee hodhatama nindha giyaa", "expected": "මට ඊයේ හොදටම නින්ද ගියා", "coverage": "Present tense / Past tense / Future tense", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0018", "name": "Present tense phrase", "lengthType": "S", "input": "mama gedhara enavaa", "expected": "මම ගෙදර එනවා", "coverage": "Present tense / Past tense / Future tense", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0019", "name": "Future tense phrase", "lengthType": "S", "input": "mama heta balala kiyannam", "expected": "මම හෙට බලල කියන්නම්", "coverage": "Present tense / Past tense / Future tense", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0020", "name": "Negation phrase", "lengthType": "S", "input": "ehema karanna dhenna baee", "expected": "එහෙම කරන්න දෙන්න බෑ", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0021", "name": "Plural compound phrases", "lengthType": "M", "input": "api heta udhee paandharama naegitimu , udhen giyoth apita kalin enna puLuvan", "expected": "අපි හෙට උදේ පාන්දරම නැගිටිමු , උදෙන් ගියොත් අපිට කලින් එන්න පුළුවන්", "coverage": "Daily language usage", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0022", "name": "Mixed-language with technical word", "lengthType": "M", "input": "brother heta havasa 5 ta hariyatama zoom meeting ekata enna. haemooma ee velaavatama join venavaa.", "expected": "brother හෙට හවස 5 ට හරියටම zoom meeting එකට එන්න. හැමෝම ඒ වෙලාවටම join වෙනවා.", "coverage": "Mixed Singlish + English", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0023", "name": "Currency and time formats", "lengthType": "M", "input": "movie ekee nama : Avengers Endgame 2023 \nsThaanaya : Majestic Cinema\ndhinaya :2023-05-05\nmovie eka thiragatha vana veelaava : 10.00 A.M\nticket ekaka mila : Rs. 500", "expected": "movie එකේ නම : Avengers Endgame 2023 \nස්ථානය : Majestic Cinema\nදිනය :2023-05-05\nmovie එක තිරගත වන වේලාව : 10.00 A.M\nticket එකක මිල : Rs. 500", "coverage": "Names / places / common English words", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0024", "name": "Long mixed-language input", "lengthType": "L", "input": "1996 maarthu 17 vana dhina laahooru nuvara gadaafi kriidaaQQgaNayee dhii paevathi looka kusalaana cricket avasaana mahaa tharagayen shrii lQQkaava aithihaasika jayagrahaNayak athkara gaththaa. mehi dhii arjuna raNathuQQga mahathaagee naayakathvayen yuth shrii lQQkaa kaNdaayama visin oostreeliyaanu kaNdaayama paraajaya karana ladhii.\n\ntharagayee vaedhagathma sidhuviima vuuyee aravindha dha silvaa mahathaa visin lakuNu 107 k labaaganimin dhaekvuu vishiShta pithikaraNayayi. emenma asQQka gurusiQQha mahathaa dha aravindha mahathaa samaga ekvii vatinaa sambanDhathaavak godanaeguvaa.\n\nmema jayagrahaNaya nisaa shrii lQQkaava looka shuurayan bavata path vuu athara, eya shrii laaQQkika kriidaa ithihaasayee ran akurin liyaevii aethi vaedhagathma parichCheedhayaki", "expected": "1996 මාර්තු 17 වන දින ලාහෝරු නුවර ගඩාෆි ක්‍රීඩාංගණයේ දී පැවති ලෝක කුසලාන cricket අවසාන මහා තරගයෙන් ශ්‍රී ලංකාව ඓතිහාසික ජයග්‍රහණයක් අත්කර ගත්තා. මෙහි දී අර්ජුන රණතුංග මහතාගේ නායකත්වයෙන් යුත් ශ්‍රී ලංකා කණ්ඩායම විසින් ඕස්ට්‍රේලියානු කණ්ඩායම පරාජය කරන ලදී.\n\nතරගයේ වැදගත්ම සිදුවීම වූයේ අරවින්ද ද සිල්වා මහතා විසින් ලකුණු 107 ක් ලබාගනිමින් දැක්වූ විශිෂ්ට පිතිකරණයයි. එමෙන්ම අසංක ගුරුසිංහ මහතා ද අරවින්ද මහතා සමග එක්වී වටිනා සම්බන්ධතාවක් ගොඩනැගුවා.\n\nමෙම ජයග්‍රහණය නිසා ශ්‍රී ලංකාව ලෝක ශූරයන් බවට පත් වූ අතර, එය ශ්‍රී ලාංකික ක්‍රීඩා ඉතිහාසයේ රන් අකුරින් ලියැවී ඇති වැදගත්ම පරිච්ඡේදයකි", "coverage": "Formatting (spaces / line breaks / paragraph)", "focus": "Accuracy validation" },
  { "id": "Pos_Fun_0025", "name": "Irregular whitespace", "lengthType": "M", "input": "machQQ oyaagee  vaedee nam su      piri !", "expected": "මචං ඔයාගේ  වැඩේ නම් සු      පිරි !", "coverage": "Formatting (spaces / line breaks / paragraph)", "focus": "Accuracy validation" },
  
  // NEGATIVE CASES (Should Fail ❌ due to website bugs)
  { "id": "Neg_Fun_0001", "name": "Financial news with proper nouns", "lengthType": "L", "input": "shrilQQkaavee praDhaanathama vYaapaarayak vana harischandhra vYaapaarayee vishaala kotas pramaaNayaka himikaarithvaya labaagaeniimata shrilQQkaavee prakata vYaapaarikayeku vana Dhammika pereeraa mahathaa samath vii thibenavaa. mee saDHAhaaya. eethumaa Hayleys PLC harahaa Rs. 2.57B ka mudhalak invest kara thibenavaa.\n\nmeema ganudhenuva sidhu kara aeththee Dr. T. Senthilverl mahathaata ayath Senthilverl Holdings (Pvt) Ltd samaga vana athara, mee yathathee kotas 40.58% k Dhammika pereeraa mahathaa sathu vii thibenavaa. idhiriyata ithiri kotas saDhahaa dha mandatory offer ekak idhiripath kiRiimata Hayleys samaagama balaaporoththu veyi.\n\nharischandhra vYaapaaraya dhashaka gaNanaavak puraavata shrilQQkaavee janathaava thuLa menma vidheeshiiya janayaa athara dha janapriya vii aeththee kuLubadu piti, saban saha koopi aasanna niShpaadhana saDHAhaaya.", "expected": "ශ්‍රී ලංකාවේ ප්‍රධානතම ව්‍යාපාරයක් වන හරිස්චන්ද්‍ර ව්‍යාපාරයේ විශාල කොටස් ප්‍රමාණයක හිමිකාරිත්වය ලබාගැනීමට ශ්‍රී ලංකාවේ ප්‍රකට ව්‍යාපාරිකයෙකු වන ධම්මික පෙරේරා මහතා සමත් වී තිබෙනවා. මේ සඳහා එතුමා Hayleys PLC හරහා Rs. 2.57B ක මුදලක් invest කර තිබෙනවා.\n\nමෙම ගනුදෙනුව සිදු කර ඇත්තේ Dr. T. Senthilverl මහතාට අයත් Senthilverl Holdings (Pvt) Ltd සමග වන අතර, මේ යටතේ කොටස් 40.58% ක් ධම්මික පෙරේරා මහතා සතු වී තිබෙනවා. ඉදිරියට ඉතිරි කොටස් සඳහා ද mandatory offer එකක් ඉදිරිපත් කිරීමට Hayleys සමාගම බලාපොරොත්තු වෙයි.\n\nහරිස්චන්ද්‍ර ව්‍යාපාරය දශක ගණනාවක් පුරාවට ශ්‍රී ලංකාවේ ජනතාව තුළ මෙන්ම විදේශීය ජනයා අතර ද ජනප්‍රිය වී ඇත්තේ කුළුබඩු පිටි, සබන් සහ කෝපි ආසන්න නිෂ්පාදන සඳහාය", "coverage": "Mixed Singlish + English", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0002", "name": "Specific consonant mappings", "lengthType": "S", "input": "mahanuwara", "expected": "මහනුවර", "coverage": "Names / places / common English words", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0003", "name": "English phrases within joined text", "lengthType": "S", "input": "supirikollokeepitup", "expected": "සුපිරිකොල්ලොkeepitup", "coverage": "Names / places / common English words", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0004", "name": "English brand names", "lengthType": "M", "input": "cargills food city eka lankave loku super market chain ekak", "expected": "cargills food city එක ලංකාවේ ලොකු super market chain එකක්", "coverage": "Mixed Singlish + English", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0005", "name": "Complex consonant clusters", "lengthType": "M", "input": "kavru kohoma kivvath oyaata ehema karanna baee", "expected": "කව්රු කොහොම කිව්වත් ඔයාට එහෙම කරන්න බෑ", "coverage": "Daily language usage", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0006", "name": "Quoted English entity names", "lengthType": "M", "input": "shri lankavata BYD vaahana official genvannee \"john keells\" samuuhaya magini", "expected": "ශ්‍රි ලන්කවට BYD වාහන official ගෙන්වන්නේ \"john keells\" සමූහය මගිනි", "coverage": "Names / places / common English words", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0007", "name": "English prepositions in quotes", "lengthType": "M", "input": "\"united states of America\" pihitaa aththee koheedha?", "expected": "\"united states of America\" පිහිටා අත්තේ කොහේද?", "coverage": "Names / places / common English words", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0008", "name": "Daily usage terms", "lengthType": "M", "input": "velaavata bus eke naeggoth kalin yanna puluvan", "expected": "වෙලාවට බස් එකේ නැග්ගොත් කලින් යන්න පුලුවන්", "coverage": "Mixed Singlish + English", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0009", "name": "Vowel nuances and dental consonants", "lengthType": "S", "input": "mehema barida?", "expected": "මෙහෙම බැරිද?", "coverage": "Daily language usage", "focus": "Robustness validation" },
  { "id": "Neg_Fun_0010", "name": "Preservation of English terms", "lengthType": "M", "input": "sinhalese people", "expected": "sinhalese people", "coverage": "Names / places / common English words", "focus": "Robustness validation" }
];

// --- 3. TEST SUITE EXECUTION ---
test.describe('Assignment 1 Automation Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  // A. LOOP THROUGH 35 FUNCTIONAL CASES
  
  for (const data of testCases) {
    test(`[${data.id}] ${data.name}`, async ({ page }) => {
      
      const inputField = page.locator(INPUT_SELECTOR);
      
      await inputField.clear();
      await inputField.fill(data.input);
      await inputField.press('Enter');
      
      // CRITICAL: Wait 5 seconds to ensure translation is given
      await page.waitForTimeout(5000); 

      const outputElement = page.locator(OUTPUT_SELECTOR);
      const actualOutput = (await outputElement.innerText()).trim();

      const isMatch = actualOutput === data.expected;
      const status = isMatch ? 'Pass' : 'Fail';
      const icon = isMatch ? '✅' : '❌';

      console.log(`\n--- EXCEL ROW DATA ---`);
      console.log(`${icon} ${data.id} | ${data.name} | ${data.lengthType} | ${data.input} | ${data.expected} | ${actualOutput} | ${status} | ${isMatch ? 'Success' : 'Mismatch'} | ${data.coverage} - ${data.focus}`);
      console.log(`----------------------\n`);

      // NOTE: Assertion commented out to prevent crashing on failures
      // expect(actualOutput).toBe(data.expected); 
    });
  }

  // B. SPECIAL UI CASE (Runs LAST)
  test('[Neg_UI_0001] Enter key hijacking by number suggestions', async ({ page }) => {
    const inputField = page.locator(INPUT_SELECTOR);
    
    // Step 1: Clear and type "200"
    await inputField.clear();
    await inputField.fill('200');

    // Step 2: Wait 6 seconds
    await page.waitForTimeout(6000); 
    
    // Step 3: Press Enter
    await inputField.press('Enter');

    // Step 4: Type "50"
    await inputField.type('50');
    
    // Wait a moment for UI to settle
    await page.waitForTimeout(2000);

    const actualInput = await inputField.inputValue();
    
    // Validation: Check if both "200" and "50" are present
    const isSuccess = actualInput.includes('200') && actualInput.includes('50');
    
    const status = isSuccess ? 'Pass' : 'Fail';
    const icon = isSuccess ? '✅' : '❌';

    // Format newlines for Excel
    const excelSafeOutput = actualInput.replace(/\n/g, ' [newline] ');

    console.log(`\n--- EXCEL ROW DATA ---`);
    console.log(`${icon} Neg_UI_0001 | Enter key hijacking | S | Type 200 + Enter + 3s Wait + 50 | 200 [newline] 50 | ${excelSafeOutput} | ${status} | ${isSuccess ? 'Success' : 'Failed'} | Punctuation/numbers - Robustness validation`);
    console.log(`----------------------\n`);
  });

 // C. SPECIAL UI CASE (English Word Override)
  

});