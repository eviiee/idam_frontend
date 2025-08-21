import { motion } from "framer-motion"
import { ReactNode } from "react"


export default function Collapsable({
    isOpen,
    children,
    initiallyCollapsed = false,
} : {
    isOpen : boolean
    children : ReactNode
    initiallyCollapsed?: boolean
}){
    return (
        <motion.div initial={{height: initiallyCollapsed ? 0 : 'auto'}} animate={{height: isOpen ? 'auto' : 0}} style={{overflow:'hidden'}}>
            {children}
        </motion.div>
    )
}