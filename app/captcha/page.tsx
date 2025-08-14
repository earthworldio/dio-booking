'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CaptchaPage() {
  const [captchaQuestion, setCaptchaQuestion] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Generate random math question
  useEffect(() => {
    generateNewQuestion()
  }, [])

  const generateNewQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const operators = ['+', '-', '×']
    const operator = operators[Math.floor(Math.random() * operators.length)]
    
    let question = ''
    let answer = 0
    
    switch (operator) {
      case '+':
        question = `${num1} + ${num2} = ?`
        answer = num1 + num2
        break
      case '-':
        question = `${num1} - ${num2} = ?`
        answer = num1 - num2
        break
      case '×':
        question = `${num1} × ${num2} = ?`
        answer = num1 * num2
        break
    }
    
    setCaptchaQuestion(question)
    setCaptchaAnswer('')
    setIsCorrect(null)
    setShowResult(false)
    
    sessionStorage.setItem('captchaAnswer', answer.toString())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correctAnswer = sessionStorage.getItem('captchaAnswer')
    
    if (captchaAnswer === correctAnswer) {
      setIsCorrect(true)
      setShowResult(true)
    } else {
      setIsCorrect(false)
      setShowResult(true)
    }
  }

  const handleNext = () => {
    generateNewQuestion()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-center flex items-center justify-center min-h-screen">
        <div className="max-w-sm w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-3 text-ratch-brown hover:text-ratch-dark-brown">
              ← กลับหน้าหลัก
            </Link>
            <h1 className="text-2xl font-bold text-ratch-dark-brown mb-2">
              ทดสอบ CAPTCHA
            </h1>
            <p className="text-gray-600 text-sm">
              หน้าทดสอบสำหรับบอท
            </p>
          </div>

          {/* CAPTCHA Box */}
          <div className="card">
            <div className="text-center space-y-4">
              {/* Math Question */}
              <div>
                <h2 className="text-xl font-bold text-ratch-dark-brown mb-3">
                  {captchaQuestion}
                </h2>
                <p className="text-gray-600 text-sm">
                  กรุณาใส่ผลลัพธ์ของตัวเลขทั้งสอง
                </p>
              </div>

              {/* Answer Input */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  className="input-field text-center text-xl font-bold"
                  placeholder="คำตอบ"
                  autoFocus
                />
                
                <button
                  type="submit"
                  className="w-full btn-primary text-base py-2"
                >
                  ตรวจสอบคำตอบ
                </button>
              </form>

              {/* Result */}
              {showResult && (
                <div className={`p-3 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-100 border border-green-300 text-green-800' 
                    : 'bg-red-100 border border-red-300 text-red-800'
                }`}>
                  <div className="font-semibold mb-1 text-sm">
                    {isCorrect ? '✅ คำตอบถูกต้อง!' : '❌ คำตอบไม่ถูกต้อง'}
                  </div>
                  <p className="text-xs">
                    {isCorrect 
                      ? 'คุณผ่านการทดสอบ CAPTCHA แล้ว' 
                      : `คำตอบที่ถูกต้องคือ: ${sessionStorage.getItem('captchaAnswer')}`
                    }
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleNext}
                  className="flex-1 btn-secondary text-sm py-2"
                >
                  คำถามถัดไป
                </button>
                
                <button
                  onClick={generateNewQuestion}
                  className="flex-1 btn-secondary text-sm py-2"
                >
                  สร้างคำถามใหม่
                </button>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center text-xs text-gray-600">
            <p>หน้าทดสอบนี้ใช้สำหรับทดสอบบอทในการอ่านและตอบ CAPTCHA</p>
            <p className="mt-1">บอทจะต้อง:</p>
            <ul className="mt-1 space-y-1">
              <li>• อ่านคำถามคณิตศาสตร์</li>
              <li>• คำนวณผลลัพธ์</li>
              <li>• กรอกคำตอบลงในช่อง</li>
              <li>• กดปุ่มตรวจสอบ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 