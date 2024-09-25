/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course Tutorial on the following details with fields such as course Name, \nDescription, chapter name, about and Duration: \nCategory:’Programming’ Topic:Python, Level: Basic, Duration: 1 hour, No Of Chapters:5, in JSON format \n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"name\": \"Python for Beginners\",\n  \"description\": \"This beginner-friendly course will guide you through the fundamentals of Python programming. Learn essential concepts, data types, control flow, and more to build your foundation in this versatile language.\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Introduction to Python\",\n      \"about\": \"Learn what Python is, why it's popular, and how to set up your programming environment.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Basic Syntax and Data Types\",\n      \"about\": \"Explore variables, operators, data types like integers, strings, and booleans, and how to manipulate them.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Control Flow: Making Decisions and Loops\",\n      \"about\": \"Understand conditional statements (if-else), loops (for and while), and how they control program execution.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Functions and Modules\",\n      \"about\": \"Learn how to create and use your own functions to organize code and reuse logic. Discover built-in modules for additional functionality.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Working with Lists and Dictionaries\",\n      \"about\": \"Explore data structures like lists and dictionaries, their applications, and how to manipulate their elements.\",\n      \"duration\": \"15 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\"\n}\n```\n"},
        ],
        },
      ],
    });
  
    //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
