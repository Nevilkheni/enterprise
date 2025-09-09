import { motion } from "framer-motion";
import middleSectionBg2 from "../assets/image/midelimage2.jpg";
import submiddleSectionBg from "../assets/image/roll2.png";
import CardShowcase from "../components/CardShowcase";
import OurStory from "../components/ourstory";
import Certificate from "../components/certificate";
import Feature from "../components/feature";
import HomeImgSlider from "../components/Homeimgslider";
import { useNavigate } from "react-router-dom";
import JobWorkForm from "../components/Jobworkform";
import Reviewe from "../components/Review";

function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(220, 38, 38, 0.3)",
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="overflow-hidden">
      <HomeImgSlider />
      <OurStory />

      <motion.section  
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full bg-cover hidden sm:block bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${middleSectionBg2})` }}
      >
        <div className="w-full mx-auto hidden sm:block px-4 backdrop-blur-[3px] sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col mx-auto lg:flex-row max-w-5xl items-center gap-8 md:gap-12"
          >
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-2/3 bg-black/70 backdrop-blur-lg rounded-xl p-8 shadow-lg"
            >
              <motion.h2
                className="text-lg md:text-2xl flex-none  md:flex md:gap-3  font-michroma  font-bold mb-4 text-white"
                whileHover={{ x: 5 }}
              >
                <p> Welcome to</p>{" "}
                <p className=" text-red-500">Jyot Sequence</p>
              </motion.h2>
              <motion.p
                className="text-lg font-josefin  md:text-xl mb-6 text-gray-200"
                whileHover={{ x: 5 }}
              >
                Creating exceptional digital experiences for your talent journey
              </motion.p>
              <motion.p
                className="text-base text-gray-300 mb-6"
                whileHover={{ x: 5 }}
              >
                "At Jyot Sequence,we specialize in crafting premium sequence
                designing materials used in embroidery and garment decoration.
                With a passion for creativity and quality, we provide designers
                and artisans with the finest materials that bring elegance and
                brilliance to every stitch. Our focus is to deliver innovative
                designs, durable quality, and reliable service, helping our
                customers transform their ideas into stunning embroidered
                creations."
              </motion.p>
               <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate("/category")}
                className="px-4  py-2 font-michroma text-[12px] bg-gradient-to-r from-red-600 to-indigo-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-indigo-700 transition-all"
              >
                Explore Products
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full lg:w-1/3 hidden md:flex justify-center"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="overflow-hidden rounded-full w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-sm p-2 border-2 border-white/20"
              >
                <img
                  src={submiddleSectionBg}
                  alt="Company Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      <CardShowcase />
      <Feature />
      <Certificate />
      <JobWorkForm />
      {/* <Reviewe /> */}
    </div>
  );
}

export default Home;
