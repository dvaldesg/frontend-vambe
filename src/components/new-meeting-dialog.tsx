"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Calendar, User, Phone, Mail, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { salesmanService, clientMeetingService } from "@/services/api-services";
import { CreateClientMeetingRequest } from "@/types/client-meeting";
import { useKpiStore } from "@/stores/kpi-store";

interface NewMeetingDialogProps {
  children: React.ReactNode;
}

interface MeetingFormData {
  name: string;
  email: string;
  phone: string;
  salesmanId: string;
  date: string;
  closed: boolean;
  transcription: string;
}

export function NewMeetingDialog({ children }: NewMeetingDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { salesmen, setSalesmen } = useKpiStore();
  
  const [formData, setFormData] = useState<MeetingFormData>({
    name: "",
    email: "",
    phone: "",
    salesmanId: "",
    date: "",
    closed: false,
    transcription: "",
  });

  useEffect(() => {
    if (open && !salesmen) {
      loadSalesmen();
    }
  }, [open, salesmen]);

  const loadSalesmen = async () => {
    try {
      const salesmenData = await salesmanService.getAllSalesmen();
      setSalesmen(salesmenData);
    } catch (error) {
      console.error('Failed to load salesmen:', error);
    }
  };

  const handleInputChange = (field: keyof MeetingFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Client name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.phone.trim()) return "Phone is required";
    if (!formData.salesmanId) return "Salesman is required";
    if (!formData.date) return "Meeting date is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email";
    
    return null;
  };

  const handleSubmit = async () => {
    const validation = validateForm();
    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedSalesman = salesmen?.find(s => s.id.toString() === formData.salesmanId);
      if (!selectedSalesman) {
        throw new Error('Selected salesman not found');
      }

      const apiData: CreateClientMeetingRequest = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        salesmanName: selectedSalesman.name,
        date: formData.date,
        closed: formData.closed,
        transcription: formData.transcription.trim(),
      };

      await clientMeetingService.createClientMeeting(apiData);
      
      setSuccess(true);
      
      setTimeout(() => {
        setOpen(false);
        router.refresh();
        resetForm();
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to create meeting');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      salesmanId: "",
      date: "",
      closed: false,
      transcription: "",
    });
    setError(null);
    setSuccess(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!loading) {
      setOpen(isOpen);
      if (!isOpen) {
        resetForm();
      }
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Meeting Information</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Client Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Client Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter client name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="client@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salesman">Salesman *</Label>
                  <Select 
                    value={formData.salesmanId} 
                    onValueChange={(value) => handleInputChange("salesmanId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a salesman" />
                    </SelectTrigger>
                    <SelectContent>
                      {salesmen?.map((salesman) => (
                        <SelectItem key={salesman.id} value={salesman.id.toString()}>
                          {salesman.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Meeting Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Meeting Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="closed" className="flex items-center space-x-2">
                    <span>Meeting Status</span>
                  </Label>
                  <div className="flex items-center space-x-2 pt-1">
                    <Switch
                      id="closed"
                      checked={formData.closed}
                      onCheckedChange={(value) => handleInputChange("closed", value)}
                    />
                    <span className="text-sm">
                      {formData.closed ? "Closed (true)" : "Not closed (false)"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transcription">Meeting Transcription</Label>
                <Textarea
                  id="transcription"
                  placeholder="Add a transcription with information about the meeting..."
                  value={formData.transcription}
                  onChange={(e) => handleInputChange("transcription", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>
                Meeting created successfully! The page will refresh shortly...
              </AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-2">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Meeting
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
