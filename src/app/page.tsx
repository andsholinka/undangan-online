import { Suspense } from 'react';
import WeddingInvitation from '@/components/WeddingInvitation';

export default function Home() {
  return (
    <Suspense fallback={<div />}>
      <WeddingInvitation />
    </Suspense>
  );
}
