'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const [language, setLanguage] = useState<'th' | 'en'>('th')

  const mainFunctions = [
    {
      icon: '🍽️',
      title: 'รายการอาหาร',
      description: 'Food Menu',
      href: '/menu'
    },
    {
      icon: '📍',
      title: 'โลเคชั่น',
      description: 'Location',
      href: '/location'
    },
    {
      icon: '💬',
      title: 'ส่งข้อความ',
      description: 'Send Message',
      href: '/contact'
    },
    {
      icon: '🎫',
      title: 'ซื้อตั๋วเข้างาน',
      description: 'Buy Event Tickets',
      href: '/tickets'
    },
    {
      icon: '🪑',
      title: 'จองโต๊ะล่วงหน้า',
      description: 'Book Table in Advance',
      href: '/booking',
      highlight: true
    },
    {
      icon: '⭐',
      title: 'รีวิวร้าน',
      description: 'Restaurant Review',
      href: '/reviews'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'TATTOO COLOUR LIVE AT DIO!',
      artist: 'Tattoo Colour',
      venue: 'RATCHAYOTHIN',
      location: 'DIO',
      date: '08 พฤษภาคม 2025',
      status: 'Event Ended',
      image: '/api/placeholder/300/200'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container-center flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="text-dio-brown text-xl">
              <span className="text-2xl">←</span>
            </button>
            <div className="flex space-x-2">
                          <button 
              className={`w-8 h-6 rounded ${language === 'th' ? 'ring-2 ring-dio-brown' : ''}`}
              onClick={() => setLanguage('th')}
            >
              🇹🇭
            </button>
            <button 
              className={`w-8 h-6 rounded ${language === 'en' ? 'ring-2 ring-dio-brown' : ''}`}
              onClick={() => setLanguage('en')}
            >
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

      {/* Hero Section */}
      <div className="hero-section" style={{display:'flex', justifyContent:'center'}}>
        <div className="bg-gradient-to-r from-dio-brown to-dio-dark-brown text-white p-8 text-center" style={{width:'60%' , borderRadius:'1.25rem'}}>
          <h1 className="text-3xl font-bold mb-4">จองโต๊ะร้านเหล้า Dio</h1>
          <p className="text-xl opacity-90">เปิดจองทุกวันเวลา 12:00 น.</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-center py-6">
        {/* Main Function Buttons */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {mainFunctions.map((func, index) => (
            <Link 
              key={index} 
              href={func.href}
              className={`card text-center hover:shadow-xl transition-shadow duration-200 ${
                func.highlight ? 'ring-2 ring-dio-brown bg-dio-light-brown' : ''
              }`}
            >
              <div className="text-4xl mb-3">{func.icon}</div>
              <h3 className="font-semibold text-dio-dark-brown mb-1">
                {func.title}
              </h3>
              <p className="text-sm text-gray-600">
                {func.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-dio-dark-brown">Tickets</h2>
              <p className="text-gray-600">ตั๋วกิจกรรมที่จะมาถึง</p>
            </div>
            <button className="text-dio-brown hover:text-dio-dark-brown">
              ดูทั้งหมด &gt;
            </button>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="min-w-[300px] bg-dio-beige rounded-lg p-4 border border-dio-light-brown">
                <div className="bg-gray-200 w-full h-32 rounded-lg mb-3 flex items-center justify-center text-gray-500">
                  [Event Image]
                </div>
                <h3 className="font-semibold text-dio-dark-brown mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>ศิลปิน:</strong> {event.artist}</p>
                  <p><strong>สถานที่:</strong> {event.venue}</p>
                  <p><strong>ที่ตั้ง:</strong> {event.location}</p>
                  <p><strong>วันที่:</strong> {event.date}</p>
                </div>
                <div className="mt-3 text-center">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Empty Event Card */}
            <div className="min-w-[300px] border-2 border-dashed border-dio-light-brown rounded-lg p-4 flex items-center justify-center">
              <button className="text-dio-brown hover:text-dio-dark-brown">
                ดูทั้งหมด
              </button>
            </div>
          </div>
        </div>

        {/* User Greeting */}
        <div className="text-center text-dio-dark-brown">
          <p className="text-lg">
            สวัสดีคุณ, <span className="font-semibold">earthhh!</span>
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container-center flex">
          <button className="flex-1 py-4 text-center text-dio-dark-brown hover:text-dio-brown transition-colors">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-sm">การจองตั๋วของคุณ</div>
          </button>
          <button className="flex-1 py-4 text-center text-dio-dark-brown hover:text-dio-brown transition-colors">
            <div className="text-2xl mb-1">👤⭐</div>
            <div className="text-sm">การจองโต๊ะของคุณ</div>
          </button>
        </div>
      </nav>
    </div>
  )
} 