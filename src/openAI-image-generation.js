export const generateImage = async (imagePrompt) => {
	let openAIKey = process.env.REACT_APP_OPENAI_KEY;
	let requestURL = process.env.REACT_APP_OPENAI_ENDPOINT;

	let request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + openAIKey,
		},
		body: JSON.stringify({ prompt: imagePrompt }),
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
				dataJson: 'No image to show',
				validation: 'faild',
			};
		}
	} catch (error) {
		console.log(error);
	}
};

export default generateImage;
