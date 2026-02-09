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

const AdminVideoLink = () => {
  const [videoLinks, setVideoLinks] = useState([]);
  const [newVideoLink, setNewVideoLink] = useState({
    videoLink: "",
    showOnHomePage: true,
  });
  const [editingVideoLink, setEditingVideoLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuthAdminStore();

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchVideoLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/video-links`);
      setVideoLinks(response.data.data);
    } catch (err) {
      setError("Failed to fetch video links.");
      console.error("Error fetching video links:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVideoLink = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }
      await axios.post(`${API_URL}/video-links`, newVideoLink, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewVideoLink({ videoLink: "", showOnHomePage: true });
      fetchVideoLinks();
    } catch (err) {
      setError("Failed to create video link. Check if you are authorized.");
      console.error("Error creating video link:", err);
    }
  };

  const handleUpdateVideoLink = async (e) => {
    e.preventDefault();
    setError(null);
    if (!editingVideoLink) return;

    try {
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }
      await axios.patch(
        `${API_URL}/video-links/${editingVideoLink._id}`,
        editingVideoLink,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEditingVideoLink(null);
      fetchVideoLinks();
    } catch (err) {
      setError("Failed to update video link. Check if you are authorized.");
      console.error("Error updating video link:", err);
    }
  };

  const handleDeleteVideoLink = async (id) => {
    setError(null);
    try {
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }
      await axios.delete(`${API_URL}/video-links/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVideoLinks();
    } catch (err) {
      setError("Failed to delete video link. Check if you are authorized.");
      console.error("Error deleting video link:", err);
    }
  };

  useEffect(() => {
    fetchVideoLinks();
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
        Manage Video Link
      </h1>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Add New Video Link Form */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Video Link
        </Typography>
        <Box component="form" onSubmit={handleCreateVideoLink} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Video URL"
            variant="outlined"
            value={newVideoLink.videoLink}
            onChange={(e) =>
              setNewVideoLink({ ...newVideoLink, videoLink: e.target.value })
            }
            required
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newVideoLink.showOnHomePage}
                onChange={(e) =>
                  setNewVideoLink({
                    ...newVideoLink,
                    showOnHomePage: e.target.checked,
                  })
                }
              />
            }
            label="Show on Home Page"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Video Link
          </Button>
        </Box>
      </Paper>

      {/* Edit Video Link Form */}
      {editingVideoLink && (
        <Paper elevation={1} sx={{ p: 3, mb: 4, }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Edit Video Link
          </Typography>
          <Box component="form" onSubmit={handleUpdateVideoLink} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Video URL"
              variant="outlined"
              value={editingVideoLink.videoLink}
              onChange={(e) =>
                setEditingVideoLink({
                  ...editingVideoLink,
                  videoLink: e.target.value,
                })
              }
              required
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={editingVideoLink.showOnHomePage}
                  onChange={(e) =>
                    setEditingVideoLink({
                      ...editingVideoLink,
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
                Update Video Link
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => setEditingVideoLink(null)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Video Links List */}
      <Typography variant="h5" component="h2" gutterBottom>
        Existing Video Links
      </Typography>
      {videoLinks.length === 0 ? (
        <Typography>No video links found.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Video URL</TableCell>
                <TableCell align="center">Show on Home Page</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videoLinks.map((link) => (
                <TableRow key={link._id}>
                  <TableCell>
                    <a
                      href={link.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {link.videoLink}
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    {link.showOnHomePage ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => setEditingVideoLink({ ...link })}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteVideoLink(link._id)}
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

export default AdminVideoLink;
