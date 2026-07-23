"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 250);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <Button variant="secondary" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
}
