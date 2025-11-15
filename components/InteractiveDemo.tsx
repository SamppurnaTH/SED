
import React, { useState, useEffect, useRef } from 'react';

const demoSnippets = {
  HTML: `<!-- Edit this code! -->
<h1>Hello, Future Developer!</h1>
<p>This is an interactive demo. You can write HTML, CSS, and JavaScript here and see it update live in the preview pane.</p>
<button id="demo-btn">Click Me</button>

<style>
  body { 
    font-family: sans-serif; 
    padding: 1rem;
    background-color: #f0f4f8;
  }
  h1 { color: #005DFF; }
  p { font-size: 1rem; }
  button {
    background-color: #005DFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
</style>

<script>
  const button = document.getElementById('demo-btn');
  button.addEventListener('click', () => {
    alert('Great job! You are on your way to becoming a Full Stack Developer.');
  });
</script>`,
  CSS: `<style>
  /* Change the styles! */
  .box {
    width: 150px;
    height: 150px;
    background-color: #5A2FFF;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    font-family: sans-serif;
    transition: transform 0.3s ease;
  }
  .box:hover {
    transform: rotate(15deg) scale(1.1);
    background-color: #00D4FF;
  }
</style>

<div class="box">
  Hover over me!
</div>`,
  JavaScript: `<h1>Check the Console!</h1>
<p>This example demonstrates some basic JavaScript. Open your browser's developer console (F12 or Ctrl+Shift+I) to see the output.</p>

<script>
  // Edit the JavaScript!
  function greet(name) {
    return "Hello, " + name + "!";
  }

  const message = greet('Developer');
  console.log(message);

  const skills = ['HTML', 'CSS', 'JavaScript', 'React'];
  console.log('Skills you will learn:', skills);

  document.querySelector('h1').textContent = 'JavaScript Demo';
</script>`,
};

const InteractiveDemo: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState(demoSnippets.HTML);
  const [activeSnippet, setActiveSnippet] = useState('HTML');
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && event.target === modalRef.current) {
        onClose();
    }
  };
  
  const selectSnippet = (snippetName: 'HTML' | 'CSS' | 'JavaScript') => {
    setActiveSnippet(snippetName);
    setCode(demoSnippets[snippetName]);
  };

  if (!isOpen) return null;

  return (
    <div 
        ref={modalRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-dark-gray/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-4">
             <h2 className="font-poppins font-bold text-xl text-dark-gray">Interactive Demo</h2>
             <div className="flex gap-2">
                 {(Object.keys(demoSnippets) as Array<keyof typeof demoSnippets>).map(name => (
                     <button
                        key={name}
                        onClick={() => selectSnippet(name)}
                        className={`font-poppins font-semibold py-1 px-3 rounded-full text-sm transition-colors duration-300 ${
                            activeSnippet === name ? 'bg-primary text-white' : 'bg-gray-200 text-dark-gray hover:bg-gray-300'
                        }`}
                     >
                        {name}
                     </button>
                 ))}
             </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-dark-gray" aria-label="Close demo">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Content */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200 overflow-hidden">
          {/* Code Editor */}
          <div className="bg-dark-gray flex flex-col h-full overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your code here..."
              aria-label="Code editor"
            />
          </div>

          {/* Preview */}
          <div className="bg-white h-full overflow-hidden">
            <iframe
              srcDoc={code}
              title="Live Preview"
              sandbox="allow-scripts"
              className="w-full h-full border-none"
              aria-label="Code preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
