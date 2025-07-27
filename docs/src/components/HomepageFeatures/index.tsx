import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "简单易用",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Sroof UI 从设计之初就注重易用性，提供简洁的 API 和完善的文档，
        让您能够快速上手并构建出色的用户界面。
      </>
    ),
  },
  {
    title: "专注核心",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        专注于提供高质量的 UI 组件，让您将更多精力投入到业务逻辑中。
        我们处理复杂的样式和交互，您只需专注于创造价值。
      </>
    ),
  },
  {
    title: "React 驱动",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        基于现代 React 技术栈构建，支持 TypeScript，提供完整的类型定义。
        与您现有的 React 项目无缝集成。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
