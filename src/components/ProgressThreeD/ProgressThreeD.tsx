import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import styles from "./ProgressThreeD.module.scss";

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger);

export interface ProgressThreeDProps {
  modelPath?: string;
  height?: number;
  showProgress?: boolean;
  showInstructions?: boolean;
  sensitivity?: number; // 滚轮敏感度，值越小动画越慢
  onProgressChange?: (progress: number) => void;
}

interface ModelProps {
  modelPath: string;
  progress: number;
}

// 3D模型组件
const Model: FC<ModelProps> = ({ modelPath, progress }) => {
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
    }
  }, [gltf]);

  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export const ProgressThreeD: FC<ProgressThreeDProps> = ({
  modelPath = "/assets/gltf/rubiks_cube.glb",
  height = 400,
  showProgress = true,
  showInstructions = true,
  sensitivity = 0.0003, // 默认敏感度降低，让动画更慢
  onProgressChange
}) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const isScrollingRef = useRef(false);

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    
    const delta = event.deltaY;
    const newProgress = Math.max(0, Math.min(1, progressRef.current + delta * sensitivity));
    
    progressRef.current = newProgress;
    setProgress(newProgress);
    onProgressChange?.(newProgress);
    
    // 防抖处理
    isScrollingRef.current = true;
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  }, [onProgressChange, sensitivity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 添加滚轮事件监听
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // 阻止容器内的默认滚动行为
    const preventScroll = (e: Event) => {
      if (isScrollingRef.current) {
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
  }, [handleWheel]);

  return (
    <div 
      ref={containerRef}
      className={styles.progressThreeD} 
      style={{ height: `${height}px` }}
    >
      <Canvas 
        className={styles.canvas}
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true }}
      >
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          maxDistance={10}
          minDistance={2}
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
        <Model modelPath={modelPath} progress={progress} />
      </Canvas>
      
      {showProgress && (
        <div className={styles.progressInfo}>
          <div>进度: <span className={styles.progressValue}>{Math.round(progress * 100)}%</span></div>
        </div>
      )}
      
      {showInstructions && (
        <div className={styles.instructions}>
          使用鼠标滚轮控制动画进度
        </div>
      )}
    </div>
  );
};