import { LazyMotion, domAnimation, m } from "framer-motion"

export const MyImage = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)