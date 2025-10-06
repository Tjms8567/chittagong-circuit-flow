import { Building2, Calendar, Users, Clock, AlertCircle, CheckCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const upcomingArrivals = [
    { id: 1, name: "Dr. Ahmed Rahman", room: "Room-201", time: "10:00 AM", status: "confirmed" },
    { id: 2, name: "Ms. Fatima Khan", room: "Room-105", time: "2:30 PM", status: "confirmed" },
    { id: 3, name: "Mr. Karim Ali", room: "Pending", time: "4:00 PM", status: "pending" },
  ];

  const upcomingDepartures = [
    { id: 1, name: "Prof. Hasan Mahmud", room: "Room-103", time: "11:00 AM" },
    { id: 2, name: "Dr. Sultana Begum", room: "Room-202", time: "3:00 PM" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Real-time statistics and upcoming events</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Occupied Rooms"
          value="18 / 24"
          icon={Building2}
          trend={{ value: "12%", positive: true }}
          gradient
        />
        <StatCard
          title="Today's Check-ins"
          value="8"
          icon={Calendar}
          trend={{ value: "5%", positive: true }}
        />
        <StatCard
          title="Current Guests"
          value="42"
          icon={Users}
        />
        <StatCard
          title="Pending Requests"
          value="6"
          icon={AlertCircle}
        />
      </div>

      {/* Occupancy Chart */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="text-xl">Weekly Occupancy Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => {
              const occupancy = Math.floor(Math.random() * 40) + 60; // 60-100%
              return (
                <div key={day}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{day}</span>
                    <span className="text-sm text-muted-foreground">{occupancy}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary transition-smooth"
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arrivals */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Arrivals (Next 24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingArrivals.map((arrival) => (
                <div key={arrival.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:shadow-md transition-smooth">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-accent rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{arrival.name}</p>
                      <p className="text-sm text-muted-foreground">{arrival.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{arrival.time}</p>
                    <Badge variant={arrival.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                      {arrival.status === "confirmed" ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                      {arrival.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Departures */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Departures (Next 24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDepartures.map((departure) => (
                <div key={departure.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:shadow-md transition-smooth">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{departure.name}</p>
                      <p className="text-sm text-muted-foreground">{departure.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{departure.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
