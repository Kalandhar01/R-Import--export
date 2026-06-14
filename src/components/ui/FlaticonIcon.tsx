import { cn } from "@/lib/utils";

interface FlaticonIconProps {
  icon: string;
  className?: string;
}

export default function FlaticonIcon({ icon, className }: FlaticonIconProps) {
  return <span className={cn("fi", icon, className)} />;
}
