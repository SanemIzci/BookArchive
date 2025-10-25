import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStats } from "../redux/StatsSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

export default function Profile() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.stats);

  // Her zaman fresh data çekmek için fetch fonksiyonu
  const fetchStats = useCallback(() => {
    dispatch(fetchUserStats());
  }, [dispatch]);

  // Component mount olduğunda fetch et
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Sayfa focus olduğunda (kullanıcı başka sayfadan geri döndüğünde) fetch et
  useEffect(() => {
    const handleFocus = () => {
      fetchStats();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStats();
      }
    };

    // Window focus event
    window.addEventListener('focus', handleFocus);
    
    // Page visibility change event (tab değişimi)
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchStats]);

  // Chart data configurations
  const categoryChartData = {
    labels: stats?.booksByCategory?.labels || [],
    datasets: [
      {
        label: 'Kitaplar',
        data: stats?.booksByCategory?.data || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Debug: Stats verilerini logla
  useEffect(() => {
    if (stats) {
      console.log("Frontend Stats Data:", stats);
      console.log("Reading Progress:", stats.readingProgress);
    }
  }, [stats]);

  const readingProgressData = {
    labels: ['Okunan', 'Okunuyor', 'Okunacak'],
    datasets: [
      {
        data: [
          stats?.readingProgress?.completed || 0,
          stats?.readingProgress?.reading || 0,
          stats?.readingProgress?.toRead || 0,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Okuma Alışkanlıklarım',
      },
    },
  };

  if (loading) return <div className="flex justify-center items-center h-64"><p>Yükleniyor...</p></div>;
  if (error) return <div className="flex justify-center items-center h-64"><p className="text-red-500">Hata: {error}</p></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Okuma Alışkanlıklarım</h1>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg 
            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{loading ? 'Güncelleniyor...' : 'Yenile'}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kategori Grafiği */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Kategorilere Göre Kitaplar</h2>
          <Bar data={categoryChartData} options={chartOptions} />
        </div>

        {/* Okuma Durumu */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Okuma Durumu</h2>
          <Doughnut data={readingProgressData} options={chartOptions} />
        </div>

      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-100 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-800">Toplam Kitap</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalBooks || 0}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-800">Okunan Kitap</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.readingProgress?.completed || 0}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-purple-800">Favori Kategori</h3>
          <p className="text-xl font-bold text-purple-600">{stats?.favoriteCategory || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
