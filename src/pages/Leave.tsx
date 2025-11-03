import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLeaveStore } from '@/stores/leaveStore';
import { format } from 'date-fns';
import { PlusIcon, CheckIcon, XIcon, ClockIcon, CalendarDaysIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Leave() {
  const leaveRequests = useLeaveStore((state) => state.leaveRequests);
  const setLeaveModalOpen = useLeaveStore((state) => state.setLeaveModalOpen);
  const updateLeaveStatus = useLeaveStore((state) => state.updateLeaveStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'vacation':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'sick':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'personal':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'unpaid':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const totalLeaves = leaveRequests.length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'pending').length;
  const approvedLeaves = leaveRequests.filter((l) => l.status === 'approved').length;
  const totalDays = leaveRequests
    .filter((l) => l.status === 'approved')
    .reduce((acc, l) => acc + l.days, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-h1 font-sans text-foreground">Leave Management</h1>
        <Button
          onClick={() => setLeaveModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Request Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-small font-sans-alt font-normal text-muted-foreground">
              Total Requests
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <CalendarDaysIcon className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-h1 font-sans text-foreground">{totalLeaves}</div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-small font-sans-alt font-normal text-muted-foreground">
              Pending
            </CardTitle>
            <div className="p-2 rounded-lg bg-warning/10">
              <ClockIcon className="w-5 h-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-h1 font-sans text-foreground">{pendingLeaves}</div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-small font-sans-alt font-normal text-muted-foreground">
              Approved
            </CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <CheckIcon className="w-5 h-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-h1 font-sans text-foreground">{approvedLeaves}</div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-small font-sans-alt font-normal text-muted-foreground">
              Total Days Off
            </CardTitle>
            <div className="p-2 rounded-lg bg-secondary/10">
              <CalendarDaysIcon className="w-5 h-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-h1 font-sans text-foreground">{totalDays}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-h2 font-sans text-foreground">Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((leave) => (
              <div
                key={leave.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-xl border border-border hover:shadow-md transition-all bg-background"
              >
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {leave.employee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-body font-normal text-foreground">
                        {leave.employee.name}
                      </h3>
                      <Badge className={getLeaveTypeColor(leave.leaveType)}>
                        {leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(leave.status)}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-small text-muted-foreground">{leave.reason}</p>
                    <div className="flex items-center gap-4 text-small text-muted-foreground">
                      <span>
                        {format(new Date(leave.startDate), 'MMM dd, yyyy')} -{' '}
                        {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                      </span>
                      <span>•</span>
                      <span>{leave.days} days</span>
                    </div>
                  </div>
                </div>

                {leave.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateLeaveStatus(leave.id, 'approved', 'Manager')}
                      className="bg-success text-success-foreground hover:bg-success/90"
                    >
                      <CheckIcon className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateLeaveStatus(leave.id, 'rejected', 'Manager')}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <XIcon className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}

                {leave.status !== 'pending' && leave.approvedBy && (
                  <div className="text-small text-muted-foreground">
                    {leave.status === 'approved' ? 'Approved' : 'Rejected'} by {leave.approvedBy}
                    <br />
                    {leave.approvedDate && format(new Date(leave.approvedDate), 'MMM dd, yyyy')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
