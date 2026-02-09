const VideoLinkModel = require("../models/VideoLinkModel");

class VideoLinkService {
  /**
   * Create a new video link.
   * @param {Object} videoLinkData - Data for the new video link.
   * @returns {Promise<Object>} The created video link.
   */
  static async createVideoLink(videoLinkData) {
    const videoLink = new VideoLinkModel(videoLinkData);
    return await videoLink.save();
  }

  /**
   * Get all video links.
   * @returns {Promise<Array>} A list of all video links.
   */
  static async getAllVideoLinks() {
    return await VideoLinkModel.find({});
  }

  /**
   * Get a video link by ID.
   * @param {string} id - The ID of the video link.
   * @returns {Promise<Object|null>} The video link if found, otherwise null.
   */
  static async getVideoLinkById(id) {
    return await VideoLinkModel.findById(id);
  }

  /**
   * Update a video link by ID.
   * @param {string} id - The ID of the video link to update.
   * @param {Object} updateData - Data to update the video link with.
   * @returns {Promise<Object|null>} The updated video link if found, otherwise null.
   */
  static async updateVideoLink(id, updateData) {
    return await VideoLinkModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Delete a video link by ID.
   * @param {string} id - The ID of the video link to delete.
   * @returns {Promise<Object|null>} The deleted video link if found, otherwise null.
   */
  static async deleteVideoLink(id) {
    return await VideoLinkModel.findByIdAndDelete(id);
  }
}

module.exports = VideoLinkService;