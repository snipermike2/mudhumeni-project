export const translations = {
  en: {
    appName: 'Mudhumeni AI',
    tagline: 'Smart Farming Assistant',
    navigation: {
      chat: 'AI Chat',
      crops: 'Crop Advisor',
      weather: 'Weather',
      profile: 'Profile'
    },
    chat: {
      title: 'AI Farming Assistant',
      placeholder: 'Ask me about farming...',
      send: 'Send',
      typing: 'AI is typing...',
      examples: [
        'When should I plant maize?',
        'How to control aphids?',
        'Best fertilizer for tomatoes?',
        'Signs of nitrogen deficiency?'
      ]
    },
    crops: {
      title: 'Crop Recommendations',
      subtitle: 'Get personalized crop suggestions based on your soil data',
      inputSoil: 'Input Soil Data',
      getRecommendations: 'Get Recommendations',
      confidence: 'Confidence',
      expectedYield: 'Expected Yield',
      profitability: 'Profitability'
    },
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      phone: 'Phone Number',
      location: 'Location',
      farmSize: 'Farm Size (hectares)',
      language: 'Preferred Language'
    },
    common: {
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success',
      offline: 'Offline Mode',
      rate: 'Rate this response',
      feedback: 'Provide feedback'
    }
  },
  sn: {
    appName: 'Mudhumeni AI',
    tagline: 'Mubatsiri Wekurima Wakangwara',
    navigation: {
      chat: 'Hurukuro AI',
      crops: 'Zvirimwa',
      weather: 'Mamiriro Ekunze',
      profile: 'Mukana'
    },
    chat: {
      title: 'Mubatsiri AI Wekurima',
      placeholder: 'Bvunza nezvekurima...',
      send: 'Tumira',
      typing: 'AI iri kunyora...',
      examples: [
        'Ndinosima chibage rinhi?',
        'Ndingarwise sei mabure?',
        'Fetereza rakanaka ratomato?',
        'Zviratidzo zvekushaya nitrogen?'
      ]
    },
    crops: {
      title: 'Zano Rezvirimwa',
      subtitle: 'Wana mazano ezvirimwa zvakakufanidzira zvichibva paivhu rako',
      inputSoil: 'Isa Data Yeivhu',
      getRecommendations: 'Wana Mazano',
      confidence: 'Chivimbo',
      expectedYield: 'Mukohwo Unotarisirwa',
      profitability: 'Purofiti'
    },
    auth: {
      login: 'Pinda',
      register: 'Nyoresa',
      email: 'Email',
      password: 'Password',
      name: 'Zita Rakakwana',
      phone: 'Nhamba Yefoni',
      location: 'Nzvimbo',
      farmSize: 'Kukura Kwepurazi (mahekita)',
      language: 'Mutauro Waunoda'
    },
    common: {
      submit: 'Tumira',
      cancel: 'Dzosera',
      save: 'Chengetedza',
      loading: 'Kufema...',
      error: 'Kukanganisa kwakaitika',
      success: 'Kufara',
      offline: 'Offline Mode',
      rate: 'Tonga mhinduro iyi',
      feedback: 'Ipa mhinduro'
    }
  },
  nd: {
    appName: 'Mudhumeni AI',
    tagline: 'Umsizi Wokulima Ohlakaniphileyo',
    navigation: {
      chat: 'Ukuxoxa AI',
      crops: 'Izitshalo',
      weather: 'Isimo Sezulu',
      profile: 'Iphrofayela'
    },
    chat: {
      title: 'Umsizi AI Wokulima',
      placeholder: 'Buza ngokulima...',
      send: 'Thumela',
      typing: 'I-AI iyabhala...',
      examples: [
        'Ngitshale nini umbila?',
        'Ngingawanlawula njani amalunga?',
        'Umanyolo omuhle wamathomathi?',
        'Izibonakaliso zokuncipha kwe-nitrogen?'
      ]
    },
    crops: {
      title: 'Izeluleko Zezitshalo',
      subtitle: 'Thola izeluleko zezitshalo eziqondene lawe ngokwenhlabathi yakho',
      inputSoil: 'Faka Idatha Yenhlabathi',
      getRecommendations: 'Thola Izeluleko',
      confidence: 'Ukuthemba',
      expectedYield: 'Isivuno Esithokomele',
      profitability: 'Inzuzo'
    },
    auth: {
      login: 'Ngena',
      register: 'Bhalisa',
      email: 'I-email',
      password: 'Iphasiwedi',
      name: 'Ibizo Eligcwele',
      phone: 'Inombolo Yefoni',
      location: 'Indawo',
      farmSize: 'Ubukhulu Bepulazi (amahekitha)',
      language: 'Ulimi Olukhetha'
    },
    common: {
      submit: 'Thumela',
      cancel: 'Yekela',
      save: 'Gcina',
      loading: 'Kuyafakwa...',
      error: 'Kukhona iphutha',
      success: 'Kuphumelele',
      offline: 'Imodi Yangaphandle',
      rate: 'Hlola lempendulo',
      feedback: 'Nikeza impendulo'
    }
  }
};

export const useTranslation = (language: 'en' | 'sn' | 'nd' = 'en') => {
  return translations[language];
};