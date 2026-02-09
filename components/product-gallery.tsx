"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const defaultImages = [
  "/images/variante-preto.png",
  "/images/produto-1.png",
  "/images/produto-2.png",
  "/images/produto-3.jpg",
  "/images/produto-4.jpg",
  "/images/produto-5.jpg",
  "/images/produto-6.jpg",
  "/images/produto-7.png",
  "/images/produto-8.jpg",
  "/images/produto-9.png",
  "/images/produto-10.png",
  "/images/produto-11.png",
  "/images/produto-12.png",
  "/images/produto-13.jpg",
  "/images/produto-14.jpg",
  "/images/produto-15.png",
  "/images/produto-16.jpg",
  "/images/produto-17.png",
  "/images/produto-18.png",
]

interface ProductGalleryProps {
  variantImage?: string | null
}

export function ProductGallery({ variantImage }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [showVariant, setShowVariant] = useState(false)

  useEffect(() => {
    if (variantImage) {
      setShowVariant(true)
    }
  }, [variantImage])

  const images = defaultImages

  const prev = () => {
    setShowVariant(false)
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }
  const next = () => {
    setShowVariant(false)
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }

  const handleThumbClick = (i: number) => {
    setShowVariant(false)
    setCurrent(i)
  }

  return (
    <div className="flex flex-col">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f5f5f5] rounded-none">
        {/* Default product images */}
        {images.map((img, i) => (
          <Image
            key={img}
            src={img || "/placeholder.svg"}
            alt={`Capas de Bancos Premium - Imagem ${i + 1}`}
            fill
            className={`object-cover transition-opacity duration-300 ${!showVariant && i === current ? "opacity-100" : "opacity-0"}`}
            priority={i === 0}
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        ))}

        {/* Variant overlay image */}
        {variantImage && (
          <Image
            src={variantImage || "/placeholder.svg"}
            alt="Variante selecionada"
            fill
            className={`object-cover transition-opacity duration-300 ${showVariant ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        )}

        {/* Previous button */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#ffffff]/80 hover:bg-[#ffffff] rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-5 w-5 text-[#1a1a1a]" />
        </button>

        {/* Next button */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#ffffff]/80 hover:bg-[#ffffff] rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Proxima imagem"
        >
          <ChevronRight className="h-5 w-5 text-[#1a1a1a]" />
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-sm text-[#666666] mt-3">
        {showVariant ? "Variante" : `${current + 1} / ${images.length}`}
      </p>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2 px-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => handleThumbClick(i)}
            className={`relative w-[60px] h-[60px] shrink-0 overflow-hidden border-2 transition-all ${
              !showVariant && i === current
                ? "border-[#1a1a1a] opacity-100"
                : "border-[#e5e5e5] opacity-70 hover:opacity-100"
            }`}
            aria-label={`Ver imagem ${i + 1}`}
          >
            <Image
              src={img || "/placeholder.svg"}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
