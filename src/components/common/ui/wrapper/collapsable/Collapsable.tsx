import { motion } from "framer-motion"
import { ReactNode } from "react"


export default function Collapsable({
    isOpen,
    children,
} : {
    isOpen : boolean
    children : ReactNode
}){
    return (
        <motion.div animate={{height: isOpen ? 'auto' : 0}} style={{overflow:'hidden'}}>
            {children}
        </motion.div>
    )
}