import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h2>
        <p className="text-muted-foreground">View financial reports, occupancy rates, and guest statistics</p>
      </div>

      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Reports Module
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Reports functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
