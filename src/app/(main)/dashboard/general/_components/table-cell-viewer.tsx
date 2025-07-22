import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

import { sectionSchema } from "./schema";

export function TableCellViewer({ item }: { item: z.infer<typeof sectionSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>Client information and interaction details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Contact Information</Label>
              <div className="space-y-2 text-sm">
                <div><span className="text-muted-foreground">Email:</span> {item.email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {item.phone}</div>
                <div><span className="text-muted-foreground">Salesman:</span> {item.salesmanName}</div>
                <div><span className="text-muted-foreground">Date:</span> {new Date(item.date).toLocaleDateString("es-CL")}</div>
                <div><span className="text-muted-foreground">Status:</span> 
                  <Badge 
                    variant={item.closed ? "default" : "secondary"} 
                    className={`ml-2 ${item.closed ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600 text-white"}`}
                  >
                    {item.closed ? "Closed" : "Not Closed"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium">Transcription</Label>
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md max-h-32 overflow-y-auto">
                {item.transcription}
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}