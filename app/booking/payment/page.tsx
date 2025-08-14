'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)


  const bookingData = searchParams.get('data') ? 
    JSON.parse(decodeURIComponent(searchParams.get('data')!)) : null

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false)
      setUploadSuccess(true)
      
      // Show success message
      setTimeout(() => {
        alert('อัพรูปสลิปสำเร็จ! ระบบกำลังตรวจสอบการโอนเงิน...')
      }, 1000)
    }, 2000)
  }

  const copyAccountNumber = () => {
    navigator.clipboard.writeText('1573155153')
    alert('คัดลอกเลขบัญชีแล้ว!')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container-center flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/booking/confirm" className="text-ratch-brown text-xl">
              <span className="text-2xl">←</span>
            </Link>
          </div>
          
          <div className="text-2xl font-bold text-ratch-brown">
            Dio
          </div>
          
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container-center py-6">
        <div className="max-w-2xl mx-auto">
          {/* Payment Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-ratch-dark-brown mb-2">
                Payment
              </h1>
              <p className="text-lg text-ratch-dark-brown">
                กรุณาชำระเงินเพื่อจองโต๊ะของคุณ
              </p>
            </div>

            {/* Bank Transfer Details */}
            <div className="space-y-6">
              {/* Bank Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    KB
                  </div>
                  <div>
                    <h3 className="font-semibold text-ratch-dark-brown">
                      ธนาคารกสิกรไทย (KBANK)
                    </h3>
                  </div>
                </div>
                
                {/* Account Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    เลขบัญชี
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3">
                      <span className="text-2xl font-mono font-bold text-ratch-dark-brown">
                        1573155153
                      </span>
                    </div>
                    <button
                      onClick={copyAccountNumber}
                      className="bg-ratch-brown text-white p-3 rounded-lg hover:bg-ratch-dark-brown transition-colors"
                    >
                      📋
                    </button>
                  </div>
                </div>
                
                {/* Account Holder */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    ชื่อบัญชี
                  </label>
                  <div className="text-lg font-semibold text-ratch-dark-brown">
                    บจก. รวยนิรันดร์8
                  </div>
                </div>
                
                {/* Amount */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-600">
                    ราคารวมทั้งหมด
                  </span>
                  <span className="text-3xl font-bold text-ratch-dark-brown">
                    ฿500.00
                  </span>
                </div>
                
                {/* Important Note */}
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">
                    (โอนเงินตามจำนวนเท่านั้น ห้ามขาด ห้ามเกิน)
                  </p>
                </div>
              </div>

              {/* Payment Timer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-yellow-800 mb-2">
                    หากไม่ชำระเงินภายใน
                  </p>
                  <div className="text-3xl font-bold text-yellow-700 mb-2">
                    14:58 นาที
                  </div>
                  <p className="text-yellow-800 text-sm">
                    ระบบจะยกเลิกการสั่งซื้ออัตโนมัติ
                  </p>
                </div>
              </div>

              {/* Transfer Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">
                  วิธีการโอนเงิน
                </h4>
                <div className="space-y-3 text-sm text-blue-700">
                  <p>
                    จำเป็นต้องทำการโอนเงินผ่านแอพพลิเคชั่น Mobile Banking ของ ธนาคาร ที่มี QR Code ในสลิปโอนเงิน มิเช่นนั้นระบบจะไม่สามารถ ตรวจสอบการโอนเงินของท่านได้
                  </p>
                  <p className="font-medium">
                    สลิปที่ไม่รองรับ: KKP Start Saving
                  </p>
                  <p className="text-xs">
                    * หากโอนผ่าน ธนาคารกรุงเทพ (BBL) อาจต้องรอประมาณ 1-3 นาที ระบบถึง จะตรวจสอบรายการได้
                  </p>
                </div>
              </div>

              {/* Upload Slip Section */}
              <div className="bg-white border-2 border-dashed border-ratch-light-brown rounded-lg p-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-ratch-dark-brown mb-4">
                    อัพรูปสลิปได้ที่นี่
                  </h4>
                  
                  {/* File Upload */}
                  <div className="space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-ratch-light-brown rounded-lg p-8 hover:border-ratch-brown transition-colors"
                    >
                      <div className="text-4xl mb-2">📁</div>
                      <p className="text-ratch-dark-brown">
                        คลิกเพื่อเลือกไฟล์รูปภาพ
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        รองรับไฟล์ JPG, PNG
                      </p>
                    </button>
                    
                    {/* File Preview */}
                    {previewUrl && (
                      <div className="mt-4">
                        <div className="relative inline-block">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                          />
                          <button
                            onClick={() => {
                              setSelectedFile(null)
                              setPreviewUrl('')
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Upload Button */}
                    {selectedFile && (
                      <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full btn-primary text-lg py-3 disabled:opacity-50"
                      >
                        {isUploading ? 'กำลังอัปโหลด...' : 'อัปโหลดสลิป'}
                      </button>
                    )}
                    
                    {/* Upload Result */}
                    {uploadSuccess && (
                      <div className="p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center">
                        ✅ อัปโหลดสำเร็จ! ระบบกำลังตรวจสอบการโอนเงิน
                      </div>
                    )}
                  </div>
                </div>
              </div>            
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 