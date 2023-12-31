import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="items-center flex justify-center h-full w-full">
      {children}
    </div>
  );
};

export default Layout;
