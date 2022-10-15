import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import CardTransparent from '../components/CardTransparent';
import supabase from '../config/supabase';
const Home = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from('posts').select();
    if (error) {
      setError(error);
    }
    if (data) {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='home '>
      <div className='posts'>
        {posts.map((post) => (
          <CardTransparent post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
