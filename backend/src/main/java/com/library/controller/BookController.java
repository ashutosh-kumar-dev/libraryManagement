package com.library.controller;

import com.library.entity.BookEntity;
import com.library.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
@AllArgsConstructor
public class BookController {

    private BookService bookService;


    @PostMapping("/add-book")
    public ResponseEntity<?> addBook(@RequestBody BookEntity book) {

        if(book != null){
            return ResponseEntity.ok(bookService.addBook(book));
        }

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("missing information provided");
    }

    @GetMapping("get-all-books")
    public ResponseEntity<List<BookEntity>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/id/{bookId}")
    public ResponseEntity<BookEntity> getBookById(@PathVariable Long bookId) {
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }


    @GetMapping("/title/{title}")
    public ResponseEntity<List<BookEntity>> getBookByTitle(@PathVariable String title) {
        return ResponseEntity.ok(bookService.getBookByTitle(title));
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody BookEntity book) {
        if(bookService.getBookById(id) != null)
            return ResponseEntity.ok(bookService.updateBook(id, book));

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("book not exist");
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {

        if(bookService.getBookById(id) != null){
             bookService.deleteBook(id);
             ResponseEntity.ok("deleted Successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("book not exist");

    }
}
