import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(null)
  const [texts, setTexts] = useState([])
  const [textInput, setTextInput] = useState('')
  const [dragging, setDragging] = useState(null)
  const [stickers, setStickers] = useState([])

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
        x: 50,
        y: 50,
      },
    ])

    setTextInput('')
  }

  const addSticker = (sticker) => {
    setStickers([
      ...stickers,
      {
        id: Date.now(),
        sticker,
        x: 100,
        y: 100,
      },
    ])
  }

  const startDragging = (event, type, id) => {
    event.preventDefault()
    event.stopPropagation()

    setDragging({
      type,
      id,
    })
  }

  const handleMouseMove = (event) => {
    if (!dragging) return

    const imageArea = event.currentTarget.querySelector('.meme-image')
    const rect = imageArea.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (dragging.type === 'text') {
      setTexts((currentTexts) =>
        currentTexts.map((item) =>
          item.id === dragging.id
            ? { ...item, x, y }
            : item
        )
      )
    }

    if (dragging.type === 'sticker') {
      setStickers((currentStickers) =>
        currentStickers.map((item) =>
          item.id === dragging.id
            ? { ...item, x, y }
            : item
        )
      )
    }
  }

  const stopDragging = () => {
    setDragging(null)
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

      <div className="sticker-controls">
        <span>Add Sticker:</span>

        <button onClick={() => addSticker('😀')}>😀</button>
        <button onClick={() => addSticker('😂')}>😂</button>
        <button onClick={() => addSticker('😎')}>😎</button>
        <button onClick={() => addSticker('🔥')}>🔥</button>
        <button onClick={() => addSticker('❤️')}>❤️</button>
        <button onClick={() => addSticker('👍')}>👍</button>
      </div>

      <div
        className="canvas"
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {image ? (
          <div className="meme-image">
            <img src={image} alt="Uploaded meme" />

            {texts.map((item) => (
              <div
                key={item.id}
                className="meme-text"
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                }}
                onMouseDown={(event) =>
                  startDragging(event, 'text', item.id)
                }
              >
                {item.text}
              </div>
            ))}

            {stickers.map((item) => (
              <div
                key={item.id}
                className="meme-sticker"
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                }}
                onMouseDown={(event) =>
                  startDragging(event, 'sticker', item.id)
                }
              >
                {item.sticker}
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