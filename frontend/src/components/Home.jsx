import Herosec from "./Herosec";
import Navbar from "./shared/Navbar";
import Catcarousel from "./Catcarousel";
import Latestjobs from "./Latestjobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs(); 

  return (
    <div>
      <Navbar />
      <Herosec />
      <Catcarousel />
      <Latestjobs />
      <Footer />
    </div>
  );
};

export default Home;
//lalalalal
