import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-white)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-secondary)] mb-4"></div>
            <p className="text-[var(--fourground-color)] text-lg">Loading payment info...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessClient />
      
    </Suspense>
  );
}
