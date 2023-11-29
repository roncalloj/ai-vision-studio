import React, { useState } from 'react';
import './App.css';
import { analyzeImage, isConfiguredAnalize } from './azure-image-analysis';
import { generateImage } from './openAI-image-generation';

function App() {
	let initialData = { imageData: 'No image data', url: '' };
	const [data, setData] = useState(initialData);

	const handleAnalize = async (event) => {
		event.preventDefault();

		let url = event.target.form.elements.url.value;
		let response = await analyzeImage(url);
		if (response.validation === 'ok') {
			setData({ imageData: response.dataJson, url: url });
		} else {
			console.log(response.dataJson.error.message);
			setData({ imageData: 'No image data', url: '' });
		}
	};

	const handleGenerate = async (event) => {
		event.preventDefault();

		let url = event.target.form.elements.url.value;
		let response = await generateImage(url);
		if (response.validation === 'ok') {
			setData({ imageData: response.dataJson });
		} else {
			console.log(response.dataJson.error.message);
			setData({ imageData: 'No image to show', url: '' });
		}
	};

	return (
		<div className="App">
			{!isConfiguredAnalize() ? (
				<p>Azure is not configured</p>
			) : (
				<header className="App-header">
					<h1>Computer vision</h1>
					<p>Insert URL or type prompt:</p>
					<form>
						<input
							name="url"
							type="text"
							placeholder="Insert URL to analize or textual prompt to generate an image "
						/>
						<br />
						<button name="analyze" type="submit" onClick={handleAnalize}>
							Analize
						</button>
						<button name="generate" type="submit" onClick={handleGenerate}>
							Image generator
						</button>
					</form>
					{data.imageData !== 'No image data' ? (
						<>
							<img src={data.url} alt="source" />
							<pre> {JSON.stringify(data.imageData, null, 2)} </pre>
						</>
					) : (
						<p> {data.imageData} </p>
					)}
				</header>
			)}
		</div>
	);
}

export default App;
