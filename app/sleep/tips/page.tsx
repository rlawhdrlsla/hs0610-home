export const dynamic = 'force-dynamic';
import Header from "@/components/sleep/layout/Header";
import BottomNav from "@/components/sleep/layout/BottomNav";
import TipsContent from "./TipsContent";

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TipsContent />
      <BottomNav />
    </div>
  );
}
