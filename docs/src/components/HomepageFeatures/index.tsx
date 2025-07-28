import type { ReactNode } from "react";
import styles from "./styles.module.css";
import React from 'react'
import { ScrollCard } from "sroof-ui";


function ScrollCardCustomExample() {
  const cardData = [
    { id: 1, imageUrl: 'https://pic1.imgdb.cn/item/688755f858cb8da5c8e90992.png', title: 'Button', description: 'Easy to use' },
    { id: 2, imageUrl: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg', title: '笔记本电脑', description: '代码与咖啡的完美结合。' },
    { id: 3, imageUrl: 'https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg', title: '城市夜景', description: '繁华都市的夜晚灯火辉煌。' },
    { id: 4, imageUrl: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg', title: '山间清晨', description: '云雾缭绕的山峰迎接第一缕阳光。' },
    { id: 5, imageUrl: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg', title: '绿意盎然', description: '阳光普照的绿色森林。' },
    { id: 6, imageUrl: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg', title: '瀑布奇观', description: '水流从高处倾泻而下，气势磅礴。' },
  ];
  return (
    <div style={{ padding: '20px 0',overflow: 'hidden'}}>
      <ScrollCard
        items={cardData}
        cardWidth={400}
        speed={10}
      />
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
       <ScrollCardCustomExample/>
        </div>
      </div>
    </section>
  );
}
