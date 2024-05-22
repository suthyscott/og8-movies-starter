import { Movie, Rating, User, db } from "./model.js"
import movieData from "./movies.json" assert { type: "json" }
import userData from "./users.json" assert { type: "json" }
import lodash from 'lodash'

console.log("Syncing database...")
await db.sync({ force: true })

console.log("Seeding database...")

const moviesInDB = await Promise.all(
    movieData.map(movie => {
        const releaseDate = new Date(Date.parse(movie.releaseDate))
        const { title, overview, posterPath } = movie

        const newMovie = Movie.create({
            title,
            overview,
            posterPath,
            releaseDate
        })

        return newMovie
    })
)

const usersInDB = await Promise.all(
    userData.map(user => {
        const { email, password } = user

        const newUser = User.create({
            email,
            password
        })

        return newUser
    })
)

const ratingsInDB = await Promise.all(
    usersInDB.flatMap((user) => {
      // Get ten random movies
      const randomMovies = lodash.sampleSize(moviesInDB, 10);
  
      // Create a rating for each movie
      const movieRatings = randomMovies.map((movie) => {
        return Rating.create({
          score: lodash.random(1, 5),
          userId: user.userId,
          movieId: movie.movieId,
        });
      });
  
      return movieRatings;
    }),
  );
  
  console.log(ratingsInDB);

await db.close()
console.log("Finished seeding database!")
