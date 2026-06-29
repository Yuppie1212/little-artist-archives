import { useState, ChangeEvent } from "react"

interface Props {
  inputName: string
  defaultSrc: string | null
}

export default function ImagePreview({ inputName, defaultSrc }: Props) {
  const [preview, setPreview] = useState<string | null>(defaultSrc)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="image-preview-wrapper">
      {preview && (
        <div className="image-preview-container">
          <img src={preview} alt="プレビュー" className="image-preview" />
        </div>
      )}
      <label className="image-upload-label">
        <span className="upload-icon">📷</span>
        <span>{preview ? "写真を変更する" : "写真を選ぶ"}</span>
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
