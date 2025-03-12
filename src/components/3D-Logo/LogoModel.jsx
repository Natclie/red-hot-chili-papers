import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function LogoModel() {
    const group = useRef();
    const { scene } = useGLTF('/rhcp.glb');

    useFrame(() => {
        if (group.current) {
            group.current.rotation.x += 0.01;
        }
    });

    return <primitive object={scene} ref={group} scale={[88, 88, 88]} position={[0, 0, 0]} />;
}
