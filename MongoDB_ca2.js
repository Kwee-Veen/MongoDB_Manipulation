//
//  .--------------------------------------------------------.
//  |  This is Caoimhín Arnott's MongoDB Assignment 2 for    |
//  |  the SETU HDip in Computer Science's Databases module. |
//  |  Along with a wee ASCII drawing I stole from           |
//  |  'Wellington Oliveira' on an AskUnbuntu.com forum.     |   
//  '--------------------------------------------------------'
//                    ^      (\_/)
//                    '----- (O.o)
//                           (> <)
//

// Part 1, find, 1
// Your friends decide they want to watch a truly terrible horror or thriller movie, scoring 1.5 or less on imdb.
// They have seen 'The Tomb' and 'The Raven' recently, so exclude these, and give 5 options.

db.movies.find(
    {
        genres: { $in: [ "Horror", "Thriller"] },
        "imdb.rating": { $lte: 1.5 },
        title: {
            $nin: [
                "The Tomb", "The Raven"
            ]
        }
    },
    {
        title: 1, year: 1, runtime: 1, genres: 1, plot: 1, _id: 0
    }
).limit(5);

// Part 1, find, 2
// One of your friends claims Nicolas Cage has been in lots of movies with John Travolta, but another claims there's only been one. Who's right? 

db.movies.find(
    {
        cast:  { $all: [ "Nicolas Cage", "John Travolta"] }
    }
).count();

// Part 1, find, 3
// Apparently there were two The Bourne Identity movies - was the original any good? 
// Show only the older movie by ordering the results by release year (descending) and skipping the first movie

db.movies.find(
    {
        title: "The Bourne Identity"
    },
    {
        title: 1, year: 1, runtime: 1, plot: 1, cast: 1, imdb: 1, "tomatoes.viewer": 1, _id: 0
    }
).sort ( { year: - 1 } ).skip(1);

// Part 1, find, 4
// It's interesting when ratings between different review sites are dramatically different.
// Are there any movies that scored >8 on imdb, but <4 on Rotten Tomatoes reviewers? Or vice versa?

db.movies.find(
    { $or: [ {
            "imdb.rating": { $gt: 8 }, 
            "tomatoes.critic.rating": { $lt: 4}
        }, 
        {
            "imdb.rating": { $lt: 4 }, 
            "tomatoes.critic.rating": { $gt: 8}
        } ]
    },
    {
        title: 1, year: 1, plot: 1, imdb: 1, "tomatoes.viewer": 1, _id: 0
    }
).sort ( { year: 1 } );

// Part 1, find, 5
// Another friend mentions a movie that an 'Angela Peters' had commented on recently. Your friend remembers Angela's email address, somehow,
// and that the movie was in some European language other than English or German. It came out anywhere between 1980 - 2010, and was a crime / drama movie.
// Lastly it was between 90 and 120 mins long; there's surely no more than two movies that fit that bill, he insists, and to give him the results in descending order of release date. 
// Armed with this baffling assortment of weirdly-specific info, you type the following query:

db.movies.find(
    {
        comments: { 
            $elemMatch: { 
                name: 'Angela Peters',
                email: 'angela_peters@fakegmail.com'
            }
        },
        genres: { 
            $all: [ 'Crime', 'Drama' ] 
        },
        languages: { 
            $nin: [ 'English', 'German']
        },
        runtime: {
            $gte: 90, $lte: 120
        },
        year: {
            $lte: 2010, $gte: 1980
        }
    },
    {
        title: 1, year: 1, countries: 1, languages: 1, runtime: 1, plot: 1, cast: 1, imdb: 1, _id: 0
    }
).sort ( { year: -1 } ).limit(2);

// Part 1, find, 6
// Trey Parker and Matt Stone once co-wrote a movie that featured five different languages, one of which is the fictional Klingon language. 
// While the movie was controversial, awards-wise it received 1 win & 8 nominations. Trivia time - what was it? 
// Last hint: while the movie was an animated comedy, it's not the pair's most famous animated comedy, South Park.

db.movies.find(
    {
        writers: { 
            $all: [ 'Trey Parker', 'Matt Stone' ] 
        },
        type: "movie",
        languages: "Klingon",
        awards: "1 win & 8 nominations.",
        genres: {
            $all: [ 'Animation', 'Comedy']
        },
        title: { 
            $ne: "South Park"
        }
    },
    {
        title: 1, writers: 1, languages: 1, genres: 1, awards: 1, year: 1, awards: 1, plot: 1, _id: 0
    }
);

////////////////////////////////////////////////////////////////

// Part 2, Create, Movies, 1
db.movies.insertOne(
    {
        _id: 1234,
        title: 'Once Upon a Time... in Hollywood',
        year: 2019,
        runtime: 161,
        cast: [ 'Leonardo DiCaprio', 'Brad Pitt', 'Margot Robbie' ],
        plot: 'A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood\'s Golden Age in 1969 Los Angeles.',
        genres: [ 'Drama', 'Comedy' ],
        imdb: { rating: 7.6, votes: 816000}
    }
);

// Part 2, Create, Movies, 2
db.movies.insertOne(
    {
        _id: 2345,
        title: 'Baby Driver',
        year: 2017,
        runtime: 113,
        cast: [ 'Ansel Elgort', 'Kevin Spacey', 'Lily James', 'Elza Gonzales', 'Jon Bernthal', 'Jon Hamm', 'Jamie Foxx' ],
        plot: 'After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.',
        genres: [ 'Action', 'Crime', 'Drama' ],
        imdb: { rating: 7.5, votes: 592000}
    }
);

////////////////////////////////////////////////////////////////

db.createCollection("users");

