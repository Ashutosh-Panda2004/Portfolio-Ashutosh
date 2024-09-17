import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import spacemanScene from "../assets/3d/spaceman4.glb";
import CanvasLoader from "./Loader";

const Spaceman = ({ scale, position }) => {
  const spacemanRef = useRef();
  const { scene, animations } = useGLTF(spacemanScene);
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    actions["astro_bones|idle_1"].play();
  }, [actions]);

  return (
    <mesh ref={spacemanRef} position={position} scale={scale} rotation={[0, 6, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};

const SpacemanCanvas = ({ scrollContainer }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -0.7, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainer.current.scrollTop;
      const rotationXValue = scrollTop * -0.0006;
      const rotationYValue = scrollTop * -0.00075;
      setRotationX(rotationXValue);
      setRotationY(rotationYValue);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      let newScale, newPosition;

      if (width < 768) {
        // Mobile
        newScale = [0.5, 0.5, 0.5];
        newPosition = [0.1, -3.4, 0];
      } else if (width < 1024) {
        // Tablet
        newScale = [0.47, 0.47, 0.47];
        newPosition = [0.15, -3.4, 0];
      } else if (width < 1280) {
        // Small desktop
        newScale = [0.7, 0.7, 0.7];
        newPosition = [0.2, -0.5, 0];
      } else if (width < 1536) {
        // Desktop (as specified)
        newScale = [0.58, 0.58, 0.58];
        newPosition = [1, -3.5, 0];
      } else {
        // Large screens
        newScale = [0.2, 0.2, 0.2];
        newPosition = [0.25, -0.6, 0];
      }

      setScale(newScale);
      setPosition(newPosition);
    };
    
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollContainer]);

  return (
    <Canvas className={`w-full h-screen bg-transparent z-10`} camera={{ near: 0.1, far: 1000 }}>
      <Suspense fallback={<CanvasLoader />}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 5, 10]} intensity={2} />
        <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
        <hemisphereLight skyColor="#b1e1fz" groundColor="#000000" intensity={1} />
        
        <Spaceman rotationX={rotationX} rotationY={rotationY} scale={scale} position={position} />
      </Suspense>
    </Canvas>
  );
};

export default SpacemanCanvas;