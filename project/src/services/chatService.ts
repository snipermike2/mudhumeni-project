interface ChatRequest {
  message: string;
  context?: string[];
  userId?: string;
  language?: 'en' | 'sn' | 'nd';
}

interface ChatResponse {
  response: string;
  confidence: number;
  sources?: string[];
  followUpQuestions?: string[];
}

class ChatService {
  private apiUrl: string;
  private apiKey: string;
  private conversationHistory: Map<string, any[]> = new Map();

  constructor() {
    // These would typically come from environment variables
    this.apiUrl = import.meta.env.VITE_LLAMA_API_URL || 'https://api.together.xyz/v1/chat/completions';
    this.apiKey = import.meta.env.VITE_LLAMA_API_KEY || '';
  }

  private getSystemPrompt(language: 'en' | 'sn' | 'nd' = 'en'): string {
    const prompts = {
      en: `You are Mudhumeni AI, an expert agricultural assistant specializing in Southern African farming, particularly Zimbabwe. You help smallholder farmers with:

- Crop selection and planting advice
- Pest and disease management
- Soil health and fertilization
- Weather-based farming decisions
- Sustainable farming practices
- Market information and crop pricing

Guidelines:
- Always provide practical, actionable advice
- Consider local climate conditions (subtropical/tropical)
- Focus on affordable solutions for smallholder farmers
- Include specific timing recommendations
- Mention local crop varieties when relevant
- Be conversational and encouraging
- Ask follow-up questions to better understand the farmer's situation
- If unsure, recommend consulting local agricultural extension officers

Respond in a friendly, knowledgeable manner as if you're a trusted farming advisor.`,

      sn: `Uri Mudhumeni AI, mubatsiri wekurima ane ruzivo rwakawanda pazvekurima muSouthern Africa, kunyanya muZimbabwe. Unobatsira varimi vadiki ne:

- Kusarudza zvirimwa nekupa mazano ekusima
- Kurwisa zvipembenene nezvirwere
- Hutano hweivhu nekudyara fetereza
- Sarudzo dzekurima dzichibva pamamiriro ekunze
- Nzira dzekurima dzisingaparadzi zvakatikomberedza
- Ruzivo rwemusika nemitengo yezvirimwa

Mitemo:
- Gara uchipa mazano anoshanda uye akarurama
- Funga nezve mamiriro ekunze enzvimbo (subtropical/tropical)
- Tarisisa pamhinduro dzisingadhuri varimi vadiki
- Ipa mazano chaiwo enguva
- Taura nezve marudzi ezvirimwa emuno kana zvichikodzera
- Ita hurukuro yakanaka uye inokurudzira
- Bvunza mibvunzo yekutevera kuti unzwisise mamiriro emurimi
- Kana usina chokwadi, kurudzira kubvunza machinda ehurumende

Pindura nenzira yakanaka, ine ruzivo senge uri mubatsiri wekurima anovimbwa.`,

      nd: `UnguMudhumeni AI, umsizi wekulima olwazi olukhulu ngokulima eSouthern Africa, ikakhulukazi eZimbabwe. Usiza abalimi abancane nge:

- Ukukhetha izitshalo lokunika izeluleko zokuhlanyela
- Ukulwa nezinambuzane lezifo
- Impilo yenhlabathi lokufaka umanyolo
- Izinqumo zokulima ezisekelwe esimweni sezulu
- Izindlela zokulima ezisimeme
- Ulwazi lwemakethe lamabiza ezitshalo

Imithetho:
- Njalo nikeza izeluleko ezisebenzayo neziqondile
- Cabanga ngesimo sezulu sendawo (subtropical/tropical)
- Gxila ezimpendulweni ezingabizi abalimi abancane
- Nikeza izeluleko eziqondile zesikhathi
- Khuluma ngezinhlobo zezitshalo zendawo uma kufanele
- Yiba nenkulumo enhle ekhuthazayo
- Buza imibuzo elandelayo ukuze uqonde isimo somlimi
- Uma ungaqiniseki, ncoma ukubonana nezikhulu zezolimo

Phendula ngendlela enhle, enolwazi njengomcebisi wekulima othembekile.`
    };

    return prompts[language];
  }

  private buildConversationContext(userId: string, newMessage: string): any[] {
    const history = this.conversationHistory.get(userId) || [];
    const context = [
      {
        role: 'system',
        content: this.getSystemPrompt()
      },
      ...history,
      {
        role: 'user',
        content: newMessage
      }
    ];

    // Keep only last 10 messages to manage token limits
    if (context.length > 11) {
      return [context[0], ...context.slice(-10)];
    }

    return context;
  }

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const userId = request.userId || 'anonymous';
      const messages = this.buildConversationContext(userId, request.message);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3-8b-chat-hf',
          messages: messages,
          max_tokens: 512,
          temperature: 0.7,
          top_p: 0.9,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I encountered an issue processing your request. Please try again.';

