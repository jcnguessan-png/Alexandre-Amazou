import React from 'react';
import { Composition } from 'remotion';
import { FPS } from './theme';
import { Promo16x9, Promo9x16, PROMO_16x9_SECONDS, PROMO_9x16_SECONDS } from './Promo';

export const Root: React.FC = () => (
  <>
    <Composition
      id="Promo16x9"
      component={Promo16x9}
      durationInFrames={PROMO_16x9_SECONDS * FPS}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="Promo9x16"
      component={Promo9x16}
      durationInFrames={PROMO_9x16_SECONDS * FPS}
      fps={FPS}
      width={1080}
      height={1920}
    />
  </>
);
