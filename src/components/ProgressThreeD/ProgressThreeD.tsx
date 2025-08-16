import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export interface ProgressThreeDProps {
  modelPath?: string;
  sensitivity?: number; // 滚轮敏感度，值越小动画越慢
  initialRotation?: [number, number, number]; // 初始旋转角度 [x, y, z] (弧度)
  onProgressChange?: (progress: number) => void;
}

interface ModelProps {
  modelPath: string;
  progress: number;
  initialRotation?: [number, number, number];
}

// 3D模型组件
const Model: FC<ModelProps> = ({ modelPath, progress, initialRotation = [0, 0, 0] }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  useEffect(() => {
    if (gltf && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[0]);
      
      mixerRef.current = mixer;
      actionRef.current = action;
      
      action.play();
      action.paused = true;
      
      return () => {
        mixer.stopAllAction();
      };
    }
  }, [gltf]);

  useEffect(() => {
    if (actionRef.current) {
      const duration = actionRef.current.getClip().duration;
      actionRef.current.time = progress * duration;
      mixerRef.current?.update(0);
    }
  }, [progress]);

  useFrame((state, delta) => {
    if (mixerRef.current && !actionRef.current?.paused) {
      mixerRef.current.update(delta);
    }
  });

  // 自动调整模型大小以适应视口
  useEffect(() => {
    if (gltf && modelRef.current) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // 调整这个值来控制模型大小
      
      modelRef.current.scale.setScalar(scale);
      
      // 居中模型
      const center = box.getCenter(new THREE.Vector3());
      modelRef.current.position.copy(center).multiplyScalar(-scale);
      
      // 设置初始旋转角度
      modelRef.current.rotation.set(initialRotation[0], initialRotation[1], initialRotation[2]);
    }
  }, [gltf, initialRotation]);

  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export const ProgressThreeD: FC<ProgressThreeDProps> = ({
  modelPath = "/assets/gltf/rubiks_cube.glb",
  sensitivity = 0.0003, // 默认敏感度降低，让动画更慢
  initialRotation = [0, 0, 0], // 默认无旋转
  onProgressChange
}) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const isScrollingRef = useRef(false);
  const [isActive, setIsActive] = useState(false);

  const handleWheel = useCallback((event: WheelEvent) => {
    if (!isActive) return;
    
    event.preventDefault();
    
    const delta = event.deltaY; // 正常滚轮方向
    const newProgress = Math.max(0, Math.min(1, progressRef.current + delta * sensitivity));
    
    progressRef.current = newProgress;
    setProgress(newProgress);
    onProgressChange?.(newProgress);
    
    // 当进度达到100%时，失去焦点
    if (newProgress >= 1) {
      setIsActive(false);
    }
    
    // 防抖处理
    isScrollingRef.current = true;
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  }, [onProgressChange, sensitivity, isActive]);

  // 检测组件是否在视口中
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 如果进度已达到100%，重置进度
          if (progressRef.current >= 1) {
            progressRef.current = 0;
            setProgress(0);
            onProgressChange?.(0);
          }
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [onProgressChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 添加滚轮事件监听
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // 阻止容器内的默认滚动行为
    const preventScroll = (e: Event) => {
      if (isScrollingRef.current && isActive) {
        e.preventDefault();
      }
    };
    
    container.addEventListener('scroll', preventScroll);
    container.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', preventScroll);
      container.removeEventListener('touchmove', preventScroll);
    };
  }, [handleWheel, isActive]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      <Canvas 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          maxDistance={10}
          minDistance={4}
          zoomSpeed={-1}
        />
        
        {/* 增强环境光 */}
        <ambientLight intensity={0.8} color="#ffffff" />
        
        {/* 主方向光 */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* 补充方向光 */}
        <directionalLight 
          position={[-5, -5, 5]} 
          intensity={0.6} 
          color="#ffffff"
        />
        
        {/* 顶部点光源 */}
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
        
        {/* 底部点光源 */}
        <pointLight position={[0, -10, 0]} intensity={0.3} color="#ffffff" />
        
        {/* 3D模型 */}
        <Model modelPath={modelPath} progress={progress} initialRotation={initialRotation} />
      </Canvas>
      
      
    </div>
  );
};