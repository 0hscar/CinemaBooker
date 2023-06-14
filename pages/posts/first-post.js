import Head from 'next/head';
import Layout from '../../components/layout';
import React from "react"
import { useState, useCallback } from 'react';


export default function cinemaHall() {

  const [rows, setRows] = useState(() => {
    return Array.from({ length: 10 }, () => {
      return Array.from({ length: 20 }, () => ({
        reserved: false,
        booked: false
      }));
    });
  });


  const updateSeatAvailability = useCallback((index, subIndex) => {
    const updatedRows = [...rows];
    updatedRows[index] = [...rows[index]];
    updatedRows[index][subIndex] = { ...rows[index][subIndex] };

    const thisSeat = updatedRows[index][subIndex]

    if (!thisSeat.booked) {
      thisSeat.reserved = !thisSeat.reserved;
    }
    setRows(updatedRows)
  }, [rows, setRows])


  const bookSeats = useCallback(() => {
    const newRows = [];
    for (const row of rows) {
      const newRow = [];
      for (const seat of row) {
        newRow.push({
          reserved: seat.reserved,
          booked: seat.reserved
        });
      }
      newRows.push(newRow);
    }
    setRows(newRows);
  }, [rows, setRows])


  return (
    <Layout>
      <Head>
        <title>Booker</title>
      </Head>
      <h1>Booker</h1>

      <div className="cinemaHall">
        {rows.map((row, i) => (
          <div className="row" key={i}>
            {row.map((seat, j) => (
              <SeatButton key={`${i}-${j}`} booked={seat.booked} reserved={seat.reserved} onClickHandler={() => { updateSeatAvailability(i, j) }} />
            ))}
          </div>

        ))}
      </div>
      <button onClick={() => bookSeats()}>Book seats</button>

    </Layout>
  )
}


const SeatButton = ({ booked, reserved, onClickHandler }) => {
  return <span className="seats">
    <button
      className="seatButton"
      style={{
        backgroundColor: (booked ? 'red' : reserved ? 'goldenrod' : 'greenyellow'),
        minWidth: 20,
        minHeight: 20
      }}
      onClick={onClickHandler}
    ></button>
  </span>
}
