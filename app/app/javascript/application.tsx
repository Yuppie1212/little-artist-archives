import "@hotwired/turbo-rails"
import "./controllers"
import { createRoot } from "react-dom/client"
import ImagePreview from "./components/ImagePreview"

document.addEventListener("turbo:load", (): void => {
  document.querySelectorAll<HTMLElement>("[data-react-image-preview]").forEach((el): void => {
    const root = createRoot(el)
    root.render(
      <ImagePreview
        inputName={el.dataset.inputName ?? ""}
        defaultSrc={el.dataset.defaultSrc || null}
      />
    )
  })
})
