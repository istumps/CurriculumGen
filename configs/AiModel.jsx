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


    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic: Python, Chapter: Working with Lists and Dictionaries ,in JSON format with list of array fields as title explanation on given chapter in detail and example if Code example (code field in <precode> format) when applicable\""},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"title\": \"Working with Lists and Dictionaries in Python\",\n  \"explanation\": [\n    {\n      \"title\": \"Lists\",\n      \"description\": \"Lists are ordered collections of items, allowing for various data types. They are mutable, meaning their contents can be changed after creation.\",\n      \"code\": \"<precode>\\n# Creating a list\\nmy_list = [1, 'hello', 3.14, True]\\n\\n# Accessing elements by index (zero-based)\\nprint(my_list[0])  # Output: 1\\nprint(my_list[2])  # Output: 3.14\\n\\n# Modifying elements\\nmy_list[1] = 'world'\\nprint(my_list)  # Output: [1, 'world', 3.14, True]\\n\\n# Adding elements\\nmy_list.append('new item')\\nprint(my_list)  # Output: [1, 'world', 3.14, True, 'new item']\\n</precode>\"\n    },\n    {\n      \"title\": \"List Methods\",\n      \"description\": \"Python offers various methods to manipulate lists:\",\n      \"code\": \"<precode>\\nmy_list = [1, 2, 3, 4, 5]\\n\\n# Length of the list\\nprint(len(my_list))  # Output: 5\\n\\n# Finding an element's index\\nprint(my_list.index(3))  # Output: 2\\n\\n# Removing an element by value\\nmy_list.remove(2)\\nprint(my_list)  # Output: [1, 3, 4, 5]\\n\\n# Sorting the list\\nmy_list.sort()\\nprint(my_list)  # Output: [1, 3, 4, 5]\\n\\n# Reversing the list\\nmy_list.reverse()\\nprint(my_list)  # Output: [5, 4, 3, 1]\\n</precode>\"\n    },\n    {\n      \"title\": \"Dictionaries\",\n      \"description\": \"Dictionaries are unordered collections of key-value pairs. They are also mutable and offer efficient data retrieval based on keys.\",\n      \"code\": \"<precode>\\n# Creating a dictionary\\nmy_dict = {'name': 'John', 'age': 30, 'city': 'New York'}\\n\\n# Accessing values by key\\nprint(my_dict['name'])  # Output: John\\nprint(my_dict.get('age'))  # Output: 30\\n\\n# Modifying values\\nmy_dict['age'] = 31\\nprint(my_dict)  # Output: {'name': 'John', 'age': 31, 'city': 'New York'}\\n\\n# Adding new key-value pairs\\nmy_dict['occupation'] = 'Software Engineer'\\nprint(my_dict)  # Output: {'name': 'John', 'age': 31, 'city': 'New York', 'occupation': 'Software Engineer'}\\n</precode>\"\n    },\n    {\n      \"title\": \"Dictionary Methods\",\n      \"description\": \"Python offers various methods for working with dictionaries:\",\n      \"code\": \"<precode>\\nmy_dict = {'name': 'John', 'age': 30, 'city': 'New York'}\\n\\n# Getting all keys\\nprint(my_dict.keys())  # Output: dict_keys(['name', 'age', 'city'])\\n\\n# Getting all values\\nprint(my_dict.values())  # Output: dict_values(['John', 30, 'New York'])\\n\\n# Checking if a key exists\\nprint('name' in my_dict)  # Output: True\\n\\n# Removing a key-value pair\\nmy_dict.pop('age')\\nprint(my_dict)  # Output: {'name': 'John', 'city': 'New York'}\\n</precode>\"\n    },\n    {\n      \"title\": \"Nested Data Structures\",\n      \"description\": \"Lists and dictionaries can be nested within each other, creating complex data structures.\",\n      \"code\": \"<precode>\\n# Nested list\\nnested_list = [1, [2, 3], 4]\\nprint(nested_list[1][0])  # Output: 2\\n\\n# Nested dictionary\\nnested_dict = {'person': {'name': 'Jane', 'age': 25}}\\nprint(nested_dict['person']['name'])  # Output: Jane\\n</precode>\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
