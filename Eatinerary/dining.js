import { genAI } from "./../gemini/common";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import  { GoogleGenerativeAI } from "@google/generative-ai";

const fetchFilteredEntries = async () => {
    try {
      const baseUrl = 'https://michigan-dining-api.tendiesti.me';
      const endpoint = '/v1/filterableEntries';
  
      const url = `${baseUrl}${endpoint}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      // Store the filtered items
      const filteredItems = data.filteredItems; // Assuming "filteredItems" is in the response
  
      // Construct the Gemini prompt
      const prompt = `The following is a list of filtered dining entries from Michigan Dining API:\n ${filteredItems.join('\n')}\n Return the non-vegetarian options at South Quad Dining Hall that are above 20 grams of protein`;
  

      GOOGLE_API_KEY=userdata.get('AIzaSyBTX0QCTTxIUgqPOWdrL2ReugE8iAqtZ-8');
      GoogleGenerativeAI.configure(api_key=GOOGLE_API_KEY);
      
      model = GoogleGenerativeAI.GenerativeModel('gemini-pro');
      response = model.generate_content(prompt);
      console.log(response.text)
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Call the function to fetch and filter entries
  fetchFilteredEntries();