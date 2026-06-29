import "@hotwired/turbo-rails"
import "./controllers"
import { createRoot } from "react-dom/client"
import ImagePreview from "./components/ImagePreview"

document.addEventListener("turbo:load", () => {
  document.querySelectorAll("[data-react-image-preview]").forEach((el) => {
    const root = createRoot(el)
    root.render(
      <ImagePreview
        inputName={el.dataset.inputName}
        defaultSrc={el.dataset.defaultSrc || null}
      />
    )
  })
})
