"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Plus, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SalesmanData } from "@/types/kpi";
import { createSalesmanData } from "@/lib/kpi-data-logic";

interface SalesmenListProps {
  salesmen: SalesmanData[] | null;
  isLoading: boolean;
  error: string | null;
  selectedSalesmen: string[];
  onSalesmanToggle: (salesmanName: string) => void;
  onSalesmenUpdate: (salesmen: SalesmanData[]) => void;
}

export function SalesmenList({ 
  salesmen, 
  isLoading, 
  error, 
  selectedSalesmen, 
  onSalesmanToggle,
  onSalesmenUpdate 
}: SalesmenListProps) {
  const router = useRouter();
  const [createLoading, setCreateLoading] = useState(false);
  const [newSalesmanName, setNewSalesmanName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreateSalesman = async () => {
    if (!newSalesmanName.trim()) return;

    try {
      setCreateLoading(true);
      setCreateError(null);
      const newSalesman = await createSalesmanData(newSalesmanName.trim());
      
      const updatedSalesmen = [...(salesmen || []), newSalesman];
      onSalesmenUpdate(updatedSalesmen);
      
      setNewSalesmanName("");
      setDialogOpen(false);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Error creating salesman');
    } finally {
      setCreateLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Sales Team
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Loading salesmen...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-2">
            <p className="text-destructive font-medium">Error</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Team</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Total: {salesmen?.length || 0} salesmen
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Salesman</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter salesman name"
                    value={newSalesmanName}
                    onChange={(e) => setNewSalesmanName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateSalesman();
                      }
                    }}
                  />
                </div>
                {createError && (
                  <p className="text-sm text-destructive">{createError}</p>
                )}
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCreateSalesman}
                    disabled={createLoading || !newSalesmanName.trim()}
                    className="flex-1"
                  >
                    {createLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      'Create Salesman'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      setNewSalesmanName("");
                      setCreateError(null);
                    }}
                    disabled={createLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {salesmen && salesmen.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {salesmen
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((salesman) => {
                const isSelected = selectedSalesmen.includes(salesman.name);
                return (
                  <div
                    key={salesman.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
                      isSelected ? 'bg-primary/10 border-primary' : 'border-border'
                    }`}
                  >
                    <div 
                      className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                      onClick={() => onSalesmanToggle(salesman.name)}
                    >
                      <User className="h-4 w-4" />
                    </div>
                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => onSalesmanToggle(salesman.name)}
                    >
                      <p className={`font-medium truncate ${isSelected ? 'text-primary' : ''}`}>
                        {salesman.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created: {formatDate(salesman.createdAt)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/sellers/${salesman.id}`);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <User className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <p className="font-medium">No salesmen found</p>
              <p className="text-sm text-muted-foreground">Add your first salesman to get started</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
