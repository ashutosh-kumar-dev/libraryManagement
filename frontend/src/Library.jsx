import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBook, updateBook, addBook, getBookById, getBookByTitle} from "./api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Save , Add, Search} from "@mui/icons-material";

import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";


export default function Library() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    bookId: "",
    title: "",
    author: "",
    genre: "",
    availabilityStatus: "available",
  });
  const [editingBook, setEditingBook] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedBook, setSearchedBook] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isActive, setIsActive] = useState(false);


  const fetchBackend = async () => {
    try {
      await getAllBooks();
      setIsActive(true);
    } catch (error) {
      setIsActive(false);
      console.log("Error is this :", error);
    }
  };

  useEffect(() => {
    fetchBooks();

    fetchBackend();
    const interval = setInterval(fetchBackend, 20000);
    return () => clearInterval(interval);

  }, []);

  const fetchBooks = async () => {
    try {
      const res = await getAllBooks();
      if (res && res.data) {
        setBooks(res.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.genre) {
      alert("Title, Author, and Genre are required!");
      return;
    }

    try {
      await addBook(newBook);
      setNewBook({ bookId: "", title: "", author: "", genre: "", availabilityStatus: "available" });
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleSaveEdit = async () => {
    if (!editingBook.title || !editingBook.author || !editingBook.genre) {
      alert("All fields are required!");
      return;
    }

    try {
      await updateBook(editingBook.bookId, editingBook);
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting book with ID:", id);
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchedBook(null);
      return;
    }

    setLoadingSearch(true);

    try {
      let res;
      if (!isNaN(searchQuery)) {
        
        res = await getBookById(searchQuery);
      } else if (isNaN(searchQuery)) {
        // Search by title
        res = await getBookByTitle(searchQuery);
      }

      if (res && res.data) {
        setSearchedBook(res.data);
      } else {
        setSearchedBook(null);
      }
    } catch (error) {
      console.error("Error searching book:", error);
      setSearchedBook(null);
    }

    setLoadingSearch(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", width: "100vw", paddingTop: "50px" }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px" }}><button style={{ height: "20px", width: "20px", border: "2px solid", borderRadius: "50%", backgroundColor: isActive ? "green" : "red" }}></button><p>Backend Active</p>
      </div>      
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "-1px",
            overflowX: "auto",
            borderRadius: "8px",
            padding: "10px",
            width: "80%",
            position: "relative",
            marginTop: "20px",
            whiteSpace: "nowrap",
            border: "10px",
          }}
        >
          <TextField  name="bookId" value={newBook.bookId} label="Book ID" variant="outlined" onChange={handleChange} />
          <TextField name="title" value={newBook.title} label="Title" variant="outlined" onChange={handleChange} />
          <TextField name="author" value={newBook.author} label="Author" variant="outlined" onChange={handleChange} />
          <TextField name="genre" value={newBook.genre} label="Genre" variant="outlined" onChange={handleChange} />
          <Select
            name="availabilityStatus"
            value={newBook.availabilityStatus}
            onChange={(e) => setNewBook({ ...newBook, availabilityStatus: e.target.value })}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="checked-out">Checked Out</MenuItem>
          </Select>
          <Button sx={{margin:"10px", }} variant="contained" onClick={handleAddBook} startDecorator={<Add />} >Add</Button>
        
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 3 , marginTop:10}}>
        <TextField
          label="Search by Book ID or Title"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton onClick={handleSearch} color="primary">
          <Search />
        </IconButton>
      </Box>

              {loadingSearch ? (
          <p>Searching...</p>
        ) : searchedBook ? (
          <Box sx={{ marginBottom: 10, width: "80%" }}>
            <h3>Search Result:</h3>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Availability</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(searchedBook) ? searchedBook.map((book) => (
                    <TableRow key={book.bookId}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.genre}</TableCell>
                      <TableCell>{book.availabilityStatus}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow key={searchedBook.bookId}>
                      <TableCell>{searchedBook.title}</TableCell>
                      <TableCell>{searchedBook.author}</TableCell>
                      <TableCell>{searchedBook.genre}</TableCell>
                      <TableCell>{searchedBook.availabilityStatus}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : null}




      
          
      <TableContainer component={Paper} sx={{ marginTop: "20px", width: "80%" }}>
      <Divider orientation="horizontal"/>
          <Typography level="body-lg" sx={{ fontSize:"20px",maxHeight: "50px" }}>
            Click on the books to update and delete
          </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="library table">
          <TableHead>
            <TableRow>
            <TableCell sx={{backgroundColor: "black", color:"white"}}>Book ID</TableCell>
              <TableCell sx={{backgroundColor: "black", color:"white"}}>Title</TableCell>
              <TableCell sx={{backgroundColor: "black", color:"white"}}>Author</TableCell>
              <TableCell sx={{backgroundColor: "black", color:"white"}}>Genre</TableCell>
              <TableCell sx={{backgroundColor: "black", color:"white"}}>Availability</TableCell>
              <TableCell sx={{backgroundColor: "black", color:"white"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.bookId}
                onMouseEnter={() => setHoveredItem(book.bookId)}
                onMouseLeave={() => setHoveredItem(null)}
                sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                {editingBook?.bookId === book.bookId ? (
                  <>
                  <TableCell>
                      <TextField value={editingBook.bookId}/>
                    </TableCell>
                    <TableCell>
                      <TextField value={editingBook.title} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} />
                    </TableCell>
                    <TableCell>
                      <TextField value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
                    </TableCell>
                    <TableCell>
                      <TextField value={editingBook.genre} onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })} />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editingBook.availabilityStatus}
                        onChange={(e) => setEditingBook({ ...editingBook, availabilityStatus: e.target.value })}
                      >
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="checked-out">Checked Out</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleSaveEdit} color="success">
                        <Save />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>

                    <TableCell>{book.bookId}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.availabilityStatus}</TableCell>
                    <TableCell>
                      {hoveredItem === book.bookId && !editingBook && (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton size="small" onClick={() => handleEditClick(book)}>
                            <Edit sx={{ color: "blue" }} />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDelete(book.bookId)}>
                            <Delete sx={{ color: "red" }} />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
