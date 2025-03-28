package com.library.repository;


import com.library.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {

    BookEntity findByBookId(Long bookId);
    List<BookEntity> findByTitle(String title);

    @Modifying
    @Transactional
    void deleteByBookId(Long bookId);

}
