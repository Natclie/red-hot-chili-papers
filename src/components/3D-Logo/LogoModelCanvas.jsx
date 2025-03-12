import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { LogoModel } from './LogoModel';

export function LogoModelCanvas({ className }) {
    return (
        <div className={` relative w-[70px] h-[70px] ${className}`}>
            <Canvas className='drop-shadow-xl'
                style={{ width: "100%", height: "100%" }}
                camera={{
                    position: [15, 1, 0],
                    fov: 45,
                    near: 0.1,
                    far: 20
                }}>
                <ambientLight intensity={4} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, -5, -5]} intensity={1} />
                <pointLight position={[0, 5, 0]} intensity={1} />
                <LogoModel />
                <OrbitControls enableZoom={false} enablePan={true} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
            </Canvas>
        </div>
    );
}
