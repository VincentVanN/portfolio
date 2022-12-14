/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion, useMotionValue, useTransform,
} from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setIsScale } from '../../feature/navigation.slice';
import AnimatedTextWords from '../AnimatedTextWords/animatedTextWords';
import './card.scss';
import { cardsData } from './cardsData';
import AnimatedTextLetter from '../AnimatedTextLetter/AnimatedTextLetter';

function Card({ objectToDisplay }) {
  const centralCardRef = useRef(null);
  const dispatch = useDispatch();
  const [toggleText, setToggleText] = useState('');
  const [direction, setDirection] = useState('forward');
  const [popupWindow, setPopupWindow] = useState(false);
  const [isHoverClose, setIsHoverClose] = useState(false);
  const handleMouveEnter = () => {
    dispatch(setIsScale(true));
    setToggleText('click me - click me - ');
    setDirection('backward');
  };
  const handleMouveLeave = () => {
    dispatch(setIsScale(false));
    setToggleText('drag the card - drag the card - ');
    setDirection('forward');
  };
  const [centralCardSize, setcentralCardSize] = useState({});
  const updateDimensions = () => {
    if (centralCardRef.current) {
      setcentralCardSize({ width: centralCardRef.current.clientWidth, height: centralCardRef.current.clientHeight });
    }
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    setcentralCardSize({ width: centralCardRef.current.clientWidth, height: centralCardRef.current.clientHeight });
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  const RADIUS = (centralCardSize.width / 2) + 10;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-80, 80], [-30, 30]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="card"
        key={objectToDisplay}
      >
        <motion.div
          className="card-container"
          style={{
            x, y, rotateX, rotateY, z: 100,
          }}
          drag
          dragElastic={0.16}
          dragConstraints={{
            top: 0, left: 0, right: 0, bottom: 0,
          }}
        >
          <div
            className="card-container-top"
          >
            <motion.h1
              className="card-title"
              style={{
                x,
                y,
                rotateX,
                rotateY,
                z: 100000,
              }}
              drag
              dragElastic={0.4}
              dragConstraints={{
                top: 0, left: 0, right: 0, bottom: 0,
              }}
            >
              {cardsData[objectToDisplay].name}
            </motion.h1>
          </div>
          <div className="card-container-center">
            {cardsData[objectToDisplay].cardText.map((text, index) => <AnimatedTextWords text={text} key={`${index} ${text}`} />)}
          </div>
          <div className="card-container-bottom">
            <img
              src="/eye-logo.svg"
              alt="eye"
              className="card-eye"
              onMouseOver={handleMouveEnter}
              onMouseOut={handleMouveLeave}
              onClick={() => setPopupWindow(true)}
              ref={centralCardRef}
            />
            <AnimatedTextLetter
              text={toggleText || 'drag the card - drag the card - '}
              radiusRef={RADIUS - 20}
              direction={direction}
            />
            {!cardsData[objectToDisplay].popupText && (
              <motion.div
                className="withoutPopupText"
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: popupWindow ? 1 : 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                }}
                drag
                dragElastic={0.4}
                dragConstraints={{
                  top: 0, left: 0, right: 0, bottom: 0,
                }}
              >
                <div className="iconContainer">
                  <a
                    href={cardsData[objectToDisplay].code}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseOver={() => dispatch(setIsScale(true))}
                    onMouseOut={() => dispatch(setIsScale(false))}
                  >
                    <img src="github-white-logo.svg" alt="github" />
                    <p>Voir le code</p>
                  </a>
                  {cardsData[objectToDisplay].link && (
                  <a
                    href={cardsData[objectToDisplay].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseOver={() => dispatch(setIsScale(true))}
                    onMouseOut={() => dispatch(setIsScale(false))}
                  >
                    <img src="link-logo.png" alt={cardsData[objectToDisplay].name} />
                    <p>Voir le site en production</p>
                  </a>
                  )}
                </div>
                <motion.img
                  src="/close-logo.svg"
                  alt="close"
                  className="card-popup-close"
                  onClick={() => setPopupWindow(false)}
                  whileTap={{ scale: 0.8 }}
                  onMouseOver={() => {
                    setIsHoverClose(true);
                    dispatch(setIsScale(true));
                  }}
                  onMouseOut={() => {
                    setIsHoverClose(false);
                    dispatch(setIsScale(false));
                  }}
                  animate={{ rotateZ: isHoverClose ? 180 : 0 }}
                />
              </motion.div>
            )}
            {cardsData[objectToDisplay].popupText && (
            <motion.div
              className="card-information-popup"
              initial={{
                scale: 0,
              }}
              animate={{
                scale: popupWindow ? 1 : 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.4,
              }}
              drag
              dragElastic={0.4}
              dragConstraints={{
                top: 0, left: 0, right: 0, bottom: 0,
              }}
            >
              <motion.img
                src="/close-logo.svg"
                alt="close"
                className="card-popup-close"
                onClick={() => setPopupWindow(false)}
                whileTap={{ scale: 0.8 }}
                onMouseOver={() => {
                  setIsHoverClose(true);
                  dispatch(setIsScale(true));
                }}
                onMouseOut={() => {
                  setIsHoverClose(false);
                  dispatch(setIsScale(false));
                }}
                animate={{ rotateZ: isHoverClose ? 180 : 0 }}
              />
              {cardsData[objectToDisplay].popupText.map((text, index) => <AnimatedTextWords text={text} key={`${index} ${text}`} />)}
              <div className="iconContainer">
                <a
                  href={cardsData[objectToDisplay].code}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseOver={() => dispatch(setIsScale(true))}
                  onMouseOut={() => dispatch(setIsScale(false))}
                >
                  <img src="/github-white-logo.svg" alt="github" />
                  <p>Voir le code</p>
                </a>
                {cardsData[objectToDisplay].codeBack && (
                  <a
                    href={cardsData[objectToDisplay].codeBack}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseOver={() => dispatch(setIsScale(true))}
                    onMouseOut={() => dispatch(setIsScale(false))}
                  >
                    <img src="/github-white-logo.svg" alt="github" />
                    <p>BackOffice/Serveur</p>
                  </a>
                )}
                {cardsData[objectToDisplay].link && (
                  <a
                    href={cardsData[objectToDisplay].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseOver={() => dispatch(setIsScale(true))}
                    onMouseOut={() => dispatch(setIsScale(false))}
                  >
                    <img src="/link-logo.png" alt={cardsData[objectToDisplay].name} />
                    <p>Voir le site en production</p>
                  </a>
                )}
              </div>
            </motion.div>
            )}
          </div>
          <motion.div
            className="card-image-wrapper"
            style={{
              x,
              y,
              rotateX,
              rotateY,
              z: 1000,
            }}
            drag
            dragElastic={0.12}
            dragConstraints={{
              top: 0, left: 0, right: 0, bottom: 0,
            }}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                delay: 0.2,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                delay: 0.2,
              },
            }}
          >
            <div className="card-image">
              <img src={cardsData[objectToDisplay].logo} alt={cardsData[objectToDisplay].name} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
Card.propTypes = {
  objectToDisplay: PropTypes.number.isRequired,
};
export default Card;
