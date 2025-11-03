import { create } from 'zustand';
import { TeamMember } from './projectStore';
import { supabase } from '@/lib/supabase';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee: TeamMember;
  leaveType: 'vacation' | 'sick' | 'personal' | 'unpaid';
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: Date;
  approvedBy?: string;
  approvedDate?: Date;
  days: number;
}

interface LeaveState {
  leaveRequests: LeaveRequest[];
  isLeaveModalOpen: boolean;
  selectedLeave: LeaveRequest | null;
  addLeaveRequest: (leave: Omit<LeaveRequest, 'id' | 'appliedDate' | 'days'>) => void;
  updateLeaveStatus: (id: string, status: 'approved' | 'rejected', approvedBy: string) => void;
  deleteLeaveRequest: (id: string) => void;
  setLeaveModalOpen: (open: boolean) => void;
  setSelectedLeave: (leave: LeaveRequest | null) => void;
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '1',
    employee: { id: '1', name: 'Sarah Johnson', avatar: 'SJ', email: 'sarah@example.com' },
    leaveType: 'vacation',
    startDate: new Date('2024-03-10'),
    endDate: new Date('2024-03-15'),
    reason: 'Family vacation',
    status: 'approved',
    appliedDate: new Date('2024-02-20'),
    approvedBy: 'Manager',
    approvedDate: new Date('2024-02-21'),
    days: 6,
  },
  {
    id: '2',
    employeeId: '2',
    employee: { id: '2', name: 'Michael Chen', avatar: 'MC', email: 'michael@example.com' },
    leaveType: 'sick',
    startDate: new Date('2024-02-25'),
    endDate: new Date('2024-02-26'),
    reason: 'Medical appointment',
    status: 'pending',
    appliedDate: new Date('2024-02-23'),
    days: 2,
  },
  {
    id: '3',
    employeeId: '3',
    employee: { id: '3', name: 'Emily Rodriguez', avatar: 'ER', email: 'emily@example.com' },
    leaveType: 'personal',
    startDate: new Date('2024-03-20'),
    endDate: new Date('2024-03-22'),
    reason: 'Personal matters',
    status: 'approved',
    appliedDate: new Date('2024-02-18'),
    approvedBy: 'Manager',
    approvedDate: new Date('2024-02-19'),
    days: 3,
  },
];

const calculateDays = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

export const useLeaveStore = create<LeaveState>((set) => ({
  leaveRequests: mockLeaveRequests,
  isLeaveModalOpen: false,
  selectedLeave: null,
  addLeaveRequest: async (leaveData) => {
    const supabaseUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '';
    const days = calculateDays(leaveData.startDate, leaveData.endDate);
    
    if (supabaseUrl && supabaseUrl !== 'your_supabase_project_url_here') {
      try {
        const { data, error } = await supabase
          .from('leave_requests')
          .insert({
            employee_id: leaveData.employeeId,
            leave_type: leaveData.leaveType,
            start_date: leaveData.startDate.toISOString().split('T')[0],
            end_date: leaveData.endDate.toISOString().split('T')[0],
            reason: leaveData.reason,
            status: leaveData.status,
            days: days,
          })
          .select()
          .single();

        if (error) throw error;

        const newLeave: LeaveRequest = {
          ...leaveData,
          id: data.id,
          appliedDate: new Date(data.applied_date),
          days: days,
        };

        set((state) => ({
          leaveRequests: [...state.leaveRequests, newLeave],
        }));
      } catch (error) {
        console.error('Error adding leave request:', error);
        set((state) => ({
          leaveRequests: [
            ...state.leaveRequests,
            {
              ...leaveData,
              id: Date.now().toString(),
              appliedDate: new Date(),
              days: days,
            },
          ],
        }));
      }
    } else {
      set((state) => ({
        leaveRequests: [
          ...state.leaveRequests,
          {
            ...leaveData,
            id: Date.now().toString(),
            appliedDate: new Date(),
            days: days,
          },
        ],
      }));
    }
  },
  updateLeaveStatus: async (id, status, approvedBy) => {
    const supabaseUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '';
    
    if (supabaseUrl && supabaseUrl !== 'your_supabase_project_url_here') {
      try {
        const { error } = await supabase
          .from('leave_requests')
          .update({
            status: status,
            approved_by: approvedBy,
            approved_date: new Date().toISOString(),
          })
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error('Error updating leave status:', error);
      }
    }

    set((state) => ({
      leaveRequests: state.leaveRequests.map((leave) =>
        leave.id === id
          ? { ...leave, status, approvedBy, approvedDate: new Date() }
          : leave
      ),
    }));
  },
  deleteLeaveRequest: async (id) => {
    const supabaseUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '';
    
    if (supabaseUrl && supabaseUrl !== 'your_supabase_project_url_here') {
      try {
        const { error } = await supabase
          .from('leave_requests')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error('Error deleting leave request:', error);
      }
    }

    set((state) => ({
      leaveRequests: state.leaveRequests.filter((leave) => leave.id !== id),
    }));
  },
  setLeaveModalOpen: (open) => set({ isLeaveModalOpen: open }),
  setSelectedLeave: (leave) => set({ selectedLeave: leave }),
}));
