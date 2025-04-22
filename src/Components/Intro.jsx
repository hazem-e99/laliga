import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Typewriter from "typewriter-effect";
import runningAnimation from "../assets/lottie/running.json";
import { useTranslation } from "react-i18next";

const Intro = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Logo and Site Name */}
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/1200px-LaLiga_logo_2023.svg.png"
          alt="La Liga Logo"
          className="w-16 h-16 mr-3"
        />
<h2 className="text-xl md:text-3xl font-bold text-[#fd4742]">
          LALIGA
        </h2>
      </motion.div>

      {/* Lottie Animation */}
      <motion.div
        className="w-40 h-40 mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Lottie animationData={runningAnimation} loop={true} />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold text-center mb-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        💥  {t("welcome_title")}<span className="text-cyan-400">{t("ultimate_sportswear")}</span> 💥
      </motion.h1>

      {/* Typewriter Text */}
      <motion.div
        className="text-lg md:text-2xl text-center font-medium text-cyan-300 mb-10 min-h-[100px]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <Typewriter
          options={{
            strings: [
              t("train_harder"),
              t("run_faster"),
              t("look_sharper"),
              t("your_style"),
              t("change_rules")
            ],
            autoStart: true,
            loop: true,
            delay: 10,         // 👈 أسرع كتابة
            deleteSpeed: 10,   // 👈 أسرع حذف
            pauseFor: 400      // 👈 وقت أقل بين الجمل
          }}
        />
      </motion.div>

      {/* Spinner */}
      <motion.div
        className="w-12 h-12 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default Intro;
