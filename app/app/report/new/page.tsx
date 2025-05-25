"use client";
import dynamic from 'next/dynamic';

const ReportPage = dynamic(() => import('@/components/Report'), { ssr: false });

export default function NewReportPage() {
  return <ReportPage />;
}
