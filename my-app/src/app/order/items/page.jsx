'use client'
import React, { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '@/app/firebase';
import DisplayItems from '@/components/DisplayItems';

async function featchDataFromFireBase() {
    try {
      const firestore = getFirestore(app); // Assuming `app` is your Firebase app instance
      const rotiCollectionRef = collection(firestore, 'items');
      const querySnapshot = await getDocs(rotiCollectionRef);
      const rotiData = [];
      
      querySnapshot.forEach((doc) => {
        rotiData.push(doc.data());
      });
      
      return rotiData;
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      throw error; // Propagate the error for handling outside of this function
    }
  }

function page() {
  const [userData, setuserData] = useState([]);

  useEffect (() => {
    async function fetchData(){
      const data = await featchDataFromFireBase();
      setuserData(data);
    }
    fetchData();
  }, [])
  return (
    <div>
      <DisplayItems items={userData} />
    </div>
  )
}

export default page
