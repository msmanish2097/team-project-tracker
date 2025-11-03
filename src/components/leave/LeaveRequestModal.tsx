import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLeaveStore } from '@/stores/leaveStore';
import { teamMembers } from '@/stores/projectStore';

export function LeaveRequestModal() {
  const isOpen = useLeaveStore((state) => state.isLeaveModalOpen);
  const setOpen = useLeaveStore((state) => state.setLeaveModalOpen);
  const addLeaveRequest = useLeaveStore((state) => state.addLeaveRequest);

  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: 'vacation' as 'vacation' | 'sick' | 'personal' | 'unpaid',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        employeeId: '',
        leaveType: 'vacation',
        startDate: '',
        endDate: '',
        reason: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = teamMembers.find((m) => m.id === formData.employeeId);
    if (employee) {
      addLeaveRequest({
        ...formData,
        employee,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        status: 'pending',
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-popover text-popover-foreground">
        <DialogHeader>
          <DialogTitle className="text-h2 font-sans text-foreground">
            Request Leave
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Submit a new leave request for approval.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="employee" className="text-foreground">
              Employee
            </Label>
            <Select
              value={formData.employeeId}
              onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
            >
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id} className="text-foreground">
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaveType" className="text-foreground">
              Leave Type
            </Label>
            <Select
              value={formData.leaveType}
              onValueChange={(value: any) => setFormData({ ...formData, leaveType: value })}
            >
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="vacation" className="text-foreground">Vacation</SelectItem>
                <SelectItem value="sick" className="text-foreground">Sick Leave</SelectItem>
                <SelectItem value="personal" className="text-foreground">Personal</SelectItem>
                <SelectItem value="unpaid" className="text-foreground">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-foreground">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="bg-background text-foreground border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-foreground">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                className="bg-background text-foreground border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-foreground">
              Reason
            </Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
              rows={3}
              className="bg-background text-foreground border-border"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
