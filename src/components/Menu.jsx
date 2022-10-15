const Menu = ({ post }) => {
  function createMarkup() {
    const text = post.desc.slice(0, 160);
    return { __html: text };
  }
  console.log(post.created_at);
  return (
    <div className='menu'>
      <h5>{post.created_at}</h5>
      <img src={post.img} alt='' />
      <h3>{post.title}</h3>
      <p dangerouslySetInnerHTML={createMarkup()} />

      <button>Read More</button>
    </div>
  );
};

export default Menu;
