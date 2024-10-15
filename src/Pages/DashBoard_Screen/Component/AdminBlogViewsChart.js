import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const AdminBlogViewsChart = () => {
  const [topBlogs, setTopBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopBlogs = async () => {
      try {
        const response = await axios.get('https://backend.mycaretrading.com/admin/blog/top-blogs');
        setTopBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching top blogs data');
        setLoading(false);
      }
    };

    fetchTopBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-blog-views-chart">
      <h2>Top Blog Views</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topBlogs}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="meta_title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminBlogViewsChart;
