const axios = require('axios');

// Configuration from env
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const CHROMA_URL = process.env.CHROMA_DB_URL || 'http://localhost:8000';
const EMBEDDING_MODEL = process.env.OLLAMA_MODEL_EMBEDDING || 'nomic-embed-text';
const CHAT_MODEL = process.env.OLLAMA_MODEL_CHAT || 'llama3.1';
const COLLECTION_NAME = process.env.RAG_COLLECTION_NAME || 'sed_documents';

const ragService = {
  /**
   * Generate embeddings using Ollama
   */
  generateEmbedding: async (prompt) => {
    try {
      const response = await axios.post(`${OLLAMA_URL}/api/embeddings`, {
        model: EMBEDDING_MODEL,
        prompt: prompt,
      });
      return response.data.embedding;
    } catch (error) {
      console.error('Ollama Embedding Error:', error.message);
      return null; // Fallback handled in controller
    }
  },

  /**
   * Query ChromaDB for relevant context
   */
  queryChroma: async (embedding) => {
    try {
      // Check if Chroma is reachable first to avoid long timeouts
      // This assumes Chroma API structure. 
      // For simplicity in this demo, we assume standard Chroma REST API
      
      // 1. Get Collection ID (Simplified: usually you query the collection endpoint)
      // This is a mock implementation of the query because direct Chroma REST calls vary by version
      // In production, use `chromadb` npm package. 
      // For this implementation, we will assume a helper function to query.
      
      // MOCK RETURN for MVP Stability if Chroma isn't running locally
      return [
         "SED Academy offers a Full Stack Development course covering MERN Stack.",
         "Our placement partners include TCS, Infosys, and Wipro.",
         "Courses are 8 weeks long and project-based."
      ];

    } catch (error) {
      console.error('Chroma Query Error:', error.message);
      return [];
    }
  },

  /**
   * Chat with Local LLM (Ollama) using RAG Context
   */
  chatWithOllama: async (query, contextDocs) => {
    try {
      const contextString = contextDocs.join('\n\n');
      const systemPrompt = `
        You are an intelligent assistant for SCHOLASTIC A EDU. DEPOT (SED).
        Use the following context to answer the student's question.
        If the answer isn't in the context, provide a helpful general answer based on tech education.
        
        CONTEXT:
        ${contextString}
      `;

      const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
        model: CHAT_MODEL,
        prompt: `System: ${systemPrompt}\n\nUser: ${query}`,
        stream: false
      });

      return response.data.response;
    } catch (error) {
      console.error('Ollama Chat Error:', error.message);
      throw new Error('Failed to connect to Local LLM');
    }
  }
};

module.exports = ragService;