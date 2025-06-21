import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ChevronDown, Sprout, Bug, CloudRain, DollarSign, Calendar, AlertCircle, Tractor, Beef, Droplets, TreePine, Wheat, Apple } from 'lucide-react';

// Comprehensive agricultural knowledge base
const agriculturalKnowledgeBase = {
  crops: {
    maize: {
      planting: {
        season: "October-December (main season)",
        depth: "2-5cm",
        spacing: "75-90cm rows, 22-60cm plants",
        population: "45,000-55,000 plants/ha",
        seedRate: "25kg/ha"
      },
      fertilizer: {
        basal: "Compound D 400kg/ha or Double D 200kg/ha",
        topDressing: "AN 400kg/ha split at 3-4 and 6-7 weeks",
        nutrients: { N: 166, P: 56, K: 28 }
      },
      pests: {
        fallArmyworm: ["Belt 38ml/ha", "Karate 200ml/ha"],
        stalkBorer: ["Lambda cyalothrin 200ml/ha"],
        aphids: ["Dimethoate 500-750ml/ha"]
      },
      diseases: {
        greyLeafSpot: ["Propiconazole 750ml/ha", "Tebuconazole 1L/ha"],
        maizeStreakVirus: "Gaucho seed treatment"
      },
      harvest: {
        maturity: "90-150 days depending on variety",
        moisture: "20-25% at harvest, 13-15% for storage",
        yield: "3-12 tons/ha depending on management"
      }
    },
    wheat: {
      planting: {
        season: "April-May (winter crop)",
        depth: "3-4cm",
        spacing: "15-20cm rows",
        seedRate: "100-120kg/ha"
      },
      fertilizer: {
        basal: "Compound D 200-300kg/ha",
        topDressing: "AN 200kg/ha at tillering",
        nutrients: { N: 100, P: 40, K: 20 }
      },
      pests: {
        aphids: ["Dimethoate 400ml/ha"],
        armyworm: ["Carbaryl 1.5kg/ha"]
      },
      diseases: {
        rust: ["Propiconazole 500ml/ha"],
        powderyMildew: ["Sulfur dust 25kg/ha"]
      },
      harvest: {
        maturity: "120-150 days",
        moisture: "12-14% for harvest",
        yield: "2-6 tons/ha"
      }
    },
    tomatoes: {
      planting: {
        season: "Year-round with irrigation, avoid frost",
        spacing: "90cm rows, 45cm plants",
        population: "25,000 plants/ha",
        seedlingAge: "4-6 weeks"
      },
      fertilizer: {
        basal: "Compound C 600kg/ha",
        topDressing: "CAN 200kg/ha every 2 weeks",
        foliar: "Calcium nitrate for blossom end rot"
      },
      pests: {
        bollworm: ["Deltamethrin 30ml/ha"],
        whitefly: ["Imidacloprid 200ml/ha"],
        redSpiderMite: ["Abamectin 500ml/ha"]
      },
      diseases: {
        earlyBlight: ["Mancozeb 2kg/ha"],
        lateBlight: ["Ridomil 2.5kg/ha"],
        bacterialWilt: "Crop rotation, resistant varieties"
      },
      harvest: {
        maturity: "60-90 days from transplant",
        frequency: "2-3 times per week",
        yield: "40-100 tons/ha"
      }
    },
    potatoes: {
      planting: {
        season: "February-March, August-September",
        depth: "10-15cm",
        spacing: "75cm rows, 30cm plants",
        seedRate: "2-3 tons/ha"
      },
      fertilizer: {
        basal: "Compound D 1000kg/ha",
        topDressing: "AN 200kg/ha at hilling",
        nutrients: { N: 200, P: 100, K: 150 }
      },
      pests: {
        cutworm: ["Carbaryl 2kg/ha"],
        aphids: ["Thiamethoxam 200g/ha"],
        leafminer: ["Abamectin 500ml/ha"]
      },
      diseases: {
        lateBlight: ["Ridomil 2.5kg/ha", "Mancozeb 2kg/ha"],
        blackleg: "Certified seed, crop rotation",
        viralDiseases: "Control aphid vectors"
      },
      harvest: {
        maturity: "90-120 days",
        indication: "Yellowing foliage, skin set",
        yield: "25-40 tons/ha"
      }
    },
    beans: {
      planting: {
        season: "November-December, February-March",
        depth: "3-5cm",
        spacing: "45cm rows, 10cm plants",
        seedRate: "80-100kg/ha"
      },
      fertilizer: {
        basal: "Compound D 150kg/ha",
        topDressing: "Usually not required",
        rhizobium: "Inoculate seeds"
      },
      pests: {
        beanStemMaggot: ["Imidacloprid seed treatment"],
        aphids: ["Dimethoate 400ml/ha"],
        beanBeetle: ["Carbaryl 1kg/ha"]
      },
      diseases: {
        rust: ["Mancozeb 2kg/ha"],
        angularLeafSpot: ["Copper oxychloride 2.5kg/ha"],
        anthracnose: "Clean seed, resistant varieties"
      },
      harvest: {
        maturity: "65-90 days",
        indication: "Pods dry, rattle when shaken",
        yield: "0.8-2.5 tons/ha"
      }
    },
    soyabeans: {
      planting: {
        season: "November-December",
        depth: "3-4cm",
        spacing: "45cm rows, 5cm plants",
        seedRate: "80-100kg/ha",
        inoculation: "Rhizobium required"
      },
      fertilizer: {
        basal: "Compound D 100-150kg/ha",
        topDressing: "Not required if inoculated",
        nutrients: { P: 30, K: 20 }
      },
      pests: {
        bollworm: ["Deltamethrin 30ml/ha"],
        aphids: ["Dimethoate 400ml/ha"]
      },
      diseases: {
        rust: ["Propiconazole 500ml/ha"],
        bacterialPustule: "Resistant varieties"
      },
      harvest: {
        maturity: "90-120 days",
        moisture: "14-16% for harvest",
        yield: "1.5-3 tons/ha"
      }
    }
  },
  livestock: {
    cattle: {
      breeds: {
        beef: ["Brahman", "Angus", "Hereford", "Mashona"],
        dairy: ["Holstein", "Jersey", "Guernsey", "Friesland"]
      },
      feeding: {
        roughage: "10-12kg/day dry matter",
        concentrate: "1kg per 2.5L milk produced",
        water: "40-60L/day",
        minerals: "Free choice mineral lick"
      },
      health: {
        vaccination: ["FMD", "Anthrax", "Blackleg", "Lumpy skin"],
        deworming: "Every 3-4 months",
        tickControl: "Weekly dipping/spraying"
      },
      breeding: {
        maturity: "18-24 months",
        gestation: "283 days",
        calving: "Once per year ideal"
      }
    },
    poultry: {
      types: {
        layers: ["Hyline", "Lohmann", "Isa Brown"],
        broilers: ["Cobb", "Ross", "Hubbard"],
        indigenous: ["Boschveld", "Road Runner"]
      },
      feeding: {
        starter: "23% protein, 0-6 weeks",
        grower: "20% protein, 6-18 weeks",
        layer: "16% protein, 2.5-3% calcium",
        broiler: "22% protein finisher"
      },
      health: {
        vaccination: ["Newcastle", "Gumboro", "Fowl Pox"],
        biosecurity: "All-in all-out, footbaths",
        mortality: "Target <5%"
      },
      production: {
        layers: "280-320 eggs/year",
        broilers: "35-42 days to 2kg",
        fcr: "1.6-1.8 for broilers"
      }
    },
    goats: {
      breeds: ["Boer", "Kalahari Red", "Mashona", "Matebele"],
      feeding: {
        browse: "60-70% of diet",
        supplement: "200-300g/day concentrate",
        water: "4-8L/day"
      },
      health: {
        vaccination: ["Pulpy kidney", "Tetanus"],
        deworming: "Strategic based on FEC",
        hoofCare: "Trim every 3 months"
      },
      production: {
        kidding: "1.5-2 kids per doe",
        maturity: "7-10 months",
        gestation: "150 days"
      }
    },
    pigs: {
      breeds: ["Large White", "Landrace", "Duroc"],
      feeding: {
        creep: "20% protein, 1-4 weeks",
        weaner: "18% protein, 4-10 weeks",
        grower: "16% protein, 10-16 weeks",
        finisher: "14% protein, 16+ weeks"
      },
      health: {
        vaccination: ["Swine fever", "E.coli"],
        parasites: "Deworm every 3 months",
        housing: "0.6-1m² per pig"
      },
      production: {
        litters: "2.2-2.4 per year",
        piglets: "10-12 per litter",
        market: "5-6 months at 90kg"
      }
    }
  },
  horticulture: {
    vegetables: {
      leafy: ["Cabbage", "Lettuce", "Spinach", "Rape"],
      fruiting: ["Tomatoes", "Peppers", "Eggplant", "Cucumbers"],
      root: ["Carrots", "Beetroot", "Radish", "Turnips"],
      bulb: ["Onions", "Garlic", "Leeks"]
    },
    fruits: {
      citrus: ["Oranges", "Lemons", "Grapefruit"],
      tropical: ["Mangoes", "Avocados", "Bananas"],
      deciduous: ["Apples", "Peaches", "Grapes"]
    },
    management: {
      irrigation: "Drip recommended, 25-40mm/week",
      mulching: "Organic or plastic mulch",
      pruning: "Regular for fruit quality",
      pestControl: "IPM approach preferred"
    }
  },
  soilAndWater: {
    soilTesting: {
      frequency: "Every 2-3 years",
      parameters: ["pH", "N", "P", "K", "OM", "CEC"],
      sampling: "Zigzag pattern, 0-20cm depth"
    },
    soilCorrection: {
      acidic: "Lime 2-4 tons/ha",
      alkaline: "Sulfur or gypsum",
      organic: "Compost 10-20 tons/ha"
    },
    irrigation: {
      types: ["Drip", "Sprinkler", "Flood", "Center pivot"],
      scheduling: "Based on ET and soil moisture",
      efficiency: "Drip 90%, Sprinkler 75%, Flood 50%"
    },
    conservation: {
      practices: ["Mulching", "Contours", "Terracing", "Cover crops"],
      erosionControl: "Vetiver grass, gabions",
      waterHarvesting: "Dams, weirs, tanks"
    }
  },
  farmManagement: {
    planning: {
      budgeting: "Income - expenses = profit",
      recordKeeping: "Production, financial, inventory",
      marketing: "Contract, spot market, value addition"
    },
    economics: {
      grossMargin: "Revenue - variable costs",
      breakeven: "Fixed costs / (price - variable cost per unit)",
      roi: "(Gain - Cost) / Cost × 100"
    },
    certification: {
      organic: "3-year transition, no chemicals",
      gap: "Good Agricultural Practices",
      fairTrade: "Social and environmental standards"
    }
  }
};

