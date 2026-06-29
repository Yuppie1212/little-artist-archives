import { useState } from "react"

interface Props {
  photos: string[]
}

export default function PhotoSlider({ photos }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (photos.length === 0) return null

  const goPrev = (): void =>
    setActiveIndex((i) => (i - 1 + photos.length) % photos.length)

  const goNext = (): void =>
    setActiveIndex((i) => (i + 1) % photos.length)

  return (
    <div className="slider">
      {/* メイン表示 */}
      <div className="slider-main">
        <img
          key={activeIndex}
          src={photos[activeIndex]}
          alt={`作品 ${activeIndex + 1}`}
          className="slider-main-img"
        />

        {photos.length > 1 && (
          <>
            <button
              type="button"
              className="slider-arrow slider-arrow--prev"
              onClick={goPrev}
              aria-label="前の写真"
            >
              ‹
            </button>
            <button
              type="button"
              className="slider-arrow slider-arrow--next"
              onClick={goNext}
              aria-label="次の写真"
            >
              ›
            </button>
            <div className="slider-counter">
              {activeIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* サムネイル一覧 */}
      {photos.length > 1 && (
        <div className="slider-thumbs">
          {photos.map((url, i) => (
            <button
              key={url}
              type="button"
              className={`slider-thumb-btn ${i === activeIndex ? "slider-thumb-btn--active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`写真 ${i + 1}`}
            >
              <img src={url} alt={`サムネイル ${i + 1}`} className="slider-thumb-img" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
