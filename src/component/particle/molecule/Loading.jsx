import { motion } from "framer-motion";

const Loading = () => (
  <motion.i
    className="bi-arrow-repeat text-4xl inline-block"
    style={{ transformOrigin: "50% 50%" }}
    initial={{ opacity: 0 }}
    animate={{
      rotate: 360,
      opacity: 1
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

export default Loading;
