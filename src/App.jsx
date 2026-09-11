import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(null)
  const [texts, setTexts] = useState([])
  const [textInput, setTextInput] = useState('')

  const handleImageUpload = (event) => {
    const file = event.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }

  const addText = () => {
    if (textInput.trim() === '') return

    setTexts([
      ...texts,
      {
        id: Date.now(),
        text: textInput,
      },
    ])

    setTextInput('')
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

      <div className="text-controls">
        <input
          type="text"
          placeholder="Enter meme text"
          value={textInput}
          onChange={(event) => setTextInput(event.target.value)}
        />

        <button onClick={addText}>
          ➕ Add Text
        </button>
      </div>

      <div className="canvas">
        {image ? (
          <div className="meme-image">
            <img src={image} alt="Uploaded meme" />

            {texts.map((item) => (
              <div
                key={item.id}
                className="meme-text"
              >
                {item.text}
              </div>
            ))}
          </div>
        ) : (
          <p>Upload an image to get started</p>
        )}
      </div>
    </div>
  )
}

export default App