// Enhanced conversation context for all agriculture
class ConversationManager {
  constructor() {
    this.context = {
      farmingType: null, // crops, livestock, mixed
      specificCrop: null,
      livestock: null,
      farmSize: null,
      location: null,
      irrigationAvailable: null,
      currentSeason: null,
      previousTopics: [],
      challenges: []
    };
  }

  updateContext(userInput, botResponse) {
    const input = userInput.toLowerCase();
    
    // Identify farming type
    if (input.includes('crop') || input.includes('plant')) this.context.farmingType = 'crops';
    if (input.includes('cattle') || input.includes('cow') || input.includes('livestock')) this.context.farmingType = 'livestock';
    if (input.includes('chicken') || input.includes('poultry')) this.context.livestock = 'poultry';
    
    // Identify specific crops
    const crops = ['maize', 'wheat', 'tomato', 'potato', 'bean', 'soya'];
    crops.forEach(crop => {
      if (input.includes(crop)) this.context.specificCrop = crop;
    });
    
    // Extract farm details
    const sizeMatch = input.match(/(\d+\.?\d*)\s*(hectare|ha|acre)/i);
    if (sizeMatch) {
      this.context.farmSize = parseFloat(sizeMatch[1]);
      this.context.farmSizeUnit = sizeMatch[2].toLowerCase();
    }
    
    // Track irrigation
    if (input.includes('irrigat') || input.includes('drip') || input.includes('sprinkler')) {
      this.context.irrigationAvailable = true;
    }
    
    // Track topics
    const topics = ['planting', 'fertilizer', 'pest', 'disease', 'harvest', 'market', 'feed', 'breed'];
    topics.forEach(topic => {
      if (input.includes(topic)) this.context.previousTopics.push(topic);
    });
    
    this.context.previousTopics = [...new Set(this.context.previousTopics)].slice(-5);
  }

