import api from "../api";

export type Company = {
  id: number;
  agentId: number;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  companyType: string;
  companyIndustry: string;
  manufacturingStrategy: string;
  status: string;
  contacts: Array<{
    type: string;
    value: string;
  }> | null;
  locations: string[] | null;
  createdAt: string;
  updatedAt: string;
};

export type CompanyDocument = {
  id: number;
  companyId: number;
  fileId: number;
  docType: string | null;
  description: string | null;
  uploadedAt: string;
  file: {
    id: number;
    fileName: string;
    filePath: string;
    publicUrl: string;
    fileMetadata: {
      size: number;
      mimeType: string;
      uploaderId: number | null;
      originalFileName: string;
    };
    uploadedAt: string;
  };
};

export type PendingCompany = {
  company: Company;
  documents: CompanyDocument[];
};

export type CompanyDetailsResponse = {
  status: string;
  message: string;
  data: {
    company: Company;
    documents: CompanyDocument[];
    agent: {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
    };
  };
};

export type CompaniesResponse = {
  status: string;
  message: string;
  data: Company[];
};

export type PendingCompaniesResponse = {
  status: string;
  message: string;
  data: PendingCompany[];
};

export async function getCompanies() {
  const { data } = await api.get<CompaniesResponse>("/admin/companies");
  return data.data;
}

export async function getPendingCompanies() {
  const { data } = await api.get<PendingCompaniesResponse>("/admin/companies/pending");
  return data.data;
}

export async function getCompanyDetails(companyId: number) {
  const { data } = await api.get<CompanyDetailsResponse>(`/admin/companies/${companyId}`);
  return data.data;
}

export async function approveCompany(companyId: number) {
  const { data } = await api.post(`/admin/companies/${companyId}/approve`);
  return data.data;
}

export async function rejectCompany(companyId: number) {
  const { data } = await api.post(`/admin/companies/${companyId}/reject`);
  return data.data;
}

export async function updateCompanyStatus(
  companyId: number,
  status: "active" | "rejected" | "underReview"
) {
  const { data } = await api.patch(`/admin/companies/${companyId}/status`, { status });
  return data.data;
}

export async function assignCompanyAgent(companyId: number, agentId: number) {
  const { data } = await api.post(`/admin/companies/${companyId}/agent`, { agentId });
  return data.data;
}
