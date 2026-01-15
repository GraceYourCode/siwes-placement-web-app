import React from "react";
import { DemoStudent } from "../type";
import { Building2, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function PlacementInfo({
  demoStudent,
}: {
  demoStudent: DemoStudent;
}) {
  return (
    <div className="card-elevated p-4 space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <Building2 className="w-4 h-4" />
        Placement Details
      </h3>
      <div className="space-y-2 text-sm">
        <p className="font-medium">{demoStudent.company}</p>
        <p className="text-muted-foreground">{demoStudent.position}</p>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {demoStudent.companyAddress}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>
            {format(new Date(demoStudent.startDate), "MMM d")} -{" "}
            {format(new Date(demoStudent.endDate), "MMM d, yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
}
