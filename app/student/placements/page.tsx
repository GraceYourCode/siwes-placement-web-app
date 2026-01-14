"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Calendar,
  FileText,
  Upload,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { FormSelect } from "@/components/forms/form-select";
import { FormDatePicker } from "@/components/forms/form-datepicker";
import { FormInput } from "@/components/forms/form-input";
import { FileUpload } from "@/components/forms/file-upload";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface Company {
  id: string;
  name: string;
  address: string;
  city: string | null;
  state: string | null;
}

export default function Placement() {
  const profile = {
    email: "me@mail.com",
    full_name: "Tofunmi Balogun",
  };
  const { placement, hasActivePlacement, isPlacementVerified } = {
    placement: {
      id: 1,
      start_date: new Date().toDateString(),
      end_date: new Date().toDateString(),
      status: "verified" as const,
      position: "Thief",
      company: "Shell",
    },
    hasActivePlacement: true,
    isPlacementVerified: true,
  };

  const [companies, setCompanies] = useState<Company[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showNewCompanyDialog, setShowNewCompanyDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [placementForm, setPlacementForm] = useState({
    company_id: "",
    start_date: undefined as Date | undefined,
    end_date: undefined as Date | undefined,
    position: "",
    department: "",
    letter_url: "",
  });

  const [newCompany, setNewCompany] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });

  // Calculate placement progress
  const getPlacementProgress = () => {
    if (!placement) return 0;
    const start = new Date(placement.start_date);
    const end = new Date(placement.end_date);
    const now = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  //   if (loading) {
  //     return (
  //       <DashboardLayout role="student" userName={profile?.full_name} userEmail={profile?.email}>
  //         <LoadingState message="Loading placement details..." />
  //       </DashboardLayout>
  //     );
  //   }

  return (
    <DashboardLayout
      role="student"
      userName={profile?.full_name}
      userEmail={profile?.email}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-heading-1">My Placement</h1>
            <p className="text-muted-foreground">
              Manage your internship placement details
            </p>
          </div>
          {!hasActivePlacement && (
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Placement
            </Button>
          )}
        </div>

        {!hasActivePlacement ? (
          <EmptyState
            icon={Building2}
            title="No Active Placement"
            description="Add your placement details to start tracking your internship progress and logging activities."
            action={{
              label: "Add Placement",
              onClick: () => setShowAddDialog(true),
            }}
          />
        ) : (
          placement && (
            <>
              {/* Status Banner */}
              {!isPlacementVerified && (
                <Card className="border-warning bg-warning/5">
                  <CardContent className="flex items-center gap-4 py-4">
                    <AlertCircle className="w-8 h-8 text-warning shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold">Pending Verification</h3>
                      <p className="text-sm text-muted-foreground">
                        Your placement is awaiting verification from your
                        institution supervisor. Upload your signed placement
                        letter to speed up the process.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Placement Details */}
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Placement Details
                      </span>
                      <StatusBadge status={placement.status} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {placement.company}
                        </h3>
                        <p className="text-muted-foreground">
                          {placement?.position || "Intern"}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {/* {placement.company?.address} */}
                          Some where on earth
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Start Date
                        </p>
                        <p className="font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {format(
                            new Date(placement.start_date),
                            "MMMM d, yyyy"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          End Date
                        </p>
                        <p className="font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(placement.end_date), "MMMM d, yyyy")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Department
                        </p>
                        <p className="font-medium">
                          {/* {placement.department || "Not specified"} */}
                          {"Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Duration
                        </p>
                        <p className="font-medium">
                          {Math.ceil(
                            (new Date(placement.end_date).getTime() -
                              new Date(placement.start_date).getTime()) /
                              (1000 * 60 * 60 * 24 * 7)
                          )}{" "}
                          weeks
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Placement Progress
                        </span>
                        <span className="font-medium">
                          {Math.round(getPlacementProgress())}%
                        </span>
                      </div>
                      <Progress
                        value={getPlacementProgress()}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {/* Placement Letter */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <FileText className="w-5 h-5" />
                        Placement Letter
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {false ? (
                        <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Letter Uploaded
                            </p>
                            <a
                              href={placement.company}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline"
                            >
                              View Document
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-3">
                            Upload your signed placement letter
                          </p>
                          <Button variant="outline" size="sm">
                            Upload Letter
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Supervisor Info */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <User className="w-5 h-5" />
                        Assigned Supervisor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {false ? (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Supervisor Name</p>
                            <p className="text-sm text-muted-foreground">
                              Institution Supervisor
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            A supervisor will be assigned after verification
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )
        )}

        {/* Add Placement Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-150 bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Placement Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <FormSelect
                    label="Company"
                    placeholder="Select a company"
                    options={companies.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                    value={placementForm.company_id}
                    onValueChange={(value) =>
                      setPlacementForm({ ...placementForm, company_id: value })
                    }
                    required
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowNewCompanyDialog(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormDatePicker
                  label="Start Date"
                  value={placementForm.start_date}
                  onChange={(date) =>
                    setPlacementForm({ ...placementForm, start_date: date })
                  }
                  required
                />
                <FormDatePicker
                  label="End Date"
                  value={placementForm.end_date}
                  onChange={(date) =>
                    setPlacementForm({ ...placementForm, end_date: date })
                  }
                  minDate={placementForm.start_date}
                  required
                />
              </div>

              <FormInput
                label="Position"
                placeholder="e.g., Software Engineering Intern"
                value={placementForm.position}
                onChange={(e) =>
                  setPlacementForm({
                    ...placementForm,
                    position: e.target.value,
                  })
                }
              />

              <FormInput
                label="Department"
                placeholder="e.g., Engineering"
                value={placementForm.department}
                onChange={(e) =>
                  setPlacementForm({
                    ...placementForm,
                    department: e.target.value,
                  })
                }
              />

              <FileUpload
                label="Placement Letter (Optional)"
                hint="Upload your signed placement/acceptance letter"
                accept=".pdf,.doc,.docx"
                value={placementForm.letter_url}
                onChange={(url) =>
                  setPlacementForm({ ...placementForm, letter_url: url || "" })
                }
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button
                disabled={
                  submitting ||
                  !placementForm.company_id ||
                  !placementForm.start_date ||
                  !placementForm.end_date
                }
              >
                {submitting ? "Submitting..." : "Submit Placement"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add New Company Dialog */}
        <Dialog
          open={showNewCompanyDialog}
          onOpenChange={setShowNewCompanyDialog}
        >
          <DialogContent className="sm:max-w-125 bg-card">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FormInput
                label="Company Name"
                placeholder="e.g., Acme Corporation"
                value={newCompany.name}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, name: e.target.value })
                }
                required
              />
              <FormInput
                label="Address"
                placeholder="Full address"
                value={newCompany.address}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, address: e.target.value })
                }
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="City"
                  placeholder="City"
                  value={newCompany.city}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, city: e.target.value })
                  }
                />
                <FormInput
                  label="State"
                  placeholder="State"
                  value={newCompany.state}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, state: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Phone"
                  type="tel"
                  placeholder="Phone number"
                  value={newCompany.phone}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, phone: e.target.value })
                  }
                />
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="Email address"
                  value={newCompany.email}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, email: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewCompanyDialog(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={submitting || !newCompany.name || !newCompany.address}
              >
                {submitting ? "Adding..." : "Add Company"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
