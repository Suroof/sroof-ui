import type { ReactNode } from "react";
import styles from "./styles.module.css";
import React from 'react'
import { ScrollCard } from "sroof-ui";


function ScrollCardCustomExample() {
  const cardData = [
    { id: 1, imageUrl: 'https://pic1.imgdb.cn/item/688755f858cb8da5c8e90992.png', title: 'Button', description: 'Easy to use' },
    { id: 2, imageUrl: 'https://pic1.imgdb.cn/item/688769bc58cb8da5c8e956a4.png', title: 'Card', description: 'Easy to use' },
    { id: 3, imageUrl: 'https://pic1.imgdb.cn/item/68876a0358cb8da5c8e95814.png', title: 'Collapse', description: 'Easy to use' },
    { id: 4, imageUrl: 'https://pic1.imgdb.cn/item/68876a2a58cb8da5c8e9591d.png', title: 'Form', description: 'Easy to use' },
    { id: 5, imageUrl: 'https://pic1.imgdb.cn/item/68876a6658cb8da5c8e95b41.png', title: 'Switch', description: 'Easy to use' },
    { id: 6, imageUrl: 'https://pic1.imgdb.cn/item/68876a8758cb8da5c8e95c30.png', title: 'Pagination', description: 'Easy to use' },
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
