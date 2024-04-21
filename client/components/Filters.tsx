import { motion } from 'framer-motion'
import React from 'react'

const Filters = ({ state }: { state: boolean }) => (
  <motion.aside initial={{ width: 0 }} animate={{ width: state ? 280 : 0 }}>
    filters
  </motion.aside>
)

export default Filters
