import type { ReactNode } from "react";
import styles from "./styles.module.css";
import React from 'react'
import { ScrollCard, ProgressThreeD, Alert } from "sroof-ui";


function ScrollCardCustomExample() {
  const cardData = [
    { id: 1, imageUrl: '/sroof-ui/img/Button.jpg', title: 'Button', description: '提供多种点击操作的按钮组件' },
    { id: 2, imageUrl: '/sroof-ui/img/Card.jpg', title: 'Card', description: '用于展示信息的卡片容器组件' },
    { id: 3, imageUrl: '/sroof-ui/img/Carousel.jpg', title: 'Carousel', description: '支持自动轮播和手动切换的走马灯组件' },
    { id: 4, imageUrl: '/sroof-ui/img/Font.jpg', title: 'Font', description: '提供多种字体样式和排版选项' },
    { id: 5, imageUrl: '/sroof-ui/img/Form.jpg', title: 'Form', description: '用于数据录入和验证的表单组件' },
    { id: 6, imageUrl: '/sroof-ui/img/Slider.jpg', title: 'Slider', description: '支持范围选择的滑动输入条组件' },
    { id: 7, imageUrl: '/sroof-ui/img/Progress.jpg', title: 'Progress', description: '用于展示任务进度的进度条组件' },
  ]
  return (
    <div style={{ padding: '20px 0', overflow: 'hidden' }}>
      <ScrollCard
        items={cardData}
        cardWidth={400}
        speed={30}
      />
    </div>
  );
}

function ProgressThreeDExample() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Alert
        message="拖拽模型试一下~"
        description="滑动滚轮会很酷！"
        type="info"
        icon={
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
          </svg>
        }
      />
      <ProgressThreeD
        modelPath={'/sroof-ui/assets/gltf/rubiks_cube.glb'}
        sensitivity={0.0001}
        initialProgress={0.1}
        initialRotation={[Math.PI / 8, Math.PI / 3, Math.PI / 12]}
      />
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <ScrollCardCustomExample />
          <ProgressThreeDExample />
        </div>
      </div>
    </section>
  );
}
