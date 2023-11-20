import React, { FC, PropsWithChildren } from "react";
import { AccountControls, Container } from "components/ui";

interface LayoutProps extends PropsWithChildren {
  prop?: string;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen overflow-y-auto flex flex-col">
      <Container className="relative">
        <div className="absolute right-10 top-5">
          <AccountControls />
        </div>
      </Container>
      {children}
    </div>
  );
};

export default Layout;
