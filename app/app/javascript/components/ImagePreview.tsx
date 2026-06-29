import { useState, useRef, ChangeEvent, DragEvent } from "react"

interface Props {
  inputName: string
  defaultSrc: string | null
}

export default function ImagePreview({ inputName, defaultSrc }: Props) {
  const [preview, setPreview] = useState<string | null>(defaultSrc)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const showPreview = (file: File): void => {
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  // クリックで選ぶ → input の files はブラウザがセット済みなので触らない
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) showPreview(file)
  }

  // ドロップ → input に file がないので DataTransfer で注入する
  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith("image/")) return

    const dt = new DataTransfer()
    dt.items.add(file)
    if (inputRef.current) inputRef.current.files = dt.files

    showPreview(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <div
      className={`drop-zone ${isDragging ? "drop-zone--active" : ""} ${preview ? "drop-zone--has-preview" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      {preview ? (
        <div className="drop-zone-preview">
          <img src={preview} alt="プレビュー" className="drop-zone-image" />
          <div className="drop-zone-overlay">
            <span className="drop-zone-overlay-icon">📷</span>
            <span className="drop-zone-overlay-text">クリックまたはドロップで変更</span>
          </div>
        </div>
      ) : (
        <div className="drop-zone-placeholder">
          <span className="drop-zone-icon">{isDragging ? "✨" : "📂"}</span>
          <p className="drop-zone-text">
            {isDragging ? "ここにドロップ！" : "クリックまたはドラッグ＆ドロップ"}
          </p>
          <p className="drop-zone-hint">JPG・PNG・GIF など</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        name={inputName}
        accept="image/*"
        onChange={handleChange}
        className="drop-zone-input"
      />
    </div>
  )
}
