import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }

  return (
    <div className="app">
      <h1>Meme Generator</h1>

      <label className="upload-button">
        📁 Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </label>

      <div className="canvas">
        {image ? (
          <img src={image} alt="Uploaded meme" />
        ) : (
          <p>Upload an image to get started</p>
        )}
      </div>
    </div>
  )
}

export default App