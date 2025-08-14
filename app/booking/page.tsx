'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: 'สมชาย ใจดี',
    amount: '1',
    date: '2025-08-14',
    phone: '0XXXXXXXXX',
    timeSlot: '20:30',
    notes: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('bookingData', JSON.stringify(formData))
    const dataParam = encodeURIComponent(JSON.stringify(formData))
    window.location.href = `/booking/confirm?data=${dataParam}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                   'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container-center flex items-center justify-between">
                  <Link href="/" className="text-dio-brown text-xl">
          <span className="text-2xl">←</span>
        </Link>
          
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
      <main className="container-center max-w-2xl py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dio-dark-brown mb-2">
            จองโต๊ะล่วงหน้า
          </h1>
          <p className="text-gray-600">
            กรุณาใส่ข้อมูลเพื่อจองโต๊ะ
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-dio-dark-brown font-semibold mb-2">
              ชื่อผู้จอง / Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="input-field"
              placeholder="กรอกชื่อผู้จอง"
            />
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-dio-dark-brown font-semibold mb-2">
              จำนวนคน / Amount
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="input-field"
              placeholder="จำนวนคน"
            />
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-dio-dark-brown font-semibold mb-2">
              วันที่จอง / Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="input-field"
            />
            <p className="text-sm text-gray-600 mt-1">
              {formatDate(formData.date)}
            </p>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-dio-dark-brown font-semibold mb-2">
              เบอร์โทรศัพท์ติดต่อ / Contact
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="input-field"
              placeholder="0XXXXXXXXX"
            />
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="block text-dio-dark-brown font-semibold mb-2">
              ระยะเวลามาเอาโต๊ะ
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-4 border border-dio-light-brown rounded-lg cursor-pointer hover:bg-dio-beige">
                <input
                  type="radio"
                  name="timeSlot"
                  value="20:30"
                  checked={formData.timeSlot === '20:30'}
                  onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                  className="text-ratch-brown"
                />
                <div className="flex-1">
                  <div className="font-semibold text-dio-dark-brown">
                    รับโต๊ะไม่เกิน 20.30 ราคา 500 บาท
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    + 500 บาท
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Notes Field */}
          <div>
            <label className="block text-dio-dark-brown font-semibold mb-2">
              รายละเอียดเพิ่มเติม / Note
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
            />
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-yellow-600 text-xl">ℹ️</div>
              <div className="text-sm text-yellow-800">
                <h4 className="font-semibold mb-2">หมายเหตุ</h4>
                <div className="space-y-2">
                  <p><strong>เงื่อนไขการจองโต๊ะ:</strong></p>
                  <p>เนื่องจากมีการขายโต๊ะต่อ จึงได้ปรับระบบการจองใหม่</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>ต้องมัดจำ 500 บาท ต่อการจอง 1 ครั้ง</li>
                    <li>มัดจำสามารถใช้เป็นเครดิตเต็มสำหรับอาหารและเครื่องดื่มในวันที่จอง (หักจากบิลแรก)</li>
                    <li>มัดจำไม่สามารถคืนได้หากไม่มาในวันที่และเวลาที่กำหนด</li>
                    <li>ไม่สามารถยกเลิกหรือเลื่อนเวลาได้ในทุกกรณี</li>
                    <li>เมื่อโอนเงินแล้วไม่สามารถคืนเงินได้ในทุกกรณี</li>
                  </ul>
                  <p className="mt-3 font-semibold">
                    ลูกค้าสามารถจองโต๊ะล่วงหน้าได้ 7 วัน เปิดจองเวลา 12:00 น. (12:00 PM) ของทุกวันค่ะ
                  </p>
                  <p className="mt-2 text-xs">
                    ขออภัยในความไม่สะดวก และขอบคุณลูกค้าทุกท่านค่ะ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary text-lg py-4"
          >
            จองโต๊ะล่วงหน้า
          </button>
        </form>


      </main>
    </div>
  )
} 