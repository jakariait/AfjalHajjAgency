import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthAdminStore from "../../store/AuthAdminStore.js";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
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
} from "@mui/material";

const AdminPackage = () => {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    title: "",
    price: "",
    type: "",
    feature: "", // Comma-separated string for input
    featured: false,
    showOnHomePage: false,
  });
  const [editingPackage, setEditingPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuthAdminStore();

  const API_URL = import.meta.env.VITE_API_URL;

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

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }
      const packageDataToSend = {
        ...newPackage,
        feature: newPackage.feature.split(",").map((f) => f.trim()),
      };
      await axios.post(`${API_URL}/packages`, packageDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewPackage({
        title: "",
        price: "",
        type: "",
        feature: "",
        featured: false,
        showOnHomePage: false,
      });
      fetchPackages();
    } catch (err) {
      setError("Failed to create package. Check if you are authorized.");
      console.error("Error creating package:", err);
    }
  };

  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    setError(null);
    if (!editingPackage) return;

    try {
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }
      const packageDataToSend = {
        ...editingPackage,
        feature: editingPackage.feature.split(",").map((f) => f.trim()),
      };
      await axios.patch(
        `${API_URL}/packages/${editingPackage._id}`,
        packageDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEditingPackage(null);
      fetchPackages();
    } catch (err) {
      setError("Failed to update package. Check if you are authorized.");
      console.error("Error updating package:", err);
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={"p-6 shadow bg-white rounded-lg"}>
      <h1 className="border-l-4 primaryBorderColor primaryTextColor mb-6 pl-2 text-lg font-semibold self-start">
        Manage Packages
      </h1>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Add New Package Form */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Package
        </Typography>
        <Box component="form" onSubmit={handleCreatePackage} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={newPackage.title}
            onChange={(e) =>
              setNewPackage({ ...newPackage, title: e.target.value })
            }
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            value={newPackage.price}
            onChange={(e) =>
              setNewPackage({ ...newPackage, price: e.target.value })
            }
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Type"
            variant="outlined"
            value={newPackage.type}
            onChange={(e) =>
              setNewPackage({ ...newPackage, type: e.target.value })
            }
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Features (comma-separated)"
            variant="outlined"
            value={newPackage.feature}
            onChange={(e) =>
              setNewPackage({ ...newPackage, feature: e.target.value })
            }
            required
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newPackage.featured}
                onChange={(e) =>
                  setNewPackage({ ...newPackage, featured: e.target.checked })
                }
              />
            }
            label="Featured"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newPackage.showOnHomePage}
                onChange={(e) =>
                  setNewPackage({
                    ...newPackage,
                    showOnHomePage: e.target.checked,
                  })
                }
              />
            }
            label="Show on Home Page"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Package
          </Button>
        </Box>
      </Paper>

      {/* Edit Package Form */}
      {editingPackage && (
        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Edit Package
          </Typography>
          <Box component="form" onSubmit={handleUpdatePackage} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={editingPackage.title}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, title: e.target.value })
              }
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              value={editingPackage.price}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, price: e.target.value })
              }
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Type"
              variant="outlined"
              value={editingPackage.type}
              onChange={(e) =>
                setEditingPackage({ ...editingPackage, type: e.target.value })
              }
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Features (comma-separated)"
              variant="outlined"
              value={
                Array.isArray(editingPackage.feature)
                  ? editingPackage.feature.join(", ")
                  : editingPackage.feature
              }
              onChange={(e) =>
                setEditingPackage({
                  ...editingPackage,
                  feature: e.target.value,
                })
              }
              required
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={editingPackage.featured}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      featured: e.target.checked,
                    })
                  }
                />
              }
              label="Featured"
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={editingPackage.showOnHomePage}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      showOnHomePage: e.target.checked,
                    })
                  }
                />
              }
              label="Show on Home Page"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained" color="success">
                Update Package
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => setEditingPackage(null)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Packages List */}
      <Typography variant="h5" component="h2" gutterBottom>
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
                  <TableCell>{pkg.feature.join(", ")}</TableCell>
                  <TableCell align="center">{pkg.featured ? "Yes" : "No"}</TableCell>
                  <TableCell align="center">
                    {pkg.showOnHomePage ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() =>
                        setEditingPackage({
                          ...pkg,
                          feature: pkg.feature.join(", "),
                        })
                      }
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeletePackage(pkg._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AdminPackage;