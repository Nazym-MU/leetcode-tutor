import react, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState({ x: 5, y: 5 });

    useEffect(() => {
        const animationFrame = requestAnimationFrame(function animate() {
          setPosition(prevPos => {
            let newPos = { x: prevPos.x + velocity.x, y: prevPos.y + velocity.y };
            let newVelocity = { ...velocity };
    
            if (newPos.x <= 0 || newPos.x >= window.innerWidth - 200) newVelocity.x *= -1;
            if (newPos.y <= 0 || newPos.y >= window.innerHeight - 50) newVelocity.y *= -1;
    
            setVelocity(newVelocity);
            return newPos;
          });
    
          requestAnimationFrame(animate);
        });
    
        return () => cancelAnimationFrame(animationFrame);
      }, []);

      return (
        <div className="h-screen w-screen bg-gray-100 flex items-center justify-center overflow-hidden">
          <motion.div
            className="text-4xl font-bold text-blue-500"
            animate={position}
            transition={{ type: 'tween', duration: 0 }}
          >
            Coming Soon
          </motion.div>
        </div>
      );
    };

export default ComingSoon;