/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import ParticleImage, {
  Vector,
  forces,
} from 'react-particle-image';
import { useSelector } from 'react-redux';

function LogoParticles({ width, height, currentImage }) {
  const { windowSize } = useSelector((state) => state.navigation);
  const particleOptions = {
    filter: ({ x, y, image }) => {
      const pixel = image.get(x, y);
      return pixel.b > 50;
    },
    color: () => '#000',
    radius: () => Math.random() * (1.5 + 0.8),
    mass: () => 10,
    friction: () => 0.4,
    initialPosition: ({ canvasDimensions }) => new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2),
  };
  const motionForce = (x, y) => forces.disturbance(x, y, 50);
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <ParticleImage
        src={currentImage}
        width={width}
        height={height}
        scale={width / 530}
        entropy={windowSize.width < 1570 ? 10 : 20}
        maxParticles={5000}
        particleOptions={particleOptions}
        mouseMoveForce={motionForce}
        touchMoveForce={motionForce}
        backgroundColor=""
      />
    </div>

  );
}
LogoParticles.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  currentImage: PropTypes.string.isRequired,
};
export default LogoParticles;
