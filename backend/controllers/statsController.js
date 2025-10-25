import Book from "../models/bookModel.js";
import User from "../models/userModel.js";


export const getCategoryStats = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password -refreshToken');
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Kategori istatistikleri
      const categoryStats = await Book.aggregate([
        { $match: { user: req.user._id } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
  
      // Okuma durumu istatistikleri
      const readingProgress = await Book.aggregate([
        { $match: { user: req.user._id } },
        { $group: { 
          _id: "$readingStatus", 
          count: { $sum: 1 } 
        }}
      ]);
  
  
      // Toplam kitap sayısı
      const totalBooks = await Book.countDocuments({ user: req.user._id });
  
      // En çok okunan kategori
      const favoriteCategory = categoryStats.length > 0 ? categoryStats[0]._id : null;
  
      // Debug: Okuma durumu verilerini logla
      console.log("Reading Progress Raw Data:", readingProgress);
      
      // Okuma durumu verilerini düzenle
      const readingStatus = {
        completed: 0,
        reading: 0,
        toRead: 0
      };
      
      readingProgress.forEach(item => {
        if (item._id === 'completed') readingStatus.completed = item.count;
        else if (item._id === 'reading') readingStatus.reading = item.count;
        else if (item._id === 'to-read') readingStatus.toRead = item.count;
      });
      
      console.log("Processed Reading Status:", readingStatus);
  
  
      res.status(200).json({
        stats: {
          booksByCategory: { 
            labels: categoryStats.map(item => item._id), 
            data: categoryStats.map(item => item.count) 
          },
          readingProgress: readingStatus,
          totalBooks,
          favoriteCategory
        }
      });
  
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Error fetching stats data" });
    }
  };
