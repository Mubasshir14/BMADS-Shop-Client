import Footer from "@/components/Shared/Footer";
import Navigation from "@/components/Shared/Navbar";



const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
