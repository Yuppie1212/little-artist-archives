import "@hotwired/turbo-rails"
import "./controllers"
import { createRoot } from "react-dom/client"
import ImagePreview from "./components/ImagePreview"
import MultiImageUpload from "./components/MultiImageUpload"
import PhotoSlider from "./components/PhotoSlider"

document.addEventListener("turbo:load", (): void => {
  // こどものアイコン（1枚）
  document.querySelectorAll<HTMLElement>("[data-react-image-preview]").forEach((el): void => {
    const root = createRoot(el)
    root.render(
      <ImagePreview
        inputName={el.dataset.inputName ?? ""}
        defaultSrc={el.dataset.defaultSrc || null}
      />
    )
  })

  // 作品詳細スライダー
  document.querySelectorAll<HTMLElement>("[data-react-photo-slider]").forEach((el): void => {
    const photos = JSON.parse(el.dataset.photos || "[]")
    const root = createRoot(el)
    root.render(<PhotoSlider photos={photos} />)
  })

  // 作品の写真（複数枚・並び替え対応）
  document.querySelectorAll<HTMLElement>("[data-react-multi-image-upload]").forEach((el): void => {
    const existingPhotos = JSON.parse(el.dataset.existingPhotos || "[]")
    const root = createRoot(el)
    root.render(
      <MultiImageUpload
        inputName={el.dataset.inputName ?? "artwork[photos][]"}
        existingPhotos={existingPhotos}
      />
    )
  })
})
