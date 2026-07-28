import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineSearch,
  MdOutlineAdd,
  MdDeleteOutline,
  MdOutlineClose,
  MdOutlineLocalOffer,
  MdOutlineModeEdit,
} from "react-icons/md";
import { fetchOffers, createOffer, updateOffer, deleteOffer } from "../../features/offers/offersSlice";

// ── Helpers ───────────────────────────────────────────────────────────────────

// ── Discount type mapping ─────────────────────────────────────────────────────
// Form state uses UI keys: "percentage" | "value"
// Backend enum uses:       "percentage" | "flat"
// Change the right-hand side values here if backend enum changes

const UI_TO_API = { percentage: "percentage", value: "value" };
const API_TO_UI = { percentage: "percentage", value: "value", flat: "value", fixed: "value" };

const uiToApiDiscountType  = (ui)  => UI_TO_API[ui]  ?? ui;
const apiToUiDiscountType  = (api) => API_TO_UI[api]  ?? api;
const discountTypeLabel    = (api) =>
  ({ percentage: "Percentage", value: "Value", flat: "Value", fixed: "Value" }[api] ?? api ?? "—");

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB");
};

// Convert ISO date string → "YYYY-MM-DD" for <input type="date">
const toInputDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().slice(0, 10);
};

const statusStyle = (offer) => {
  const now = new Date();
  const end   = offer.endDate   ? new Date(offer.endDate)   : null;
  const start = offer.startDate ? new Date(offer.startDate) : null;
  if (!offer.isActive)          return "bg-red-100 text-red-600";
  if (end && end < now)         return "bg-gray-100 text-gray-500";
  if (start && start > now)     return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-600";
};

const statusLabel = (offer) => {
  const now = new Date();
  const end   = offer.endDate   ? new Date(offer.endDate)   : null;
  const start = offer.startDate ? new Date(offer.startDate) : null;
  if (!offer.isActive)      return "Inactive";
  if (end && end < now)     return "Expired";
  if (start && start > now) return "Scheduled";
  return "Active";
};

// ── Table Row ─────────────────────────────────────────────────────────────────

