import React from 'react';

export async function getData(id) {
    const res = await fetch(`http://localhost:3000/api/attractions/${id}`);
     return res.json();
}

export default async function Page({ params }) {
    const id = params.id;
    const data = await getData(id);
    console.log(data);
return (
        <div>
            <div>
                <img src={data.coverimage} alt={data.name} />
            </div>
            <p>{data.name}</p>
            <p>{data.detail}</p>
        </div>
    )
}

    