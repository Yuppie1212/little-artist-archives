import { useState } from "react"

export default function ImagePreview({ inputName, defaultSrc }) {
  const [preview, setPreview] = useState(defaultSrc || null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="image-preview-wrapper">
      {preview && (
        <img src={preview} alt="プレビュー" className="image-preview" />
      )}
      <label className="image-upload-label">
        📷 写真を選ぶ
        <input
          type="file"
          name={inputName}
          accept="image/*"
          onChange={handleChange}
          className="image-upload-input"
        />
      </label>
    </div>
  )
}
