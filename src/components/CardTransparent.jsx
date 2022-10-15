import { Link } from 'react-router-dom';

const CardTransparent = ({ post }) => {
  function createMarkup() {
    return { __html: post.desc };
  }

  return (
    <div className='post'>
      <div className='post-img'>
        <img src={post.img} alt='' />
      </div>
      <div className='post-content'>
        <h1>{post.title}</h1>
        <p dangerouslySetInnerHTML={createMarkup()} />
        <Link to={`/post/${post.id}`}>
          <button>Read more</button>
        </Link>
      </div>
    </div>
  );
};

export default CardTransparent;
