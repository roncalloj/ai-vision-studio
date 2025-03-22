const HF_API_URL = 'https://api-inference.huggingface.co/models';
const VISION_MODEL = 'microsoft/resnet-50'; // Free vision model for image analysis
const IMAGE_GEN_MODEL = 'stabilityai/stable-diffusion-2'; // Free image generation model

export const analyzeImage = async (imageURL) => {
	try {
		const response = await fetch(imageURL);
		const imageBlob = await response.blob();

		const result = await fetch(`${HF_API_URL}/${VISION_MODEL}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}`,
			},
			body: imageBlob,
		});

		if (result.ok) {
			const data = await result.json();
			return {
				dataJson: {
					tags: data.map((item) => ({
						name: item.label,
						confidence: item.score,
					})),
					caption: {
						text: data[0]?.label || 'No caption available',
						confidence: data[0]?.score || 0,
					},
				},
				validation: 'ok',
			};
		} else {
			const error = await result.json();
			return {
				dataJson: { error },
				validation: 'failed',
			};
		}
	} catch (error) {
		console.error(error);
		return {
			dataJson: { error: { message: 'Failed to analyze image' } },
			validation: 'failed',
		};
	}
};

export const generateImage = async (prompt) => {
	try {
		const response = await fetch(`${HF_API_URL}/${IMAGE_GEN_MODEL}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ inputs: prompt }),
		});

		if (response.ok) {
			const blob = await response.blob();
			const imageUrl = URL.createObjectURL(blob);
			return {
				dataJson: { url: imageUrl },
				validation: 'ok',
			};
		} else {
			const error = await response.json();
			return {
				dataJson: { error },
				validation: 'failed',
			};
		}
	} catch (error) {
		console.error(error);
		return {
			dataJson: { error: { message: 'Failed to generate image' } },
			validation: 'failed',
		};
	}
};

export const isConfigured = () => {
	return !!process.env.REACT_APP_HF_TOKEN;
};
