# AI Vision Studio 🎨

An AI-powered web application that leverages Hugging Face's free models to analyze existing images and generate new ones from text descriptions. Perfect for developers, artists, and anyone interested in AI image processing!

![AI Vision Studio Demo](public/demo.png)

## ✨ Features

- 🔍 **Image Analysis**

  - Upload images via URL
  - Get detailed AI-powered image descriptions
  - Receive confidence scores and tags
  - Real-time processing

- 🎨 **Image Generation**

  - Create images from text descriptions
  - Uses Stable Diffusion 2.0
  - High-quality output
  - Creative prompt support

- 💻 **Modern UI/UX**
  - Clean, intuitive interface
  - Real-time loading states
  - Error handling
  - Mobile-responsive design

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Hugging Face account (free)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/roncalloj/ai-vision-studio.git
   cd ai-vision-studio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment:

   - Create a `.env` file in the project root
   - Add your Hugging Face token:
     ```
     REACT_APP_HF_TOKEN=your_token_here
     ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage Guide

### Analyzing Images

1. Find an image URL you want to analyze
2. Paste the URL in the input field
3. Click "Analyze Image"
4. View the results:
   - Image preview
   - AI-generated description
   - Confidence scores
   - Relevant tags

Example image URLs to try:

```
https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg
https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg
```

### Generating Images

1. Type a descriptive prompt
2. Click "Generate Image"
3. Wait for the AI to create your image
4. View and download the result

Example prompts to try:

```
A magical treehouse at night with glowing lanterns and a spiral staircase
A futuristic city in the clouds with flying cars at sunset, cyberpunk style
```

## 🛠️ Technical Details

### Project Structure

```
ai-vision-studio/
├── src/
│   ├── App.js              # Main application component
│   ├── App.css             # Main styles
│   ├── huggingface-api.js  # API integration
│   └── index.js            # Entry point
├── public/                 # Static files
└── package.json           # Dependencies and scripts
```

### AI Models Used

- **Image Analysis**: microsoft/resnet-50

  - Type: Vision model
  - Purpose: Image classification and tagging
  - Response: Tags with confidence scores

- **Image Generation**: stabilityai/stable-diffusion-2
  - Type: Text-to-image model
  - Purpose: Creating images from text
  - Output: High-quality generated images

## 🔒 Security Best Practices

### API Token Security

1. **Environment Variables**

   - Never commit `.env` files
   - Use `.env.example` as a template
   - Keep tokens secure

2. **Token Management**

   - Use a password manager
   - Rotate tokens regularly
   - Monitor usage

3. **Access Control**
   - Minimum required permissions
   - Regular token review
   - Secure storage

## 🔧 Troubleshooting

Common issues and solutions:

1. **Image Analysis Fails**

   - Verify the image URL is accessible
   - Check your token is valid
   - Ensure image format is supported (JPG, PNG)

2. **Generation Takes Too Long**

   - Generation typically takes 10-20 seconds
   - Check your internet connection
   - Verify token permissions

3. **App Won't Start**
   - Verify Node.js version
   - Check `.env` file exists
   - Confirm all dependencies installed

## 📚 Additional Resources

- [Hugging Face Documentation](https://huggingface.co/docs)
- [React Documentation](https://reactjs.org/)
- [Stable Diffusion Guide](https://huggingface.co/blog/stable_diffusion)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

- Hugging Face for providing free AI models
- React team for the amazing framework
- Open source community for inspiration

---

Made with 🎧 by roncalloj
