// const {User, db} = await import('./model.js')
import {User, Movie, Rating, db} from './model.js'

await db.sync()

// const testUser = await User.create({ email: 'test@email.com', password: 'test' });
// console.log(testUser);

// const testMovie = await Movie.create({ title: 'Test Movie' });
// console.log(testMovie);

// const testRating = await Rating.create({ score: 5 });
// console.log(testRating);

// Once you have the relationships in place: 
// await testUser.createRating({
//     score: 5,
//     movieId: testMovie.movieId
//   });

// const movieRating = await testMovie.getRatings()
// console.log(movieRating)

console.log(await Rating.findAll({
    include: [Movie, User]
}))