import axios from "axios";


export const getAllBooks = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/book/get-all-books`);
    return res;  
  } catch (error) {
    console.error("Error fetching books:", error);
    return null; 
  }
};

export const getBookById = async (bookId) => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/book/id/${bookId}`);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return null;
  }
};

export const getBookByTitle = async (title) => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/book/title/${title}`);
  } catch (error) {
    console.error("Error fetching book by title:", error);
    return null;
  }
};

export const addBook = async (book) => {
  try {
    return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/book/add-book`, book);
  } catch (error) {
    console.error("Error adding book:", error);
    return null;
  }
};

export const updateBook = async (id, book) => {
  try {
    return await axios.put(`${import.meta.env.VITE_API_BASE_URL}/book/${id}`, book);
  } catch (error) {
    console.error("Error updating book:", error);
    return null;
  }
};

export const deleteBook = async (id) => {
  try {
    return await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting book:", error);
    return null;
  }
};
