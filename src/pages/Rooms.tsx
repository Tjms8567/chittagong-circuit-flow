import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

export default function Rooms() {
  const rooms = [
    { id: "101", floor: "Ground", status: "available" },
    { id: "102", floor: "Ground", status: "occupied", guest: "Dr. Ahmed" },
    { id: "103", floor: "Ground", status: "occupied", guest: "Prof. Hasan" },
    { id: "104", floor: "Ground", status: "cleaning" },
    { id: "105", floor: "Ground", status: "reserved", guest: "Ms. Fatima" },
    { id: "201", floor: "First", status: "occupied", guest: "Dr. Rahman" },
    { id: "202", floor: "First", status: "occupied", guest: "Dr. Sultana" },
    { id: "203", floor: "First", status: "available" },
    { id: "204", floor: "First", status: "available" },
    { id: "205", floor: "First", status: "cleaning" },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      available: "bg-success/20 text-success border-success/30",
      occupied: "bg-destructive/20 text-destructive border-destructive/30",
      reserved: "bg-warning/20 text-warning border-warning/30",
      cleaning: "bg-info/20 text-info border-info/30",
    };
    return colors[status] || "";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      available: "Available",
      occupied: "Occupied",
      reserved: "Reserved",
      cleaning: "Needs Cleaning",
    };
    return labels[status] || status;
  };

  const groundFloorRooms = rooms.filter(r => r.floor === "Ground");
  const firstFloorRooms = rooms.filter(r => r.floor === "First");

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === "available").length,
    occupied: rooms.filter(r => r.status === "occupied").length,
    reserved: rooms.filter(r => r.status === "reserved").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Room Management</h2>
        <p className="text-muted-foreground">Visual overview of all rooms and their status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-90">Total Rooms</div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/30">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-success">{stats.available}</div>
            <div className="text-sm text-success/80">Available</div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/30">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-destructive">{stats.occupied}</div>
            <div className="text-sm text-destructive/80">Occupied</div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/30">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-warning">{stats.reserved}</div>
            <div className="text-sm text-warning/80">Reserved</div>
          </CardContent>
        </Card>
      </div>

      {/* Ground Floor */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Ground Floor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {groundFloorRooms.map((room) => (
              <Card
                key={room.id}
                className={`cursor-pointer transition-smooth hover:shadow-elevated ${getStatusColor(room.status)} border-2`}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold mb-2">Room {room.id}</div>
                  <Badge variant="outline" className="mb-2">
                    {getStatusLabel(room.status)}
                  </Badge>
                  {room.guest && (
                    <p className="text-xs mt-2 font-medium">{room.guest}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* First Floor */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            First Floor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {firstFloorRooms.map((room) => (
              <Card
                key={room.id}
                className={`cursor-pointer transition-smooth hover:shadow-elevated ${getStatusColor(room.status)} border-2`}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold mb-2">Room {room.id}</div>
                  <Badge variant="outline" className="mb-2">
                    {getStatusLabel(room.status)}
                  </Badge>
                  {room.guest && (
                    <p className="text-xs mt-2 font-medium">{room.guest}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
