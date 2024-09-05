import google.generativeai as genai

# Directly pass the API key in the configure method
API_KEY = "your-api-key-here"  # Replace with your actual API key
genai.configure(api_key="")

# Initialize the generative model
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Define a function for the chatbot
def chatbot(input_text):
    response = model.generate_content([input_text])
    return response.text

# Example usage: Chatbot loop
print("Welcome to the Chatbot! Type 'exit' to quit.")
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        break

    response_text = chatbot(user_input)
    print("Bot:", response_text)
