import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Save, Users, Building2 } from "lucide-react";
import { toast } from "sonner";

export default function NewBooking() {
  const [conferenceBooking, setConferenceBooking] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const rooms = [
    "Room-101", "Room-102", "Room-103", "Room-104", "Room-105",
    "Room-201", "Room-202", "Room-203", "Room-204", "Room-205"
  ];

  const conferenceHalls = ["Hall A", "Hall B", "Hall C"];

  const handleRoomToggle = (room: string) => {
    setSelectedRooms(prev =>
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking request saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">New Booking Request</h2>
        <p className="text-muted-foreground">Create a new booking for guests or visitors</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Guest Information */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitorName">Visitor Name *</Label>
                  <Input id="visitorName" placeholder="Enter full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNo">ID No *</Label>
                  <Input id="idNo" placeholder="Enter ID number" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" placeholder="Enter phone number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="Enter designation" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department/Office</Label>
                <Input id="department" placeholder="Enter department or office" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose *</Label>
                <Textarea id="purpose" placeholder="State the purpose of visit" required />
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkInDate">Check-in Date *</Label>
                  <Input id="checkInDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkInTime">Check-in Time *</Label>
                  <Input id="checkInTime" type="time" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkOutDate">Check-out Date *</Label>
                  <Input id="checkOutDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOutTime">Check-out Time *</Label>
                  <Input id="checkOutTime" type="time" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestQuantity">Guest Quantity *</Label>
                <Input id="guestQuantity" type="number" min="1" defaultValue="1" required />
              </div>
            </CardContent>
          </Card>

          {/* Room Selection */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Room Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select rooms for assignment. If no room is selected, this will be saved as a pending request.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {rooms.map((room) => (
                    <div key={room} className="flex items-center space-x-2">
                      <Checkbox
                        id={room}
                        checked={selectedRooms.includes(room)}
                        onCheckedChange={() => handleRoomToggle(room)}
                      />
                      <label
                        htmlFor={room}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {room}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conference Booking */}
          <Card className="shadow-elevated">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="conferenceBooking"
                  checked={conferenceBooking}
                  onCheckedChange={(checked) => setConferenceBooking(checked as boolean)}
                />
                <CardTitle className="flex items-center gap-2 cursor-pointer">
                  <label htmlFor="conferenceBooking" className="cursor-pointer">
                    Add Conference Hall Booking
                  </label>
                </CardTitle>
              </div>
            </CardHeader>
            {conferenceBooking && (
              <CardContent className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="conferenceHall">Conference Hall *</Label>
                  <select
                    id="conferenceHall"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a hall</option>
                    {conferenceHalls.map((hall) => (
                      <option key={hall} value={hall}>{hall}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="confDate">Conference Date *</Label>
                    <Input id="confDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confTime">Time (Start - End) *</Label>
                    <Input id="confTime" placeholder="e.g., 10:00 AM - 2:00 PM" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedGuests">Estimated Guests</Label>
                  <Input id="estimatedGuests" type="number" min="1" placeholder="Number of attendees" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedFood">Estimated Food Requirements</Label>
                  <Input id="estimatedFood" placeholder="e.g., Tea-50, Lunch-50, Snacks-50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confNotes">Conference Notes</Label>
                  <Textarea id="confNotes" placeholder="e.g., Projector needed, VIP guest" />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Additional Notes */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>Additional Notes & Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter any additional requests (e.g., Food arrangements, Extra guests, Car service, Late checkout)"
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button type="submit" className="w-full md:w-auto gradient-accent hover:opacity-90 transition-smooth shadow-md text-lg py-6">
            <Save className="w-5 h-5 mr-2" />
            Save Booking Request
          </Button>
        </div>
      </form>
    </div>
  );
}