  getContext() {
    return this.context;
  }
}

const conversationManager = new ConversationManager();

// Main response generation function
const generateResponse = (userInput) => {
  const input = userInput.toLowerCase();
  const context = conversationManager.getContext();
  
  // Check for specific crop queries
  if (input.includes('maize') || input.includes('corn')) {
    return generateMaizeResponse(input, context);
  }
  
  if (input.includes('tomato')) {
    return generateTomatoResponse(input, context);
  }
  
  if (input.includes('potato')) {
    return generatePotatoResponse(input, context);
  }
  
  if (input.includes('wheat')) {
    return generateWheatResponse(input, context);
  }
  
  if (input.includes('bean') || input.includes('soya')) {
    return generateLegumeResponse(input, context);
  }
  
  // Livestock queries
  if (input.includes('cattle') || input.includes('cow')) {
    return generateCattleResponse(input, context);
  }
  
  if (input.includes('chicken') || input.includes('poultry')) {
    return generatePoultryResponse(input, context);
  }
  
  if (input.includes('goat')) {
    return generateGoatResponse(input, context);
  }
  
  if (input.includes('pig') || input.includes('swine')) {
    return generatePigResponse(input, context);
  }
  
  // General farming queries
  if (input.includes('soil') || input.includes('test')) {
    return generateSoilResponse(input, context);
  }
  
  if (input.includes('irrigat') || input.includes('water')) {
    return generateIrrigationResponse(input, context);
  }
  
  if (input.includes('organic') || input.includes('natural')) {
    return generateOrganicResponse(input, context);
  }
  
  if (input.includes('market') || input.includes('price') || input.includes('sell')) {
    return generateMarketResponse(input, context);
  }
  
  if (input.includes('season') || input.includes('calendar') || input.includes('when')) {
    return generateSeasonalResponse(input, context);
  }
  
  // Default comprehensive response
  return {
    text: `I'm your comprehensive agricultural assistant! I can help with:

**🌾 CROP PRODUCTION**
• Cereals: Maize, wheat, sorghum, barley
• Legumes: Beans, soybeans, groundnuts
• Vegetables: Tomatoes, cabbage, onions, potatoes
• Cash crops: Cotton, tobacco, sunflower

**🐄 LIVESTOCK FARMING**
• Cattle: Dairy and beef production
• Poultry: Layers and broilers
• Small stock: Goats, sheep, pigs
• Animal health and nutrition

**🌱 HORTICULTURE**
• Fruit production
• Vegetable gardening
• Greenhouse management
• Ornamental plants

**💧 FARM MANAGEMENT**
• Soil testing and fertility
• Irrigation systems
• Pest and disease control
• Farm planning and economics

What aspect of farming would you like to explore?`,
    followUp: ['What type of farming are you doing?', 'What are your main challenges?', 'What\'s your location and farm size?']
  };
};

