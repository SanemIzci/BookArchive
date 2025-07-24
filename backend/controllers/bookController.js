import Book from "../models/bookModel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

export const allBooks=async(req,res)=>{
    const books=await Book.find()
    try {
        res.status(200).json({success:true,books})
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"})
        
    }
}

export const addBook = async (req, res) => {
  try {
    let image = null;

    // 1) Eğer multer ile dosya geldi ise (normal upload)
    if (req.file) {
      // Cloudinary'ye yükle
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "books", // opsiyonel klasör ismi
      });
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      // Lokaldeki dosyayı temizle
      fs.unlinkSync(req.file.path);
    } 
    // 2) Eğer base64 formatında resim gelmişse (postman raw test için)
    else if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: "books",
      });
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    
    const {
      user,
      title,
      author,
      category,
      readingStatus,
      startDate,
      readDate,
      rating,
      review,
      isFavorite,
    } = req.body;

    // Gerekli alan kontrolü
    if (!title || !author || !readingStatus) {
      return res
        .status(400)
        .json({ success: false, message: "Title, author and reading status are required." });
    }

    // Yeni kitap yaratma
    const book = await Book.create({
      user,
      title,
      author,
      category,
      readingStatus,
      startDate,
      readDate,
      rating,
      review,
      isFavorite: isFavorite || false,
      image: image ? image: null,
    });

    res.status(201).json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// ✅ Delete Book Controller
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }

    // Cloudinary'den resmi sil
    if (book.image && book.image.length > 0) {
      for (const img of book.image) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    await book.deleteOne();
    res.status(200).json({ success: true, message: "Book and its image deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, book: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { review } = req.body;
    const { id } = req.params; // Book ID from URL

    const book = await Book.findByIdAndUpdate(
      id,
      { review },
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }
    res.status(200).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const starReview = async (req, res) => {
  try {
    const { rating } = req.body;
    if (typeof rating === 'undefined') {
      return res.status(400).json({ success: false, message: "Rating is required." });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }

    book.rating = rating;
    await book.save();

    res.status(200).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};