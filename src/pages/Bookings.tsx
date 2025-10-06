import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, CheckCircle, XCircle, Edit, Eye, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "confirmed" | "checked-in" | "checked-out">("all");

  const bookings = [
    {
      id: "BK-001",
      guestName: "Dr. Ahmed Rahman",
      checkIn: "2025-01-15",
      checkOut: "2025-01-18",
      status: "confirmed",
      room: "Room-201",
      phone: "+880 1712-345678"
    },
    {
      id: "BK-002",
      guestName: "Ms. Fatima Khan",
      checkIn: "2025-01-16",
      checkOut: "2025-01-17",
      status: "pending",
      room: "Not Assigned",
      phone: "+880 1812-345678"
    },
    {
      id: "BK-003",
      guestName: "Prof. Hasan Mahmud",
      checkIn: "2025-01-10",
      checkOut: "2025-01-15",
      status: "checked-in",
      room: "Room-103",
      phone: "+880 1912-345678"
    },
    {
      id: "BK-004",
      guestName: "Dr. Sultana Begum",
      checkIn: "2025-01-12",
      checkOut: "2025-01-15",
      status: "checked-in",
      room: "Room-202",
      phone: "+880 1612-345678"
    },
    {
      id: "BK-005",
      guestName: "Mr. Karim Ali",
      checkIn: "2025-01-17",
      checkOut: "2025-01-19",
      status: "pending",
      room: "Not Assigned",
      phone: "+880 1512-345678"
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: any }> = {
      pending: { variant: "secondary", icon: AlertCircle },
      confirmed: { variant: "default", icon: CheckCircle },
      "checked-in": { variant: "default", icon: CheckCircle },
      "checked-out": { variant: "outline", icon: CheckCircle },
    };

    const config = statusConfig[status] || { variant: "secondary" as const, icon: AlertCircle };
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const handleAction = (action: string, bookingId: string) => {
    toast.success(`${action} action performed for ${bookingId}`);
  };

  const filteredBookings = activeTab === "all" ? bookings : bookings.filter(b => b.status === activeTab);
  const pendingBookings = bookings.filter(b => b.status === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Booking Management</h2>
        <p className="text-muted-foreground">Manage all bookings and pending requests</p>
      </div>

      {/* Search Bar */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by guest name, booking ID, or phone number..."
                className="pl-10"
              />
            </div>
            <Button className="gradient-primary">Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Requests Section */}
      {pendingBookings.length > 0 && (
        <Card className="shadow-elevated border-warning/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertCircle className="w-5 h-5" />
              Pending Booking Requests ({pendingBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{booking.guestName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.checkIn} to {booking.checkOut} • {booking.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="gradient-accent" onClick={() => handleAction("Assign Room", booking.id)}>
                    Assign Room
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "all" as const, label: "All Bookings" },
          { key: "pending" as const, label: "Pending" },
          { key: "confirmed" as const, label: "Confirmed" },
          { key: "checked-in" as const, label: "Checked In" },
          { key: "checked-out" as const, label: "Checked Out" },
        ].map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "outline"}
            onClick={() => setActiveTab(tab.key)}
            className={activeTab === tab.key ? "gradient-primary" : ""}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Bookings Table */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle>
            {activeTab === "all" ? "All Bookings" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Bookings`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.guestName}</TableCell>
                  <TableCell>{booking.checkIn}</TableCell>
                  <TableCell>{booking.checkOut}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <Badge variant={booking.room === "Not Assigned" ? "secondary" : "outline"}>
                      {booking.room}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleAction("View", booking.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAction("Edit", booking.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      {booking.status === "confirmed" && (
                        <Button size="sm" className="gradient-primary" onClick={() => handleAction("Check-in", booking.id)}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Check-in
                        </Button>
                      )}
                      {booking.status === "checked-in" && (
                        <Button size="sm" variant="outline" onClick={() => handleAction("Check-out", booking.id)}>
                          <XCircle className="w-4 h-4 mr-1" />
                          Check-out
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
