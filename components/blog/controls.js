'use client';

import { useRouter } from 'next/navigation';

export default function PaginationControls({ currentPage, totalPages }) {
  const router = useRouter();

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      router.push(`/blog/page/${page}`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
