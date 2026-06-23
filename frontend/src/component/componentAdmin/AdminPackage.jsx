import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuthAdminStore from "../../store/AuthAdminStore.js";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

const emptyPackage = {
  title: "",
  price: "",
  type: "",
  year: "",
  priceWithQurbani: "",
  priceWithoutQurbani: "",
  duration: "",
  flightInfo: "",
  feature: "",
  featured: false,
  showOnHomePage: false,
  specialFeatures: "",
  journeyDetails: "",
  note: "",
  accommodationMakkah: "",
  accommodationMedina: "",
  roomFacilities: "",
  foodArrangements: "",
  includedServices: "",
  transportation: "",
  ziyarat: "",
  guidanceService: "",
  religiousEducation: "",
  supervision: "",
  specialNote: "",
};

const toCommaStr = (val) =>
  Array.isArray(val) ? val.join(", ") : val || "";

const PackageForm = ({ data, setData }) => (
  <>
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Basic Information</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth label="Title" variant="outlined" required
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth label="Type (hajj/umrah)" variant="outlined" required
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          />
          <TextField
            fullWidth label="Year (e.g. 2027)" variant="outlined"
            value={data.year}
            onChange={(e) => setData({ ...data, year: e.target.value })}
          />
        </Box>
      </AccordionDetails>
    </Accordion>

    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Pricing</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth label="Display Price" variant="outlined" required
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth label="Price with Qurbani" variant="outlined"
            value={data.priceWithQurbani}
            onChange={(e) => setData({ ...data, priceWithQurbani: e.target.value })}
          />
          <TextField
            fullWidth label="Price without Qurbani" variant="outlined"
            value={data.priceWithoutQurbani}
            onChange={(e) => setData({ ...data, priceWithoutQurbani: e.target.value })}
          />
        </Box>
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Duration & Travel</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth label="Duration (e.g. 42 days)" variant="outlined"
          value={data.duration}
          onChange={(e) => setData({ ...data, duration: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Flight Info" variant="outlined" multiline rows={2}
          value={data.flightInfo}
          onChange={(e) => setData({ ...data, flightInfo: e.target.value })}
        />
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Card Display</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth label="Short Features (comma-separated)" variant="outlined" required
          value={data.feature}
          onChange={(e) => setData({ ...data, feature: e.target.value })}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data.featured}
              onChange={(e) => setData({ ...data, featured: e.target.checked })}
            />
          }
          label="Featured"
          sx={{ mb: 1, display: "block" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data.showOnHomePage}
              onChange={(e) => setData({ ...data, showOnHomePage: e.target.checked })}
            />
          }
          label="Show on Home Page"
        />
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Package Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth label="Special Features (comma-separated)" variant="outlined" multiline rows={2}
          value={data.specialFeatures}
          onChange={(e) => setData({ ...data, specialFeatures: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Journey Details" variant="outlined" multiline rows={4}
          value={data.journeyDetails}
          onChange={(e) => setData({ ...data, journeyDetails: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Note (internal / extra info)" variant="outlined" multiline rows={3}
          value={data.note}
          onChange={(e) => setData({ ...data, note: e.target.value })}
        />
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Accommodation</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth label="Accommodation in Makkah" variant="outlined" multiline rows={3}
          value={data.accommodationMakkah}
          onChange={(e) => setData({ ...data, accommodationMakkah: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Accommodation in Medina" variant="outlined" multiline rows={3}
          value={data.accommodationMedina}
          onChange={(e) => setData({ ...data, accommodationMedina: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Room Facilities (comma-separated)" variant="outlined" multiline rows={2}
          value={data.roomFacilities}
          onChange={(e) => setData({ ...data, roomFacilities: e.target.value })}
        />
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Food & Services</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth label="Food Arrangements" variant="outlined" multiline rows={3}
          value={data.foodArrangements}
          onChange={(e) => setData({ ...data, foodArrangements: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Transportation" variant="outlined" multiline rows={3}
          value={data.transportation}
          onChange={(e) => setData({ ...data, transportation: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Ziyarat (visits)" variant="outlined" multiline rows={3}
          value={data.ziyarat}
          onChange={(e) => setData({ ...data, ziyarat: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Guidance Service" variant="outlined" multiline rows={3}
          value={data.guidanceService}
          onChange={(e) => setData({ ...data, guidanceService: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Religious Education" variant="outlined" multiline rows={3}
          value={data.religiousEducation}
          onChange={(e) => setData({ ...data, religiousEducation: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Supervision" variant="outlined" multiline rows={3}
          value={data.supervision}
          onChange={(e) => setData({ ...data, supervision: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Included Services (detailed)" variant="outlined" multiline rows={5}
          value={data.includedServices}
          onChange={(e) => setData({ ...data, includedServices: e.target.value })}
        />
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Disclaimer</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth label="Special Note / Disclaimer" variant="outlined" multiline rows={4}
          value={data.specialNote}
          onChange={(e) => setData({ ...data, specialNote: e.target.value })}
        />
      </AccordionDetails>
    </Accordion>
  </>
);

const AdminPackage = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({ ...emptyPackage });
  const [editingId, setEditingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuthAdminStore();
  const API_URL = import.meta.env.VITE_API_URL;
  const isEditing = !!editingId;

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/packages`);
      setPackages(response.data);
    } catch (err) {
      setError("Failed to fetch packages.");
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  };

  const buildPayload = (data) => {
    const payload = { ...data };
    ["feature", "specialFeatures", "roomFacilities"].forEach((field) => {
      payload[field] = typeof data[field] === "string"
        ? data[field].split(",").map((f) => f.trim()).filter(Boolean)
        : data[field];
    });
    return payload;
  };

  const openAddDialog = () => {
    setFormData({ ...emptyPackage });
    setEditingId(null);
    setError(null);
    setDialogOpen(true);
  };

  const openEditDialog = (pkg) => {
    setFormData({
      ...pkg,
      feature: toCommaStr(pkg.feature),
      specialFeatures: toCommaStr(pkg.specialFeatures),
      roomFacilities: toCommaStr(pkg.roomFacilities),
    });
    setEditingId(pkg._id);
    setError(null);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!token) {
      setError("Authentication token not found. Please log in.");
      return;
    }
    setSubmitting(true);
    try {
      if (isEditing) {
        await axios.patch(
          `${API_URL}/packages/${editingId}`,
          buildPayload(formData),
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else {
        await axios.post(`${API_URL}/packages`, buildPayload(formData), {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      closeDialog();
      fetchPackages();
    } catch (err) {
      setError(
        isEditing
          ? "Failed to update package. Check if you are authorized."
          : "Failed to create package. Check if you are authorized.",
      );
      console.error("Error saving package:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePackage = async (id) => {
    setError(null);
    try {
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }
      await axios.delete(`${API_URL}/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPackages();
    } catch (err) {
      setError("Failed to delete package. Check if you are authorized.");
      console.error("Error deleting package:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-6 shadow bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="border-l-4 primaryBorderColor primaryTextColor pl-2 text-lg font-semibold self-start">
          Manage Packages
        </h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
        >
          Add New Package
        </Button>
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Package List Table */}
      <Typography variant="h6" component="h2" gutterBottom>
        Existing Packages
      </Typography>
      {packages.length === 0 ? (
        <Typography>No packages found.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Features</TableCell>
                <TableCell align="center">Featured</TableCell>
                <TableCell align="center">Show on Home Page</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg._id}>
                  <TableCell>{pkg.title}</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                  <TableCell>{pkg.type}</TableCell>
                  <TableCell>{pkg.feature?.join(", ")}</TableCell>
                  <TableCell align="center">
                    {pkg.featured ? (
                      <Typography color="success.main" fontWeight={600}>Yes</Typography>
                    ) : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {pkg.showOnHomePage ? (
                      <Typography color="success.main" fontWeight={600}>Yes</Typography>
                    ) : "No"}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                      <Tooltip title="View package">
                        <Link to={`/package/${pkg.slug}`}>
                          <IconButton color="info" size="small">
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Edit package">
                        <IconButton color="warning" size="small" onClick={() => openEditDialog(pkg)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete package">
                        <IconButton color="error" size="small" onClick={() => handleDeletePackage(pkg._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add / Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth="md"
        fullWidth
        scroll="body"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h5" component="span">
            {isEditing ? "Edit Package" : "Add New Package"}
          </Typography>
          <IconButton onClick={closeDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent dividers>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            <PackageForm data={formData} setData={setFormData} />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeDialog} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color={isEditing ? "success" : "primary"} disabled={submitting}>
              {submitting ? "Saving..." : isEditing ? "Update Package" : "Add Package"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default AdminPackage;
