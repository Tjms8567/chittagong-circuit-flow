import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  gradient?: boolean;
}

export default function StatCard({ title, value, icon: Icon, trend, gradient }: StatCardProps) {
  return (
    <Card className={`transition-smooth hover:shadow-elevated ${gradient ? "gradient-primary text-primary-foreground border-0" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className={`text-sm font-medium ${gradient ? "text-primary-foreground" : "text-muted-foreground"}`}>
          {title}
        </CardTitle>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${gradient ? "bg-white/20" : "bg-secondary"}`}>
          <Icon className={`w-5 h-5 ${gradient ? "text-primary-foreground" : "text-primary"}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs mt-1 ${gradient ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            <span className={trend.positive ? "text-success" : "text-destructive"}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
            {" "}from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
