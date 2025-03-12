import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function PicanteModel() {
    const group = useRef();
    const { scene } = useGLTF('/rotgc.glb');

    useFrame(() => {
        if (group.current) {
        }
    });

    return <primitive object={scene} ref={group} scale={[10, 10, 10]} position={[0, -5.5, 0]} />;
}