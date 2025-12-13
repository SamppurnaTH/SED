# RAG Test Script

This script tests the RAG (Retrieval-Augmented Generation) functionality of the SED Academy application. It verifies the complete pipeline from query embedding to document retrieval and response generation.

## Prerequisites

1. Node.js installed
2. MongoDB running locally or accessible via the connection string in `.env`
3. Required environment variables set in `.env`:
   - `MONGODB_URI`: MongoDB connection string
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `CHAT_MODEL`: (Optional) Defaults to 'meta-llama/llama-3.1-70b-instruct'
   - `EMBEDDING_MODEL`: (Optional) Defaults to 'text-embedding-3-small'

## Usage

### Basic Test

```bash
# Navigate to the backend directory
cd backend

# Run the test with default query
node scripts/test-rag.js

# Or specify a custom query
node scripts/test-rag.js "What courses does SED Academy offer?"
```

### Understanding the Output

The script will output the following information:

1. **Embedding Generation**: Confirms if the query was successfully converted to an embedding vector
2. **Document Retrieval**: Shows the number of relevant documents found and their titles
3. **Response Generation**: Displays the AI-generated response using the retrieved context

### Expected Output Example

```
🚀 Starting RAG Test 🚀
=======================
✅ Connected to MongoDB

🔍 Testing RAG with query: "What is SED Academy about?"

1️⃣ Generating embedding...
   ✅ Generated embedding (1536 dimensions)

2️⃣ Searching for relevant documents...
   ✅ Found 3 relevant documents:
      1. about_sed.txt (SED Academy is a premier educational platform...)
         Score: 0.8452
      2. courses.txt (We offer courses in web development, data science...)
         Score: 0.7123
      3. faq.txt (Frequently asked questions about SED Academy...)
         Score: 0.6543

3️⃣ Generating response with context...

🎯 Response:
----------------------------------------
SED Academy is an educational platform that offers a variety of courses...
----------------------------------------

✅ Test completed. Database connection closed.
```

## Troubleshooting

- **No documents found**: Ensure you've run the document ingestion script first
- **Connection errors**: Verify your MongoDB is running and the connection string is correct
- **API errors**: Check your OpenRouter API key and internet connection

## Notes

- The script uses the same RAG service as the main application
- All API calls are logged to the console for debugging
- The script automatically closes the database connection when done