// Crop-specific response generators
const generateMaizeResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.crops.maize;
  
  if (input.includes('plant')) {
    return {
      text: `**Maize Planting Guide:**

**Season:** ${kb.planting.season}
**Seed rate:** ${kb.planting.seedRate}
**Depth:** ${kb.planting.depth}
**Spacing:** ${kb.planting.spacing}
**Population:** ${kb.planting.population}

**Key considerations:**
• Check soil moisture before planting (30cm clay, 50cm sand)
• Use certified seed for better germination
• Apply basal fertilizer at planting
• Consider early planting for better yields

${context.farmSize ? `For your ${context.farmSize} ${context.farmSizeUnit || 'hectares'}, you'll need ${(context.farmSize * 25).toFixed(0)}kg of seed.` : ''}

**Variety selection:**
• Short season areas: SC403, SC419
• Medium season: SC529, SC537
• Long season: SC627, SC649, SC719`,
      followUp: ['Which variety suits your area?', 'Do you have your fertilizer ready?', 'What\'s your target yield?']
    };
  }
  
  if (input.includes('fertiliz') || input.includes('fertiliser')) {
    return {
      text: `**Maize Fertilizer Program:**

**Basal (at planting):**
• ${kb.fertilizer.basal}

**Top dressing:**
• ${kb.fertilizer.topDressing}

**Total nutrients (kg/ha):**
• Nitrogen: ${kb.fertilizer.nutrients.N}
• Phosphorus: ${kb.fertilizer.nutrients.P}
• Potassium: ${kb.fertilizer.nutrients.K}

${context.farmSize ? `\n**For your ${context.farmSize} ${context.farmSizeUnit || 'hectares'}:**
• Basal: ${(context.farmSize * 400).toFixed(0)}kg Compound D
• Top dress: ${(context.farmSize * 400).toFixed(0)}kg AN` : ''}

**Application tips:**
• Place basal 5cm below and beside seed
• Apply top dressing when soil is moist
• Consider split application on sandy soils`,
      followUp: ['Have you done a soil test?', 'What was your previous yield?', 'Do you need organic alternatives?']
    };
  }
  
  if (input.includes('pest') || input.includes('worm')) {
    return {
      text: `**Maize Pest Management:**

**Fall Armyworm:**
• Signs: Window pane damage, droppings in whorl
• Control: ${kb.pests.fallArmyworm.join(', ')}
• Apply at first sign of damage

**Stalk Borer:**
• Signs: Shot holes in leaves, dead heart
• Control: ${kb.pests.stalkBorer.join(', ')}
• Scout at 3-4 weeks after emergence

**Aphids:**
• Signs: Curled leaves, honeydew
• Control: ${kb.pests.aphids.join(', ')}
• Important for virus transmission

**Application:** 200L water/ha, target pest location`,
      followUp: ['Which pest are you seeing?', 'How severe is the infestation?', 'Do you need organic options?']
    };
  }
  
  // Default maize response
  return {
    text: `I can help with all aspects of maize production:

• **Planting:** Timing, spacing, varieties
• **Fertilization:** Basal and top dressing programs  
• **Pest control:** Fall armyworm, stalk borers
• **Disease management:** Grey leaf spot, streak virus
• **Weed control:** Herbicide programs
• **Harvesting:** Timing and storage

Current yields range from ${kb.harvest.yield} depending on management.

What specific aspect of maize farming do you need help with?`,
    followUp: ['Are you planning a new crop?', 'What challenges are you facing?', 'What\'s your current yield?']
  };
};

const generateTomatoResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.crops.tomatoes;
  
  if (input.includes('plant')) {
    return {
      text: `**Tomato Production Guide:**

**Season:** ${kb.planting.season}
**Spacing:** ${kb.planting.spacing}
**Population:** ${kb.planting.population}
**Seedlings:** ${kb.planting.seedlingAge} old for transplanting

**Growing systems:**
• Open field: Lower cost, weather dependent
• Greenhouse: Higher yields, year-round production
• Stake/trellis: Better fruit quality, easier management

**Varieties:**
• Determinate: Roma, Heinz (processing)
• Indeterminate: Rodade, Star (fresh market)
• Cherry: Sweet 100, Sun Gold

**Success factors:**
• Well-drained soil, pH 6.0-6.8
• Consistent watering (avoid extremes)
• Calcium for blossom end rot prevention`,
      followUp: ['Open field or greenhouse?', 'Fresh market or processing?', 'Do you have irrigation?']
    };
  }
  
  // Return default tomato info
  return {
    text: `Tomato farming can be highly profitable with yields of ${kb.harvest.yield}.

Key management areas:
• **Nutrition:** High calcium requirement
• **Diseases:** Early/late blight, bacterial wilt
• **Pests:** Bollworm, whitefly, red spider mites
• **Harvest:** ${kb.harvest.frequency}

What aspect needs attention?`,
    followUp: ['Production system?', 'Main challenges?', 'Target market?']
  };
};

const generateCattleResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.livestock.cattle;
  
  if (input.includes('feed') || input.includes('nutrition')) {
    return {
      text: `**Cattle Feeding Guide:**

**Daily requirements:**
• Roughage: ${kb.feeding.roughage}
• Water: ${kb.feeding.water}
• Minerals: ${kb.feeding.minerals}

**Dairy cows:**
• Concentrate: ${kb.feeding.concentrate}
• High producers need 18% protein dairy meal
• Body condition score: 3-3.5

**Beef cattle:**
• Grazing plus supplementation
• Finish on 2-3kg concentrate/day
• Target daily gain: 0.8-1.2kg

**Feed resources:**
• Veld grazing, hay, silage
• Crop residues (maize stover)
• Commercial feeds
• Mineral licks essential`,
      followUp: ['Dairy or beef cattle?', 'How many animals?', 'Available feed resources?']
    };
  }
  
  if (input.includes('breed') || input.includes('mating')) {
    return {
      text: `**Cattle Breeding Management:**

**Breeding parameters:**
• Age at first mating: ${kb.breeding.maturity}
• Gestation period: ${kb.breeding.gestation}
• Target: ${kb.breeding.calving}

**Breeding systems:**
• Natural service: 1 bull per 25-30 cows
• AI: Better genetics, disease control
• Synchronization for grouped calving

**Breed selection:**
• **Beef:** ${kb.breeds.beef.join(', ')}
• **Dairy:** ${kb.breeds.dairy.join(', ')}
• Consider crossbreeding for hardiness

**Key management:**
• Body condition at mating
• Bull fertility testing
• Pregnancy diagnosis at 3 months`,
      followUp: ['Current breeding system?', 'Calving percentage?', 'Breed preferences?']
    };
  }
  
  return {
    text: `I can help with cattle production:

**Management areas:**
• Breeding and reproduction
• Nutrition and feeding
• Health and vaccination
• Housing and handling
• Marketing strategies

**Common issues:**
• Low conception rates
• Tick-borne diseases
• Feed shortages in dry season
• Market access

What's your main concern?`,
    followUp: ['Dairy or beef?', 'Herd size?', 'Main challenges?']
  };
};

const generatePoultryResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.livestock.poultry;
  
  if (input.includes('feed') || input.includes('nutrition')) {
    return {
      text: `**Poultry Feeding Program:**

**Layers:**
• Chick starter (0-6 weeks): ${kb.feeding.starter}
• Grower (6-18 weeks): ${kb.feeding.grower}
• Layer mash (18+ weeks): ${kb.feeding.layer}
• Feed intake: 110-120g/bird/day

**Broilers:**
• Starter (0-14 days): 23% protein
• Grower (14-28 days): 21% protein
• Finisher (28+ days): ${kb.feeding.broiler}
• Target FCR: ${kb.production.fcr}

**Water:** 2-3x feed intake
**Feeders:** 1 per 25 birds
**Drinkers:** 1 per 75 birds

Cost saving: Mix own feed if volume justifies`,
      followUp: ['Layers or broilers?', 'Flock size?', 'Feed sourcing?']
    };
  }
  
  return {
    text: `Poultry farming essentials:

**Production types:**
• Layers: ${kb.production.layers}
• Broilers: ${kb.production.broilers}
• Indigenous: Lower input, premium market

**Key success factors:**
• Quality day-old chicks
• Proper vaccination program
• Good ventilation
• Biosecurity measures
• Consistent feed supply

What aspect needs attention?`,
    followUp: ['Production system?', 'Current challenges?', 'Market access?']
  };
};

const generateSoilResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.soilAndWater;
  
  return {
    text: `**Soil Management Guide:**

**Soil Testing:**
• Frequency: ${kb.soilTesting.frequency}
• Parameters: ${kb.soilTesting.parameters.join(', ')}
• Sampling: ${kb.soilTesting.sampling}

**Correction measures:**
• Acidic soils (pH <5.5): ${kb.soilCorrection.acidic}
• Alkaline (pH >7.5): ${kb.soilCorrection.alkaline}
• Low organic matter: ${kb.soilCorrection.organic}

**Improving soil health:**
• Crop rotation with legumes
• Cover crops in off-season
• Minimum tillage practices
• Organic matter addition

**Nutrient management:**
• Follow 4Rs: Right source, rate, time, place
• Consider soil type for application
• Monitor with leaf analysis`,
    followUp: ['Recent soil test results?', 'Main soil problems?', 'Crop rotation practiced?']
  };
};

const generateSeasonalResponse = (input, context) => {
  const month = new Date().getMonth();
  const season = month >= 10 || month <= 3 ? 'main' : month >= 4 && month <= 6 ? 'winter' : 'planning';
  
  return {
    text: `**Seasonal Farming Calendar:**

**Current period recommendations:**

${season === 'main' ? `**Main Season (Nov-March):**
• Plant summer crops: maize, cotton, soybeans
• Top dress planted crops
• Scout for pests/diseases
• Plan harvest logistics` : 
season === 'winter' ? `**Winter Season (Apr-Sept):**
• Plant wheat, barley (irrigated)
• Vegetable production
• Land preparation for summer
• Maintenance of equipment` :
`**Planning Period:**
• Procure inputs for next season
• Soil testing and correction
• Equipment maintenance
• Marketing planning`}

**Year-round activities:**
• Livestock management
• Vegetable production (irrigated)
• Value addition activities
• Record keeping

**Upcoming tasks:**
• Check weather forecasts
• Secure inputs early
• Plan crop rotations`,
    followUp: ['What are you planning to grow?', 'Do you have irrigation?', 'Input requirements?']
  };
};

