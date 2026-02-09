const VideoLinkService = require("../services/VideoLinkService");

class VideoLinkController {
  /**
   * Create a new video link.
   * POST /api/video-links
   */
  static async createVideoLink(req, res) {
    try {
      const videoLink = await VideoLinkService.createVideoLink(req.body);
      res.status(201).json({ status: "success", data: videoLink });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * Get all video links.
   * GET /api/video-links
   */
  static async getAllVideoLinks(req, res) {
    try {
      const videoLinks = await VideoLinkService.getAllVideoLinks();
      res.status(200).json({ status: "success", data: videoLinks });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Get a video link by ID.
   * GET /api/video-links/:id
   */
  static async getVideoLinkById(req, res) {
    try {
      const videoLink = await VideoLinkService.getVideoLinkById(req.params.id);
      if (!videoLink) {
        return res.status(404).json({ status: "error", message: "Video link not found" });
      }
      res.status(200).json({ status: "success", data: videoLink });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Update a video link by ID.
   * PATCH /api/video-links/:id
   */
  static async updateVideoLink(req, res) {
    try {
      const videoLink = await VideoLinkService.updateVideoLink(req.params.id, req.body);
      if (!videoLink) {
        return res.status(404).json({ status: "error", message: "Video link not found" });
      }
      res.status(200).json({ status: "success", data: videoLink });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  /**
   * Delete a video link by ID.
   * DELETE /api/video-links/:id
   */
  static async deleteVideoLink(req, res) {
    try {
      const videoLink = await VideoLinkService.deleteVideoLink(req.params.id);
      if (!videoLink) {
        return res.status(404).json({ status: "error", message: "Video link not found" });
      }
      res.status(200).json({ status: "success", message: "Video link deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

module.exports = VideoLinkController;