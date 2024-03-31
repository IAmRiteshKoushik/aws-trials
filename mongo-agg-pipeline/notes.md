# What is this and Why is it here ?

This is the course I took on MongoDB Aggregation Pipelines by Hitesh 
Chaudhary. The reason why this is sitting inside an AWS folder is because 
I learned this properly while working on an AWS project.

## Introduction
An aggregation pipeline is built using multiple stages. There are in total 7 
stages - `$project`, `$match`, `$group`, `$sort`, `$skip & $limit`, 
`$first & $last`, `unwind`

#### $project
This stage is used to select certain fields from a collection. We can 
add, remove or reshape a key
```js
db.example.aggregate([
    {
        $project: {
            _id: 1,
            'dept': { $toUpper: '$name' },
            'newexp': { $add: ['$exp', 10] }
        }
    }
]);
```
Here, we are creating `dept` from earlier `name` which was in uppercase. And in 
`newexp` we are adding the experience as 10 years.

#### $match
It is used in filtering operation and it can reduce the number of documents 
that are given as input to the next stage.
```js
db.example.aggregate([
    {
        $match: {
            name: 'xyz'
        }
    }
]);
```
Here, we are aggregating documents that have a name equal to "xyz"

#### $group
It groups all docuemnts based on some keys.
```js
db.example.aggregate([
    {
        $group: {
            _id: { 'dept': '$name' },
            employee_count: { $sum: 10 }
        }
    }
]);
```

#### $sort
It is used to track all documents.

```js
db.example.aggregate([
    // Stage 01
    {
        $group: {
            _id: '$name',
            employee_count: { $sum: 1 }
        }
    },
    // Stage 02
    {
        $sort: {
            _id: 1
        }
    }
]);
```

#### $skip & $limit
Using skip, we can skip forward in the list of all documents for the given 
limit. And using liit we can limit the number of documents we want to look 
at by specifying the limit as per our convenience.

```js
db.example.aggregate([
    // Stage 01
    {
        $group: {
            _id: "$name",
            employee_count: { $sum: 10 }
        }
    },
    // Stage 02
    {
        $sort: {
            _id: 1
        }
    },
    // Stage 03
    {
        $skip: 4
    },
    // Stage 04
    {
        $limit: 5
    }
]);
```

#### $first & $last
It is used to get the first and last values in each group of documents.
```js
db.example.aggregate([
    {
        $group: {
            _id: '$name',
            employee_count: { $sum: 1 },
            record: { $first: '$code' }
        }
    }
]);
```

#### $unwind
We can use unwind for all documents, that are using arrays
```js
{
    a: abcdata,
    b: xyzdata,
    c: [a1, a2, a3]
}
```
After the unwind operation, we get three documents as follows:
```js
{
    a:abcdata,
    b:xyzdata,
    c:a1
}
{
    a:abcdata,
    b:xyzdata,
    c:a2
}
{
    a:abcdata,
    b:xyzdata,
    c:a3
}
```

## Aggregation Expressions
The most-used aggregation expressions are `$avg`, `$sum`, `$min`, `$max`
`$push`, `$addToSet`, `$first` and `$last`.

- `$sum` : Sums up values from all documents in the collection
```js
db.examples.aggregate([
    {
        $group: {
            _id: "$by_student",
            num_dataflair: { $sum: "$likes" }
        }
    }
]);
```
- `$avg` : Average of all documents in the collection
```js
db.examples.aggregate([
    {
        $group: {
            _id: "$by_student",
            num_dataflair: { $avg: "$likes" }
        }
    }
]);
```
- `$min` : Minimum values of all document in a collection
```js
db.examples.aggregate([
    {
        $group: {
            _id: "$by_student",
            num_dataflair: { $min: "$likes" }
        }
    }
]);
```

