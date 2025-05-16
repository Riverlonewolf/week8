import React from 'react';
import Link from 'next/link';

export default function TourismPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">เว็บไซต์ท่องเที่ยว</h1>
        <p className="text-xl mb-8 text-gray-600">ยินดีต้อนรับสู่เว็บไซต์ท่องเที่ยว ค้นพบสถานที่ท่องเที่ยวสุดประทับใจ</p>
        <Link 
          href="/attractions"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-block"
        >
          ไปยังหน้าสถานที่ท่องเที่ยว
        </Link>
      </div>
    </div>
  );
}