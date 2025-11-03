import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  deadline: Date;
  progress: number;
  assignedMembers: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'created' | 'updated' | 'completed' | 'comment';
  message: string;
  timestamp: Date;
  user: TeamMember;
}

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  isCreateModalOpen: boolean;
  isEditMode: boolean;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'recentActivity'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setSelectedProject: (project: Project | null) => void;
  setCreateModalOpen: (open: boolean) => void;
  setEditMode: (mode: boolean) => void;
}

const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Johnson', avatar: 'SJ', email: 'sarah@example.com' },
  { id: '2', name: 'Michael Chen', avatar: 'MC', email: 'michael@example.com' },
  { id: '3', name: 'Emily Rodriguez', avatar: 'ER', email: 'emily@example.com' },
  { id: '4', name: 'David Kim', avatar: 'DK', email: 'david@example.com' },
  { id: '5', name: 'Jessica Taylor', avatar: 'JT', email: 'jessica@example.com' },
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern UI/UX',
    status: 'active',
    deadline: new Date('2024-03-15'),
    progress: 65,
    assignedMembers: [mockTeamMembers[0], mockTeamMembers[1], mockTeamMembers[2]],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-20'),
    recentActivity: [
      {
        id: 'a1',
        type: 'updated',
        message: 'Updated project progress to 65%',
        timestamp: new Date('2024-02-20T14:30:00'),
        user: mockTeamMembers[0],
      },
      {
        id: 'a2',
        type: 'comment',
        message: 'Added new design mockups to the project folder',
        timestamp: new Date('2024-02-19T10:15:00'),
        user: mockTeamMembers[1],
      },
    ],
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native iOS and Android app for customer engagement',
    status: 'active',
    deadline: new Date('2024-04-30'),
    progress: 40,
    assignedMembers: [mockTeamMembers[2], mockTeamMembers[3]],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-18'),
    recentActivity: [
      {
        id: 'a3',
        type: 'updated',
        message: 'Completed authentication module',
        timestamp: new Date('2024-02-18T16:45:00'),
        user: mockTeamMembers[2],
      },
    ],
  },
  {
    id: '3',
    name: 'Marketing Campaign Q1',
    description: 'Launch comprehensive marketing campaign for Q1 2024',
    status: 'planning',
    deadline: new Date('2024-03-01'),
    progress: 20,
    assignedMembers: [mockTeamMembers[4]],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15'),
    recentActivity: [
      {
        id: 'a4',
        type: 'created',
        message: 'Project created',
        timestamp: new Date('2024-02-01T09:00:00'),
        user: mockTeamMembers[4],
      },
    ],
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migrate legacy database to new cloud infrastructure',
    status: 'completed',
    deadline: new Date('2024-02-15'),
    progress: 100,
    assignedMembers: [mockTeamMembers[1], mockTeamMembers[3]],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-02-15'),
    recentActivity: [
      {
        id: 'a5',
        type: 'completed',
        message: 'Project marked as completed',
        timestamp: new Date('2024-02-15T18:00:00'),
        user: mockTeamMembers[1],
      },
    ],
  },
];

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: mockProjects,
  selectedProject: null,
  isCreateModalOpen: false,
  isEditMode: false,
  addProject: async (projectData) => {
    const supabaseUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '';
    
    if (supabaseUrl && supabaseUrl !== 'your_supabase_project_url_here') {
      try {
        const { data, error } = await supabase
          .from('projects')
          .insert({
            name: projectData.name,
            description: projectData.description,
            status: projectData.status,
            deadline: projectData.deadline.toISOString(),
            progress: projectData.progress,
          })
          .select()
          .single();

        if (error) throw error;

        const newProject: Project = {
          ...projectData,
          id: data.id,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          recentActivity: [
            {
              id: Date.now().toString(),
              type: 'created',
              message: 'Project created',
              timestamp: new Date(),
              user: projectData.assignedMembers[0],
            },
          ],
        };

        set((state) => ({
          projects: [...state.projects, newProject],
        }));
      } catch (error) {
        console.error('Error adding project:', error);
        set((state) => ({
          projects: [
            ...state.projects,
            {
              ...projectData,
              id: Date.now().toString(),
              createdAt: new Date(),
              updatedAt: new Date(),
              recentActivity: [
                {
                  id: Date.now().toString(),
                  type: 'created',
                  message: 'Project created',
                  timestamp: new Date(),
                  user: projectData.assignedMembers[0],
                },
              ],
            },
          ],
        }));
      }
    } else {
      set((state) => ({
        projects: [
          ...state.projects,
          {
            ...projectData,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            recentActivity: [
              {
                id: Date.now().toString(),
                type: 'created',
                message: 'Project created',
                timestamp: new Date(),
                user: projectData.assignedMembers[0],
              },
            ],
          },
        ],
      }));
    }
  },
  updateProject: async (id, updates) => {
    const supabaseUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '';
    
    if (supabaseUrl && supabaseUrl !== 'your_supabase_project_url_here') {
      try {
        const { error } = await supabase
          .from('projects')
          .update({
            name: updates.name,
            description: updates.description,
            status: updates.status,
            deadline: updates.deadline ? new Date(updates.deadline).toISOString() : undefined,
            progress: updates.progress,
          })
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }

    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      ),
      selectedProject:
        state.selectedProject?.id === id
          ? { ...state.selectedProject, ...updates, updatedAt: new Date() }
          : state.selectedProject,
    }));
  },
  deleteProject: async (id) => {
    const supabaseUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '';
    
    if (supabaseUrl && supabaseUrl !== 'your_supabase_project_url_here') {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }

    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
      selectedProject: state.selectedProject?.id === id ? null : state.selectedProject,
    }));
  },
  setSelectedProject: (project) => set({ selectedProject: project }),
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open, isEditMode: false }),
  setEditMode: (mode) => set({ isEditMode: mode }),
}));

export const teamMembers = mockTeamMembers;
