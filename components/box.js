'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './box.module.css';
import { motion } from 'framer-motion';

const isDesktop = typeof window !== 'undefined' ? window.innerWidth > 768 : false;
const spanVariant = {
  hidden: { opacity: isDesktop ? 0 : 1, y: isDesktop ? 10 : 0 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) => (typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str));

export default React.memo(function Box({ project }) {
  return (
    <div className={styles.box}>
      <Link href={`/projects/${project.slug}`} className={styles.box__link}>
        <div className={styles.box__thumbnail_container}>
          <Image
            src={project.meta.thumbnail}
            alt={project.meta?.thumbnailAlt || ''}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 2560px) 50vw"
            className={styles.box__thumbnail}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            priority
          />
        </div>
        <motion.div initial="hidden" animate="initial" whileHover="hover" className={styles.box__bottomText}>
          <motion.span variants={spanVariant} layoutId="underline" className={styles.box__title}>
            {project.meta.type}
          </motion.span>
          <motion.span variants={spanVariant} layoutId="underline" className={styles.box__title}>
            {project.meta.title}
          </motion.span>
        </motion.div>
      </Link>
    </div>
  );
});
