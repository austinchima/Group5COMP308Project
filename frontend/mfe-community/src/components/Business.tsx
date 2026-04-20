import React, { useState, useEffect, useMemo } from "react";
import CreateBusinessModal from "./CreateBusinessModal.tsx";
import CreateDealModal from "./CreateDealModal.tsx";
import ReviewReplyForm from "./ReviewReplyForm.tsx";

const API_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:4000/graphql";

async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
  requiresAuth = false,
) {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requiresAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "GraphQL request failed.");
  }

  return payload.data as T;
}

const GET_BUSINESSES = `
  query GetBusinesses {
    businesses {
      id
      ownerId
      ownerName
      name
      description
      category
      location
      imageUrl
      deals
      createdAt
    }
  }
`;

const CREATE_BUSINESS = `
  mutation CreateBusiness($name: String!, $description: String!, $category: String, $location: String) {
    createBusiness(name: $name, description: $description, category: $category, location: $location) {
      id
      name
    }
  }
`;

export default function Business() {
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, []);

  const isOwner = currentUser?.role === "BUSINESS_OWNER";

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await graphqlRequest<{ businesses: any[] }>(GET_BUSINESSES);
      setBusinesses(data.businesses || []);
    } catch (err) {
      console.error("Failed to fetch businesses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();

    const handleFab = (e: any) => {
      if (e.detail.pathname === "/business" && isOwner) {
        setShowBusinessModal(true);
      }
    };

    window.addEventListener("commons-fab-click", handleFab);
    return () => window.removeEventListener("commons-fab-click", handleFab);
  }, [isOwner]);

  const handleNewBusiness = async (biz: {
    name: string;
    category: string;
    description: string;
    contact: string;
  }) => {
    try {
      await graphqlRequest(CREATE_BUSINESS, {
        name: biz.name,
        description: biz.description,
        category: biz.category,
        location: biz.contact // Mapping contact to location in the backend model
      }, true);
      await fetchBusinesses();
    } catch (e) {
      console.error("Creation failed:", e);
      alert("Failed to list business. Make sure you are logged in as a Business Owner.");
    }
  };

  const handleNewDeal = (deal: {
    title: string;
    description: string;
    discount: string;
    expiry: string;
  }) => {
    if (businesses.length > 0) {
      const updated = [...businesses];
      updated[0].deals.push({
        title: deal.title,
        description: `${deal.discount} — ${deal.description}`,
      });
      setBusinesses(updated);
    }
  };

  return (
    <>
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">
              Local Businesses
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Support your local economy. Discover deals and engage with
              business owners.
            </p>
          </div>
          <div className="flex gap-4">
            {isOwner && (
              <>
                <button
                  onClick={() => setShowDealModal(true)}
                  className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold hover:brightness-95 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">local_offer</span>
                  New Deal
                </button>
                <button
                  onClick={() => setShowBusinessModal(true)}
                  className="bg-linear-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-extrabold shadow-lg shadow-primary/20 active:scale-95 duration-200"
                >
                  List Business
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {loading ? (
          <p>Loading businesses...</p>
        ) : businesses.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-3 block opacity-40">storefront</span>
            <p className="font-bold text-lg">No businesses listed yet.</p>
            {isOwner && <p className="text-sm mt-1">Click "List Business" to add your first local business.</p>}
          </div>
        ) : (
        businesses.map((bus) => (
          <div
            key={bus.id}
            className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-on-surface/5"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-headline text-3xl font-bold">
                    {bus.name}
                  </h3>
                  <span className="px-3 py-1 bg-surface-container text-on-primary-container text-xs font-bold rounded-full">
                    {bus.category}
                  </span>
                </div>
                <p className="text-on-surface-variant mb-6">
                  {bus.description}
                </p>

                {bus.location && (
                  <p className="text-sm text-on-surface-variant mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {bus.location}
                  </p>
                )}

                {bus.deals && bus.deals.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary">
                        local_offer
                      </span>
                      Active Deals
                    </h4>
                    <div className="grid gap-4">
                      {bus.deals.map((deal: string, idx: number) => (
                        <div
                          key={idx}
                          className="bg-tertiary-container/10 p-4 rounded-lg border border-tertiary/20"
                        >
                          <p className="text-sm text-on-surface-variant">
                            {deal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
        )}
      </div>

      <CreateBusinessModal
        isOpen={showBusinessModal}
        onClose={() => setShowBusinessModal(false)}
        onSubmit={handleNewBusiness}
      />
      <CreateDealModal
        isOpen={showDealModal}
        onClose={() => setShowDealModal(false)}
        onSubmit={handleNewDeal}
      />
    </>
  );
}
