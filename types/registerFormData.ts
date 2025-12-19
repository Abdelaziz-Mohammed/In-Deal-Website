export type RegisterFormData = {
  user: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
  };
  company: {
    name: string;
    description: string;
    phone: string;
    website: string;
    companyType: string;
    companyIndustry: string;
    manufacturingStrategy: string;
    locations?: string[];
    address?: string;
  };
  files: File[];
};
