
const express = require('express');
const router = express.Router();
const { GoogleGenAI, Modality } = require('@google/genai');
const ragService = require('../services/ragService');
const Course = require('../models/Course');
const axios = require('axios'); // Required for the video proxy

// Initialize Gemini
// Ensure process.env.API_KEY is set in your backend .env file
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// @route   POST /api/ai/chat
// @desc    Hybrid RAG Chatbot
router.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        // 1. Try Local RAG Flow if enabled
        if (process.env.ENABLE_AI_FEATURES === 'true') {
            const embedding = await ragService.generateEmbedding(message);
            if (embedding) {
                const context = await ragService.queryChroma(embedding);
                const response = await ragService.chatWithOllama(message, context);
                return res.json({ response });
            }
        }

        // 2. Fallback to Gemini (Cloud)
        const courses = await Course.find({}, 'name category tagline pricing');
        const courseContext = courses.map(c => 
            `- ${c.name} (${c.category}): ${c.tagline}. Price: ${c.pricing.amount}`
        ).join('\n');

        const systemInstruction = `You are SED Academy's AI. Answer based on: ${courseContext}`;
        
        const result = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: message,
             config: { systemInstruction }
        });
        
        res.json({ response: result.text });

    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ message: 'AI service unavailable' });
    }
});

// @route   POST /api/ai/generate-resume
// @desc    Generate Resume Content
router.post('/generate-resume', async (req, res) => {
    const { prompt, schema } = req.body;

    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
            }
        });
        res.json({ text: result.text });
    } catch (error) {
        console.error('Resume Gen Error:', error);
        res.status(500).json({ message: 'Failed to generate resume' });
    }
});

// @route   POST /api/ai/generate-image
// @desc    Generate Images
router.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const part = response.candidates[0].content.parts.find(p => p.inlineData);
        if (part) {
             res.json({ 
                 imageUrl: `data:image/png;base64,${part.inlineData.data}` 
             });
        } else {
            throw new Error('No image data returned');
        }
    } catch (error) {
        console.error('Image Gen Error:', error);
        res.status(500).json({ message: 'Failed to generate image' });
    }
});

// @route   POST /api/ai/generate-content
// @desc    Generate Marketing Copy (Blog/Social)
router.post('/generate-content', async (req, res) => {
    const { prompt } = req.body;
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        res.json({ text: result.text });
    } catch (error) {
        console.error('Content Gen Error:', error);
        res.status(500).json({ message: 'Failed to generate content' });
    }
});

// @route   POST /api/ai/generate-video
// @desc    Start Video Generation (Veo)
router.post('/generate-video', async (req, res) => {
    const { prompt, resolution, aspectRatio, image } = req.body;

    try {
        const request = {
            model: 'veo-3.1-fast-generate-preview',
            prompt,
            config: {
                numberOfVideos: 1,
                resolution: resolution || '720p',
                aspectRatio: aspectRatio || '16:9',
            }
        };

        if (image) {
            request.image = {
                imageBytes: image.base64,
                mimeType: image.mimeType
            };
        }

        const operation = await ai.models.generateVideos(request);
        // We return the operation name/metadata to the client to poll
        res.json({ operation });

    } catch (error) {
        console.error('Video Gen Start Error:', error);
        res.status(500).json({ message: error.message || 'Failed to start video generation' });
    }
});

// @route   POST /api/ai/get-video-operation
// @desc    Poll Video Generation Status
router.post('/get-video-operation', async (req, res) => {
    const { operation } = req.body;

    try {
        const updatedOp = await ai.operations.getVideosOperation({ operation });
        res.json({ operation: updatedOp });
    } catch (error) {
        console.error('Video Poll Error:', error);
        res.status(500).json({ message: 'Failed to check video status' });
    }
});

// @route   GET /api/ai/video-proxy
// @desc    Proxy the video stream from Google to the client using the server-side API Key
router.get('/video-proxy', async (req, res) => {
    const { uri } = req.query;

    if (!uri) {
        return res.status(400).send('Missing URI');
    }

    try {
        // Append the API key to the URI provided by the operation result
        const videoUrl = `${uri}&key=${process.env.API_KEY}`;

        const response = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'stream'
        });

        // Pipe the video stream to the client
        res.setHeader('Content-Type', response.headers['content-type']);
        response.data.pipe(res);
    } catch (error) {
        console.error('Video Proxy Error:', error.message);
        res.status(500).send('Failed to fetch video');
    }
});

module.exports = router;
