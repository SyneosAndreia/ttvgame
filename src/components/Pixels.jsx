import React, { useState, useEffect, useCallback } from 'react';

export const Pixels = () => {
  const [particles, setParticles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [tick, setTick] = useState(0);

  const PARTICLE_COUNT = 30;
  const MAX_GRID_SIZE = 8; // Maximum size of each "pixel"
  const MIN_GRID_SIZE = 2; // Minimum size of each "pixel"
  const MOVE_INTERVAL = 1000; // Move every 1 second
  const SIZE_CHANGE_PROBABILITY = 0.3; // Probability of size change each tick

  const createParticle = useCallback(() => ({
    x: Math.floor(Math.random() * (dimensions.width / MAX_GRID_SIZE)) * MAX_GRID_SIZE,
    y: Math.floor(Math.random() * (dimensions.height / MAX_GRID_SIZE)) * MAX_GRID_SIZE,
    size: MAX_GRID_SIZE,
    direction: Math.floor(Math.random() * 4), // 0: right, 1: down, 2: left, 3: up
    color: getRandomColor(),
  }), [dimensions]);

  const getRandomColor = () => {
    const colors = ['rgba(250,250,250,.2)', '#808080'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const updateParticle = (particle) => {
    let { x, y, direction, size } = particle;
    
    // Move particle based on direction
    switch(direction) {
      case 0: x += MAX_GRID_SIZE; break; // Right
      case 1: y += MAX_GRID_SIZE; break; // Down
      case 2: x -= MAX_GRID_SIZE; break; // Left
      case 3: y -= MAX_GRID_SIZE; break; // Up
    }

    // Wrap around screen edges
    x = (x + dimensions.width) % dimensions.width;
    y = (y + dimensions.height) % dimensions.height;

    // Randomly change size
    if (Math.random() < SIZE_CHANGE_PROBABILITY) {
      if (Math.random() < 0.5 && size > MIN_GRID_SIZE) {
        size -= 1; // Shrink
      } else if (size < MAX_GRID_SIZE) {
        size += 1; // Grow
      }
    }

    // Occasionally change direction
    if (Math.random() < 0.1) {
      direction = Math.floor(Math.random() * 4);
    }

    return { ...particle, x, y, direction, size };
  };

  useEffect(() => {
    const initialParticles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    setParticles(initialParticles);

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    const intervalId = setInterval(() => {
      setTick(prevTick => prevTick + 1);
    }, MOVE_INTERVAL);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [createParticle]);

  useEffect(() => {
    setParticles(prevParticles =>
      prevParticles.map(updateParticle)
    );
  }, [tick]);

  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: 0, left: 0, background: 'transparent', zIndex: '-1' }}
    >
      {particles.map((particle, index) => (
        <rect
          key={index}
          x={particle.x + (MAX_GRID_SIZE - particle.size) / 2}
          y={particle.y + (MAX_GRID_SIZE - particle.size) / 2}
          width={particle.size}
          height={particle.size}
          fill={particle.color}
        />
      ))}
    </svg>
  );
};