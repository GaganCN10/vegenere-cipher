import { useState, useEffect } from 'react'

export function AnimatedText({ text, speed = 50, className = "" }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-green-400">▊</span>
      )}
    </div>
  )
}