// Part 2, Create, Users, 1
db.users.insertOne(
    {
        _id: 101,
        name: "Paracelsus",
        email: "TBV@Hohenheim.old",
        password: "InventedModernToxicology",
        age: 530,
        address: "Salzburg, Archbishopric of Austria",
        favourites: [ 
            {
                movie_id: ObjectId("573a1391f29313caabcd8e45"), 
            },
            {
                movie_id: ObjectId('573a1392f29313caabcdb82c')
            },
            {
                movie_id: ObjectId('573a1399f29313caabced7f3')
            },
        ],
    }
);

// Part 2, Create, Users, 2
db.users.insertOne(
    {
        _id: 102,
        name: "Theophrastus Bombastus Von Hohenheim",
        email: "SamePerson@Paracelsus.old",
        password: "BestNameEver",
        age: 530,
        address: "Salzburg, Archbishopric of Austria",
        favourites: [ 
            {
                movie_id: ObjectId("573a13c3f29313caabd6ad90"), 
            },
            {
                movie_id: ObjectId('573a1398f29313caabcea972')
            },
            {
                movie_id: ObjectId('573a13c3f29313caabd6b23d')
            },
        ],
    }
);

// Part 2, Create, Users, 3
db.users.insertOne(
    {
        _id: 103,
        name: "Aelius Galenus",
        email: "OustedBy@Paracelsus.old",
        password: "ThoughtMedicineCenteredAroundFourHumours",
        age: 1894,
        address: "Pergamon, Mysia",
        favourites: [
            {
                movie_id: ObjectId("573a1393f29313caabcdd124"),
            },
            {
                movie_id: ObjectId('573a13cdf29313caabd84709')
            },
            {
                movie_id: ObjectId('573a13c8f29313caabd76d6a')
            },
        ],
    }
);

////////////////////////////////////////////////////////////////

// Part 3, Update, 1
db.movies.updateOne(
    { _id: 1234 },
    {
        $set:
        {
            "imdb.rating": 7.7,
        },
        $inc:
        {
            "imdb.votes": 1
        }
    }
);

// Part 3, Update, 2
db.users.updateOne(
    { _id: 101 },
    {
        $push:
        {
            favourites: { movie_id: ObjectId('573a1396f29313caabce3be5') },
        }
    }
);

// Part 3, Update, 3
// Popping Leonardo DiCaprio out from the start of the 'cast' array, and creating a new field called primaryActor with his name in it.
db.movies.updateOne(
    { _id: 1234 },
    {
        $set: 
        {            
            primaryActor: "Leonardo DiCaprio"
        },
        $pop: 
        { 
           cast: -1
        } 
    }
);

// Part 3, Update, 4
// 'Zounds! We probably should've kept Leonardo in the cast array. And shouldn't we add a few more members while we're at it? 
// I also forgot to put details of the awards it won, or the imdb.id field. Lets bring those in; a new field for the former, and a sub-field for the latter.
db.movies.updateOne(
    { _id: 1234 },
    {
        $set: 
        { 
            cast: 
            [ 
                'Leonardo DiCaprio', 
                'Brad Pitt', 
                'Margot Robbie',
                'Emile Dalton', 
                'Margaret Qualley', 
                'Timothy Olyphant'
            ],
            awards: 'Won 2 Oscars; 143 wins, 376 nominations.',
            "imdb.id": 7131622
        },
    }
);

// Part 3, Update (Delete), 5
db.movies.deleteOne(
    {
        _id: 1234
    }
);

////////////////////////////////////////////////////////////////

// Part 4, Aggregation, 1
// For the time period 2007 to 2017, what languages other than English were most popular to produce movies in, based on number of films produced? 
// To qualify for the list, 200 or more movies must've been made in that language over the 10 year period; the first result will be skipped as it'll inevitably by English.

db.movies.aggregate([
    { 
        $match: 
        { 
            "year": { $gt: 2007, $lte: 2017}
        }
    },
    { 
        $unwind: "$languages" 
    }, 
    { 
        $group: 
        { 
            _id: { 
                language: "$languages"
            },
            "films_2007-2017": { $sum: 1 }
        }
    },
    { 
        $match: 
        { 
            "films_2007-2017": { $gte: 200}
        }
    },
    { 
        $project: 
        { 
            "Language": "$_id.language",
            Films_Produced_2007_to_2017: "$films_2007-2017",
            _id: 0
        }
    },
    {
        $sort: { 
            "Films_Produced_2007_to_2017": -1
        }
    }
]).skip(1);

// Part 4, Aggregation, 2
// Our users find it fun to compare their favourite movies, and want a query compares the favourites of one random user to another, highlighting their favourites' imdb statistics.
// It's rumoured that one of the users is a dirty elitist who'll only watch movies that score highly on imdb. Can you spot the judgemental sod? 
// Depending on who's randomly chosen, you may need to run the query more than once!

db.users.aggregate([ 
    { 
        $sample: { 
            size: 2
        } 
    },
    {
        $lookup: {
            from: "movies",
            foreignField: "_id",
            localField: "favourites.movie_id",
            as: "Favourites"
        }
    },
    {
        $project: {
            name: 1, _id: 0, 
            "Favourites.title": 1, 
            "Favourites.year": 1, 
            "Favourites.plot": 1, 
            "Favourites.imdb.rating": 1, 
            Highest_Rating: { $max: "$Favourites.imdb.rating" },
            Average_Rating: { $avg: "$Favourites.imdb.rating" },
            Lowest_Rating: { $min: "$Favourites.imdb.rating" },
            Rating_Deviation: { $stdDevPop: "$Favourites.imdb.rating" }
        }
    },
    {
        $sort: {
            name: 1
        }
    }
])

////////////////////////////////////////////////////////////////
/////////////////////////// Fin ////////////////////////////////
////////////////////////////////////////////////////////////////