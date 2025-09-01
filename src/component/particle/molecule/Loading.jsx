import { motion } from "framer-motion";

const Loading = ({ ratio = 'text-4xl' }) => (
  <div className={`${ratio} flex items-center justify-center`}>
    <motion.i
      className={`bi-arrow-repeat inline-block`}
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
  </div>
);

export default Loading;
