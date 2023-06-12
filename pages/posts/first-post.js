import Link from 'next/link';
// import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/head';
import Layout from '../../components/layout';
import React from "react"
import { useState  } from 'react';


export default function cinemaHall() {
  
  const [outerArray, setOuter] = useState(() => {
    
    const filler = Array.from({ length: 10 }, (_, index) => {
      return Array.from({ length: 20 }, (_, subIndex) => ({
        row : index+1,
        seat: `Seat ${index * 20 + subIndex + 1}`,
        free: true,
        reserved: false,
        booked: false
      }));
    });

    return filler
  })

  const updateSeatAvailability = (index, subIndex, id) => {
    const updatedArray = [...outerArray]
    updatedArray[index][subIndex] = {...updatedArray[index][subIndex]}

    const thisSeat = updatedArray[index][subIndex]

    if (thisSeat.free === true){
      setReserved(id, thisSeat)
      setOuter(updatedArray)
    
    }

    else if(thisSeat.free === false && thisSeat.booked === false){
      setFree(id, thisSeat)
      setOuter(updatedArray)
      
    }
    
  }

  function bookSeat(){
    
    for (let i = 0; i < outerArray.length; i++){
      for (let j = 0; j < outerArray[i].length; j++){
        if (outerArray[i][j].reserved === true){
          
          setBooked(`${i}-${j}` ,outerArray[i][j])
          console.log("found:", outerArray[i][j])
        }
      }
    }

  }

  // console.log(outerArray)

  function setReserved(id, seat) {
    document.getElementById(id).style.cssText = 'background-color: goldenrod'
    seat.free = false
    seat.reserved = true
    seat.booked = false
  }

  function setFree(id, seat) {
    document.getElementById(id).style.cssText = ''
    seat.free = true
    seat.reserved = false
    seat.booked = false
  }

  function setBooked(id, seat) {
    document.getElementById(id).style.cssText = 'background-color: red'
    seat.free = false
    seat.reserved = false
    seat.booked = true
  }

  return (
    <Layout>
    <Head>
      <title>Booker</title>
    </Head>
    <h1>Booker</h1>

    <div className="cinemaHall">
      {outerArray.map((filler, i) => (
        <div className="row" key={i}>
          {filler.map((item, j) => (
            <React.Fragment key={`${i}-${j}`}>
              <span className="seats">
                <button className="seatButton" id={`${i}-${j}`} onClick={() => updateSeatAvailability(i, j, `${i}-${j}`)}></button>

              </span>
              
            

            </React.Fragment>
          ))}
        <br/><br/>
        </div>
        
      ))}
    </div>
    <button onClick={() => bookSeat()}>Book seats</button>

    </Layout>
  )
}