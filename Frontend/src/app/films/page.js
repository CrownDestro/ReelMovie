"use client";

import { useState, useEffect } from "react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../globals.css";

SwiperCore.use([Navigation, Pagination]);

const BACKEND_URL = "http://127.0.0.1:5000";

export default function FilmsSlider() {
  const [films, setFilms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/films`)
      .then((response) => response.json())
      .then((data) => setFilms(data));
  }, []);

  useEffect(() => {
    if (selectedFilm) {
      fetch(`${BACKEND_URL}/api/films/${selectedFilm}/reviews`)
        .then((response) => response.json())
        .then((data) => setReviews(data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [selectedFilm]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (selectedFilm && reviewText.trim()) {
      fetch(`${BACKEND_URL}/api/films/${selectedFilm}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: reviewText }),
      })
        .then((response) => response.json())
        .then(() => {
          {/*This helps in reviews reold after submission */}
          fetch(`${BACKEND_URL}/api/films/${selectedFilm}/reviews`)
            .then((response) => response.json())
            .then((data) => setReviews(data));
          setReviewText("");
        })
        .catch((err) => console.error("Error submitting review:", err));
    }
  };

  const handleReviewUpdate = (e) => {
    e.preventDefault();
    if (editingReview && reviewText.trim()) {
      fetch(`${BACKEND_URL}/api/films/${selectedFilm}/reviews/${editingReview._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: reviewText }),
      })
        .then(() => {
          fetch(`${BACKEND_URL}/api/films/${selectedFilm}/reviews`)
            .then((response) => response.json())
            .then((data) => setReviews(data));
          setEditingReview(null);
          setReviewText("");
        })
        .catch((err) => console.error("Error updating review:", err));
    }
  };

  const handleReviewDelete = (reviewId) => {
    fetch(`${BACKEND_URL}/api/films/${selectedFilm}/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then(() => {
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      })
      .catch((err) => console.error("Error deleting review:", err));
  };

  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-900 py-8 text-center text-[#CCCCCC]">
      <h2 className="text-3xl font-bold mb-6">Popular Films This Week</h2>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={4}
        className="w-full max-w-4xl"
      >
        {films.map((film) => (
          <SwiperSlide
            key={film.title}
            onClick={() => setSelectedFilm(film.title)}>
            <div className="w-48 h-72 bg-[#333333] rounded-md shadow-md overflow-hidden mx-auto">
              <img src={film.poster} alt={film.title} className="w-full h-4/5 object-cover rounded-t-md" />
              <p className="text-white mt-2 font-semibold">{film.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedFilm && (
        <>
          <div className="mt-8 w-3/4 max-w-md">
            <h3 className="text-xl font-semibold">
              {editingReview ? "Edit Your Review" : `Submit Your Review for ${selectedFilm}`}
            </h3>
            <form
              onSubmit={editingReview ? handleReviewUpdate : handleReviewSubmit}
              className="mt-4">

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                rows="4"
                className="w-full p-3 border border-gray-600 rounded-lg bg-[#1C1C1C] text-white"/>
              <button
                type="submit"
                className="mt-3 bg-green-600 px-4 py-2 rounded-md text-white font-semibold"
              >
                {editingReview ? "Update Review" : "Submit Review"}
              </button>
            </form>
          </div>

          <div className="mt-8 w-3/4 max-w-md">
            <h3 className="text-xl font-semibold">Reviews for {selectedFilm}</h3>
            {reviews.length > 0 ? (
              <ul className="space-y-3 mt-4">
                {reviews.map((review) => (
                  <li
                    key={review._id}
                    className="bg-gray-800 p-4 rounded-md text-white flex justify-between items-center"
                  >
                    <span>{review.review}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingReview(review);
                          setReviewText(review.review);
                        }}
                        className="text-yellow-500"
                      >
                      Edit
                      </button>
                      <button
                        onClick={() => handleReviewDelete(review._id)}
                        className="text-red-500"
                      >
                      Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 mt-4">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}