let BooksModel = require('../models/bookModel');
let ErrorModel = require('../models/errorModel');

module.exports = (router) => {

    router.get('/books(/:page/:limit)?', (req, res) => {
        let page = req.params.page ? parseInt(req.params.page) : 1;
        let limit = req.params.limit ? parseInt(req.params.limit) : 20;
        let skip = (page - 1) * limit;

        BooksModel.find({}, {_id: '', title: '', short_description: ''}, (error, books) => {
            if (error) {
                console.log(error);
                return res.status(500).send(ErrorModel.model(500, 'Server error'));
            }

            return res.send({
                items: books,
            });
        }).skip(skip).limit(limit);
    });

    router.get('/book/:id', (req, res) => {
        return BooksModel.findById(req.params.id, (error, book) => {
            if (!book) {
                return res.status(404).send(ErrorModel.model(404, 'Книга не найдена'));
            }

            if (error) {
                return res.status(500).send(ErrorModel.model(500, 'Server error'));
            }

            return res.send(book);
        });
    });

    router.post('/book', (req, res) => {
        console.log(req.body);

        let book = new BooksModel({
            title: req.body.title,
            short_description: req.body.short_description,
            full_description: req.body.full_description,
        });

        book.save((error) => {
            if (error) {
                return res.status(ErrorModel.code(error)).send(BooksModel.errors(error));
            }

            return res.send(book);
        });
    });

    router.put('/book/:id', (req, res) => {
        console.log(req.body);

        return BooksModel.findById(req.params.id, (error, book) => {
            if (!book) {
                return res.status(404).send(ErrorModel.model(404, 'Книга не найдена'));
            }

            book.title = req.body.title;
            book.short_description = req.body.short_description;
            book.full_description = req.body.full_description;

            return book.save((error) => {
                if (error) {
                    return res.status(ErrorModel.code(error)).send(BooksModel.errors(error));
                }

                return res.send(book);
            });
        });
    });

    router.delete('/book/:id', (req, res) => {
        return BooksModel.findByIdAndRemove(req.params.id, (error, book) => {
            if (!book) {
                return res.status(404).send(ErrorModel.model(404, 'Книга не найдена'));
            }

            return res.send({success: true});
        });
    });

};