import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

export function BildTausch(images) {
  return ({ imageIndex }) => {
    const [showSpecialImage, setShowSpecialImage] = useState(true);

    useEffect(() => {
      // Starten Sie den Timer, um das Bild alle 1,5 Sekunden zu wechseln
      const timer = setInterval(() => {
        setShowSpecialImage((prevShowSpecialImage) => !prevShowSpecialImage);
      }, 1500);

      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <Image
        source={images[imageIndex][showSpecialImage ? 'specialImage' : 'primaryImage']}
        style={{ width: 230, height: 230, borderRadius: 10, marginBottom: 10 }} />
    );
  };
}
