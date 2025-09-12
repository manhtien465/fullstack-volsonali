"use client"

import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyLoadSectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}

export const LazyLoadSection: React.FC<LazyLoadSectionProps> = ({
  children,
  fallback = null,
  rootMargin = '200px',
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin,
  });

  return (
    <div ref={ref}>
      {inView ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};
