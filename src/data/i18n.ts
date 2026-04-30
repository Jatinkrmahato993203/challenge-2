export const translations = {
  en: {
    title: 'The Civic Compass',
    timeline: 'Timeline',
    guidedActions: 'Guided Actions',
    about: 'About',
    status: 'Status',
    noUpcoming: 'No upcoming deadlines',
    today: 'Today',
    tomorrow: 'Tomorrow',
    inDays: (days: number) => `In ${days} Days`,
    searchPlaceholder: 'Search events, deadlines, guidelines...',
    allJurisdictions: 'All Jurisdictions',
    clearSearch: 'Clear Search',
    noEventsFound: 'No events found matching your criteria.',
    noEventsTryAdjusting: 'Try adjusting your filters or clearing your search to see all upcoming deadlines and events.',
    activeUpcoming: 'Active / Upcoming',
    passed: 'Passed',
    source: 'Source',
    addToCalendar: 'Add to Calendar',
    remindMe: 'Remind Me',
    progress: 'Progress',
    stepsCompleted: (completed: number, total: number) => `${completed} / ${total} steps completed`,
    resetProgress: 'Reset Progress',
    previous: 'Previous',
    nextStep: 'Next Step',
    finishFlow: 'Finish Flow',
    backToActions: 'Back to Guided Actions',
    completedGuideTitle: "You've completed this guide!",
    completedGuideText: (flowTitle: string) => `Great job. You've successfully completed all the steps for ${flowTitle}. Make sure you've also checked off any official forms if required.`,
    copySummary: 'Copy Progress Summary',
    startOver: 'Start Over',
    requiredTasksPending: '* Required tasks pending',
    simpleMode: 'Simple Mode',
    language: 'A / अ',
    optional: 'Optional',
    step: 'Step',
    guidedActionsSubtitle: 'Step-by-step wizards to help you complete necessary election actions smoothly and correctly.',
    shareSummary: (completed: number, total: number, title: string) => `I completed ${completed}/${total} steps for '${title}' on Civic Guide.`,
    eventContent: {
      'evt-1': { title: 'Draft Electoral Roll Publication', description: 'Publication of the draft electoral roll for the upcoming Special Summary Revision. Citizens can check their names and file claims/objections.' },
      'evt-2': { title: 'Deadline for Claims and Objections (Form 6, 7, 8)', description: 'The last date to submit Form 6 (New Voter), Form 7 (Deletion/Objection), and Form 8 (Correction/Shifting) for the current revision cycle.' },
      'evt-3': { title: 'Final Electoral Roll Publication', description: 'The final, updated list of voters is published. Only citizens on this list are eligible to vote in the upcoming elections.' },
      'evt-4': { title: 'Polling Day (Phase 1)', description: 'Voting day for Phase 1 constituencies. Polls are typically open from 7:00 AM to 6:00 PM. Carry your EPIC or an approved valid photo ID.' },
      'evt-5': { title: 'Candidate Filing Deadline', description: 'Last day for individuals to submit their nomination papers to run as a candidate in the local elections.' },
      'evt-6': { title: 'Voter Information Slip Distribution Starts', description: 'Official Voter Information Slips will begin to be distributed to registered residences to inform voters of their polling station.' },
      'evt-7': { title: 'Absentee Ballot Request Deadline for Seniors/PWDs', description: 'The deadline for Senior Citizens (85+) and Persons with Disabilities (PwDs) to request an absentee ballot (Form 12D) to vote from home.' },
      'evt-8': { title: 'Counting Day / Results Declaration', description: 'Votes will be counted and the final election results will be declared across constituencies.' },
      'evt-9': { title: 'Delhi Assembly Term Ends', description: 'The expiration date of the current term for the Delhi State Legislative Assembly.' },
      'evt-10': { title: 'Karnataka Draft Electoral Roll', description: 'Publication of the draft electoral roll for Karnataka for citizens to verify details before local body elections.' },
      'evt-11': { title: 'Request Replacement Voter ID (Form 8) Deadline', description: 'Last date to submit Form 8 if you have lost your Voter ID card and need a replacement before the general election.' },
      'evt-12': { title: 'End of Election Campaign Period', description: 'Public campaigning must cease 48 hours before the end of the polling period to allow voters a silent period.' }
    },
    flowContent: {
      'flow-form-6': {
        title: 'Apply as a New Voter (Form 6)',
        step1: { title: 'Check Eligibility', desc: 'You must be an Indian citizen and 18 years of age or older on the qualifying date (typically Jan 1, Apr 1, Jul 1, or Oct 1 of the year).' },
        step2: { title: 'Gather Documents', desc: 'Keep scanned copies of your recent passport-size photograph, age proof (e.g., Birth Certificate, PAN, Aadhaar), and address proof (e.g., Aadhaar, Electricity Bill) ready.' },
        step3: { title: 'Submit Form 6', desc: 'Visit the Voters Service Portal or use the Voter Helpline Mobile App to fill and submit Form 6.' },
        items: {
          'f6-1': 'I am an Indian Citizen',
          'f6-2': 'I will be 18+ on the qualifying date',
          'f6-3': 'Passport-size photograph',
          'f6-4': 'Proof of Age',
          'f6-5': 'Proof of Ordinary Residence',
          'f6-6': 'Fill Form 6 on NVSP / App',
          'f6-7': 'Note down Reference ID for tracking'
        }
      },
      'flow-check-name': {
        title: 'Check Your Name in Voter List',
        step1: { title: 'Locate Your Details', desc: 'You can search the electoral roll using your EPIC (Voter ID No.), personal details, or mobile number.' },
        step2: { title: 'Search on Electoral Search Portal', desc: 'Go to electoralsearch.eci.gov.in and enter your details to verify your polling station and serial number.' },
        items: {
          'cn-1': 'Have EPIC number or personal details ready',
          'cn-2': 'Verified name and details in the list',
          'cn-3': 'Downloaded Voter Information Slip'
        }
      },
      'flow-replace-id': {
        title: 'Request Replacement Voter ID (Form 8)',
        step1: { title: 'Reason for Replacement', desc: 'Determine the reason you need a replacement (lost, destroyed, or mutilated). If lost, you may need a copy of the FIR.' },
        step2: { title: 'Submit Form 8', desc: 'Select the "Issue of Replacement EPIC without correction" option on Form 8 via the portal.' },
        items: {
          'ri-1': 'Know my existing EPIC number',
          'ri-2': 'Have a copy of FIR (if lost)',
          'ri-3': 'Submit Form 8 on Voters Portal',
          'ri-4': 'Pay any applicable fee (if requested)'
        }
      },
      'flow-poll-prep': {
        title: 'Prepare for Polling Station',
        step1: { title: 'Know Your Polling Location', desc: 'Identify exactly where you need to go and what time the polls are open.' },
        step2: { title: 'Gather Required Items', desc: 'Make sure you have an acceptable proof of identity to vote.' },
        items: {
          'pp-1': 'Check exact address of polling booth',
          'pp-2': 'Confirm polling hours (e.g., 7 AM to 6 PM)',
          'pp-3': 'Carry original EPIC (Voter ID)',
          'pp-4': 'Or carry approved alternate ID (Aadhaar, Passport, PAN)',
          'pp-5': 'Carry Voter Information Slip (optional but recommended)'
        }
      },
      'flow-nri': {
        title: 'Register as an Overseas (NRI) Voter — Form 6A',
        step1: { title: 'Check Eligibility', desc: 'You must be a citizen of India, absent from your place of ordinary residence in India, and not acquired citizenship of any other country.' },
        step2: { title: 'Gather Documents', desc: 'Prepare the necessary documents to upload.' },
        step3: { title: 'Submit Form 6A', desc: 'Fill out Form 6A online on the Voters Service Portal or overseasvoter.eci.gov.in.' },
        items: {
          'nri-1': 'Confirm Indian citizenship',
          'nri-2': 'Hold a valid Indian Passport',
          'nri-3': 'Passport size photograph',
          'nri-4': 'Copy of Passport (pages with photo, address in India, passport details)',
          'nri-5': 'Copy of valid visa/residence permit',
          'nri-6': 'Submit Form 6A online'
        }
      },
      'flow-pwd': {
         title: 'Voting as a Person with a Disability',
         step1: { title: 'Register as PwD Voter', desc: 'Mark yourself as a Person with Disability to avail special facilities at the polling booth or opt for home voting.' },
         step2: { title: 'Request Accommodations', desc: 'You can request a wheelchair, volunteer assistance, or a postal ballot (Form 12D) if eligible.' },
         items: {
           'pwd-1': 'Register via Saksham App or NVSP (Form 8)',
           'pwd-2': 'Receive PwD marked Voter ID',
           'pwd-3': 'Request pick-up/drop facility (if available in your district)',
           'pwd-4': 'Submit Form 12D for Home Voting (if eligible & required)'
         }
      }
    }
  },
  hi: {
    title: 'सिविक कंपास',
    timeline: 'समयरेखा',
    guidedActions: 'मार्गदर्शित कार्य',
    about: 'के बारे में',
    status: 'स्थिति',
    noUpcoming: 'कोई आगामी समय सीमा नहीं',
    today: 'आज',
    tomorrow: 'कल',
    inDays: (days: number) => `${days} दिनों में`,
    searchPlaceholder: 'इवेंट, समय सीमा, दिशानिर्देश खोजें...',
    allJurisdictions: 'सभी क्षेत्राधिकार',
    clearSearch: 'खोज साफ़ करें',
    noEventsFound: 'आपके मानदंडों से मेल खाने वाले कोई इवेंट नहीं मिले।',
    noEventsTryAdjusting: 'सभी आगामी समय-सीमाएं और इवेंट देखने के लिए अपने फ़िल्टर समायोजित करने या अपनी खोज साफ़ करने का प्रयास करें।',
    activeUpcoming: 'सक्रिय / आगामी',
    passed: 'बीत गया',
    source: 'स्रोत',
    addToCalendar: 'कैलेंडर में जोड़ें',
    remindMe: 'मुझे याद दिलाएं',
    progress: 'प्रगति',
    stepsCompleted: (completed: number, total: number) => `${total} में से ${completed} चरण पूरे हुए`,
    resetProgress: 'प्रगति रीसेट करें',
    previous: 'पिछला',
    nextStep: 'अगला चरण',
    finishFlow: 'प्रवाह समाप्त करें',
    backToActions: 'मार्गदर्शित कार्यों पर वापस जाएं',
    completedGuideTitle: "आपने यह मार्गदर्शिका पूरी कर ली है!",
    completedGuideText: (flowTitle: string) => `बहुत बढ़िया। आपने ${flowTitle} के सभी चरण सफलतापूर्वक पूरे कर लिए हैं। सुनिश्चित करें कि यदि आवश्यक हो तो आपने कोई आधिकारिक फॉर्म भी जांच लिया है।`,
    copySummary: 'प्रगति सारांश कॉपी करें',
    startOver: 'फिर से शुरू करें',
    requiredTasksPending: '* आवश्यक कार्य लंबित हैं',
    simpleMode: 'सरल मोड',
    language: 'A / अ',
    optional: 'वैकल्पिक',
    step: 'चरण',
    guidedActionsSubtitle: 'आवश्यक चुनाव कार्यों को सुचारू रूप से और सही ढंग से पूरा करने में आपकी सहायता के लिए चरण-दर-चरण विज़ार्ड।',
    shareSummary: (completed: number, total: number, title: string) => `मैंने सिविक गाइड पर '${title}' के लिए ${completed}/${total} चरण पूरे कर लिए हैं।`,
    eventContent: {
      'evt-1': { title: 'प्रारूप मतदाता सूची का प्रकाशन', description: 'आगामी विशेष संक्षिप्त पुनरीक्षण के लिए प्रारूप मतदाता सूची का प्रकाशन। नागरिक अपने नाम की जांच कर सकते हैं और दावे/आपत्तियां दर्ज कर सकते हैं।' },
      'evt-2': { title: 'दावों और आपत्तियों के लिए समय सीमा (फॉर्म 6, 7, 8)', description: 'वर्तमान संशोधन चक्र के लिए फॉर्म 6 (नया मतदाता), फॉर्म 7 (हटाना/आपत्ति), और फॉर्म 8 (सुधार/स्थानांतरण) जमा करने की अंतिम तिथि।' },
      'evt-3': { title: 'अंतिम मतदाता सूची का प्रकाशन', description: 'मतदाताओं की अंतिम, अद्यतन सूची प्रकाशित की जाती है। इस सूची में केवल नागरिक ही आगामी चुनावों में मतदान करने के पात्र हैं।' },
      'evt-4': { title: 'मतदान का दिन (चरण 1)', description: 'चरण 1 निर्वाचन क्षेत्रों के लिए मतदान का दिन। मतदान केंद्र आमतौर पर सुबह 7:00 बजे से शाम 6:00 बजे तक खुले रहते हैं। अपना ईपीआईसी या कोई स्वीकृत वैध फोटो आईडी साथ रखें।' },
      'evt-5': { title: 'उम्मीदवार नामांकन की समय सीमा', description: 'व्यक्तियों के लिए स्थानीय चुनावों में उम्मीदवार के रूप में चुनाव लड़ने के लिए अपना नामांकन पत्र जमा करने का अंतिम दिन।' },
      'evt-6': { title: 'वोटर इंफॉर्मेशन स्लिप का वितरण शुरू', description: 'मतदाताओं को उनके मतदान केंद्र की सूचना देने के लिए आधिकारिक वोटर इंफॉर्मेशन स्लिप पंजीकृत आवासों पर वितरित की जानी शुरू हो जाएंगी।' },
      'evt-7': { title: 'वरिष्ठ नागरिकों/दिव्यांगों के लिए अनुपस्थित मतपत्र अनुरोध की समय सीमा', description: 'वरिष्ठ नागरिकों (85+) और विकलांग व्यक्तियों (PwD) के लिए घर से मतदान करने के लिए अनुपस्थित मतपत्र (फॉर्म 12D) का अनुरोध करने की समय सीमा।' },
      'evt-8': { title: 'मतगणना का दिन / परिणाम की घोषणा', description: 'मतों की गिनती की जाएगी और पूरे निर्वाचन क्षेत्रों में अंतिम चुनाव परिणामों की घोषणा की जाएगी।' },
      'evt-9': { title: 'दिल्ली विधानसभा का कार्यकाल समाप्त', description: 'दिल्ली राज्य विधान सभा के वर्तमान कार्यकाल की समाप्ति तिथि।' },
      'evt-10': { title: 'कर्नाटक प्रारूप मतदाता सूची', description: 'स्थानीय निकाय चुनावों से पहले विवरण सत्यापित करने के लिए नागरिकों के लिए कर्नाटक के लिए प्रारूप मतदाता सूची का प्रकाशन।' },
      'evt-11': { title: 'रिप्लेसमेंट वोटर आईडी (फॉर्म 8) के लिए अनुरोध की समय सीमा', description: 'यदि आपने अपना वोटर आईडी कार्ड खो दिया है और आम चुनाव से पहले प्रतिस्थापन की आवश्यकता है तो फॉर्म 8 जमा करने की अंतिम तिथि।' },
      'evt-12': { title: 'चुनाव प्रचार अवधि की समाप्ति', description: 'मतदाताओं को मौन अवधि की अनुमति देने के लिए मतदान अवधि समाप्त होने से 48 घंटे पहले सार्वजनिक प्रचार बंद होना चाहिए।' }
    },
    flowContent: {
      'flow-form-6': {
        title: 'नए मतदाता के रूप में आवेदन करें (फॉर्म 6)',
        step1: { title: 'पात्रता जांचें', desc: 'अर्हता तिथि (आमतौर पर वर्ष की 1 जनवरी, 1 अप्रैल, 1 जुलाई या 1 अक्टूबर) को आपको एक भारतीय नागरिक होना चाहिए और आपकी आयु 18 वर्ष या उससे अधिक होनी चाहिए।' },
        step2: { title: 'दस्तावेज़ इकट्ठा करें', desc: 'अपनी हालिया पासपोर्ट आकार की तस्वीर, आयु प्रमाण (जैसे, जन्म प्रमाण पत्र, पैन, आधार), और पता प्रमाण (जैसे, आधार, बिजली बिल) की स्कैन की गई प्रतियां तैयार रखें।' },
        step3: { title: 'फॉर्म 6 जमा करें', desc: 'फॉर्म 6 भरने और जमा करने के लिए मतदाता सेवा पोर्टल पर जाएं या वोटर हेल्पलाइन मोबाइल ऐप का उपयोग करें।' },
        items: {
          'f6-1': 'मैं एक भारतीय नागरिक हूँ',
          'f6-2': 'मैं अर्हता तिथि पर 18+ का हो जाऊंगा',
          'f6-3': 'पासपोर्ट आकार की तस्वीर',
          'f6-4': 'आयु का प्रमाण',
          'f6-5': 'सामान्य निवास का प्रमाण',
          'f6-6': 'NVSP / ऐप पर फॉर्म 6 भरें',
          'f6-7': 'ट्रैकिंग के लिए रिफरेंस आईडी नोट करें'
        }
      },
      'flow-check-name': {
        title: 'मतदाता सूची में अपना नाम जांचें',
        step1: { title: 'अपना विवरण खोजें', desc: 'आप अपने ईपीआईसी (मतदाता पहचान पत्र संख्या), व्यक्तिगत विवरण, या मोबाइल नंबर का उपयोग करके मतदाता सूची खोज सकते हैं।' },
        step2: { title: 'इलेक्टोरल सर्च पोर्टल पर खोजें', desc: 'electoralsearch.eci.gov.in पर जाएं और अपने मतदान केंद्र और क्रम संख्या को सत्यापित करने के लिए अपना विवरण दर्ज करें।' },
        items: {
          'cn-1': 'अपना ईपीआईसी नंबर या व्यक्तिगत विवरण तैयार रखें',
          'cn-2': 'सूची में नाम और विवरण सत्यापित करें',
          'cn-3': 'वोटर इंफॉर्मेशन स्लिप डाउनलोड करें'
        }
      },
      'flow-replace-id': {
        title: 'रिप्लेसमेंट वोटर आईडी का अनुरोध करें (फॉर्म 8)',
        step1: { title: 'प्रतिस्थापन का कारण', desc: 'निर्धारित करें कि आपको प्रतिस्थापन की आवश्यकता क्यों है (खो गया, नष्ट हो गया, या विकृत हो गया)। यदि खो गया है, तो आपको एफआईआर की एक प्रति की आवश्यकता हो सकती है।' },
        step2: { title: 'फॉर्म 8 जमा करें', desc: 'पोर्टल के माध्यम से फॉर्म 8 पर "सुधार के बिना रिप्लेसमेंट ईपीआईसी जारी करना" विकल्प का चयन करें।' },
        items: {
          'ri-1': 'मेरा मौजूदा ईपीआईसी नंबर पता है',
          'ri-2': 'एफआईआर की प्रति रखें (यदि खो गई हो)',
          'ri-3': 'वोटर पोर्टल पर फॉर्म 8 जमा करें',
          'ri-4': 'कोई भी लागू शुल्क का भुगतान करें (यदि अनुरोध किया जाए)'
        }
      },
      'flow-poll-prep': {
        title: 'मतदान केंद्र के लिए तैयारी करें',
        step1: { title: 'अपना मतदान स्थान जानें', desc: 'पहचानें कि आपको वास्तव में कहाँ जाना है और मतदान किस समय खुला है।' },
        step2: { title: 'आवश्यक वस्तुएँ इकट्ठा करें', desc: 'सुनिश्चित करें कि आपके पास मतदान करने के लिए पहचान का स्वीकार्य प्रमाण है।' },
        items: {
          'pp-1': 'मतदान केंद्र का सटीक पता जांचें',
          'pp-2': 'मतदान के घंटों की पुष्टि करें (उदा., सुबह 7 बजे से शाम 6 बजे तक)',
          'pp-3': 'मूल ईपीआईसी (वोटर आईडी) ले जाएं',
          'pp-4': 'या स्वीकृत वैकल्पिक आईडी (आधार, पासपोर्ट, पैन) ले जाएं',
          'pp-5': 'वोटर इंफॉर्मेशन स्लिप ले जाएं (वैकल्पिक लेकिन अनुशंसित)'
        }
      },
      'flow-nri': {
        title: 'प्रवासी (एनआरआई) मतदाता के रूप में पंजीकरण करें — फॉर्म 6A',
        step1: { title: 'पात्रता जांचें', desc: 'आपको भारत का नागरिक होना चाहिए, भारत में अपने सामान्य निवास स्थान से अनुपस्थित होना चाहिए, और किसी अन्य देश की नागरिकता प्राप्त नहीं की होनी चाहिए।' },
        step2: { title: 'दस्तावेज़ इकट्ठा करें', desc: 'अपलोड करने के लिए आवश्यक दस्तावेज़ तैयार करें।' },
        step3: { title: 'फॉर्म 6A जमा करें', desc: 'वोटर सर्विस पोर्टल या overseasvoter.eci.gov.in पर फॉर्म 6A ऑनलाइन भरें।' },
        items: {
          'nri-1': 'भारतीय नागरिकता की पुष्टि करें',
          'nri-2': 'वैध भारतीय पासपोर्ट रखें',
          'nri-3': 'पासपोर्ट आकार की तस्वीर',
          'nri-4': 'पासपोर्ट की प्रति (तस्वीर वाले पृष्ठ, भारत में पता, पासपोर्ट विवरण)',
          'nri-5': 'वैध वीजा/निवास परमिट की प्रति',
          'nri-6': 'फॉर्म 6A ऑनलाइन जमा करें'
        }
      },
      'flow-pwd': {
         title: 'PwC / विकलांग व्यक्ति के रूप में मतदान',
         step1: { title: 'PwD मतदाता के रूप में पंजीकरण करें', desc: 'मतदान केंद्र पर विशेष सुविधाओं का लाभ उठाने या घर से मतदान का विकल्प चुनने के लिए खुद को विकलांग व्यक्ति के रूप में चिह्नित करें।' },
         step2: { title: 'सुविधाओं का अनुरोध करें', desc: 'यदि पात्र हैं, तो आप व्हीलचेयर, स्वयंसेवक सहायता, या पोस्टल बैलेट (फॉर्म 12D) का अनुरोध कर सकते हैं।' },
         items: {
           'pwd-1': 'सक्षम ऐप या NVSP (फॉर्म 8) के माध्यम से पंजीकरण करें',
           'pwd-2': 'PwD चिह्नित वोटर आईडी प्राप्त करें',
           'pwd-3': 'पिक-अप/ड्रॉप सुविधा का अनुरोध करें (यदि आपके जिले में उपलब्ध हो)',
           'pwd-4': 'घर से मतदान के लिए फॉर्म 12D जमा करें (यदि पात्र और आवश्यक हो)'
         }
      }
    }
  }
};
