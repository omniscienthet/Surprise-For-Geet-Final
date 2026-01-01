import { useState, useCallback } from 'react';

export const useLaserFlowTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  const startTransition = useCallback((route: string) => {
    setIsTransitioning(true);
    setTargetRoute(route);
  }, []);

  const resetTransition = useCallback(() => {
    setIsTransitioning(false);
    setTargetRoute(null);
  }, []);

  return {
    isTransitioning,
    targetRoute,
    startTransition,
    resetTransition
  };
};
