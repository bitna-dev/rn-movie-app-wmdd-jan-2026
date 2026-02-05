# Movies App

A React Native mobile application for browsing movies and TV shows using The Movie Database (TMDB) API.

## 🎬 Features

- Browse movies by category (Now Playing, Popular, Top Rated, Upcoming)
- Browse TV shows by category (Popular, Airing Today, On The Air, Top Rated)
- Search for movies, TV shows, or both with form validation
- View detailed information for each movie/TV show
- Infinite scroll pagination for seamless browsing
- Category switching with dropdown selection

## 🛠 Tech Stack

- React Native (Expo)
- React Navigation (Stack & Material Top Tabs)
- Native fetch API for HTTP requests
- TMDB API v3

## 📦 Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/rn-movie-app-jan-2026-wmdd.git
cd rn-movie-app-jan-2026-wmdd
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create `config/configApi.js` file and add your TMDB API key

```javascript
export const API_KEY = "your_tmdb_api_key_here";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
```

4. Start the app

```bash
npx expo start
# or
yarn start
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── MyTabs.jsx
│   ├── shared/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Loader.jsx
│   │   ├── Pagination.jsx
│   │   └── SelectModal.jsx
│   └── stack/
│       └── AppStack.jsx
├── config/
│   └── configApi.js
├── screens/
│   ├── DetailScreen.jsx
│   ├── MoviesScreen.jsx
│   ├── ResultScreen.jsx
│   └── TVShowScreen.jsx
└── services/
    └── api.js
```

## 🔌 API Endpoints

**Movies**

- `GET /movie/now_playing` - Currently playing movies
- `GET /movie/popular` - Popular movies
- `GET /movie/top_rated` - Top rated movies
- `GET /movie/upcoming` - Upcoming movies
- `GET /movie/{movie_id}` - Movie details

**TV Shows**

- `GET /tv/popular` - Popular TV shows
- `GET /tv/airing_today` - Airing today
- `GET /tv/on_the_air` - Currently on air
- `GET /tv/top_rated` - Top rated TV shows
- `GET /tv/{tv_id}` - TV show details

**Search**

- `GET /search/movie` - Search movies
- `GET /search/tv` - Search TV shows
- `GET /search/multi` - Search both movies and TV shows

## 🎯 Assignment Requirements Met

- ✅ Three tabs (Movies, Search, TV Shows)
- ✅ Dropdown category selection
- ✅ Dynamic list updates on category change
- ✅ Search with form validation
- ✅ Search prompt message
- ✅ Detail page with separate API call
- ✅ Infinite scroll pagination
- ✅ Component reusability
- ✅ No wrapper libraries (uses native fetch)

## 📝 Notes

- API calls use native `fetch` function (no wrapper libraries)
- Detail pages fetch data separately using only the media ID
- Form validation prevents empty searches
- Implements React best practices and component reusability

## 👨‍💻 Author

WMDD-4998 - Advanced Topics for Web & Mobile Developer

## 📄 License

Educational project for course assignment purposes.