- `$max`: Maximum values of all documents in a collection
```js
db.examples.aggregate([
    {
        $group: {
            _id: "$by_student",
            num_dataflair: { $max: "$likes" }
        }
    }
]);
```
- `$push` : Inserts value in the resulting document
```js
db.examples.aggregate([
    {
        $group : {
            _id : "$by_student", 
            url : { $push : "$url" }
        }
    }
]);
```
- `$addToSet` : Inserts value in resulting document without creating duplicates
db.examples.aggregate([
    {
        $group : {
            _id : "$by_student", 
            url : { $addToSet : "$url" }
        }
    }
]);
- `$first` : First document from the source docuemnts according to grouping
db.examples.aggregate([
    {
        $group : {
            _id : "$by_student", 
            first_url : { $first : "$url" }
        }
    }
]);
- `$last` : Last document from source documents according to grouping
```js
db.examples.aggregate([
    {
        $group : {
            _id : "$by_student", 
            last_url : { $last : "$url" }
        }
    }
]);
```

## Questions
1. How many active users ?
Approach : Find all users where status is active and then take count
```js
[
    // Stage 01 - Selecting all users
    {
        $match: {
            isActive: true,
        },
    },
    // Stage 02 - Counting users
    {
        $count: "activeUsers",
    },
    // This is a two stage pipeline
]
```

2. What is the average age of all users ?
Approach : Group all the data without an identifier (null). As average operation 
is performed on a group of data but we do not actually need grouping we 
shall group them using NULL so that aggregation can work. Alternatively, if 
we wish to take average age of `male` and `female` separately then we can do 
`_id: "$gender"` or else `_id: null` sufficies.
```js
[
    // Stage 01 - Group all data based on age
    // This makes finding average easy as we
    // are effectively doing - Weighted Mean

    // If we mean to find average age of 
    // all users we can setup "null" as the 
    // identifier. Otherwise, we can add
    // fields like "$gender" to have better
    // grouping mechanism.
    {
        $group: {
            _id: null,
            averageAge: {
                $avg: "$age"
            }
        }
    }
    // This is a single stage pipeline
]
```

3. List the top 5 most common favourite fruits among users ?
Approach: Group by - based on favouriteFruit and then take count of each 
fruit. 

> Note: The dataset was not diverse enough and had only 3 different fruits
in total
```js
[
  // Stage 01 : Group all data based on fruits
  {
    $group: {
      _id: "$favoriteFruit",
      // Count is going to show the final
      // count of all the users who satisfy
      // a certain grouping criteria. 
      // $sum allows us to increment count
      // by adding 1 each time a new record
      // satisfying the criteria is discovered
      count: {
        $sum: 1
      }
    }
  },
  // Stage 2 : Sort the data
  {
    $sort: {
      count: 1 // ascending
      // count: -1 // descending
    }
  },
  // Stage 3 : Limiting results to 5 results
  {
    $limit: 5
  }
]
```

4. Find the total number of males and females
Approach : Either we can use the `$sum` accumulator or we can try using 
`$count` which is a bit tricky to handle because it does not accept arguments
```js
[
  // Stage 01
  {
    $group: {
      _id: "$gender",
      count: { $sum: 1 }
    }
  },
]
```

5. Which country has the highest number of registered users ?
```js
[
  // Stage 01
  {
    $group: {
      // The country field was not readily
      // available so we had to drill down
      // the data and fetch country
      _id: "$company.location.country",
      userCount: {
        $sum: 1
      }
    }
  },
  // Stage 02
  {
    $sort: {
      // As we are looking for the highest
      // let's sort in descending
      userCount: -1
    }
  },
  // Stage 03
  {
    // AS we only need the highest, we can 
    // limit our documents to 1
    $limit: 1
  }
]
```

6. List all unique eye colors present in the collection.
```js
[
  {
    $group: {
      _id: "$eyeColor"
    }
  }
]
```

7. What is the average number of tags per user ?
Apporach: The following approach is a three stage approach however there
is a slicer way to do it using `$addFields`
```js
[
  // There are two ways to $unwind
  // {
  //   $unwind: {
  //     path: "$tags",
      
  //   }
  // },

  // Stage 01 - Unwind the tags so that each 
  // record has only one tag and there is 
  // record duplication
  {
    $unwind: "$tags"
  },
  // Stage 02 - "Group" the documents based 
  // on unique ids and increment number of 
  // tags to get the total number of tags
  // for each user
  {
    $group: {
      _id: "$_id",
      numberOfTags: { $sum: 1 }
    }
  },
  // Stage 03 - "Group" the documents based 
  // on nothing and get average using the 
  // newly created field "numberOfTags"
  {
    $group: {
      _id: null,
      avgNumberOfTags: { $avg: "$numberOfTags"}
    }
  }
]
```
A better approach is as follows :
```js
[
  // Stage 01 - Adding a new field to each
  // document
  {
    $addFields: {
      numberOfTags: {
        // $size: "$tags"
        // The above approach does not work
        // perfectly because of an edge case
        $size: {$ifNull: ["$tags", []]}
      }
    }
  },
  // Stage 02 - Grouping on null and finding 
  // the average based on the newly added 
  // field
  {
    $group: {
      _id: null,
      avgNumberOfTags: { $avg: "$numberOfTags"}
    }
  }
]
```


