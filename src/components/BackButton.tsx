'use client';
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter();

  const exit = () => {
    router.back();
  };
  return (
    <button className="back-btn reload-btn btn" onClick={exit}>
      Back
    </button>
  );
};

export default BackButton;
