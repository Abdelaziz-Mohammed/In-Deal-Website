"use client";

import { useEffect, useState } from "react";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import {
  getPendingCompanies,
  approveCompany,
  rejectCompany,
  PendingCompany,
} from "@/lib/api/companies";
import { UploadsModal } from "@/components/admin/UploadsModal";
import { Eye, Loader } from "lucide-react";

export default function AdminRequestsPage() {
  const [companies, setCompanies] = useState<PendingCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<number | null>(null);
  const [rejecting, setRejecting] = useState<number | null>(null);
  const [showUploadsModal, setShowUploadsModal] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      setLoading(true);
      const data = await getPendingCompanies();
      setCompanies(data);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(companyId: number) {
    try {
      setApproving(companyId);
      await approveCompany(companyId);
      setCompanies(companies.filter((c) => c.company.id !== companyId));
    } catch (err) {
      console.error("Failed to approve company:", err);
      alert("Failed to approve company. Please try again.");
    } finally {
      setApproving(null);
    }
  }

  async function handleReject(companyId: number) {
    try {
      setRejecting(companyId);
      await rejectCompany(companyId);
      setCompanies(companies.filter((c) => c.company.id !== companyId));
    } catch (err) {
      console.error("Failed to reject company:", err);
      alert("Failed to reject company. Please try again.");
    } finally {
      setRejecting(null);
    }
  }

  function handleViewUploads(company: any, documents: any[]) {
    setSelectedCompanyName(company.name);
    setSelectedDocuments(documents);
    setShowUploadsModal(true);
  }

  if (loading) {
    return (
      <>
        <AdminNavbar title="Requests" />
        <div className="flex-1 overflow-y-auto">
          <Container className="py-8">
            <div className="flex items-center justify-center h-64">
              <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar title="Requests" />
      <div className="flex-1 overflow-y-auto">
        <div className="py-4 px-2">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* Table Header Info */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pending Company Requests</h2>
              <p className="text-sm text-gray-500 mt-1">
                {companies.length} company {companies.length === 1 ? "request" : "requests"} pending
                approval
              </p>
            </div>

            {/* Table */}
            {companies.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500">No pending company requests</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        Agent Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        Company Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        Company Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        Industry
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        Manufacturing Strategy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        Email Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        Uploads
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {companies.map((item) => {
                      const company = item.company;
                      return (
                        <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                          {/* Agent Name - Placeholder */}
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            Agent {company.agentId}
                          </td>

                          {/* Company Name */}
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap font-medium">
                            {company.name}
                          </td>

                          {/* Company Type */}
                          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap capitalize">
                            {company.companyType}
                          </td>

                          {/* Industry */}
                          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap capitalize">
                            {company.companyIndustry}
                          </td>

                          {/* Manufacturing Strategy */}
                          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap capitalize">
                            {company.manufacturingStrategy}
                          </td>

                          {/* Email Address */}
                          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                            {company.contacts?.[0]?.value || "N/A"}
                          </td>

                          {/* Uploads */}
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewUploads(company, item.documents)}
                              disabled={item.documents.length === 0}
                              className="gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View ({item.documents.length})
                            </Button>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(company.id)}
                                disabled={approving === company.id}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                {approving === company.id ? "..." : "Accept"}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(company.id)}
                                disabled={rejecting === company.id}
                              >
                                {rejecting === company.id ? "..." : "Reject"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Uploads Modal */}
      {showUploadsModal && (
        <UploadsModal
          title={`Uploads - ${selectedCompanyName}`}
          documents={selectedDocuments}
          onClose={() => setShowUploadsModal(false)}
        />
      )}
    </>
  );
}
