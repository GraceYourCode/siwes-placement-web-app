const departmentStats = [
  { name: "Computer Science", students: 320, placed: 298, rate: 93 },
  { name: "Engineering", students: 280, placed: 245, rate: 88 },
  { name: "Accounting", students: 210, placed: 178, rate: 85 },
  { name: "Business Admin", students: 185, placed: 142, rate: 77 },
  { name: "Pharmacy", students: 140, placed: 129, rate: 92 },
];

export default function DepartmentalStats() {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-heading-3">Placement by Department</h3>
      </div>
      <div className="divide-y divide-border/50">
        {departmentStats.map((dept) => (
          <div key={dept.name} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-body">{dept.name}</span>
              <span className="text-caption text-muted-foreground">
                {dept.placed}/{dept.students}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${dept.rate}%` }}
                />
              </div>
              <span className="text-caption font-medium w-10 text-right">
                {dept.rate}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
