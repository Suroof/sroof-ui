import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import React from "react";
import { Button, ScrollReveal, EmergeText } from "sroof-ui";
import styles from "./index.module.css";
import { useHistory } from "react-router-dom";

function HomepageHeader() {
  const history = useHistory();
  const handleTo = () => {
    history.push("/sroof-ui/docs/intro");
  };
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <nav>
        <h2 className={styles.toptitle}>{siteConfig.title}</h2>
        <Button
          variant="text"
          rounded="large"
          size="medium"
          className={styles.githubButton}
          onClick={() => {
            window.location.href = "https://github.com/Suroof/sroof-ui";
          }}
        >
          Github
        </Button>
      </nav>
      <div className="container">
        <ScrollReveal staggerDelay={500}>
          <Heading as="h1">
            <EmergeText
              text="Inspire inspiration and bring a better reading experience"
              splitType="chars"
              duration={1}
              stagger={0.05}
            />
          </Heading>
          <p className={styles.hero__subtitle}>{siteConfig.tagline}</p>
        </ScrollReveal>
        <div className={styles.buttons}>
          <Button
            variant="outline"
            rounded="large"
            size="large"
            onClick={handleTo}
          >
            Browse Components
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <footer className={styles.customFooter}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>文档</h3>
            <a href="/sroof-ui/docs/intro" className={styles.footerLink}>
              快速开始
            </a>
            <a
              href="/sroof-ui/docs/components/button"
              className={styles.footerLink}
            >
              组件
            </a>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>社区</h3>
            <a
              href="https://github.com/Suroof/sroof-ui/issues"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              反馈问题
            </a>
            <a
              href="https://github.com/Suroof/sroof-ui/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              参与讨论
            </a>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>更多</h3>
            <a
              href="https://github.com/Suroof/sroof-ui"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              GitHub
            </a>
          </div>
        </div>

        <div className={styles.footerCopyright}>
          Copyright © {new Date().getFullYear()} Sroof UI - A Future Design
        </div>
      </footer>
    </Layout>
  );
}
