import { useState, useEffect, useRef } from 'react';

const useActiveSection = (sectionIds: string[]) => {
  const [activeId, setActiveId] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-20% 0% -80% 0px', // Trigger when section is in the top 20% of the viewport
    });

    const elements = sectionIds.map(id => document.getElementById(id));
    elements.forEach(el => {
      if (el) {
        observer.current?.observe(el);
      }
    });

    return () => {
      elements.forEach(el => {
        if (el) {
          observer.current?.unobserve(el);
        }
      });
    };
  }, [sectionIds]);

  return activeId;
};

export default useActiveSection;