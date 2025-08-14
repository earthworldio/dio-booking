'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface BookingData {
  name: string
  date: string
  phone: string
  amount: string
  timeSlot: string
  notes: string
}

export default function ConfirmBookingPage() {
  const searchParams = useSearchParams()
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    date: '',
    phone: '',
    amount: '',
    timeSlot: '',
    notes: ''
  })
  
  const [captchaQuestion, setCaptchaQuestion] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaCorrect, setCaptchaCorrect] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get booking data from URL params or localStorage
  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(data))
        setBookingData(decoded)
      } catch (e) {
        console.error('Failed to parse booking data')
      }
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem('bookingData')
      if (stored) {
        setBookingData(JSON.parse(stored))
      }
    }
    
    // Generate CAPTCHA
    generateCaptcha()
  }, [searchParams])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 20) + 1
    const num2 = Math.floor(Math.random() * 20) + 1
    const question = `${num1} + ${num2} = ?`
    const answer = num1 + num2
    
    setCaptchaQuestion(question)
    setCaptchaAnswer('')
    setCaptchaCorrect(null)
    
    // Store correct answer in sessionStorage
    sessionStorage.setItem('captchaAnswer', answer.toString())
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    
    const date = new Date(dateString)
    const days = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์']
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                   'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    
    return `${days[date.getDay()]}ที่ ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const handleCaptchaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correctAnswer = sessionStorage.getItem('captchaAnswer')
    
    if (captchaAnswer === correctAnswer) {
      setCaptchaCorrect(true)
      setIsSubmitting(true)
      
      // Redirect to payment page after successful CAPTCHA
      setTimeout(() => {
        const dataParam = encodeURIComponent(JSON.stringify(bookingData))
        window.location.href = `/booking/payment?data=${dataParam}`
      }, 1500)
    } else {
      setCaptchaCorrect(false)
    }
  }

  const handleNewCaptcha = () => {
    generateCaptcha()
    setCaptchaCorrect(null)
  }

  return (
    <div className="min-h-screen bg-dio-dark-brown">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container-center flex items-center justify-between">
          <div className="flex items-center space-x-3">
                    <Link href="/booking" className="text-dio-brown text-xl">
          <span className="text-2xl">←</span>
        </Link>
            <div className="flex space-x-2">
                              <button className="w-8 h-6 rounded ring-2 ring-dio-brown">
                  🇹🇭
                </button>
              <button className="w-8 h-6 rounded">
                🇬🇧
              </button>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-dio-brown">
            Dio
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="btn-secondary text-sm">
              ผู้ใช้ทั่วไป
            </button>
            <button className="text-dio-brown text-xl">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-center py-8">
        <div className="max-w-2xl mx-auto">
          {/* Booking Confirmation Card */}
          <div className="bg-dio-beige rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-dio-dark-brown mb-2">
                จองโต๊ะล่วงหน้า
              </h1>
              <p className="text-xl text-dio-dark-brown">
                ยืนยันการจองโต๊ะ
              </p>
            </div>

            {/* Booking Details */}
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    ชื่อผู้จอง / Name
                  </label>
                  <div className="text-lg font-semibold text-dio-dark-brown">
                    {bookingData.name || 'เอิร์ธ'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    วันที่จอง / Date
                  </label>
                  <div className="text-lg font-semibold text-dio-dark-brown">
                    {formatDate(bookingData.date) || 'วันพฤหัสบดีที่ 14 สิงหาคม 2568'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    เบอร์โทรศัพท์ติดต่อ / Contact
                  </label>
                  <div className="text-lg font-semibold text-dio-dark-brown">
                    {bookingData.phone || '0987654321'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    จำนวนคน / Amount
                  </label>
                  <div className="text-lg font-semibold text-dio-dark-brown">
                    {bookingData.amount || '5'}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    ระยะเวลามาเอาโต๊ะ / Time to Take
                  </label>
                  <div className="text-lg font-semibold text-dio-dark-brown">
                    {bookingData.timeSlot === '20:30' ? 'รับโต๊ะไม่เกิน 20.30 ราคา 500 บาท' : 'รับโต๊ะไม่เกิน 20.30 ราคา 500 บาท'}
                  </div>
                </div>

                {bookingData.notes && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      รายละเอียดเพิ่มเติม / Note
                    </label>
                    <div className="text-lg font-semibold text-dio-dark-brown">
                      {bookingData.notes || 'ขอชั้น 1'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CAPTCHA Section */}
            <div className="bg-white rounded-lg p-6 border border-dio-light-brown">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium text-dio-dark-brown">
                  {captchaQuestion}
                </h3>
                <p className="text-sm text-gray-600">
                  กรุณากรอกผลบวกของตัวเลขทั้งสอง
                </p>
                
                <form onSubmit={handleCaptchaSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg p-3 w-full text-center text-lg focus:outline-none focus:ring-2 focus:ring-dio-brown focus:border-transparent"
                    placeholder="คำตอบ"
                    autoFocus
                  />
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 btn-primary text-lg py-3 disabled:opacity-50"
                    >
                      {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการจองโต๊ะ'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleNewCaptcha}
                      className="btn-secondary text-sm py-3"
                    >
                      คำถามใหม่
                    </button>
                  </div>
                </form>

                {/* CAPTCHA Result */}
                {captchaCorrect === false && (
                  <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
                    ❌ คำตอบไม่ถูกต้อง ลองใหม่อีกครั้ง
                  </div>
                )}
                
                {captchaCorrect === true && (
                  <div className="p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 text-sm">
                    ✅ คำตอบถูกต้อง! กำลังดำเนินการ...
                  </div>
                )}
              </div>
            </div>

            {/* Edit Link */}
            <div className="text-center mt-6">
              <Link 
                href="/booking" 
                className="text-dio-brown hover:text-dio-dark-brown underline text-sm"
              >
                เปลี่ยนใจ หรือต้องการแก้ไขข้อมูลเพิ่มเติม
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container-center text-center">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-dio-brown hover:text-dio-dark-brown text-2xl">
              📘
            </a>
            <a href="#" className="text-dio-brown hover:text-dio-dark-brown text-2xl">
              📷
            </a>
            <a href="#" className="text-dio-brown hover:text-dio-dark-brown text-2xl">
              💬
            </a>
          </div>
          
          {/* Logo */}
          <div className="text-2xl font-bold text-dio-brown mb-4">
            Dio
          </div>
          
          {/* Links */}
          <div className="flex justify-center space-x-6 mb-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-dio-brown">
              ติดต่อปัญหา
            </a>
            <a href="#" className="text-gray-600 hover:text-dio-brown">
              Terms and Conditions
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © 2023 Barism. All rights reserved
          </div>
        </div>
      </footer>
    </div>
  )
} 