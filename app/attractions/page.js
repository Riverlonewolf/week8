// app/attractions/page.js

import React from 'react';
import Link from 'next/link';

async function getData() {
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/attractions`, {
      cache: 'no-store', // หรือลองใช้ force-cache ก็ได้ถ้าไม่ต้องการ fresh ทุกครั้ง
    });

    if (!res.ok) {
      console.error(`Fetch failed with status ${res.status}`);
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('API did not return an array');
    }

    return data;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return []; // ป้องกัน build ล้มโดย return array เปล่า
  }
}

// บอก Next.js ว่าหน้านี้ต้อง fetch ใหม่ทุกครั้ง (ไม่ใช้ static generation)
export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <h1>Attractions</h1>
      <ul>
        {data.length === 0 ? (
          <li>No attractions found.</li>
        ) : (
          data.map((attraction) => (
            <li key={attraction.id}>
              <img
                src={attraction.coverimage}
                alt={attraction.name}
                width={100}
              />
              {attraction.name}
              <Link href={`/attractions/${attraction.id}`}>Read More</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
