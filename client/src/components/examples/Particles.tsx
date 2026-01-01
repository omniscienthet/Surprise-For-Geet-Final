import Particles from '../Particles';

export default function ParticlesExample() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={900}
        particleSpread={10}
        speed={0.5}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
}
