// app/attractions/[id]/page.js

import React from 'react';

async function getData(id) {
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/attractions/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch: ${res.status}`);
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching attraction by id:', error);
    return null;
  }
}

// ใช้ dynamic เพื่อหลีกเลี่ยง static generation error
export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const id = params.id;
  const data = await getData(id);

  if (!data) {
    return <div>Not found.</div>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.coverimage} alt={data.name} width={300} />
      <p>{data.detail}</p>
    </div>
  );
}
