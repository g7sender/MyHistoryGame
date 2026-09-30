// props משותפים למעבר קל בין מסכים (Story→Challenge→Board וכו') - מפוזרים ישירות
// על ה-motion.div שהוא כבר האלמנט השורש של כל מסך, כדי לא להוסיף עטיפת DOM
// נוספת שתשבור שרשרת min-h-full/flex-1 הקיימת.
export const pageTransition = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
  transition: { duration: 0.2, ease: 'easeOut' },
}
