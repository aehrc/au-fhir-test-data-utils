export type Metadata = {
  type: string;
  id: number;
  resourceId: string;
  filename: string;
  projects: string[];
  tags: string[];
  patient?: string;
};

type Resource = Metadata & {
  json?: object
}

export default Resource;
