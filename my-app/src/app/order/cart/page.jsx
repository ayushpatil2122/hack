"use client";
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import DisplayItems from '@/components/DisplayItems';
import { app } from '@/app/firebase';
import { Button } from '@/components/ui/button';
import { UserAuth } from '@/app/context/AuthContext';

async function fetchDataFromFirestore() {
  try {
    const firestore = getFirestore(app); 
    const cartCollectionRef = collection(firestore, 'cart');
    const querySnapshot = await getDocs(cartCollectionRef);
    const cartData = [];
    
    querySnapshot.forEach((doc) => {
      cartData.push(doc.data());
    });
    
    return cartData;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    throw error; // Propagate the error for handling outside of this function
  }
}

async function storeOrderInFirestore(orderData) {
  try {
    const firestore = getFirestore(app);
    const orderCollectionRef = collection(firestore, 'orders');
    await addDoc(orderCollectionRef, orderData);
  } catch (error) {
    console.error('Error storing order in Firestore:', error);
    throw error; // Propagate the error for handling outside of this function
  }
}

function Page() {
  const [userData, setUserData] = useState([]);
  const { user } = UserAuth(); // Assuming you have a custom hook for authentication

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []);

  const handleOrderClick = async () => {
    if (user) {
      try {
        const orderData = {
          userId: user.uid,
          items: userData,
          createdAt: new Date(),
        };
  
        await storeOrderInFirestore(orderData);
        // If successful, you may want to clear the cart or show a success message
      } catch (error) {
        // Handle error
      }
    } else {
      // Redirect user to login page or show a message that they need to log in
    }
  };
  
  return (
    <div>
      <DisplayItems items={userData} />
      <Button onClick={handleOrderClick}>
        Order now
      </Button>
    </div>
  )
}

export default Page;