      // Update conversation history
      const currentHistory = this.conversationHistory.get(userId) || [];
      currentHistory.push(
        { role: 'user', content: request.message },
        { role: 'assistant', content: aiResponse }
      );
      this.conversationHistory.set(userId, currentHistory);

      // Generate follow-up questions based on the response
      const followUpQuestions = this.generateFollowUpQuestions(request.message, aiResponse);

      return {
        response: aiResponse,
        confidence: 0.95,
        followUpQuestions
      };

    } catch (error) {
      console.error('Chat API Error:', error);
      
      // Fallback to local responses if API fails
      return this.getFallbackResponse(request.message);
    }
  }

  private generateFollowUpQuestions(userMessage: string, aiResponse: string): string[] {
    const lowerMessage = userMessage.toLowerCase();
    const questions: string[] = [];

    if (lowerMessage.includes('plant') || lowerMessage.includes('crop')) {
      questions.push('What is your farm size?', 'What type of soil do you have?', 'When do you plan to plant?');
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('disease')) {
      questions.push('Can you describe the symptoms?', 'Which crops are affected?', 'When did you first notice this?');
    } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('soil')) {
      questions.push('Have you tested your soil recently?', 'What crops are you growing?', 'What is your budget for fertilizers?');
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) {
      questions.push('What is your location?', 'Do you have irrigation?', 'What season are you planning for?');
    }

    return questions.slice(0, 3); // Return max 3 questions
  }

  private getFallbackResponse(message: string): ChatResponse {
    const lowerMessage = message.toLowerCase();
    
    const fallbackResponses = {
      maize: "For maize cultivation in Zimbabwe, plant during the rainy season (October-December). Ensure soil pH is 6.0-7.0, plant seeds 2-3cm deep with 25cm spacing. Use compound fertilizer at planting and top-dress with nitrogen after 6 weeks. Would you like specific variety recommendations for your area?",
      
      tomato: "Tomatoes thrive in well-drained soil with pH 6.0-6.8. Start with seedlings after the last frost. Water regularly but avoid waterlogging. Use calcium-rich fertilizer to prevent blossom end rot. Consider varieties like Rodade or Roma for better disease resistance. What's your growing season?",
      
      pest: "For pest control, identify the specific pest first. Common solutions include neem oil for aphids, wood ash for cutworms, and companion planting with marigolds. Encourage beneficial insects like ladybugs. Can you describe what you're seeing on your crops?",
      
      fertilizer: "Use balanced NPK fertilizer (10-10-10) for most crops. Apply organic compost to improve soil structure. For maize, split nitrogen application - at planting and 6 weeks later. Soil testing helps determine specific needs. What crops are you planning to fertilize?",
      
      weather: "Monitor weather patterns for planting decisions. Plant drought-resistant varieties if rainfall is uncertain. Use mulching to conserve moisture. Consider rainwater harvesting for dry spells. What's your local weather pattern like?",
      
      default: "I'm here to help with your farming questions! I can assist with crop selection, planting schedules, pest management, soil health, fertilizers, and weather-related farming decisions. What specific farming challenge are you facing? The more details you provide, the better I can help you."
    };

    let response = fallbackResponses.default;
    let followUpQuestions: string[] = [];

    if (lowerMessage.includes('maize') || lowerMessage.includes('corn')) {
      response = fallbackResponses.maize;
      followUpQuestions = ['What is your farm size?', 'Which variety do you prefer?', 'Do you have irrigation?'];
    } else if (lowerMessage.includes('tomato')) {
      response = fallbackResponses.tomato;
      followUpQuestions = ['Are you growing in greenhouse or open field?', 'What season are you planting?', 'Do you have drip irrigation?'];
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('bug') || lowerMessage.includes('insect')) {
      response = fallbackResponses.pest;
      followUpQuestions = ['Can you describe the pest?', 'Which crops are affected?', 'How severe is the infestation?'];
    } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrition')) {
      response = fallbackResponses.fertilizer;
      followUpQuestions = ['Have you tested your soil?', 'What crops are you growing?', 'What is your budget?'];
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('drought')) {
      response = fallbackResponses.weather;
      followUpQuestions = ['What is your location?', 'What season are you planning for?', 'Do you have water storage?'];
    }

    return {
      response,
      confidence: 0.8,
      followUpQuestions
    };
  }

  clearConversation(userId: string): void {
    this.conversationHistory.delete(userId);
  }

  getConversationHistory(userId: string): any[] {
    return this.conversationHistory.get(userId) || [];
  }
}

export const chatService = new ChatService();