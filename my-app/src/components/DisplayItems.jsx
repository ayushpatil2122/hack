'use client'
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/app/firebase';

async function addDataToFirestore(price, name) {
  try {
    const docRef = await addDoc(collection(db, "cart"), {
      name: name,
      price: price
    });

    console.log("Document written to database with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
}

function DisplayItems({ items }) {

  const handleSubmit = async (item) => {
    const added = await addDataToFirestore(item.price, item.name);
    if (added) {
      alert("Item added to cart successfully!");
    } else {
      alert("Failed to add item to cart. Please try again later.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <Card key={index} className="bg-white shadow-md rounded-md">
          <CardHeader className="bg-gray-200 p-4 rounded-t-md items-center">
            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
            <CardDescription className="text-sm">{item.price}</CardDescription>
          </CardHeader>
          <Button onClick={() => handleSubmit(item)}>
            add to cart
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default DisplayItems;
