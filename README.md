# Movie Review Project

This project is a movie review platform inspired by Letterboxd, designed for film enthusiasts to give reviews and discuss movies. 

## Features
**Homepage:**
  Stylish movie list with a right-side options menu (Sign in, Films, Members, Journal, About) and a visually appealing background image.


**Films Page:**
  Movie posters displayed in an engaging layout and Review submission box with fields for movie name and review subject.


**Dynamic Film Data:**
  Users can click on movies to add reviews, which are saved and retrieved dynamically.


## Getting Started

First, run the development server:

For Frontend which generally runs on localhost:3000
```bash
npm run dev
```
For Backend which generally runs on localhost:5000
```bash
python3 run.py
```
For Integrating it to the Databse
```bash
touch .exe
// add the Mongo_URI in the .exe file. 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

**Frontend:** Next.js with Tailwind CSS for styling.

**Backend:** Flask and REST APIs for robust data management.

**Database:** MongoDB Atlas for persistent review storage and retrieval.
