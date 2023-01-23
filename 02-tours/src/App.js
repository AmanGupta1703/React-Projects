/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tour from "./Tour";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = function(id) {
    const newTours = tours.filter(function(tour) {
      return tour.id !== id;
    });
    setTours(newTours);
  }

  const fetchTours = async function () {
    setLoading(false);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(function () {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if(!tours.length) {
    return (
      <div className="title">
        <h2>no tour left</h2>
        <button className="btn" onClick={ () => fetchTours() }>refresh now</button>
      </div>
    );
  }

  return (
    <main>
      <Tours tours = { tours } removeTour = { removeTour } />
    </main>
  );
}

export default App;
