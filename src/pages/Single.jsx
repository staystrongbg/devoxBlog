import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Ja from '../images/ja.png';
import supabase from '../config/supabase';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Edit from '../components/Edit';
import Delete from '../components/Delete';

const Single = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    const { data, error } = await supabase.from('posts').select();
    if (error) {
      setError(error);
    }

    if (data) {
      setPosts(data);
      setLoading(false);
      setPost(data.find((post) => post.id.toString() === id));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function createMarkup() {
    return { __html: post.desc };
  }

  return (
    <div className='single-post'>
      {loading && <h2>Loading...</h2>}
      {post && (
        <div className='content'>
          <img src={post.img} alt='' />
          <div className='user'>
            <img src={Ja} alt='' />
            <div className='info'>
              <span>John</span>
              <p>Posted 2 days ago</p>
            </div>
            <div className='controls'>
              <Link to={`/write?edit=2`}>
                <Edit />
              </Link>
              <Link to={`/write?delete=2`}>
                <Delete />
              </Link>
            </div>
          </div>
          <h1>{post.title}</h1>
          <p dangerouslySetInnerHTML={createMarkup()} />
        </div>
      )}

      <div className='menu-container'>
        <h3>Other posts you may like</h3>
        <div
          style={{
            height: '4px',
            backgroundImage:
              'linear-gradient( 126.3deg,  rgba(30,2,83,1) 32.2%, rgba(198,55,160,0.46) 109.2% )',
          }}
        />
        {posts
          .filter((p) => p.category === post.category && p.id !== post.id)
          .map((post) => (
            <Menu post={post} key={post.id} />
          ))}
      </div>
    </div>
  );
};

export default Single;
