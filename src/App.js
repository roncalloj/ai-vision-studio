import React, { useState } from 'react';
import './App.css';
import { analyzeImage, generateImage, isConfigured } from './huggingface-api';

function App() {
	const [data, setData] = useState({ imageData: 'No image data', url: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleAnalyze = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		const url = event.target.form.elements.url.value;
		const response = await analyzeImage(url);
		
		if (response.validation === 'ok') {
			setData({ imageData: response.dataJson, url: url });
		} else {
			setError(response.dataJson.error.message);
			setData({ imageData: 'No image data', url: '' });
		}
		setLoading(false);
	};

	const handleGenerate = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		const prompt = event.target.form.elements.url.value;
		const response = await generateImage(prompt);
		
		if (response.validation === 'ok') {
			setData({ 
				imageData: { caption: { text: prompt } },
				url: response.dataJson.url 
			});
		} else {
			setError(response.dataJson.error.message);
			setData({ imageData: 'No image to show', url: '' });
		}
		setLoading(false);
	};

	return (
		<div className="App">
			{!isConfigured() ? (
				<p>Hugging Face API is not configured. Please add your API token.</p>
			) : (
				<header className="App-header">
					<h1>AI Vision Studio</h1>
					<p>Insert URL to analyze or enter a prompt to generate an image:</p>
					<form>
						<input
							name="url"
							type="text"
							placeholder="Image URL to analyze or text prompt to generate an image"
							style={{ width: '400px', padding: '8px' }}
						/>
						<br />
						<div style={{ marginTop: '10px' }}>
							<button 
								name="analyze" 
								type="submit" 
								onClick={handleAnalyze}
								disabled={loading}
								style={{ marginRight: '10px' }}
							>
								{loading ? 'Processing...' : 'Analyze Image'}
							</button>
							<button 
								name="generate" 
								type="submit" 
								onClick={handleGenerate}
								disabled={loading}
							>
								{loading ? 'Generating...' : 'Generate Image'}
							</button>
						</div>
					</form>
					{error && (
						<p style={{ color: '#ff6b6b' }}>{error}</p>
					)}
					{data.url && (
						<div style={{ marginTop: '20px' }}>
							<img 
								src={data.url} 
								alt="result" 
								style={{ maxWidth: '500px', marginBottom: '20px' }}
							/>
							<pre style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
								{JSON.stringify(data.imageData, null, 2)}
							</pre>
						</div>
					)}
				</header>
			)}
		</div>
	);
}

export default App;
