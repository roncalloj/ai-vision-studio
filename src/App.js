import React, { useState } from 'react';
import { analyzeImage, generateImage, isConfigured } from './huggingface-api';
import './styles.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState('analyze');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState({ dataJson: null, validation: '', url: '' });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInputValue('');
    setError(null);
    setData({ dataJson: null, validation: '', url: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData({ dataJson: null, validation: '', url: '' });

    try {
      if (mode === 'analyze') {
        const response = await analyzeImage(inputValue);
        setData({ ...response, url: inputValue });
      } else {
        const response = await generateImage(inputValue);
        if (response.validation === 'ok') {
          setData({
            ...response,
            url: response.dataJson.url,
          });
        } else {
          setError(response.dataJson.error.message);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="dark-mode-container">
        <span className="dark-mode-label">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        <button 
          className={`dark-mode-toggle ${darkMode ? 'dark' : ''}`}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <div className="toggle-thumb">
            <span className="toggle-icon">{darkMode ? '☀️' : '🌙'}</span>
          </div>
        </button>
      </div>

      {!isConfigured() ? (
        <div className="error">
          Hugging Face API is not configured. Please add your API token.
        </div>
      ) : (
        <>
          <h1>AI Vision Studio</h1>
          <p className="helper-text">
            {mode === 'analyze' 
              ? "Drop an image URL to discover what's in it using AI 🔍" 
              : "Describe what you want to see and let AI create it ✨"}
          </p>

          <div className="input-section">
            <div className="mode-toggle">
              <button 
                className={mode === 'analyze' ? 'active' : ''}
                onClick={() => handleModeChange('analyze')}
              >
                🔍 Analyze
              </button>
              <button 
                className={mode === 'generate' ? 'active' : ''}
                onClick={() => handleModeChange('generate')}
              >
                ✨ Generate
              </button>
            </div>

            <form onSubmit={handleSubmit} className="input-form">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={mode === 'analyze' 
                  ? "Enter image URL to analyze..." 
                  : "Enter text prompt to generate image..."}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : mode === 'analyze' ? 'Analyze Image' : 'Generate Image'}
              </button>
            </form>
          </div>

          {error && <div className="error">{error}</div>}

          {data.validation === 'ok' && data.url && (
            <div className="results">
              <div className="image-container">
                <img src={data.url} alt={mode === 'analyze' ? 'Analyzed' : 'Generated'} />
              </div>
              {mode === 'analyze' && data.dataJson.tags && (
                <div className="tags">
                  {data.dataJson.tags.map((tag, index) => (
                    <div key={index} className="tag">
                      {tag.name}: {Math.round(tag.confidence * 100)}%
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