8. How many users have `enim` as one of their tags ?
```js
[
  // Stage 01 - Unwind with all tags
  {
    $unwind: "$tags"
  },
  // Stage 02 - Group on the basis of tags
  {
    $group: {
      _id: "$tags",
      count: {
        $sum: 1
      }
    }
  },
  // Stage 03 - MatchFound - "enim"
  {
    $match: {
      _id: "enim"
    }
  }
]
```
However a better approach to the same problem is 
```js
[
  // Stage 01 - Filters out based on
  // filed where MatchFound
  {
    $match: {
      tags: "enim",
    },
  },
  // Stage 02 - Count pipeline stage returns
  // the number of documents that are
  // present in this stage under the key
  // given as a value to $count
  {
    $count: "users",
  },
]
```

9. What are the names and age of users who are inactive and have `velit` as a tag?
```js
[
  // Stage 01
  {
    $match: {
      isActive: false,
      tags: "velit",
    },
  },
  // Stage 02 - Project stage of the pipeline
  // allows you to select and return only
  // particular fields from the document
  // instead of all fields
  {
    $project: {
      name: "$name",
      age: "$age",
    },
  },
]
```

10. Who has registered the most recently ?
```js
[
  // Stage 01 - Sort based on registered
  {
    $sort: {
      registered: -1,
    },
  },
  // Stage 02 - Limit to latest 4 response
  {
    $limit: 4,
  },
  // Stage 03 - Project only necessary fields
  {
    $project: {
      name: 1,
      registered: 1,
      favoriteFruit: 1,
    },
  },
]
```

11. Categorize users by their favourite fruit.
```js
[
  // Stage 01
  {
    $group: {
      _id: "$favoriteFruit",
      users: {
        $push: "$name"
      }
    }
  }
]
```

12. How many users have `ad` as the second tag in their list of tags ?
```js
[
  // Stage 01 : Find tags
  {
    $match: {
      // Inside tags array, first element
      // ought to be "ad"
      "tags.1": "ad",
    },
  },
  // Stage 02 : Take count
  {
    $count: "secondTagAd",
  },
]
```

13. Find users who have both `enim` and `id` as their tags.
```js
[
  // All operator allows us to check if
  // all values specified within the field
  // are satisfied or not.
  {
    $match: {
      tags: { $all: ["enim", "id"] },
    },
  },
]
```

14. List all companies located in the USA which their corresponding user count.
```js
[
  // Stage 1 - Shortlist all the USA based
  // companies
  {
    $match: {
  		"company.location.country": "USA"
    }
  },
  // Group them to get the count
  {
    $group: {
			_id: "$company.title",
      userCount: {
        $sum: 1
      }
    }
  }
]
```

15. How many users have a phone number starting with `+1 (940)` ?
```js
[
  // Regular expression matching for
  // checking startsWith (similar to Vim)
  {
    $match: {
      "company.phone": /^\+1 \(940\)/,
    },
  },
  {
    $count: "usersWithSpecialPhoneNo",
  },
]
```

## Final Checkpoint
An alternate to `joins` in MongoDB is the `$lookup` pipeline. This acts 
similar to `left-join` in SQL. 

```js 
// Snippet
[
  // Stage 01 - Lookup
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details",
    },
  },
  // This stage returns a key
  // author details which contains
  // but a single object and that
  // contains the details. This is
  // because in-case there are
  // multiple occurances of an
  // "_id" - multiple objects would
  // be generated

  // Stage 02 - Improve the formatting
  {
    $addFields: {
      author_details: {
        // Used in production a lot more
        // as it is more readable
        $arrayElemAt: ["$author_details", 0],
        // $first: "$author_details"
      },
    },
  },
]
```
