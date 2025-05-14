import React from 'react'
import Link from 'next/link'

async function getData() {
  const res = await fetch('http://localhost:3000/api/attractions')
  return res.json()
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
