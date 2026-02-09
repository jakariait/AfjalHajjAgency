
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthAdminStore from "../../store/AuthAdminStore.js";
import { toast } from "react-hot-toast";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const apiUrl = import.meta.env.VITE_API_URL;

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [review, setReview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useAuthAdminStore();

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/testimonials`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTestimonials();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const testimonialData = { name, location, category, review };

    try {
      if (editingId) {
        await axios.patch(
          `${apiUrl}/testimonials/${editingId}`,
          testimonialData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Testimonial updated successfully!");
      } else {
        await axios.post(`${apiUrl}/testimonials`, testimonialData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Testimonial created successfully!");
      }
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("Failed to save testimonial.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setName(testimonial.name);
    setLocation(testimonial.location);
    setCategory(testimonial.category);
    setReview(testimonial.review);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Testimonial deleted successfully!");
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setLocation("");
    setCategory("");
    setReview("");
  };

  if (loading && testimonials.length === 0) {
    return <Box sx={{ textAlign: "center", py: 4 }}>Loading testimonials...</Box>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Testimonials
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {editingId ? "Edit Testimonial" : "Add New Testimonial"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Review"
            multiline
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            margin="normal"
            required
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {editingId ? "Update Testimonial" : "Add Testimonial"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={resetForm}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </Box>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Existing Testimonials
        </Typography>
        {testimonials.length === 0 ? (
          <Typography>No testimonials found.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id}>
                    <TableCell>{testimonial.name}</TableCell>
                    <TableCell>{testimonial.location}</TableCell>
                    <TableCell>{testimonial.category}</TableCell>
                    <TableCell sx={{ whiteSpace: "pre-wrap" }}>
                      {testimonial.review}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleEdit(testimonial)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleDelete(testimonial._id)}
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
      </Paper>
    </Box>
  );
};

export default AdminTestimonial;