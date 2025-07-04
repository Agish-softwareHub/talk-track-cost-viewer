
export interface ApiEndpoint {
  id: string;
  title: string;
  description: string;
  methods: ApiMethod[];
}

export interface ApiMethod {
  method: string;
  endpoint: string;
  description: string;
  parameters: ApiParameter[];
  response: any;
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}
