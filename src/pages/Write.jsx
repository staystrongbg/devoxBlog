import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { links } from '../utils';
import supabase from '../config/supabase';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const navigate = useNavigate();
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [imgLink, setImgLink] = useState(false);
  const [category, setCategory] = useState('art');
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('devox-blog')
      .insert([{ title, desc, category, img }]);
    if (error) {
      console.log(error);
      setError(error.message);
    }
    if (data) {
      navigate('/');
    }
  };

  return (
    <div className='write-container'>
      <div className='write-post'>
        <div className='post-content'>
          <input
            type='text'
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='editor-container'>
            <ReactQuill
              className='editor'
              theme='snow'
              value={desc}
              onChange={setDesc}
            />
            {error && <p>{error}</p>}
          </div>
        </div>
        <div className='options'>
          <div className='publish'>
            <h2>Publish</h2>
            <span>
              <b>Status:</b> Draft
            </span>
            <span>
              <b>Visibility:</b> Public
            </span>
            <input
              type='file'
              id='file'
              style={{ display: 'none' }}
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor='file'>Upload a file</label> <span>or</span>{' '}
            {imgLink && (
              <input
                id='imgLink'
                type='text'
                value={img}
                placeholder='Image link'
                onChange={(e) => {
                  setImg(e.target.value);
                }}
              />
            )}
            <label htmlFor='imgLink' onClick={() => setImgLink(!imgLink)}>
              Add image link
            </label>
            <div className='buttons'>
              <button>Save as a draft</button>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
          <div className='categories'>
            <h2>Category</h2>
            {links.slice(0, links.length - 1).map((link) => (
              <div key={link.id}>
                <input
                  type='radio'
                  name='cat'
                  value={link.text}
                  id={link.text}
                  checked={category === link.text}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor={link.text}>{link.text}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
