import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar } from "lucide-react";

export default function Conference() {
  const halls = [
    { id: "A", name: "Hall A", capacity: 100, status: "available" },
    { id: "B", name: "Hall B", capacity: 50, status: "occupied", booking: "Government Meeting - 10:00 AM to 2:00 PM" },
    { id: "C", name: "Hall C", capacity: 30, status: "reserved", booking: "Training Session - 3:00 PM to 5:00 PM" },
  ];

  const upcomingBookings = [
    { id: 1, hall: "Hall B", date: "2025-01-15", time: "10:00 AM - 2:00 PM", organizer: "Admin Department", guests: 75 },
    { id: 2, hall: "Hall C", date: "2025-01-15", time: "3:00 PM - 5:00 PM", organizer: "HR Department", guests: 25 },
    { id: 3, hall: "Hall A", date: "2025-01-16", time: "9:00 AM - 12:00 PM", organizer: "Finance Department", guests: 80 },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      available: "bg-success/20 text-success border-success/30",
      occupied: "bg-destructive/20 text-destructive border-destructive/30",
      reserved: "bg-warning/20 text-warning border-warning/30",
    };
    return colors[status] || "";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      available: "Available",
      occupied: "In Use",
      reserved: "Reserved",
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Conference Hall Management</h2>
        <p className="text-muted-foreground">Manage conference hall bookings and availability</p>
      </div>

      {/* Hall Status */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Conference Halls Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {halls.map((hall) => (
              <Card
                key={hall.id}
                className={`transition-smooth hover:shadow-elevated ${getStatusColor(hall.status)} border-2`}
              >
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold mb-2">{hall.name}</div>
                    <Badge variant="outline" className="mb-2">
                      {getStatusLabel(hall.status)}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Capacity: {hall.capacity} persons
                    </p>
                  </div>
                  {hall.booking && (
                    <div className="mt-4 p-3 bg-background/50 rounded-lg">
                      <p className="text-xs font-medium">{hall.booking}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Conference Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-4 rounded-lg bg-secondary hover:shadow-md transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="gradient-primary">{booking.hall}</Badge>
                      <span className="text-sm font-medium text-foreground">{booking.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{booking.time}</p>
                    <p className="text-sm font-medium text-foreground">{booking.organizer}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{booking.guests}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Guests</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