const OfferTableRow = ({ offer, onEdit, onDelete }) => (
  <tr className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
    <td className="py-4 px-3 text-sm font-semibold text-gray-800">
      {offer.offerName ?? "—"}
    </td>
    <td className="py-4 px-3 text-sm text-gray-600">
      {discountTypeLabel(offer.discountType)}
    </td>
    <td className="py-4 px-3 text-sm text-gray-600">
      {offer.discountType === "percentage"
        ? `${parseFloat(offer.discountValue ?? 0)}%`
        : offer.discountValue
        ? `₹${parseFloat(offer.discountValue).toLocaleString("en-IN")}`
        : "—"}
    </td>
    <td className="py-4 px-3 text-sm text-gray-500">{formatDate(offer.startDate)}</td>
    <td className="py-4 px-3 text-sm text-gray-500">{formatDate(offer.endDate)}</td>
    <td className="py-4 px-3">
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle(offer)}`}>
        {statusLabel(offer)}
      </span>
    </td>
    <td className="py-4 px-3 text-sm text-gray-400 max-w-[180px] truncate">
      {offer.description ?? "—"}
    </td>
    <td className="py-4 px-3">
      <div className="flex items-center gap-2">
        {/* Edit */}
        <button
          onClick={() => onEdit(offer)}
          className="inline-flex items-center gap-1 border border-gray-200 rounded-lg p-1.5 sm:px-3 sm:py-1.5 text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
          title="Edit"
        >
          <MdOutlineModeEdit size={15} />
          <span className="hidden sm:inline">Edit</span>
        </button>
        {/* Delete */}
        <button
          onClick={() => onDelete(offer)}
          className="inline-flex items-center gap-1 border border-red-200 rounded-lg p-1.5 sm:px-3 sm:py-1.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <MdDeleteOutline size={15} />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </td>
  </tr>
);

// ── Initial form state ────────────────────────────────────────────────────────

const EMPTY_FORM = {
  offerName:     "",
  discountType:  "percentage",
  discountValue: "",
  startDate:     "",
  endDate:       "",
  description:   "",
};

// ── Page ──────────────────────────────────────────────────────────────────────

const OffersPage = () => {
  const dispatch = useDispatch();
  const {
    list, loading, error,
    creating, createError,
    updating, updateError,
    deleting, deleteError,
  } = useSelector((state) => state.offers);

  // modal state
  const [showModal,    setShowModal]    = useState(false);
  const [editOffer,    setEditOffer]    = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // offer pending delete confirm
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [errors,       setErrors]       = useState({});
  const [successMsg,   setSuccessMsg]   = useState("");

  // search filter
  const [search, setSearch] = useState("");

  // fetch on mount
  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  // ── Derived ──────────────────────────────────────────────────────────────────

  const isEditMode  = editOffer !== null;
  const isBusy      = isEditMode ? updating : creating;
  const activeError = isEditMode ? updateError : createError;

  // ── Validation ───────────────────────────────────────────────────────────────

  const validate = () => {
    const e = {};
    if (!form.offerName.trim())
      e.offerName = "Offer name is required";
    if (!form.discountType)
      e.discountType = "Discount type is required";
    if (!form.discountValue || isNaN(Number(form.discountValue)) || Number(form.discountValue) <= 0)
      e.discountValue = "Enter a valid discount value";
    if (form.discountType === "percentage" && Number(form.discountValue) > 100)
      e.discountValue = "Percentage cannot exceed 100";
    if (!form.startDate)
      e.startDate = "Start date is required";
    if (!form.endDate)
      e.endDate = "End date is required";
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      e.endDate = "End date must be after start date";
    return e;
  };

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Open in Create mode
  const handleOpenCreate = () => {
    setEditOffer(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setSuccessMsg("");
    setShowModal(true);
  };

  // Open in Edit mode — prefill form from offer object
  const handleOpenEdit = (offer) => {
    setEditOffer(offer);
    setForm({
      offerName:     offer.offerName     ?? "",
      discountType:  apiToUiDiscountType(offer.discountType ?? "percentage"),
      discountValue: offer.discountValue ? String(parseFloat(offer.discountValue)) : "",
      startDate:     toInputDate(offer.startDate),
      endDate:       toInputDate(offer.endDate),
      description:   offer.description  ?? "",
    });
    setErrors({});
    setSuccessMsg("");
    setShowModal(true);
  };

  const handleClose = () => {
    if (isBusy) return;
    setShowModal(false);
    setEditOffer(null);
  };

  // ── Delete handlers ──────────────────────────────────────────────────────────

  const handleDeleteClick = (offer) => setDeleteTarget(offer);

  const handleDeleteCancel = () => {
    if (deleting) return;
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const result = await dispatch(deleteOffer(deleteTarget.offerId));
    if (deleteOffer.fulfilled.match(result)) {
      setDeleteTarget(null);
    }
    // on failure: keep modal open, deleteError shows in modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditMode) {
      // ── UPDATE ──────────────────────────────────────────────────────────
      const payload = {
        offerName:     form.offerName.trim(),
        discountType:  uiToApiDiscountType(form.discountType),
        discountValue: String(Number(form.discountValue).toFixed(2)),
        startDate:     form.startDate,
        endDate:       form.endDate,
      };

      const result = await dispatch(updateOffer({ offerId: editOffer.offerId, payload }));

      if (updateOffer.fulfilled.match(result)) {
        setSuccessMsg(`"${payload.offerName}" updated successfully!`);
        // Re-fetch for full sync
        dispatch(fetchOffers());
        setTimeout(() => {
          setShowModal(false);
          setEditOffer(null);
          setSuccessMsg("");
        }, 1200);
      }
    } else {
      // ── CREATE ──────────────────────────────────────────────────────────
      const payload = {
        offerName:     form.offerName.trim(),
        discountType:  uiToApiDiscountType(form.discountType),  // UI→API: "value"→"flat"
        discountValue: Number(form.discountValue),
        startDate:     form.startDate,
        endDate:       form.endDate,
        description:   form.description.trim(),
      };

      const result = await dispatch(createOffer(payload));

      if (createOffer.fulfilled.match(result)) {
        setSuccessMsg(`"${payload.offerName}" created successfully!`);
        setForm(EMPTY_FORM);
        setErrors({});
        dispatch(fetchOffers());
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg("");
        }, 1200);
      }
    }
  };

  // ── Filtered list ────────────────────────────────────────────────────────────

  const filtered = list.filter((o) =>
    (o.offerName ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // ── Loading skeleton ─────────────────────────────────────────────────────────

  const loadingSkeleton = (
    <div className="space-y-3 p-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-12 bg-gray-100 rounded-lg" />
      ))}
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Offers</h1>
          <p className="text-sm text-gray-500">Create and manage discount offers for your customers.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search offers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            />
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdOutlineAdd size={18} />
            New Offer
          </button>
        </div>
      </div>

      {/* Fetch error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠</span>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button
            onClick={() => dispatch(fetchOffers())}
            className="text-sm font-medium text-red-600 border border-red-300 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Offers Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Existing Offers</h2>
          <span className="text-sm text-gray-400">{filtered.length} total</span>
        </div>

        {loading ? loadingSkeleton : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <MdOutlineLocalOffer size={40} className="mb-3 opacity-30" />
            <p className="text-sm mb-4">No offers found. Create your first offer.</p>
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MdOutlineAdd size={16} />
              New Offer
            </button>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-400 border-b border-gray-100">
                <th className="py-3 px-3">Offer Name</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Discount</th>
                <th className="py-3 px-3">Start</th>
                <th className="py-3 px-3">End</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((offer, i) => (
                <OfferTableRow
                  key={offer.offerId ?? i}
                  offer={offer}
                  onEdit={handleOpenEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Create / Edit Offer Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget && !isBusy) handleClose(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[92vh]">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {isEditMode ? "Edit Offer" : "Create New Offer"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isEditMode
                    ? `Editing: ${editOffer.offerName}`
                    : "Fill in the details to add a discount offer."}
                </p>
              </div>
              <button
                onClick={handleClose}
                disabled={isBusy}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
              >
                <MdOutlineClose size={18} />
              </button>
            </div>

            {/* Success message */}
            {successMsg && (
              <div className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-lg">
                ✓ {successMsg}
              </div>
            )}

            {/* Scrollable form body */}
            <div className="overflow-y-auto px-6 py-4 flex-1">
              <form id="offerForm" onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* Offer Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Offer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="offerName"
                    value={form.offerName}
                    onChange={handleChange}
                    placeholder="e.g. Diwali Special Discount"
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.offerName ? "border-red-400 bg-red-50" : "border-gray-300"
                    }`}
                  />
                  {errors.offerName && <p className="text-xs text-red-500 mt-1">{errors.offerName}</p>}
                </div>

                {/* Discount Type + Value */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Discount Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="discountType"
                      value={form.discountType}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.discountType ? "border-red-400" : "border-gray-300"
                      }`}
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="value">Value (₹)</option>
                    </select>
                    {errors.discountType && <p className="text-xs text-red-500 mt-1">{errors.discountType}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Discount Value <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                        {form.discountType === "percentage" ? "%" : "₹"}
                      </span>
                      <input
                        name="discountValue"
                        type="number"
                        min="0"
                        max={form.discountType === "percentage" ? "100" : undefined}
                        value={form.discountValue}
                        onChange={handleChange}
                        placeholder={form.discountType === "percentage" ? "Enter percentage" : "Enter discount value"}
                        className={`w-full border rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.discountValue ? "border-red-400 bg-red-50" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.discountValue && <p className="text-xs text-red-500 mt-1">{errors.discountValue}</p>}
                  </div>
                </div>

                {/* Start Date + End Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.startDate ? "border-red-400 bg-red-50" : "border-gray-300"
                      }`}
                    />
                    {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      min={form.startDate || undefined}
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.endDate ? "border-red-400 bg-red-50" : "border-gray-300"
                      }`}
                    />
                    {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
                  </div>
                </div>

                {/* Description (create only) */}
                {!isEditMode && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Brief description of the offer..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                )}


              </form>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              {activeError && !successMsg && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
                  <span className="text-red-500 text-xs">⚠</span>
                  <p className="text-xs text-red-600">{activeError}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isBusy}
                  className="flex-1 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="offerForm"
                  disabled={isBusy}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isBusy ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    isEditMode ? "Update Offer" : "Create Offer"
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget && !deleting) handleDeleteCancel(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Red top accent */}
            <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-600" />

            <div className="p-6">
              {/* Icon + title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <MdDeleteOutline size={20} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Delete Offer</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Are you sure you want to delete this offer?</p>
                </div>
              </div>

              {/* Offer name card */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
                <p className="text-sm font-semibold text-gray-800 truncate">{deleteTarget.offerName}</p>
                <p className="text-xs text-gray-400 mt-0.5 capitalize">
                  {discountTypeLabel(deleteTarget.discountType)} · {deleteTarget.discountType === "percentage"
                    ? `${parseFloat(deleteTarget.discountValue ?? 0)}%`
                    : `₹${parseFloat(deleteTarget.discountValue ?? 0).toLocaleString("en-IN")}`}
                </p>
              </div>

              {/* Warning */}
              <p className="text-xs text-red-500 mb-5 flex items-center gap-1.5">
                <span>⚠</span>
                This action cannot be undone.
              </p>

              {/* API error */}
              {deleteError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
                  <span className="text-red-500 text-xs">⚠</span>
                  <p className="text-xs text-red-600">{deleteError}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDeleteCancel}
                  disabled={deleting}
                  className="flex-1 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 bg-red-600 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <MdDeleteOutline size={16} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OffersPage;
