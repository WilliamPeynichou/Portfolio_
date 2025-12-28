import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function ImageModal({ isOpen, onClose, imageSrc, altText }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 transition-all duration-300"
      onClick={onClose}
    >
      <button 
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      
      <div 
        className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={imageSrc} 
          alt={altText} 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
        />
      </div>
    </div>
  )
}

