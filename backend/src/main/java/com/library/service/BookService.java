package com.library.service;


import com.library.entity.BookEntity;
import com.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;


    public BookEntity addBook(BookEntity book) {
        return bookRepository.save(book);
    }

    public List<BookEntity> getAllBooks() {
        return bookRepository.findAll();
    }

    public BookEntity getBookById(Long bookId) {
        return bookRepository.findByBookId(bookId);
    }

    public List<BookEntity> getBookByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    public BookEntity updateBook(Long bookId, BookEntity updatedBook) {
        BookEntity bookFromDb = bookRepository.findByBookId(bookId);
        bookFromDb.setTitle(updatedBook.getTitle());
        bookFromDb.setAuthor(updatedBook.getAuthor());
        bookFromDb.setGenre(updatedBook.getGenre());
        bookFromDb.setAvailabilityStatus(updatedBook.getAvailabilityStatus());

        return bookRepository.save(bookFromDb);

    }

    public void deleteBook(Long id) {
        bookRepository.deleteByBookId(id);
    }
}

