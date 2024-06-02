import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);
    return () => { document.body.removeChild(container); };
  }, [container]);

  return createPortal(children, container);
};

export default Portal;
