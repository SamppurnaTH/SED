import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load environment variables
    const env = loadEnv(mode, process.cwd(), '');
    
    // Get API URL from environment or use default
    const apiUrl = env.VITE_API_URL || 'http://localhost:3001';
    const apiBasePath = env.VITE_API_BASE_PATH || '/api';
    
    return {
        server: {
            port: parseInt(env.VITE_PORT || '3000', 10),
            host: env.VITE_HOST || '0.0.0.0',
            proxy: {
            '^/api/.*': {
                target: apiUrl,
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
        },
        plugins: [react()],
        define: {
            // Pass environment variables to the client
            'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
            'import.meta.env.VITE_API_BASE_PATH': JSON.stringify(apiBasePath),
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
