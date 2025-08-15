'use client'

import { useState } from 'react'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    phone: '',
    notes: ''
  })

  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captchaAnswer, setCaptchaAnswer] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowCaptcha(true)
  }

  const handleConfirm = () => {
    if (captchaAnswer === '14') {
      alert('จองสำเร็จ!')
      // Redirect to payment page
      window.location.href = '/booking/payment'
    } else {
      alert('คำตอบไม่ถูกต้อง')
    }
  }

  return (
    <main className="content flex-grow">
      <div className="relative bg-secondary overflow-visible p-5 min-h-auto rounded-t-full h-full">
        <div className="-mb-24">
          <div className="pb-[53px] relative">
            <div className="w-full rounded-t-full overflow-hidden pt-4 pb-2">
              <div className="flex justify-center">
                <a href="/">
                  <img 
                    alt="Ratch Hour" 
                    className="h-16 w-auto cursor-pointer" 
                    src="https://m1r.ai/bnFL.png"
                  />
                </a>
              </div>
            </div>
            
            <header className="relative w-full p-3">
              <div className="container px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center select-none">
                    <button className="flex items-center px-2 py-1 space-x-1 text-card font-bold">
                      <img alt="TH" width="20" height="20" src="https://cdn.jsdelivr.net/gh/umidbekk/react-flag-kit@1/assets/TH.svg" />
                    </button>
                    <button className="flex items-center px-2 py-1 space-x-1 text-card">
                      <img alt="GB" width="20" height="20" src="https://cdn.jsdelivr.net/gh/umidbekk/react-flag-kit@1/assets/GB.svg" />
                    </button>
                    <div>
                      <div className="relative overflow-hidden transition-all cursor-pointer text-secondary-foreground w-7 opacity-100">
                        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.47958 14.1453C9.67332 14.3391 9.78215 14.6018 9.78215 14.8758C9.78215 15.1498 9.67332 15.4125 9.47958 15.6063C9.28585 15.8 9.02309 15.9089 8.74911 15.9089C8.47514 15.9089 8.21238 15.8 8.01865 15.6063L1.14364 8.73128C1.0475 8.63547 0.971223 8.52163 0.919174 8.39628C0.867125 8.27093 0.840332 8.13654 0.840332 8.00081C0.840332 7.86509 0.867125 7.73069 0.919174 7.60534C0.971223 7.47999 1.0475 7.36615 1.14364 7.27034L8.01865 0.395343C8.21238 0.201611 8.47514 0.0927734 8.74911 0.0927734C9.02309 0.0927734 9.28585 0.201611 9.47958 0.395344C9.67332 0.589076 9.78215 0.851833 9.78215 1.12581C9.78215 1.39979 9.67332 1.66255 9.47958 1.85628L3.33591 7.99995L9.47958 14.1453Z" fill="currentColor"></path>
                        </svg>
                      </div>
                    </div>
                    <a href="/">
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-lg font-medium text-white bg-gray-700">ผู้ใช้ทั่วไป</span>
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </div>
        
        <div className="page-wrap" style={{opacity: 1, transform: 'none'}}>
          <div className="container py-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="text-secondary-foreground text-center space-y-1">
                  <p className="text-sm opacity-60">จองโต๊ะล่วงหน้า</p>
                  <h1 className="text-2xl font-bold">กรุณาใส่ข้อมูลเพื่อจองโต๊ะ</h1>
                </div>
              </div>
              
              <form className="space-y-6 block" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <div className="relative">
                    <p className="label whitespace-nowrap">ชื่อผู้จอง / Name</p>
                    <input 
                      className="flex w-full rounded-lg transition-colors file:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed focus-visible:bg-card/60 disabled:opacity-50 input placeholder:text-foreground placeholder:opacity-50" 
                      id="name" 
                      placeholder="สมชาย ใจดี" 
                      required 
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <p className="label whitespace-nowrap">จำนวนคน / Amount</p>
                      <input 
                        className="flex w-full rounded-lg transition-colors file:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed focus-visible:bg-card/60 disabled:opacity-50 input placeholder:text-foreground placeholder:opacity-50" 
                        id="person" 
                        placeholder="1" 
                        required 
                        min="1" 
                        type="number" 
                        name="person"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      />
                    </div>
                    
                    <div className="input relative cursor-pointer">
                      <label className="label">วันที่จอง / Date</label>
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis">พฤหัสบดี 14 สิงหาคม 2025</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <p className="label whitespace-nowrap">เบอร์โทรศัพท์ติดต่อ / Contact</p>
                    <input 
                      className="flex w-full rounded-lg transition-colors file:border-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed focus-visible:bg-card/60 disabled:opacity-50 input placeholder:text-foreground placeholder:opacity-50" 
                      id="contactPhone" 
                      placeholder="0XXXXXXXXX" 
                      required 
                      type="tel" 
                      name="contactPhone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-0.5">
                    <label className="font-medium text-sm text-secondary-foreground">ระยะเวลามาเอาโต๊ะ</label>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer transition bg-background/60 border-primary text-primary font-semibold">
                        <input 
                          className="w-5 h-5 mr-3 appearance-none rounded-full focus:ring-1 focus:ring-card/80 cursor-pointer transition-all bg-primary/80 border" 
                          type="checkbox" 
                          value="cmdfx9z2p00rpjxgw6fkdb11f"
                        />
                        <div>
                          <p className="text-sm font-medium">รับโต๊ะไม่เกิน 20.30 ราคา 500 บาท</p>
                          <p className="text-xs text-subtitle">+ 500 บาท</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="label left-0 pr-2 rounded-lg bg-card z-10 !opacity-100">
                      <span className="text-subtitle">รายละเอียดเพิ่มเติม / Note</span>
                    </label>
                    <textarea 
                      className="flex min-h-[60px] border text-sm shadow-sm placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto input w-full p-3 rounded-lg bg-card font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap" 
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="bg-card p-2.5 text-sm items-center gap-2 rounded-lg border space-y-2 whitespace-pre-wrap mb-4">
                  <div className="flex items-center text-subtitle text-xs font-medium gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
                    </svg>
                    <div>หมายเหตุ</div>
                  </div>
                  <p>📣 เงื่อนไขการจองโต๊ะ
เนื่องจากมีการจองโต๊ะเพื่อหวังนำไปขายต่อ ทำให้ลูกค้าท่านอื่นเสียโอกาสในการเข้าใช้บริการ ทางร้านจึงขอเปลี่ยนแปลงระบบการจองดังนี้ค่ะ

• ทางร้านจะมีค่ามัดจำในการจองโต๊ะ จำนวน 500 บาทต่อการจอง
เงินมัดจำสามารถใช้เป็นเครดิตสำหรับค่าอาหารและเครื่องดื่มภายในร้านได้เต็มจำนวนภายในวันที่จองค่ะ (จะหักจากบิลเปิดโต๊ะบิลแรกนะคะ)
• ไม่สามารถคืนเงินมัดจำได้ หากไม่มาตามวันและเวลาที่กำหนด
• ไม่สามารถยกเลิกหรือเลื่อนวันจองได้ทุกกรณี
• เมื่อทำการโอนเงินแล้ว จะไม่สามารถขอเงินคืนได้ในทุกกรณี*

ลูกค้าสามารถจองโต๊ะล่วงหน้าได้ 7 วัน เปิดจองเวลา 12:00 น. (12:00 PM) ของทุกวันค่ะ

ขออภัยในความไม่สะดวก และขอขอบคุณลูกค้าทุกท่านที่ให้การสนับสนุนทางร้านเสมอมาค่ะ 🙏🏻</p>
                </div>
                
                <button 
                  className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-6 py-3 rounded-lg w-full"
                  type="submit"
                >
                  จองโต๊ะล่วงหน้า
                </button>
              </form>
              
              <section className={`space-y-6 ${showCaptcha ? '' : 'hidden'}`}>
                <div className="bg-card p-3 rounded-lg border space-y-4">
                  <div className="space-y-0">
                    <h1 className="text-lg font-medium">{formData.name}</h1>
                    <p className="text-sm text-subtitle">ชื่อผู้จอง / Name</p>
                  </div>
                  <div className="space-y-0">
                    <h1 className="text-lg font-medium">วันพฤหัสบดีที่ 14 สิงหาคม 2568</h1>
                    <p className="text-sm text-subtitle">วันที่จอง / Date</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0">
                      <h1 className="text-lg font-medium">{formData.phone}</h1>
                      <p className="text-sm text-subtitle">เบอร์โทรศัพท์ติดต่อ / Contact</p>
                    </div>
                    <div className="space-y-0">
                      <h1 className="text-lg font-medium">{formData.amount} จำนวนคน / Amount</h1>
                      <p className="text-sm text-subtitle">จำนวนคน / Amount</p>
                    </div>
                  </div>
                  <div className="space-y-0">
                    <h1 className="text-lg font-medium">รับโต๊ะไม่เกิน 20.30 ราคา 500 บาท</h1>
                    <p className="text-sm text-subtitle">ระยะเวลามาเอาโต๊ะ / Time to Take</p>
                  </div>
                  <div className="space-y-0">
                    <h1 className="text-lg font-medium">{formData.notes || 'ไม่ระบุ'}</h1>
                    <p className="text-sm text-subtitle">รายละเอียดเพิ่มเติม / Note</p>
                  </div>
                </div>
                
                <div className="bg-card p-3 rounded-lg border space-y-4">
                  <div className="space-y-0">
                    <h1 className="text-lg font-medium">8 + 6 = ?</h1>
                    <p className="text-sm text-subtitle">กรุณากรอกผลบวกของตัวเลขทั้งสอง</p>
                  </div>
                  <div className="space-y-0">
                    <input 
                      id="small-input" 
                      className="bg-card border border-border rounded-lg p-2 w-full" 
                      type="text" 
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-6 py-3 rounded-lg w-full"
                    onClick={handleConfirm}
                    type="button"
                  >
                    ยืนยันการจองโต๊ะ
                  </button>
                  <p className="text-center text-sm text-subtitle">เปลี่ยนใจ หรือต้องการแก้ไขข้อมูลเพิ่มเติม</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}