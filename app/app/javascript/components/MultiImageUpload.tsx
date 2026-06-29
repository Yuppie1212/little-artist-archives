import { useState, useRef, DragEvent, ChangeEvent } from "react"
import { DirectUpload } from "@rails/activestorage"

interface ExistingPhoto {
  signedId: string
  url: string
}

interface ImageItem {
  id: string
  signedId: string
  previewUrl: string
  uploading: boolean
  progress: number
}

interface Props {
  inputName: string
  existingPhotos: ExistingPhoto[]
}

const genId = (): string => Math.random().toString(36).slice(2)

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads"

export default function MultiImageUpload({ inputName, existingPhotos }: Props) {
  const [items, setItems] = useState<ImageItem[]>(
    existingPhotos.map((p) => ({
      id: genId(),
      signedId: p.signedId,
      previewUrl: p.url,
      uploading: false,
      progress: 100,
    }))
  )

  const [isAddZoneActive, setIsAddZoneActive] = useState(false)
  const [dragSrcIndex, setDragSrcIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Direct Upload ─────────────────────────────────────────
  const uploadFile = (file: File): void => {
    if (!file.type.startsWith("image/")) return

    const tempId = genId()
    const previewUrl = URL.createObjectURL(file)

    setItems((prev) => [
      ...prev,
      { id: tempId, signedId: "", previewUrl, uploading: true, progress: 0 },
    ])

    const upload = new DirectUpload(file, DIRECT_UPLOAD_URL, {
      directUploadWillStoreFileWithXHR(xhr) {
        xhr.upload.addEventListener("progress", (e) => {
          if (!e.lengthComputable) return
          const pct = Math.round((e.loaded / e.total) * 100)
          setItems((prev) =>
            prev.map((item) =>
              item.id === tempId ? { ...item, progress: pct } : item
            )
          )
        })
      },
    })

    upload.create((error, blob) => {
      if (error) {
        setItems((prev) => prev.filter((item) => item.id !== tempId))
        alert("アップロードに失敗しました。もう一度お試しください。")
        return
      }
      setItems((prev) =>
        prev.map((item) =>
          item.id === tempId
            ? { ...item, signedId: blob.signed_id, uploading: false, progress: 100 }
            : item
        )
      )
    })
  }

  const handleFiles = (files: FileList | null): void => {
    if (!files) return
    Array.from(files).forEach(uploadFile)
  }

  // ── 並び替えドラッグ ──────────────────────────────────────
  const handleItemDragStart = (e: DragEvent<HTMLDivElement>, index: number): void => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", "reorder")
    setDragSrcIndex(index)
  }

  const handleItemDragOver = (e: DragEvent<HTMLDivElement>, index: number): void => {
    e.preventDefault()
    if (dragSrcIndex === null) return
    e.dataTransfer.dropEffect = "move"
    setDragOverIndex(index)
  }

  const handleItemDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number): void => {
    e.preventDefault()
    e.stopPropagation()
    if (dragSrcIndex === null || dragSrcIndex === dropIndex) {
      setDragSrcIndex(null)
      setDragOverIndex(null)
      return
    }
    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(dragSrcIndex, 1)
      next.splice(dropIndex, 0, moved)
      return next
    })
    setDragSrcIndex(null)
    setDragOverIndex(null)
  }

  const handleItemDragEnd = (): void => {
    setDragSrcIndex(null)
    setDragOverIndex(null)
  }

  // ── 追加ゾーン ────────────────────────────────────────────
  const handleAddZoneDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    if (!e.dataTransfer.types.includes("Files")) return
    e.dataTransfer.dropEffect = "copy"
    setIsAddZoneActive(true)
  }

  const handleAddZoneDragLeave = (): void => setIsAddZoneActive(false)

  const handleAddZoneDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsAddZoneActive(false)
    if (dragSrcIndex !== null) return // アイテム並び替えドロップは無視
    handleFiles(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleFiles(e.target.files)
    e.target.value = ""
  }

  const removeItem = (id: string): void => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // ── レンダリング ──────────────────────────────────────────
  return (
    <div className="multi-upload">
      <div className="multi-upload-grid">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={[
              "multi-upload-item",
              index === 0 ? "multi-upload-item--main" : "",
              item.uploading ? "multi-upload-item--uploading" : "",
              dragSrcIndex === index ? "multi-upload-item--dragging" : "",
              dragOverIndex === index && dragSrcIndex !== index
                ? "multi-upload-item--drop-target"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            draggable={!item.uploading}
            onDragStart={(e) => handleItemDragStart(e, index)}
            onDragOver={(e) => handleItemDragOver(e, index)}
            onDrop={(e) => handleItemDrop(e, index)}
            onDragEnd={handleItemDragEnd}
          >
            <img src={item.previewUrl} alt="" className="multi-upload-thumb" />

            {index === 0 && !item.uploading && (
              <span className="multi-upload-badge">⭐ メイン</span>
            )}

            {item.uploading && (
              <div className="multi-upload-progress">
                <div
                  className="multi-upload-progress-bar"
                  style={{ width: `${item.progress}%` }}
                />
                <span className="multi-upload-progress-text">{item.progress}%</span>
              </div>
            )}

            {!item.uploading && (
              <button
                type="button"
                className="multi-upload-remove"
                onClick={() => removeItem(item.id)}
                aria-label="削除"
              >
                ×
              </button>
            )}

            {/* 送信用 hidden input（アップロード完了後のみ） */}
            {item.signedId && (
              <input type="hidden" name={inputName} value={item.signedId} />
            )}
          </div>
        ))}

        {/* 追加ゾーン */}
        <div
          className={`multi-upload-add ${isAddZoneActive ? "multi-upload-add--active" : ""}`}
          onDragOver={handleAddZoneDragOver}
          onDragLeave={handleAddZoneDragLeave}
          onDrop={handleAddZoneDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="multi-upload-add-icon">
            {isAddZoneActive ? "✨" : "＋"}
          </span>
          <p className="multi-upload-add-text">
            {isAddZoneActive ? "ドロップして追加！" : "写真を追加"}
          </p>
        </div>
      </div>

      {items.length > 1 && (
        <p className="multi-upload-hint">↔ ドラッグで順番を変えられます</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
    </div>
  )
}
