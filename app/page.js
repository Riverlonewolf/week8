import React from 'react'
import Link from 'next/link'

async function getData() {
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/attractions`, {
      // ป้องกันการ cache หากข้อมูลอัปเดตบ่อย
      cache: 'no-store',
      // หากใช้ Next.js 14 หรือเปิด fetch API enhancement แล้ว อาจต้องใช้ next: { revalidate: 0 }
    });

    // ตรวจสอบว่า fetch สำเร็จหรือไม่
    if (!res.ok) {
      console.error(`Failed to fetch: ${res.status} ${res.statusText}`);
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const data = await res.json();

    // ตรวจสอบว่าได้ array จริงหรือไม่
    if (!Array.isArray(data)) {
      throw new Error('API did not return an array');
    }

    return data;

  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error; // ส่ง error ต่อไปเพื่อให้ Next.js แจ้ง build failed
  }
}


export default async function Page() {
  const data = await getData()
  console.log(data)
  return (
    <div>
      <h1>Attractions</h1>
      <ul>
        {data.map(attraction => (
          <li key={attraction.id}>
            <img src={attraction.coverimage} alt={attraction.name} width={100}/> 
            {attraction.name}
            <Link href={`/attractions/${attraction.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
