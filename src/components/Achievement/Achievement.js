import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Cursor from '../Cursor/Cursor';
import SideMenu from '../SideMenu/SideMenu';
import './achievement.scss';
import Card from './Card';
import { centerVariants } from '../../variants/variants';
import { setPageToGo } from '../../feature/navigation.slice';

function Achievement() {
  const dispatch = useDispatch();
  const { pageToGo } = useSelector((state) => state.navigation);
  const [objectToDisplay, setObjectToDisplay] = useState(0);
  const [isCursor, setIsCursor] = useState(true);
  useEffect(() => {
    dispatch(setPageToGo(''));
  }, []);
  return (
    <div className="achievement-container">
      {pageToGo && (
        <motion.div
          className="achievement-center"
          exit={() => {
            if (pageToGo === '/about') {
              return 'about';
            }
            if (pageToGo === '/' || !pageToGo) {
              return 'home';
            }
            if (pageToGo === '/contact') {
              return 'contact';
            }
            return 'other';
          }}
          variants={centerVariants}
        >
          <motion.div
            className="about-center-image"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: pageToGo === '/about' ? 1 : 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            <img src="Me.png" alt="" />
          </motion.div>
        </motion.div>
      )}
      {isCursor && (
        <Cursor />
      )}
      <SideMenu setObjectToDisplay={setObjectToDisplay} setIsCursor={setIsCursor} />
      {!pageToGo && (
        <Card objectToDisplay={objectToDisplay} />
      )}
    </div>
  );
}

export default Achievement;
