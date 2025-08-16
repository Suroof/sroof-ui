import type { ReactNode } from "react";
import styles from "./styles.module.css";
import React from 'react'
import { ScrollCard, ProgressThreeD } from "sroof-ui";


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
  const [progress, setProgress] = React.useState(0)
  return (
    <div style={{ padding: '20px 0', overflow: 'hidden' }}>
      <ProgressThreeD
        modelPath={'/sroof-ui/assets/gltf/rubiks_cube.glb'}
        sensitivity={0.0003}

        initialRotation={ [Math.PI /8, Math.PI / 3, Math.PI / 12] }
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
