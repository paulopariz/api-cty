export interface IJob {
  id: number;
  title: string;
  description: string;
  urgency_level?: string | null;
  languages: string;
  location_type: string;
  city?: string | null;
  min_salary?: number | null;
  max_salary?: number | null;
  labels: string;
  contact: string;
  status: string;
}