// Helper functions for other responses
const generateWheatResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.crops.wheat;
  return {
    text: `**Wheat Production:**
• Season: ${kb.planting.season}
• Seed rate: ${kb.planting.seedRate}
• Yield potential: ${kb.harvest.yield}
• Key: Irrigation essential for winter wheat

What specific aspect interests you?`,
    followUp: ['Irrigation system available?', 'Target yield?', 'Previous wheat experience?']
  };
};

const generatePotatoResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.crops.potatoes;
  return {
    text: `**Potato Production Guide:**
• Planting: ${kb.planting.season}
• Seed rate: ${kb.planting.seedRate}
• Spacing: ${kb.planting.spacing}
• Yield: ${kb.harvest.yield}

Key success factors: Certified seed, hilling, blight control`,
    followUp: ['Seed source?', 'Irrigation available?', 'Storage facilities?']
  };
};

const generateLegumeResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.crops.beans;
  return {
    text: `**Legume Production (Beans/Soya):**
• Improves soil nitrogen
• Lower fertilizer needs
• Good rotation crop
• Market demand high

Yields: Beans ${kb.harvest.yield}, Soya 1.5-3 tons/ha`,
    followUp: ['Which legume crop?', 'Inoculant available?', 'Market arrangements?']
  };
};

const generateGoatResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.livestock.goats;
  return {
    text: `**Goat Production:**
• Breeds: ${kb.breeds.join(', ')}
• Browse-based feeding system
• Low input, drought tolerant
• Growing market demand

Management focus: Parasite control, kidding management`,
    followUp: ['Meat or milk production?', 'Current flock size?', 'Grazing available?']
  };
};

const generatePigResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.livestock.pigs;
  return {
    text: `**Pig Production Guide:**
• Fast turnover: ${kb.production.market}
• High feed conversion efficiency
• ${kb.production.piglets} piglets per litter
• ${kb.production.litters} litters per year

Success keys: Quality feed, hygiene, temperature control`,
    followUp: ['Production scale?', 'Feed source?', 'Housing type?']
  };
};

const generateIrrigationResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.soilAndWater.irrigation;
  return {
    text: `**Irrigation Systems:**

**Types & Efficiency:**
${kb.types.map((type, idx) => `• ${type}: ${kb.efficiency.split(', ')[idx] || 'Variable'}`).join('\n')}

**Water Management:**
• Schedule: ${kb.scheduling}
• Monitor soil moisture regularly
• Avoid over-irrigation (diseases)

**Crop water needs:**
• Vegetables: 25-40mm/week
• Maize: 500-800mm/season
• Critical periods vary by crop`,
    followUp: ['Water source available?', 'Current system?', 'Crops to irrigate?']
  };
};

const generateOrganicResponse = (input, context) => {
  const kb = agriculturalKnowledgeBase.farmManagement.certification;
  return {
    text: `**Organic Farming Guide:**

**Certification:**
• ${kb.organic}
• Annual inspections required
• Detailed record keeping

**Practices:**
• Compost/manure for fertility
• Crop rotation mandatory
• Biological pest control
• No synthetic chemicals

**Benefits:**
• Premium prices (30-50% higher)
• Growing market demand
• Improved soil health

**Challenges:**
• Lower yields initially
• More labor intensive
• Pest management difficult`,
    followUp: ['Current farming practices?', 'Certification interest?', 'Market identified?']
  };
};

const generateMarketResponse = (input, context) => {
  return {
    text: `**Agricultural Marketing Options:**

**Market channels:**
• Farm gate sales (lowest price)
• Local markets/vendors
• Wholesalers/middlemen
• Contract farming
• Direct to retailers
• Export (highest standards)

**Value addition:**
• Grading and packaging
• Processing (e.g., tomato sauce)
• Timing sales (storage)
• Organic certification

**Price factors:**
• Supply and demand
• Quality and grading
• Season and timing
• Transport costs
• Market information

**Tips for better prices:**
• Group marketing (cooperatives)
• Market information systems
• Quality consistency
• Reliable supply`,
    followUp: ['Which products to market?', 'Current marketing approach?', 'Storage facilities?']
  };
};