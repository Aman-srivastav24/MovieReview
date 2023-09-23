import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setmovieReviewList] = useState([""]);
  const [editedReview, seteditedReview] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setmovieReviewList(response.data);
    });
  }, []);
  const SubmitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      Movies: movieName,
      review: review,
    });
    setmovieReviewList([
      ...movieReviewList,
      {
        Movies: movieName,
        review: review,
      },
    ]);
  };
  const deleteReview = (Movies) => {
    Axios.delete(`http://localhost:3001/api/delete/${Movies}`);
  };
  const updateReview = (Movies) => {
    Axios.put("http://localhost:3001/api/update", {
      Movies: Movies,
      review: editedReview,
    });
    seteditedReview("");
  };
  return (
    <div className="body">
      <nav className="navbar">
        <h2>Review Adda</h2>
      </nav>
     
        <div className="movie-review">
          <h1 className="box_header">Review Adda</h1>
          <label>Movie Name</label>
          <input
            className="input_get"
            type="text"
            placeholder="Movie Name"
            onChange={(event) => {
              setMovieName(event.target.value);
            }}
          />
          <label>Review</label>
          <input
            className="input_get"
            type="text"
            placeholder="Review Write Here"
            onChange={(event) => {
              setReview(event.target.value);
            }}
          />
          <button onClick={SubmitReview} className="btn-1">
            Submit
          </button>
          {" "}
        
        </div>
        
      
    <div className="display_box">
      {movieReviewList.map((val) => {
          return (
            <div className="display_movie">
              <h1>{val.Movies}</h1>
              <span>{val.review}</span>
              <input
                onChange={(e) => {
                  seteditedReview(e.target.value);
                }}
              ></input>
              <span>
                <button
                className="btn-1"
                  onClick={() => {
                    updateReview(val.Movies);
                  }}
                >
                  Update
                </button>
              </span>
              <button
              className="btn-1"
                onClick={() => {
                  deleteReview(val.Movies);
                }}
              >
                Delete
              </button>
              </div>
          
          );
        })}
        </div>
      </div>
   
  );
}
export default App;
