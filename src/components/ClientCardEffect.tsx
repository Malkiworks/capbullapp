'use client';

import { use3DCardEffect } from '@/hooks/use3DCardEffect';

export default function ClientCardEffect() {
  // Apply the 3D card effect
  use3DCardEffect();
  
  // This component doesn't render anything, it just applies the effect
  return null;
} 