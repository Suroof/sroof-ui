import React from 'react';
import './App.css';
import { ProgressThreeD } from './components/ProgressThreeD';

function App() {
  const handleProgressChange = (progress: number) => {
    console.log('Progress changed:', Math.round(progress * 100) + '%');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>3D Progress Component Demo</h1>
        <p>使用鼠标滚轮控制魔方动画进度</p>
      </header>
      
      <main style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2>ProgressThreeD 组件演示</h2>
          <ProgressThreeD 
            modelPath="/assets/gltf/rubiks_cube.glb"
            height={500}
            showProgress={true}
            showInstructions={true}
            sensitivity={0.0002} // 更慢的动画速度
            onProgressChange={handleProgressChange}
          />
        </div>
        
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          <h3>功能特性：</h3>
          <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <li>✅ 使用 Three.js 渲染 GLB 3D 模型</li>
            <li>✅ GSAP 动画控制</li>
            <li>✅ 鼠标滚轮控制动画进度</li>
            <li>✅ 阻止页面默认滚动行为</li>
            <li>✅ 实时进度显示</li>
            <li>✅ 流畅的动画过渡</li>
            <li>✅ 支持 OrbitControls 交互</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
