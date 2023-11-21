import React, { FC, PropsWithChildren } from "react";
import { AccountControls } from "components/ui";

interface LayoutProps extends PropsWithChildren {
  prop?: string;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full overflow-y-auto flex flex-col px-16 py-14">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-10">
          <img src="logo.svg" className="w-[200px] h-full" />
          <p className="text-4xl">Crédito</p>
        </div>
        <div className="self-start">
          <AccountControls />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
