export const analyzeImage = async (imageURL) => {
	let vionKey = process.env.REACT_APP_VISION_KEY;
	let requestURL = process.env.REACT_APP_VISION_ENDPOINT + process.env.REACT_APP_ANALYSIS_OPTIONS;

	let request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Ocp-Apim-Subscription-Key': vionKey,
		},
		body: JSON.stringify({ url: imageURL }),
	};
	try {
		let response = await fetch(requestURL, request);
		if (response.ok) {
			let data = await response.json();
			return {
				dataJson: data,
				validation: 'ok',
			};
		} else {
			let data = await response.json();
			if (data) {
				return {
					dataJson: data,
					validation: 'faild',
				};
			}
			return {
				dataJson: 'No data',
				validation: 'faild',
			};
		}
	} catch (error) {
		console.log(error);
	}
};

export const isConfiguredAnalize = () => {
	if (process.env.REACT_APP_VISION_KEY && process.env.REACT_APP_VISION_ENDPOINT) {
		return true;
	}
	return false;
};
