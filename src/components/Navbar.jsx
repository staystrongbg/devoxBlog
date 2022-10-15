import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ja from '../images/ja.png';
import { links } from '../utils';
import useScroll from '../hooks/useScroll';

const Navbar = () => {
  const [responsiveNav, setResponsiveNav] = useState(false);
  const { isScroll } = useScroll();
  // localstyles()
  const styles = (bg = 'transparent', color = '#272727') => {
    return {
      backgroundColor: `#${bg}`,
      color: `#${color}`,
      height: '100%',
      display: 'flex',
      padding: '0 40px',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  return (
    <nav className={` ${isScroll ? 'fix-pos dropIn' : ''} `}>
      <div className='logo'>
        <Link to='/'>
          <h2 className='text-gradient'>DevoxBlog</h2>
        </Link>
      </div>
      <div className='links'>
        {links.map((l) => (
          <Link to={l.href} key={l.id} style={styles(l.color, l?.textColor)}>
            <h6> {l.text}</h6>
          </Link>
        ))}
      </div>
      <div className='user'>
        <img src={ja} alt='' />
        <div>
          <span>Zoran</span>
          {/* <span>Logout</span> */}
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        className='hamburger'
        onClick={() => {
          setResponsiveNav(!responsiveNav);
        }}
      >
        &equiv;
      </motion.div>
      <div
        className={`links-responsive ${
          responsiveNav ? 'flex' : 'hidden'
        } dropIn `}
      >
        <h2>DevoxBlog</h2>
        {links.map((l) => (
          <Link key={l.id} to={l.href} onClick={() => setResponsiveNav(false)}>
            <h6 style={{ color: `#${l.color}`, display: l.text === 'write' && 'none' }}>{l.text}</h6>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
