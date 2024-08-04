import { Header } from "../Header";


type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      {/* Todo Footer  */}
    </>
  );
};
