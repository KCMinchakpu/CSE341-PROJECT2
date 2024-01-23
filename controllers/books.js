const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//Read (GET) all contacts in the database
const getAllBooksdetails = async (req, res) => {
      const result = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .find();
        result.toArray().then((books) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books);
            
        });
    };

//Read (GET) one contact (based on Id) in the database
const getSingleBookdetails = async (req, res) => { 
         const bookId = new ObjectId(req.params.id);
        const result = await mongodb            
            .getDatabase()
            .db()
            .collection('books')
            .find({ _id: bookId});
        result.toArray().then((books) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books[0]);
        });
    };

//Create (POST) a new contact
const createBookdetails = async (req, res, next) => {
        //New Contact Info
        const newBookdetails = {
            bookISBN: req.body.bookISBN,
            bookTitle: req.body.bookTitle,
            bookDescription: req.body.bookDescription,
            authorName: req.body.authorName,
            releaseDate: req.body.releaseDate,
            publisher: req.body.publisher,
            price: req.body.price
        };
        //Connect to database
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .insertOne(newBookdetails);
        if(resultBack.acknowledged) {
            res.status(201).json(resultBack);
        } else {
            res.status(500).json(resultBack.error || 'Sorry. Book Details was not created.');
        }
    };
//Update (PUT) an old contact
const updateBookdetails = async (req, res, next) => {
        const UserId = new ObjectId(req.params.id);
        const updatedDetails = {
            bookISBN: req.body.bookISBN,
            bookTitle: req.body.bookTitle,
            bookDescription: req.body.bookDescription,
            authorName: req.body.authorName,
            releaseDate: req.body.releaseDate,
            publisher: req.body.publisher,
            price: req.body.price
        };
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .replaceOne({ _id: UserId}, updatedDetails);
        console.log(resultBack.modifiedCount + 'bookdetails was updated');
        if(resultBack.modifiedCount > 0) {
            res.status(204).send(resultBack.modifiedCount + "bookdetails was updated.");
        } else {
            res.status(500).json(resultBack.error || 'Sorry. New details could not be updated.');
        }
   };

//Delete (DELETE) a contact
const deleteBookdetails = async (req, res, next) => {
        const UserId = new ObjectId(req.params.id);
        const resultBack = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .deleteOne({ _id: UserId}, true);
        console.log(resultBack.deletedCount + 'bookdetails was deleted.');
        if(resultBack.acknowledged) {
            res.status(200).send(resultBack.deletedCount + "bookdetails was deleted.");
        } else {
            res.status(500).json(resultBack.error || 'Sorry. Details was not deleted.');
        }
   };

module.exports = { 
    getAllBooksdetails, 
    getSingleBookdetails,
    createBookdetails,
    updateBookdetails,
    deleteBookdetails 
};