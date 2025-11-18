
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Logo from '../components/icons/Logo';
import VideoPlayer from '../components/VideoPlayer';
import { API_URL } from '../constants';

const loadingMessages = [
    "Warming up the AI generators...",
    "Analyzing your creative prompt...",
    "Allocating cloud resources (this can take a moment)...",
    "The digital director is setting up the scene...",
    "Rendering the first few frames...",
    "This is a complex process, thank you for your patience...",
    "Adding the final touches...",
    "Almost there, preparing your video for preview...",
];

const AdminVideoGenerationPage: React.FC = () => {
    const { logout, adminUser } = useAdminAuth();
    const navigate = useNavigate();

    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<{ base64: string; mimeType: string; name: string } | null>(null);
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
    
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const pollingIntervalRef = useRef<number | null>(null);
    const loadingMessageIntervalRef = useRef<number | null>(null);
    
    // Clean up intervals on unmount
    React.useEffect(() => {
        return () => {
             if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
             if (loadingMessageIntervalRef.current) clearInterval(loadingMessageIntervalRef.current);
        }
    }, []);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) { // 4MB limit for Veo images
                setError("Image size must be less than 4MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = (event.target?.result as string).split(',')[1];
                setImage({ base64, mimeType: file.type, name: file.name });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const pollOperation = async (op: any) => {
        pollingIntervalRef.current = window.setInterval(async () => {
            try {
                const response = await fetch(`${API_URL}/ai/get-video-operation`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ operation: op })
                });
                
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                
                const updatedOp = data.operation;

                if (updatedOp.done) {
                    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
                    if (loadingMessageIntervalRef.current) clearInterval(loadingMessageIntervalRef.current);
                    setIsLoading(false);
                    
                    if (updatedOp.error) {
                         setError(`Generation failed: ${updatedOp.error.message}`);
                    } else if (updatedOp.response?.generatedVideos?.[0]?.video?.uri) {
                        // Success! Use the proxy endpoint to display the video
                        const rawUri = updatedOp.response.generatedVideos[0].video.uri;
                        const proxyUrl = `${API_URL}/ai/video-proxy?uri=${encodeURIComponent(rawUri)}`;
                        setVideoUrl(proxyUrl);
                    } else {
                        setError("Video generation finished, but no video was returned.");
                    }
                }
            } catch (err: any) {
                if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
                if (loadingMessageIntervalRef.current) clearInterval(loadingMessageIntervalRef.current);
                setIsLoading(false);
                setError(`Polling failed: ${err.message}`);
            }
        }, 10000);
    }

    const handleGenerateVideo = async () => {
        if (!prompt && !image) {
            setError("Please provide a prompt or an image.");
            return;
        }
        
        setError(null);
        setIsLoading(true);
        setVideoUrl(null);
        setLoadingMessage(loadingMessages[0]);

        // Cycle through loading messages
        let msgIndex = 1;
        loadingMessageIntervalRef.current = window.setInterval(() => {
            setLoadingMessage(loadingMessages[msgIndex]);
            msgIndex = (msgIndex + 1) % loadingMessages.length;
        }, 5000);

        try {
            const response = await fetch(`${API_URL}/ai/generate-video`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    resolution,
                    aspectRatio,
                    image: image ? { base64: image.base64, mimeType: image.mimeType } : undefined
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            pollOperation(data.operation);

        } catch (err: any) {
            if (loadingMessageIntervalRef.current) clearInterval(loadingMessageIntervalRef.current);
            console.error(err);
            setError(err.message || 'An unknown error occurred.');
            setIsLoading(false);
        }
    };

    const dashboardName = adminUser?.role === 'marketing' ? 'Marketing Dashboard' : 'Admin Dashboard';

    return (
        <div className="min-h-screen bg-light-gray">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Logo className="h-8 w-8 text-primary" />
                        <nav aria-label="breadcrumb">
                            <ol className="flex items-center space-x-2 text-sm">
                                <li><Link to="/admin/dashboard" className="text-dark-gray/70 hover:text-primary">{dashboardName}</Link></li>
                                <li><span className="text-dark-gray/50">/</span></li>
                                <li><span className="font-semibold text-dark-gray">Video Generation</span></li>
                            </ol>
                        </nav>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="font-poppins font-semibold text-sm text-dark-gray hover:text-primary transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        {!videoUrl && (
                            <form onSubmit={(e) => { e.preventDefault(); handleGenerateVideo(); }} className="space-y-6">
                                <div>
                                    <label htmlFor="prompt" className="block text-sm font-medium text-dark-gray mb-1">Prompt</label>
                                    <textarea
                                        id="prompt"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"
                                        placeholder="e.g., A cinematic shot of a student coding on a laptop, with code reflections in their glasses."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-dark-gray mb-1">Starting Image (Optional)</label>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                                    />
                                    {image && <p className="text-xs text-gray-500 mt-1">Selected: {image.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div>
                                        <label className="block text-sm font-medium text-dark-gray mb-2">Aspect Ratio</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center"><input type="radio" value="16:9" checked={aspectRatio === '16:9'} onChange={(e) => setAspectRatio(e.target.value as any)} className="mr-2"/> Landscape (16:9)</label>
                                            <label className="flex items-center"><input type="radio" value="9:16" checked={aspectRatio === '9:16'} onChange={(e) => setAspectRatio(e.target.value as any)} className="mr-2"/> Portrait (9:16)</label>
                                        </div>
                                     </div>
                                     <div>
                                        <label className="block text-sm font-medium text-dark-gray mb-2">Resolution</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center"><input type="radio" value="720p" checked={resolution === '720p'} onChange={(e) => setResolution(e.target.value as any)} className="mr-2"/> 720p</label>
                                            <label className="flex items-center"><input type="radio" value="1080p" checked={resolution === '1080p'} onChange={(e) => setResolution(e.target.value as any)} className="mr-2"/> 1080p</label>
                                        </div>
                                     </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary text-white font-poppins font-bold py-3 px-6 rounded-lg hover:bg-accent transition-all duration-300 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Generating...' : 'Generate Video'}
                                </button>
                            </form>
                        )}
                        
                        {isLoading && (
                            <div className="text-center p-8 space-y-4">
                                 <svg className="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="font-semibold text-dark-gray">{loadingMessage}</p>
                                <p className="text-sm text-dark-gray/70">Video generation can take several minutes. Please don't close this page.</p>
                            </div>
                        )}

                        {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                        
                        {videoUrl && (
                            <div className="mt-8">
                                <h3 className="font-poppins font-bold text-xl text-dark-gray mb-4">Generation Complete!</h3>
                                <VideoPlayer src={videoUrl} onDownload={() => {
                                    const a = document.createElement('a');
                                    a.href = videoUrl;
                                    a.download = `sed-video-${Date.now()}.mp4`;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                }} />
                                 <button
                                    onClick={() => setVideoUrl(null)}
                                    className="w-full mt-4 bg-gray-200 text-dark-gray font-poppins font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Generate Another Video
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminVideoGenerationPage;
